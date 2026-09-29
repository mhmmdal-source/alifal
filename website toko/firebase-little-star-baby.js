/* =========================================================
   LITTLE STAR BABY
   FIREBASE MODULE — Authentication + Firestore
   ---------------------------------------------------------
   File ini dimuat sebagai <script type="module">.

   LANGKAH SETUP (wajib dilakukan sekali):
   1. Buka https://console.firebase.google.com  →  Add project
   2. Project Settings → Your apps → Web (</>) → daftarkan app
   3. Salin objek firebaseConfig, tempel di bawah ini
   4. Build → Authentication → Get started → Sign-in method:
        - aktifkan  Google
        - aktifkan  Facebook  (butuh App ID + App Secret dari
          https://developers.facebook.com , dan OAuth redirect URI
          dari Firebase ditempel di Facebook Login → Settings)
        - aktifkan  Phone      (dipakai untuk login WhatsApp/SMS OTP)
   5. Authentication → Settings → Authorized domains:
        tambahkan domain hosting Anda (mis. littlestarbaby.id)
   6. Build → Firestore Database → Create database (mode production)
   7. Rules Firestore minimal:

      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /orders/{orderId} {
            allow create: if request.auth != null;
            allow read:   if request.auth != null
                          && resource.data.uid == request.auth.uid;
          }
          match /users/{uid} {
            allow read, write: if request.auth != null
                               && request.auth.uid == uid;
          }
        }
      }

   CATATAN: selama firebaseConfig masih berisi teks "GANTI_",
   situs otomatis berjalan dalam MODE DEMO — login tetap bisa
   dicoba (data disimpan lokal), tanpa error.
========================================================= */

const firebaseConfig = {
    apiKey:            "GANTI_DENGAN_API_KEY_ANDA",
    authDomain:        "GANTI_PROJECT_ID.firebaseapp.com",
    projectId:         "GANTI_PROJECT_ID",
    storageBucket:     "GANTI_PROJECT_ID.appspot.com",
    messagingSenderId: "GANTI_SENDER_ID",
    appId:             "GANTI_APP_ID"
};


/* Nomor telepon yang otomatis diarahkan ke WhatsApp setelah login,
   dipakai untuk mengirim notifikasi pesanan. */
const WHATSAPP_STORE = "628138358354";


const isConfigured = !JSON.stringify(firebaseConfig).includes("GANTI_");


/* Objek publik yang dipakai oleh script utama */
const LSBAuth = {
    configured: isConfigured,
    ready: false,
    mode: isConfigured ? "firebase" : "demo",
    user: null,
    whatsappStore: WHATSAPP_STORE,

    signInGoogle:   async () => demoLogin("google"),
    signInFacebook: async () => demoLogin("facebook"),
    sendOtp:        async phone => demoOtp(phone),
    verifyOtp:      async code => demoVerify(code),
    logout:         async () => demoLogout(),
    saveOrder:      async order => demoSaveOrder(order),
    findOrder:      async resi => demoFindOrder(resi),
    listOrders:     async () => demoListOrders()
};

window.LSBAuth = LSBAuth;


/* ---------------------------------------------------------
   Helper: siarkan perubahan status login ke script utama
--------------------------------------------------------- */
function broadcast(user) {
    LSBAuth.user = user;
    window.dispatchEvent(new CustomEvent("lsb-auth-changed", { detail: user }));
}


/* =========================================================
   MODE DEMO (tanpa konfigurasi Firebase)
   Semua data disimpan di localStorage browser.
========================================================= */

const DEMO_KEY = "littleStarUser";
const DEMO_ORDER_KEY = "littleStarOrders";

let demoPendingPhone = null;
let demoPendingCode = null;


function demoLogin(provider) {

    const names = {
        google:   "Pengguna Google",
        facebook: "Pengguna Facebook"
    };

    const user = {
        uid: `demo-${provider}-${Date.now()}`,
        displayName: names[provider] || "Pengguna",
        email: `${provider}@demo.local`,
        phoneNumber: null,
        photoURL: null,
        provider,
        demo: true
    };

    localStorage.setItem(DEMO_KEY, JSON.stringify(user));
    broadcast(user);

    return { ok: true, user, demo: true };
}


function demoOtp(phone) {

    demoPendingPhone = phone;
    demoPendingCode = String(Math.floor(100000 + Math.random() * 900000));

    return {
        ok: true,
        demo: true,
        code: demoPendingCode,
        message: `Mode demo — kode OTP Anda: ${demoPendingCode}`
    };
}


function demoVerify(code) {

    if (!demoPendingCode) {
        return { ok: false, message: "Kirim kode OTP terlebih dahulu." };
    }

    if (String(code) !== demoPendingCode) {
        return { ok: false, message: "Kode OTP salah. Periksa kembali." };
    }

    const user = {
        uid: `demo-phone-${Date.now()}`,
        displayName: "Pengguna WhatsApp",
        email: null,
        phoneNumber: demoPendingPhone,
        photoURL: null,
        provider: "whatsapp",
        demo: true
    };

    demoPendingCode = null;

    localStorage.setItem(DEMO_KEY, JSON.stringify(user));
    broadcast(user);

    return { ok: true, user, demo: true };
}


function demoLogout() {
    localStorage.removeItem(DEMO_KEY);
    broadcast(null);
    return { ok: true };
}


function demoSaveOrder(order) {
    const list = JSON.parse(localStorage.getItem(DEMO_ORDER_KEY) || "[]");
    list.unshift(order);
    localStorage.setItem(DEMO_ORDER_KEY, JSON.stringify(list.slice(0, 50)));
    return { ok: true, demo: true };
}


function demoFindOrder(resi) {
    const list = JSON.parse(localStorage.getItem(DEMO_ORDER_KEY) || "[]");
    const found = list.find(o => o.resi.toUpperCase() === String(resi).toUpperCase());
    return found || null;
}


function demoListOrders() {
    return JSON.parse(localStorage.getItem(DEMO_ORDER_KEY) || "[]");
}


/* pulihkan sesi demo saat halaman dibuka */
if (!isConfigured) {

    const saved = localStorage.getItem(DEMO_KEY);

    LSBAuth.ready = true;

    setTimeout(() => {
        broadcast(saved ? JSON.parse(saved) : null);
        window.dispatchEvent(new CustomEvent("lsb-auth-ready", { detail: { mode: "demo" } }));
    }, 60);
}


/* =========================================================
   MODE FIREBASE (aktif setelah firebaseConfig diisi)
========================================================= */

if (isConfigured) {

    const { initializeApp } =
        await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");

    const {
        getAuth,
        setPersistence,
        browserLocalPersistence,
        GoogleAuthProvider,
        FacebookAuthProvider,
        signInWithPopup,
        RecaptchaVerifier,
        signInWithPhoneNumber,
        onAuthStateChanged,
        signOut
    } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js");

    const {
        getFirestore,
        collection,
        doc,
        setDoc,
        getDocs,
        query,
        where,
        orderBy,
        limit,
        serverTimestamp
    } = await import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js");

    const app  = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const db   = getFirestore(app);

    auth.languageCode = "id";

    await setPersistence(auth, browserLocalPersistence).catch(() => {});

    let confirmationResult = null;
    let recaptcha = null;


    function mapUser(user) {

        if (!user) return null;

        return {
            uid: user.uid,
            displayName: user.displayName || "Pengguna",
            email: user.email,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            provider: user.providerData?.[0]?.providerId || "firebase",
            demo: false
        };
    }


    function friendlyError(error) {

        const code = error?.code || "";

        const map = {
            "auth/popup-closed-by-user": "Jendela login ditutup sebelum selesai.",
            "auth/popup-blocked": "Popup diblokir browser. Izinkan popup lalu coba lagi.",
            "auth/account-exists-with-different-credential":
                "Email ini sudah terdaftar dengan metode login lain.",
            "auth/invalid-phone-number": "Format nomor tidak valid.",
            "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi beberapa menit lagi.",
            "auth/invalid-verification-code": "Kode OTP salah. Periksa kembali.",
            "auth/code-expired": "Kode OTP kedaluwarsa. Kirim ulang.",
            "auth/operation-not-allowed":
                "Metode login ini belum diaktifkan di Firebase Console.",
            "auth/unauthorized-domain":
                "Domain ini belum terdaftar di Firebase → Authentication → Authorized domains."
        };

        return map[code] || error?.message || "Terjadi kesalahan. Coba lagi.";
    }


    async function upsertUser(user) {

        if (!user) return;

        try {
            await setDoc(
                doc(db, "users", user.uid),
                {
                    uid: user.uid,
                    name: user.displayName || "",
                    email: user.email || "",
                    phone: user.phoneNumber || "",
                    photo: user.photoURL || "",
                    lastLogin: serverTimestamp()
                },
                { merge: true }
            );
        }
        catch { /* abaikan jika rules menolak */ }
    }


    LSBAuth.signInGoogle = async () => {

        try {
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({ prompt: "select_account" });

            const result = await signInWithPopup(auth, provider);
            await upsertUser(result.user);

            return { ok: true, user: mapUser(result.user) };
        }
        catch (error) {
            return { ok: false, message: friendlyError(error) };
        }
    };


    LSBAuth.signInFacebook = async () => {

        try {
            const provider = new FacebookAuthProvider();
            provider.addScope("email");

            const result = await signInWithPopup(auth, provider);
            await upsertUser(result.user);

            return { ok: true, user: mapUser(result.user) };
        }
        catch (error) {
            return { ok: false, message: friendlyError(error) };
        }
    };


    LSBAuth.sendOtp = async phone => {

        try {

            if (!recaptcha) {
                recaptcha = new RecaptchaVerifier(auth, "authRecaptcha", {
                    size: "invisible"
                });
                await recaptcha.render();
            }

            confirmationResult = await signInWithPhoneNumber(auth, phone, recaptcha);

            return { ok: true, message: "Kode OTP telah dikirim." };
        }
        catch (error) {

            try { recaptcha?.clear(); } catch {}
            recaptcha = null;

            return { ok: false, message: friendlyError(error) };
        }
    };


    LSBAuth.verifyOtp = async code => {

        try {

            if (!confirmationResult) {
                return { ok: false, message: "Kirim kode OTP terlebih dahulu." };
            }

            const result = await confirmationResult.confirm(String(code));
            await upsertUser(result.user);

            return { ok: true, user: mapUser(result.user) };
        }
        catch (error) {
            return { ok: false, message: friendlyError(error) };
        }
    };


    LSBAuth.logout = async () => {
        try {
            await signOut(auth);
            return { ok: true };
        }
        catch (error) {
            return { ok: false, message: friendlyError(error) };
        }
    };


    LSBAuth.saveOrder = async order => {

        try {
            await setDoc(doc(db, "orders", order.resi), {
                ...order,
                uid: auth.currentUser?.uid || "guest",
                createdAt: serverTimestamp()
            });

            return { ok: true };
        }
        catch (error) {
            /* cadangan lokal agar resi tetap bisa dilacak */
            demoSaveOrder(order);
            return { ok: false, message: friendlyError(error) };
        }
    };


    LSBAuth.findOrder = async resi => {

        try {
            const snapshot = await getDocs(
                query(collection(db, "orders"), where("resi", "==", String(resi).toUpperCase()), limit(1))
            );

            if (!snapshot.empty) return snapshot.docs[0].data();
        }
        catch { /* jatuh ke penyimpanan lokal */ }

        return demoFindOrder(resi);
    };


    LSBAuth.listOrders = async () => {

        try {
            if (!auth.currentUser) return demoListOrders();

            const snapshot = await getDocs(
                query(
                    collection(db, "orders"),
                    where("uid", "==", auth.currentUser.uid),
                    orderBy("createdAt", "desc"),
                    limit(20)
                )
            );

            const list = snapshot.docs.map(d => d.data());

            return list.length ? list : demoListOrders();
        }
        catch {
            return demoListOrders();
        }
    };


    onAuthStateChanged(auth, user => {
        LSBAuth.ready = true;
        broadcast(mapUser(user));
        window.dispatchEvent(new CustomEvent("lsb-auth-ready", { detail: { mode: "firebase" } }));
    });
}
