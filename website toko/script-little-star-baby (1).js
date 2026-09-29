/* =========================================================
   LITTLE STAR BABY
   SCRIPT.JS  (Enhanced — loading screen, suara AI, fitur baru)
   ========================================================= */


/* =========================================================
   01. STORE CONFIGURATION
========================================================= */

const STORE = {
    name: "Little Star Baby",
    whatsapp: "628138358354",
    currency: "Rp"
};


/* =========================================================
   02. PROMO CONFIGURATION
   Ubah bagian ini jika ingin mengganti promo
========================================================= */

const PROMO_CONFIG = {
    title: "Special Promo",
    discount: "50%",
    description: "Diskon spesial untuk produk pilihan Little Star Baby.",
    voucher: "STAR50",
    voucherDiscount: 0.10,
    endDate: "2026-12-31T23:59:59"
};


/* =========================================================
   02B. VOICE / SUARA SAMBUTAN CONFIGURATION
   Menggunakan Web Speech API (AI voice bawaan browser)
========================================================= */

const VOICE_CONFIG = {
    message: "Selamat datang di Little Star Baby. Untuk si kecil bintangmu, nyaman, aman, dan penuh perhatian. Selamat berbelanja!",
    lang: "id-ID",
    rate: 0.95,
    pitch: 1.15
};


/* =========================================================
   03. PRODUCT DATABASE
========================================================= */

const products = [

    {
        id: 1,
        name: "Baby Romper Cloud",
        category: "Pakaian Bayi",
        gender: "Unisex",
        age: "0-1",
        price: 89000,
        oldPrice: 119000,
        rating: 4.9,
        reviews: 128,
        stock: 15,
        badge: "Best Seller",
        colors: ["Cream", "Soft Blue", "Soft Pink"],
        sizes: ["0-3M", "3-6M", "6-12M"],
        image: "images/Baby Romper Cloud.jpg",
        description: "Romper bayi berbahan lembut dan nyaman untuk aktivitas sehari-hari."
    },

    {
        id: 2,
        name: "Baby Dress Blossom",
        category: "Pakaian Bayi",
        gender: "Perempuan",
        age: "1-3",
        price: 129000,
        oldPrice: 159000,
        rating: 4.8,
        reviews: 96,
        stock: 10,
        badge: "Promo",
        colors: ["Soft Pink", "Cream"],
        sizes: ["1Y", "2Y", "3Y"],
        image: "images/Baby Dress Blossom.jpg",
        description: "Dress bayi perempuan dengan desain ceria, lembut dan nyaman digunakan."
    },

    {
        id: 3,
        name: "Baby T-Shirt Little Star",
        category: "Pakaian Bayi",
        gender: "Laki-laki",
        age: "1-3",
        price: 79000,
        oldPrice: 99000,
        rating: 4.7,
        reviews: 73,
        stock: 20,
        badge: "New",
        colors: ["Soft Blue", "White"],
        sizes: ["1Y", "2Y", "3Y"],
        image: "images/Baby T-Shirt Little Star.jpg",
        description: "Kaos anak dengan bahan cotton yang ringan dan nyaman."
    },

    {
        id: 4,
        name: "Soft Baby Blanket",
        category: "Tidur",
        gender: "Unisex",
        age: "0-1",
        price: 119000,
        oldPrice: 149000,
        rating: 4.9,
        reviews: 151,
        stock: 18,
        badge: "Favorit",
        colors: ["Cream", "Sage Green", "Soft Blue"],
        sizes: ["75x100cm", "100x120cm"],
        image: "images/Soft Baby Blanket.jpg",
        description: "Selimut lembut untuk menemani waktu tidur bayi."
    },

    {
        id: 5,
        name: "Baby Feeding Bottle",
        category: "Perlengkapan Makan",
        gender: "Unisex",
        age: "0-1",
        price: 69000,
        oldPrice: 89000,
        rating: 4.8,
        reviews: 110,
        stock: 25,
        badge: "Best Seller",
        colors: ["Soft Blue", "Soft Pink"],
        sizes: ["120ml", "240ml"],
        image: "images/Baby Feeding Bottle.jpg",
        description: "Botol susu dengan desain praktis untuk kebutuhan bayi."
    },

    {
        id: 6,
        name: "Baby Silicone Plate",
        category: "Perlengkapan Makan",
        gender: "Unisex",
        age: "1-3",
        price: 85000,
        oldPrice: 109000,
        rating: 4.7,
        reviews: 82,
        stock: 16,
        badge: "Promo",
        colors: ["Sage Green", "Soft Pink"],
        sizes: ["Small", "Medium"],
        image: "images/Baby Silicone Plate.jpg",
        description: "Piring makan anak dengan desain sederhana dan menarik."
    },

    {
        id: 7,
        name: "Baby Bath Set",
        category: "Mandi",
        gender: "Unisex",
        age: "0-1",
        price: 99000,
        oldPrice: 129000,
        rating: 4.8,
        reviews: 91,
        stock: 12,
        badge: "New",
        colors: ["Soft Blue", "Soft Pink"],
        sizes: ["Standard"],
        image: "images/Baby Bath Set.jpg",
        description: "Set perlengkapan mandi bayi untuk penggunaan sehari-hari."
    },

    {
        id: 8,
        name: "Cute Bath Towel",
        category: "Mandi",
        gender: "Unisex",
        age: "1-3",
        price: 79000,
        oldPrice: 99000,
        rating: 4.6,
        reviews: 65,
        stock: 30,
        badge: "New",
        colors: ["Cream", "Soft Blue"],
        sizes: ["70x140cm"],
        image: "images/Cute Bath Towel.jpg",
        description: "Handuk lembut untuk menemani waktu mandi anak."
    },

    {
        id: 9,
        name: "Musical Baby Toy",
        category: "Mainan",
        gender: "Unisex",
        age: "0-1",
        price: 109000,
        oldPrice: 139000,
        rating: 4.8,
        reviews: 134,
        stock: 14,
        badge: "Best Seller",
        colors: ["Soft Blue", "Soft Pink"],
        sizes: ["Standard"],
        image: "images/Musical Baby Toy.jpg",
        description: "Mainan bayi dengan warna lembut untuk menemani waktu bermain."
    },

    {
        id: 10,
        name: "Wooden Learning Blocks",
        category: "Mainan",
        gender: "Unisex",
        age: "3-5",
        price: 129000,
        oldPrice: 159000,
        rating: 4.9,
        reviews: 117,
        stock: 21,
        badge: "Edukasi",
        colors: ["Natural", "Sage Green"],
        sizes: ["24 pcs", "36 pcs"],
        image: "images/Wooden Learning Blocks.jpg",
        description: "Balok edukasi untuk membantu anak bermain sekaligus belajar."
    },

    {
        id: 11,
        name: "Baby Diaper Soft",
        category: "Popok",
        gender: "Unisex",
        age: "0-1",
        price: 99000,
        oldPrice: 119000,
        rating: 4.8,
        reviews: 202,
        stock: 35,
        badge: "Promo",
        colors: ["White"],
        sizes: ["S", "M", "L"],
        image: "images/Baby Diaper Soft.jpg",
        description: "Popok bayi untuk penggunaan harian dengan pilihan ukuran."
    },

    {
        id: 12,
        name: "Baby Stroller Comfort",
        category: "Stroller",
        gender: "Unisex",
        age: "0-3",
        price: 899000,
        oldPrice: 1099000,
        rating: 4.9,
        reviews: 48,
        stock: 7,
        badge: "Premium",
        colors: ["Sage Green", "Soft Blue"],
        sizes: ["Standard"],
        image: "images/Baby Stroller Comfort.jpg",
        description: "Stroller praktis untuk menemani perjalanan bersama si kecil."
    },

    {
        id: 13,
        name: "Soft Baby Carrier",
        category: "Baby Carrier",
        gender: "Unisex",
        age: "0-3",
        price: 399000,
        oldPrice: 499000,
        rating: 4.8,
        reviews: 56,
        stock: 9,
        badge: "Favorit",
        colors: ["Sage Green", "Cream"],
        sizes: ["Standard"],
        image: "images/Soft Baby Carrier.jpg",
        description: "Baby carrier dengan desain praktis untuk aktivitas bersama bayi."
    },

    {
        id: 14,
        name: "Baby Sleep Nest",
        category: "Tidur",
        gender: "Unisex",
        age: "0-1",
        price: 249000,
        oldPrice: 299000,
        rating: 4.7,
        reviews: 42,
        stock: 8,
        badge: "Promo",
        colors: ["Cream", "Soft Pink"],
        sizes: ["0-12M"],
        image: "images/Baby Sleep Nest.jpg",
        description: "Perlengkapan tidur bayi dengan desain lembut dan nyaman."
    },

    {
        id: 15,
        name: "Toddler Backpack",
        category: "Aksesori",
        gender: "Unisex",
        age: "3-5",
        price: 119000,
        oldPrice: 149000,
        rating: 4.6,
        reviews: 39,
        stock: 17,
        badge: "New",
        colors: ["Soft Blue", "Soft Pink", "Sage Green"],
        sizes: ["Small"],
        image: "images/Toddler Backpack.jpg",
        description: "Tas kecil untuk menemani aktivitas anak usia 3–5 tahun."
    },

    {
        id: 16,
        name: "Baby Feeding Set",
        category: "Perlengkapan Makan",
        gender: "Unisex",
        age: "1-3",
        price: 149000,
        oldPrice: 189000,
        rating: 4.9,
        reviews: 88,
        stock: 11,
        badge: "Best Seller",
        colors: ["Sage Green", "Soft Pink", "Soft Blue"],
        sizes: ["Standard"],
        image: "images/Baby Feeding Set.jpg",
        description: "Paket perlengkapan makan untuk membantu waktu makan anak."
    }

];


/* =========================================================
   04. APPLICATION STATE
========================================================= */

let cart = JSON.parse(localStorage.getItem("littleStarCart")) || [];

let wishlist = JSON.parse(localStorage.getItem("littleStarWishlist")) || [];

let currentVoucher = localStorage.getItem("littleStarVoucher") || null;

let currentDetailProduct = null;

let detailQuantity = 1;

let selectedColor = null;

let selectedSize = null;

let recentlyViewed = JSON.parse(localStorage.getItem("littleStarRecentlyViewed")) || [];

let voiceEnabled = localStorage.getItem("lsbVoice") !== "off";

let availableVoices = [];


/* =========================================================
   05. DOM HELPER
========================================================= */

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);


/* =========================================================
   06. FORMAT PRICE
========================================================= */

function rupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(value);
}


/* =========================================================
   07. FIND PRODUCT
========================================================= */

function getProduct(id) {
    return products.find(product => product.id === Number(id));
}


/* =========================================================
   08. CATEGORY NAME
========================================================= */

function categoryName(category) {
    return category;
}


/* =========================================================
   09. RENDER STARS
========================================================= */

function renderStars(rating) {
    const rounded = Math.round(rating);
    return "★".repeat(rounded) + "☆".repeat(5 - rounded);
}


/* =========================================================
   10. DISCOUNT
========================================================= */

function getDiscount(product) {
    if (!product.oldPrice || product.oldPrice <= product.price) {
        return 0;
    }
    return Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
}


/* =========================================================
   10B. USIA: rentang overlap (perbaikan filter usia)
   Contoh: produk usia "0-3" ikut tampil di filter "0-1"
   dan "1-3", tetapi tidak di "3-5".
========================================================= */

function ageOverlaps(productAge, filterAge) {

    if (productAge === filterAge) return true;

    const parse = value => value.split("-").map(Number);

    const [pStart, pEnd] = parse(productAge);
    const [fStart, fEnd] = parse(filterAge);

    if ([pStart, pEnd, fStart, fEnd].some(isNaN)) {
        return productAge === filterAge;
    }

    return pStart < fEnd && pEnd > fStart;
}


/* =========================================================
   11. PRODUCT CARD
========================================================= */

function productCard(product) {

    const wished = wishlist.includes(product.id);
    const discount = getDiscount(product);

    return `
        <div class="col-6 col-md-4 col-xl-3">
            <article class="product-card">
                <div class="product-image">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='https://placehold.co/800x700/fffaf3/7f9d83?text=Little+Star+Baby';"
                    >
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
                    ${discount > 0 ? `<span class="discount-badge">-${discount}%</span>` : ""}
                    <button
                        type="button"
                        class="wish-btn ${wished ? "active" : ""}"
                        onclick="toggleWishlist(${product.id})"
                        aria-label="Wishlist"
                    >
                        <i class="bi ${wished ? "bi-heart-fill" : "bi-heart"}"></i>
                    </button>
                </div>

                <div class="product-content">
                    <span class="product-category">${categoryName(product.category)}</span>
                    <h3 class="product-title">${product.name}</h3>

                    <div class="product-rating">
                        <span class="stars">${renderStars(product.rating)}</span>
                        <strong>${product.rating}</strong>
                        <small>(${product.reviews})</small>
                    </div>

                    <div class="product-price">
                        <strong>${rupiah(product.price)}</strong>
                        ${product.oldPrice ? `<del>${rupiah(product.oldPrice)}</del>` : ""}
                    </div>

                    <div class="stock-info">
                        <i class="bi bi-box-seam"></i>
                        ${product.stock <= 5
                            ? `Hampir habis • ${product.stock} tersisa`
                            : `Stok tersedia • ${product.stock}`}
                    </div>

                    <div class="product-actions">
                        <button
                            type="button"
                            class="btn btn-detail"
                            onclick="openProductDetail(${product.id})"
                        >
                            <i class="bi bi-eye"></i> Detail
                        </button>
                        <button
                            type="button"
                            class="btn btn-cart"
                            onclick="quickAddToCart(${product.id})"
                        >
                            <i class="bi bi-cart-plus"></i> Keranjang
                        </button>
                    </div>
                </div>
            </article>
        </div>
    `;
}


/* =========================================================
   12. RENDER PRODUCTS
========================================================= */

function renderProducts(list = products) {

    const grid = $("#productGrid");
    const empty = $("#emptyProduct");
    const count = $("#resultCount");

    if (!grid) return;

    count.textContent = list.length;

    if (list.length === 0) {
        grid.innerHTML = "";
        empty.classList.remove("d-none");
        return;
    }

    empty.classList.add("d-none");
    grid.innerHTML = list.map(productCard).join("");
}


/* =========================================================
   13. RENDER CATEGORY OPTIONS
========================================================= */

function renderCategoryOptions() {

    const select = $("#categoryFilter");
    if (!select) return;

    const categories = [...new Set(products.map(product => product.category))];

    select.innerHTML = `
        <option value="all">Semua Kategori</option>
        ${categories.map(category => `<option value="${category}">${category}</option>`).join("")}
    `;
}


/* =========================================================
   14. FILTER PRODUCTS
========================================================= */

function applyFilters() {

    const search = ($("#searchInput")?.value || "").trim().toLowerCase();
    const category = $("#categoryFilter")?.value || "all";
    const age = $("#ageFilter")?.value || "all";
    const gender = $("#genderFilter")?.value || "all";
    const rating = $("#ratingFilter")?.value || "all";
    const inStockOnly = $("#stockFilter")?.checked || false;
    const minPrice = Number($("#minPrice")?.value) || 0;
    const maxPrice = Number($("#maxPrice")?.value) || Infinity;
    const sort = $("#sortFilter")?.value || "default";

    let filtered = products.filter(product => {

        const matchSearch =
            !search ||
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search);

        const matchCategory = category === "all" || product.category === category;
        const matchAge = age === "all" || ageOverlaps(product.age, age);
        const matchGender = gender === "all" || product.gender === gender;
        const matchRating = rating === "all" || product.rating >= Number(rating);
        const matchStock = !inStockOnly || product.stock > 0;
        const matchPrice = product.price >= minPrice && product.price <= maxPrice;

        return (
            matchSearch &&
            matchCategory &&
            matchAge &&
            matchGender &&
            matchRating &&
            matchStock &&
            matchPrice
        );
    });

    /* SORT */

    if (sort === "price-low") {
        filtered.sort((a, b) => a.price - b.price);
    }
    else if (sort === "price-high") {
        filtered.sort((a, b) => b.price - a.price);
    }
    else if (sort === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }
    else if (sort === "popular") {
        filtered.sort((a, b) => b.reviews - a.reviews);
    }
    else if (sort === "newest") {
        filtered.sort((a, b) => b.id - a.id);
    }

    renderProducts(filtered);
}


/* =========================================================
   15. RESET FILTER
========================================================= */

function resetFilters() {

    [
        "categoryFilter",
        "ageFilter",
        "genderFilter",
        "ratingFilter",
        "sortFilter"
    ].forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;

        if (element.tagName === "SELECT") {
            element.value = id === "sortFilter" ? "default" : "all";
        }
    });

    ["searchInput", "minPrice", "maxPrice"].forEach(id => {
        const element = document.getElementById(id);
        if (element) element.value = "";
    });

    const stock = document.getElementById("stockFilter");
    if (stock) stock.checked = false;

    applyFilters();
}


/* =========================================================
   16. WISHLIST
========================================================= */

function toggleWishlist(id) {

    id = Number(id);

    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(item => item !== id);
        showToast("Produk dihapus dari wishlist.");
    }
    else {
        wishlist.push(id);
        showToast("Produk ditambahkan ke wishlist");
    }

    localStorage.setItem("littleStarWishlist", JSON.stringify(wishlist));

    updateWishlistCount();
    updateWishlistUI();
    applyFilters();
}


/* =========================================================
   17. WISHLIST COUNT
========================================================= */

function updateWishlistCount() {
    const count = $("#wishlistCount");
    if (count) count.textContent = wishlist.length;
}


/* =========================================================
   17B. OPEN WISHLIST
========================================================= */

function openWishlist() {

    updateWishlistUI();

    const canvas = bootstrap.Offcanvas.getOrCreateInstance($("#wishlistCanvas"));
    canvas.show();
}


/* =========================================================
   17C. UPDATE WISHLIST UI
========================================================= */

function updateWishlistUI() {

    const container = $("#wishlistItems");
    const footer = $("#wishlistFooter");

    if (!container) return;

    const items = wishlist.map(getProduct).filter(Boolean);

    if (items.length === 0) {

        container.innerHTML = `
            <div class="empty-product">
                <div class="empty-icon"><i class="bi bi-heart"></i></div>
                <h4>Wishlist masih kosong</h4>
                <p>Simpan produk favorit si kecil di sini.</p>
                <a href="#products" class="btn btn-primary-custom" data-bs-dismiss="offcanvas">
                    Jelajahi Produk
                </a>
            </div>
        `;

        footer?.classList.add("d-none");
    }
    else {
        container.innerHTML = items.map(wishlistItemTemplate).join("");
        footer?.classList.remove("d-none");
    }
}


/* =========================================================
   17D. WISHLIST ITEM TEMPLATE
========================================================= */

function wishlistItemTemplate(product) {
    return `
        <div class="cart-item">
            <img
                src="${product.image}"
                alt="${product.name}"
                onerror="this.onerror=null;this.src='https://placehold.co/300x300/fffaf3/7f9d83?text=Baby';"
            >
            <div class="cart-item-info">
                <h6>${product.name}</h6>
                <small>${categoryName(product.category)}</small>
                <strong>${rupiah(product.price)}</strong>
                <div class="wishlist-move">
                    <button class="wishlist-move-btn" onclick="moveWishlistItemToCart(${product.id})">
                        <i class="bi bi-cart-plus"></i> Pindah ke Keranjang
                    </button>
                </div>
            </div>
            <button
                class="cart-remove"
                onclick="toggleWishlist(${product.id})"
                aria-label="Hapus dari wishlist"
            >
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;
}


/* =========================================================
   17E. MOVE WISHLIST ITEM TO CART
========================================================= */

function moveWishlistItemToCart(id) {

    const product = getProduct(id);
    if (!product) return;

    addToCart(product, product.colors?.[0] || "-", product.sizes?.[0] || "-", 1);
    toggleWishlist(id);
}


/* =========================================================
   17F. MOVE ALL WISHLIST TO CART
========================================================= */

function moveAllWishlistToCart() {

    if (wishlist.length === 0) {
        showToast("Wishlist kamu masih kosong");
        return;
    }

    [...wishlist].forEach(id => moveWishlistItemToCart(id));

    showToast("Semua wishlist dipindahkan ke keranjang");
}


/* =========================================================
   18. QUICK ADD TO CART
========================================================= */

function quickAddToCart(id) {

    const product = getProduct(id);
    if (!product) return;

    addToCart(product, product.colors?.[0] || "-", product.sizes?.[0] || "-", 1);
}


/* =========================================================
   19. ADD TO CART
========================================================= */

function addToCart(product, color, size, quantity = 1) {

    if (!product) return;

    const existing = cart.find(item =>
        item.id === product.id &&
        item.color === color &&
        item.size === size
    );

    if (existing) {
        existing.quantity += quantity;
    }
    else {
        cart.push({
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            color: color,
            size: size,
            quantity: quantity
        });
    }

    saveCart();
    updateCartUI();
    showToast(`${product.name} masuk ke keranjang`);
}


/* =========================================================
   20. SAVE CART
========================================================= */

function saveCart() {
    localStorage.setItem("littleStarCart", JSON.stringify(cart));
}


/* =========================================================
   21. CART COUNT
========================================================= */

function updateCartCount() {

    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const count = $("#cartCount");

    if (count) count.textContent = total;
}


/* =========================================================
   22. CART TOTAL
========================================================= */

function calculateCart() {

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    let discount = 0;

    if (currentVoucher === PROMO_CONFIG.voucher) {
        discount = subtotal * PROMO_CONFIG.voucherDiscount;
    }

    const shipping = subtotal > 0 ? (subtotal >= 300000 ? 0 : 15000) : 0;

    const total = subtotal - discount + shipping;

    return { subtotal, discount, shipping, total };
}


/* =========================================================
   23. UPDATE CART UI
========================================================= */

function updateCartUI() {

    updateCartCount();

    const cartItems = $("#cartItems");
    if (!cartItems) return;

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-product">
                <div class="empty-icon"><i class="bi bi-bag-heart"></i></div>
                <h4>Keranjang masih kosong</h4>
                <p>Yuk pilih kebutuhan si kecil.</p>
                <a href="#products" class="btn btn-primary-custom" data-bs-dismiss="offcanvas">
                    Mulai Belanja
                </a>
            </div>
        `;
    }
    else {
        cartItems.innerHTML = cart.map(cartItemTemplate).join("");
    }

    const totals = calculateCart();

    $("#cartSubtotal").textContent = rupiah(totals.subtotal);

    $("#cartDiscount").textContent =
        totals.discount > 0 ? `-${rupiah(totals.discount)}` : rupiah(0);

    $("#shippingCost").textContent =
        totals.shipping === 0 && totals.subtotal > 0 ? "Gratis" : rupiah(totals.shipping);

    $("#cartTotal").textContent = rupiah(totals.total);
}


/* =========================================================
   24. CART ITEM TEMPLATE
========================================================= */

function cartItemTemplate(item) {
    return `
        <div class="cart-item">
            <img
                src="${item.image}"
                alt="${item.name}"
                onerror="this.onerror=null;this.src='https://placehold.co/300x300/fffaf3/7f9d83?text=Baby';"
            >
            <div class="cart-item-info">
                <h6>${item.name}</h6>
                <small>Warna: ${item.color}</small>
                <small>Ukuran: ${item.size}</small>
                <strong>${rupiah(item.price * item.quantity)}</strong>

                <div class="cart-quantity">
                    <button onclick="changeCartQuantity(${item.id}, '${escapeAttribute(item.color)}', '${escapeAttribute(item.size)}', -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeCartQuantity(${item.id}, '${escapeAttribute(item.color)}', '${escapeAttribute(item.size)}', 1)">+</button>
                </div>
            </div>
            <button
                class="cart-remove"
                onclick="removeCartItem(${item.id}, '${escapeAttribute(item.color)}', '${escapeAttribute(item.size)}')"
                aria-label="Hapus"
            >
                <i class="bi bi-trash"></i>
            </button>
        </div>
    `;
}


/* =========================================================
   25. ESCAPE ATTRIBUTE
========================================================= */

function escapeAttribute(value) {
    return String(value).replace(/'/g, "\\'");
}


/* =========================================================
   26. CHANGE CART QUANTITY
========================================================= */

function changeCartQuantity(id, color, size, amount) {

    const item = cart.find(product =>
        product.id === Number(id) &&
        product.color === color &&
        product.size === size
    );

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => !(
            product.id === Number(id) &&
            product.color === color &&
            product.size === size
        ));
    }

    saveCart();
    updateCartUI();
}


/* =========================================================
   27. REMOVE CART
========================================================= */

function removeCartItem(id, color, size) {

    cart = cart.filter(item => !(
        item.id === Number(id) &&
        item.color === color &&
        item.size === size
    ));

    saveCart();
    updateCartUI();

    showToast("Produk dihapus dari keranjang.");
}


/* =========================================================
   28. APPLY VOUCHER
========================================================= */

function applyVoucher() {

    const input = $("#voucherInput");
    if (!input) return;

    const code = input.value.trim().toUpperCase();

    if (code === PROMO_CONFIG.voucher) {
        currentVoucher = code;
        localStorage.setItem("littleStarVoucher", code);
        showToast("Voucher berhasil digunakan");
    }
    else {
        currentVoucher = null;
        localStorage.removeItem("littleStarVoucher");
        showToast("Kode voucher tidak valid.");
    }

    updateCartUI();
}


/* =========================================================
   29. PRODUCT DETAIL
========================================================= */

function openProductDetail(id) {

    const product = getProduct(id);
    if (!product) return;

    currentDetailProduct = product;
    detailQuantity = 1;
    selectedColor = product.colors?.[0] || "-";
    selectedSize = product.sizes?.[0] || "-";

    const discount = getDiscount(product);

    $("#productDetail").innerHTML = `
        <div class="row g-4 align-items-center">

            <div class="col-md-6">
                <div class="modal-product-image">
                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        onerror="this.onerror=null;this.src='https://placehold.co/800x700/fffaf3/7f9d83?text=Little+Star+Baby';"
                    >
                </div>
            </div>

            <div class="col-md-6">
                <span class="detail-category">${product.category}</span>
                <h2 class="detail-title">${product.name}</h2>

                <div class="product-rating">
                    <span class="stars">${renderStars(product.rating)}</span>
                    <strong>${product.rating}</strong>
                    <small>(${product.reviews} review)</small>
                </div>

                <div class="detail-price">
                    ${rupiah(product.price)}
                    ${product.oldPrice ? `<del class="detail-old-price">${rupiah(product.oldPrice)}</del>` : ""}
                </div>

                ${discount > 0 ? `<span class="discount-badge" style="position:static;">Hemat ${discount}%</span>` : ""}

                <p class="mt-3">${product.description}</p>

                <div>
                    <div class="option-title">Pilih Warna</div>
                    <div class="option-list">
                        ${product.colors.map(color => `
                            <button
                                type="button"
                                class="option-btn color-option ${color === selectedColor ? "active" : ""}"
                                data-option="${escapeAttribute(color)}"
                                onclick="selectDetailColor('${escapeAttribute(color)}')"
                            >
                                ${color}
                            </button>
                        `).join("")}
                    </div>
                </div>

                <div>
                    <div class="option-title">Pilih Ukuran</div>
                    <div class="option-list">
                        ${product.sizes.map(size => `
                            <button
                                type="button"
                                class="option-btn size-option ${size === selectedSize ? "active" : ""}"
                                data-option="${escapeAttribute(size)}"
                                onclick="selectDetailSize('${escapeAttribute(size)}')"
                            >
                                ${size}
                            </button>
                        `).join("")}
                    </div>
                </div>

                <div>
                    <div class="option-title">Jumlah</div>
                    <div class="detail-quantity">
                        <button onclick="changeDetailQuantity(-1)">−</button>
                        <span id="detailQuantity">1</span>
                        <button onclick="changeDetailQuantity(1)">+</button>
                    </div>
                </div>

                <div class="mt-4 detail-action-row">

                    <button class="btn btn-primary-custom" onclick="addDetailToCart()">
                        <i class="bi bi-bag-plus"></i> Tambahkan ke Keranjang
                    </button>

                    <button
                        type="button"
                        class="detail-icon-btn ${wishlist.includes(product.id) ? "active" : ""}"
                        id="detailWishButton"
                        onclick="toggleWishlist(${product.id}); refreshDetailWishButton(${product.id});"
                        aria-label="Wishlist"
                    >
                        <i class="bi ${wishlist.includes(product.id) ? "bi-heart-fill" : "bi-heart"}"></i>
                    </button>

                    <button
                        type="button"
                        class="detail-icon-btn"
                        onclick="shareProduct(${product.id})"
                        aria-label="Bagikan produk"
                    >
                        <i class="bi bi-share"></i>
                    </button>

                </div>

            </div>

        </div>
    `;

    const modal = new bootstrap.Modal($("#productModal"));
    modal.show();

    trackRecentlyViewed(product.id);
}


/* =========================================================
   29B. REFRESH DETAIL WISHLIST BUTTON
========================================================= */

function refreshDetailWishButton(id) {

    const button = $("#detailWishButton");
    if (!button) return;

    const wished = wishlist.includes(Number(id));

    button.classList.toggle("active", wished);
    button.querySelector("i").className = wished ? "bi bi-heart-fill" : "bi bi-heart";
}


/* =========================================================
   29C. SHARE PRODUCT
========================================================= */

function shareProduct(id) {

    const product = getProduct(id);
    if (!product) return;

    const shareData = {
        title: `${product.name} — ${STORE.name}`,
        text: `Lihat ${product.name} di ${STORE.name}, mulai dari ${rupiah(product.price)}.`,
        url: `${location.origin}${location.pathname}#products`
    };

    if (navigator.share) {
        navigator.share(shareData).catch(() => {});
    }
    else if (navigator.clipboard) {
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
            .then(() => showToast("Link produk disalin ke clipboard"))
            .catch(() => showToast("Gagal menyalin link produk."));
    }
    else {
        showToast("Berbagi tidak didukung di perangkat ini.");
    }
}


/* =========================================================
   29D. TRACK RECENTLY VIEWED
========================================================= */

function trackRecentlyViewed(id) {

    id = Number(id);

    recentlyViewed = recentlyViewed.filter(item => item !== id);
    recentlyViewed.unshift(id);
    recentlyViewed = recentlyViewed.slice(0, 8);

    localStorage.setItem("littleStarRecentlyViewed", JSON.stringify(recentlyViewed));

    renderRecentlyViewed();
}


/* =========================================================
   29E. RENDER RECENTLY VIEWED
========================================================= */

function renderRecentlyViewed() {

    const section = $("#recentlyViewed");
    const grid = $("#recentlyViewedGrid");

    if (!section || !grid) return;

    const items = recentlyViewed.map(getProduct).filter(Boolean);

    if (items.length === 0) {
        section.classList.add("d-none");
        return;
    }

    section.classList.remove("d-none");
    grid.innerHTML = items.map(productCard).join("");
}


/* =========================================================
   29F. CLEAR RECENTLY VIEWED
========================================================= */

function clearRecentlyViewedHistory() {

    recentlyViewed = [];

    localStorage.removeItem("littleStarRecentlyViewed");

    renderRecentlyViewed();

    showToast("Riwayat produk dilihat dihapus.");
}


/* =========================================================
   30. SELECT COLOR (perbaikan: jumlah tidak reset)
========================================================= */

function selectDetailColor(color) {

    selectedColor = color;

    $$(".color-option").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.option === color
        );
    });
}


/* =========================================================
   31. SELECT SIZE (perbaikan: jumlah tidak reset)
========================================================= */

function selectDetailSize(size) {

    selectedSize = size;

    $$(".size-option").forEach(button => {
        button.classList.toggle(
            "active",
            button.dataset.option === size
        );
    });
}


/* =========================================================
   32. DETAIL QUANTITY
========================================================= */

function changeDetailQuantity(amount) {

    if (!currentDetailProduct) return;

    detailQuantity += amount;

    if (detailQuantity < 1) {
        detailQuantity = 1;
    }

    if (detailQuantity > currentDetailProduct.stock) {
        detailQuantity = currentDetailProduct.stock;
    }

    const element = $("#detailQuantity");
    if (element) element.textContent = detailQuantity;
}


/* =========================================================
   33. ADD DETAIL TO CART
========================================================= */

function addDetailToCart() {

    if (!currentDetailProduct) return;

    addToCart(currentDetailProduct, selectedColor, selectedSize, detailQuantity);

    const modal = bootstrap.Modal.getInstance($("#productModal"));
    if (modal) modal.hide();
}


/* =========================================================
   34. OPEN CART
========================================================= */

function openCart() {

    updateCartUI();

    const canvas = bootstrap.Offcanvas.getOrCreateInstance($("#cartCanvas"));
    canvas.show();
}


/* =========================================================
   35. CHECKOUT
========================================================= */

function openCheckout() {

    if (cart.length === 0) {
        showToast("Keranjang masih kosong.");
        return;
    }

    /* setel ulang alur checkout ke langkah pertama */
    checkoutState.method = null;
    checkoutState.order = null;
    checkoutState.vaNumber = null;

    clearInterval(payCountdownTimer);

    $("#payNowButton") && ($("#payNowButton").disabled = true);

    $$("#paymentGroups .payment-option")
        .forEach(option => option.classList.remove("is-selected"));

    renderCourierOptions();
    renderCheckoutSummary();
    gotoCheckoutStep(1);

    if (currentUser) renderAccount(currentUser);

    bootstrap.Modal.getOrCreateInstance($("#checkoutModal")).show();
}


/* =========================================================
   36. CHECKOUT WHATSAPP
========================================================= */

function checkoutWhatsApp() {

    if (cart.length === 0) {
        showToast("Keranjang masih kosong.");
        return;
    }

    const name = $("#customerName")?.value.trim();
    const phone = $("#customerPhone")?.value.trim();
    const address = $("#customerAddress")?.value.trim();
    const city = $("#customerCity")?.value.trim();
    const note = $("#customerNote")?.value.trim();

    if (!name || !phone || !address || !city) {
        showToast("Lengkapi data checkout terlebih dahulu.");
        return;
    }

    const totals = calculateCart();

    let message = `Halo ${STORE.name}\n\n`;
    message += `Saya ingin melakukan pemesanan:\n\n`;

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Warna: ${item.color}\n`;
        message += `   Ukuran: ${item.size}\n`;
        message += `   Jumlah: ${item.quantity}\n`;
        message += `   Harga: ${rupiah(item.price * item.quantity)}\n\n`;
    });

    message += `Subtotal: ${rupiah(totals.subtotal)}\n`;
    message += `Diskon: ${rupiah(totals.discount)}\n`;
    message += `Ongkir: ${totals.shipping === 0 ? "Gratis" : rupiah(totals.shipping)}\n`;
    message += `Total: ${rupiah(totals.total)}\n\n`;

    message += `Nama: ${name}\n`;
    message += `No. WhatsApp: ${phone}\n`;
    message += `Alamat: ${address}\n`;
    message += `Kota: ${city}\n`;

    if (note) {
        message += `Catatan: ${note}\n`;
    }

    message += `\nMohon dibantu proses pesanannya. Terima kasih.`;

    const url = `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");

    showToast("Membuka WhatsApp...");
}


/* =========================================================
   37. WHATSAPP QUICK CHAT
========================================================= */

function openWhatsApp() {

    const message = encodeURIComponent("Halo Little Star Baby, saya ingin bertanya mengenai produk.");

    window.open(`https://wa.me/${STORE.whatsapp}?text=${message}`, "_blank");
}


/* =========================================================
   38. PROMO CONTENT
========================================================= */

function updatePromoContent() {

    $("#promoTitle").textContent = PROMO_CONFIG.title;
    $("#promoDiscount").textContent = PROMO_CONFIG.discount;
    $("#promoDescription").textContent = PROMO_CONFIG.description;
    $("#promoVoucher").textContent = PROMO_CONFIG.voucher;
}


/* =========================================================
   39. COUNTDOWN
========================================================= */

function startCountdown() {

    const element = $("#promoCountdown");
    if (!element) return;

    function update() {

        const end = new Date(PROMO_CONFIG.endDate).getTime();
        const now = Date.now();
        const distance = end - now;

        if (distance <= 0) {
            element.innerHTML = `
                <div class="countdown-box">
                    <strong>00</strong>
                    <small>Promo</small>
                </div>
            `;
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        element.innerHTML = `
            ${countdownBox(days, "Hari")}
            ${countdownBox(hours, "Jam")}
            ${countdownBox(minutes, "Menit")}
            ${countdownBox(seconds, "Detik")}
        `;
    }

    update();
    setInterval(update, 1000);
}


/* =========================================================
   40. COUNTDOWN BOX
========================================================= */

function countdownBox(number, label) {
    return `
        <div class="countdown-box">
            <strong>${String(number).padStart(2, "0")}</strong>
            <small>${label}</small>
        </div>
    `;
}


/* =========================================================
   41. COPY VOUCHER
========================================================= */

async function copyVoucher() {

    try {
        await navigator.clipboard.writeText(PROMO_CONFIG.voucher);
        showToast("Kode voucher berhasil disalin");
    }
    catch {
        showToast(`Kode voucher: ${PROMO_CONFIG.voucher}`);
    }
}


/* =========================================================
   42. NEWSLETTER
========================================================= */

function subscribeNewsletter(event) {

    if (event) event.preventDefault();

    const email = $("#newsletterEmail")?.value.trim();

    if (!email) {
        showToast("Masukkan email terlebih dahulu.");
        return;
    }

    localStorage.setItem("littleStarNewsletter", email);

    showToast("Berhasil berlangganan newsletter");

    $("#newsletterForm")?.reset();
}


/* =========================================================
   43. CONTACT FORM
========================================================= */

function submitContactForm(event) {

    event.preventDefault();

    const name = $("#contactName")?.value.trim();
    const email = $("#contactEmail")?.value.trim();
    const message = $("#contactMessage")?.value.trim();

    if (!name || !email || !message) {
        showToast("Mohon lengkapi semua data.");
        return;
    }

    showToast("Pesan berhasil dikirim. Terima kasih.");

    event.target.reset();
}


/* =========================================================
   44. TOAST
========================================================= */

function showToast(message) {

    const element = $("#appToast");
    const messageElement = $("#toastMessage");

    if (!element || !messageElement) {
        alert(message);
        return;
    }

    messageElement.textContent = message;

    const toast = bootstrap.Toast.getOrCreateInstance(element, { delay: 2500 });
    toast.show();
}


/* =========================================================
   45. THEME
========================================================= */

function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    const dark = document.body.classList.contains("dark-mode");

    localStorage.setItem("littleStarTheme", dark ? "dark" : "light");

    applyThemeIcon(dark);
    applyThemeColorMeta(dark);
}


/* =========================================================
   45B. APPLY THEME ICON
========================================================= */

function applyThemeIcon(dark) {

    const icon = $("#themeButton i");

    if (icon) {
        icon.className = dark ? "bi bi-sun" : "bi bi-moon-stars";
    }

    const button = $("#themeButton");
    button?.setAttribute("aria-label", dark ? "Mode terang" : "Mode gelap");
}


/* =========================================================
   45C. APPLY THEME COLOR META
========================================================= */

function applyThemeColorMeta(dark) {

    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
        meta.setAttribute("content", dark ? "#1f1c19" : "#d98b91");
    }
}


/* =========================================================
   46. LOAD THEME
========================================================= */

function loadTheme() {

    const saved = localStorage.getItem("littleStarTheme");

    const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;

    const dark = saved ? saved === "dark" : prefersDark;

    document.body.classList.toggle("dark-mode", dark);

    applyThemeIcon(dark);
    applyThemeColorMeta(dark);
}


/* =========================================================
   47. BACK TO TOP
========================================================= */

function initBackToTop() {

    const button = $("#backToTop");
    if (!button) return;

    window.addEventListener("scroll", () => {

        if (window.scrollY > 450) {
            button.classList.add("show");
        }
        else {
            button.classList.remove("show");
        }
    });

    button.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


/* =========================================================
   47B. SCROLL PROGRESS
========================================================= */

function initScrollProgress() {

    const bar = $("#scrollProgressBar");
    if (!bar) return;

    const update = () => {

        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        bar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    update();
}


/* =========================================================
   48. SEARCH (perbaikan: sinkron dua arah + ESC + "/" )
========================================================= */

function initSearch() {

    const button = $("#searchButton");
    const overlay = $("#searchOverlay");
    const close = $("#closeSearch");

    if (!button || !overlay) return;

    button.addEventListener("click", () => {

        overlay.classList.add("show");

        setTimeout(() => {
            $("#searchOverlayInput")?.focus();
        }, 100);
    });

    close?.addEventListener("click", () => {
        overlay.classList.remove("show");
    });

    overlay.addEventListener("click", event => {

        if (event.target === overlay) {
            overlay.classList.remove("show");
        }
    });

    /* sinkronisasi dua arah */
    const mainInput = $("#searchInput");
    const overlayInput = $("#searchOverlayInput");

    mainInput?.addEventListener("input", () => {
        if (overlayInput && overlayInput.value !== mainInput.value) {
            overlayInput.value = mainInput.value;
        }
    });

    /* tombol ESC menutup overlay */
    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            overlay.classList.remove("show");
        }

        /* tombol "/" membuka pencarian (tanpa form aktif) */
        if (
            event.key === "/" &&
            !overlay.classList.contains("show") &&
            !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)
        ) {
            event.preventDefault();
            button.click();
        }
    });
}


/* =========================================================
   49. CATEGORY BUTTON
========================================================= */

function initCategoryButtons() {

    $$(".category-card").forEach(button => {

        button.addEventListener("click", () => {

            const category = button.dataset.category;
            const filter = $("#categoryFilter");

            if (filter) {
                filter.value = category;
            }

            applyFilters();

            document.querySelector("#products")?.scrollIntoView({ behavior: "smooth" });
        });
    });
}


/* =========================================================
   50. NAV ACTIVE
========================================================= */

function initNavigation() {

    const sections = $$("section[id]");
    const links = $$(".navbar-nav .nav-link");

    window.addEventListener("scroll", () => {

        let current = "home";

        sections.forEach(section => {

            const top = section.offsetTop - 150;

            if (window.scrollY >= top) {
                current = section.id;
            }
        });

        links.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
}


/* =========================================================
   51. EVENT LISTENERS
========================================================= */

function initEventListeners() {

    const searchInput = $("#searchInput");
    searchInput?.addEventListener("input", applyFilters);

    [
        "categoryFilter",
        "ageFilter",
        "genderFilter",
        "ratingFilter",
        "sortFilter"
    ].forEach(id => {
        $(`#${id}`)?.addEventListener("change", applyFilters);
    });

    ["minPrice", "maxPrice"].forEach(id => {
        $(`#${id}`)?.addEventListener("input", applyFilters);
    });

    $("#stockFilter")?.addEventListener("change", applyFilters);

    $("#resetFilter")?.addEventListener("click", resetFilters);
    $("#emptyReset")?.addEventListener("click", resetFilters);

    $("#cartButton")?.addEventListener("click", openCart);
    $("#checkoutButton")?.addEventListener("click", openCheckout);
    $("#themeButton")?.addEventListener("click", toggleTheme);
    $("#soundButton")?.addEventListener("click", toggleVoice);
    $("#introSoundToggle")?.addEventListener("click", toggleVoice);

    $("#copyVoucher")?.addEventListener("click", copyVoucher);

    $("#newsletterForm")?.addEventListener("submit", subscribeNewsletter);
    $("#contactForm")?.addEventListener("submit", submitContactForm);

    $("#wishlistButton")?.addEventListener("click", openWishlist);
    $("#clearRecentlyViewed")?.addEventListener("click", clearRecentlyViewedHistory);
}


/* =========================================================
   52. CURRENT YEAR
========================================================= */

function setCurrentYear() {

    const element = $("#currentYear");

    if (element) {
        element.textContent = new Date().getFullYear();
    }
}


/* =========================================================
   53. INTRO / WELCOME SCREEN (dikembangkan)
   - Starfield canvas: bintang berkelip + bintang jatuh
   - Persentase loading real-time
   - Tombol masuk aktif setelah loading selesai
   - Suara sambutan AI
========================================================= */

function initAuthScreen() {

    const introScreen = $("#introScreen");
    if (!introScreen) return;

    const bootWrap = $("#authBootWrap");
    const panel = $("#authPanel");
    const loadingFill = $("#introLoadingFill");
    const loadingText = $("#introLoadingText");
    const percentText = $("#introPercent");

    /* pengguna yang sudah masuk pada sesi ini langsung dilewatkan */
    const savedSession = sessionStorage.getItem("littleStarIntroSeen");

    const reducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (savedSession) {
        introScreen.classList.add("intro-hidden");
        return;
    }

    document.body.classList.add("intro-locked");

    if (!reducedMotion) {
        startIntroStarfield();
    }

    /* --- boot singkat lalu tampilkan panel login --- */
    const DURATION = 1100;
    const startTime = performance.now();

    function tick(now) {

        const progress = Math.min(100, Math.round(((now - startTime) / DURATION) * 100));

        if (loadingFill) loadingFill.style.width = `${progress}%`;
        if (percentText) percentText.textContent = `${progress}%`;

        if (progress < 100) {
            requestAnimationFrame(tick);
            return;
        }

        if (loadingText) loadingText.textContent = "Siap. Silakan masuk.";

        setTimeout(() => {
            if (bootWrap) bootWrap.hidden = true;
            if (panel) panel.hidden = false;
            updateAuthModeBadge();
        }, 220);
    }

    requestAnimationFrame(tick);

    bindAuthPanel();
}


/* ---------------------------------------------------------
   53A. PANEL LOGIN — Google / Facebook / WhatsApp OTP
--------------------------------------------------------- */

let authOtpTimer = null;


function authShowView(name) {

    ["Providers", "Phone", "Otp"].forEach(view => {
        const element = $(`#authView${view}`);
        if (element) element.hidden = view.toLowerCase() !== name;
    });

    authShowError("");
}


function authShowError(message) {

    const box = $("#authError");
    if (!box) return;

    box.textContent = message || "";
    box.hidden = !message;
}


function authBusy(button, busy, label) {

    if (!button) return;

    if (busy) {
        button.dataset.originalHtml = button.innerHTML;
        button.disabled = true;
        button.innerHTML = `<span class="auth-spinner"></span> ${label || "Memproses..."}`;
    }
    else {
        button.disabled = false;
        if (button.dataset.originalHtml) {
            button.innerHTML = button.dataset.originalHtml;
        }
    }
}


function updateAuthModeBadge() {

    const text = $("#authStatusText");
    if (!text) return;

    const demo = !window.LSBAuth || window.LSBAuth.configured === false;

    text.textContent = demo
        ? "Mode demo — isi firebase-little-star-baby.js untuk login asli"
        : "Login aman & terenkripsi oleh Firebase";

    $("#authStatusBadge")?.classList.toggle("is-demo", demo);
}


function bindAuthPanel() {

    $("#authGoogle")?.addEventListener("click", async event => {

        const button = event.currentTarget;
        authBusy(button, true, "Menghubungkan Google...");

        const result = await (window.LSBAuth?.signInGoogle?.() ??
            Promise.resolve({ ok: false, message: "Modul Firebase belum dimuat." }));

        authBusy(button, false);

        if (result.ok) finishAuth(result.user);
        else authShowError(result.message);
    });


    $("#authFacebook")?.addEventListener("click", async event => {

        const button = event.currentTarget;
        authBusy(button, true, "Menghubungkan Facebook...");

        const result = await (window.LSBAuth?.signInFacebook?.() ??
            Promise.resolve({ ok: false, message: "Modul Firebase belum dimuat." }));

        authBusy(button, false);

        if (result.ok) finishAuth(result.user);
        else authShowError(result.message);
    });


    $("#authWhatsapp")?.addEventListener("click", () => {
        authShowView("phone");
        setTimeout(() => $("#authPhoneInput")?.focus(), 150);
    });


    $$("[data-auth-back]").forEach(button => {
        button.addEventListener("click", () => authShowView("providers"));
    });


    $("#authGuest")?.addEventListener("click", () => {
        showToast("Masuk sebagai tamu. Pesanan tetap bisa dilacak lewat nomor resi.");
        enterStore();
    });


    $("#authSendOtp")?.addEventListener("click", async event => {

        const raw = ($("#authPhoneInput")?.value || "").replace(/\D/g, "");

        if (raw.length < 8) {
            authShowError("Masukkan nomor WhatsApp yang valid.");
            return;
        }

        const phone = `+62${raw.replace(/^0+/, "")}`;
        const button = event.currentTarget;

        authBusy(button, true, "Mengirim kode...");

        const result = await (window.LSBAuth?.sendOtp?.(phone) ??
            Promise.resolve({ ok: false, message: "Modul Firebase belum dimuat." }));

        authBusy(button, false);

        if (!result.ok) {
            authShowError(result.message);
            return;
        }

        const target = $("#authOtpTarget");
        if (target) target.textContent = phone;

        authShowView("otp");
        startOtpCountdown();

        if (result.demo) {
            showToast(result.message);
            authShowError(result.message);
        }

        setTimeout(() => $$(".auth-otp-input")[0]?.focus(), 150);
    });


    $$(".auth-otp-input").forEach((input, index, list) => {

        input.addEventListener("input", () => {

            input.value = input.value.replace(/\D/g, "").slice(0, 1);

            if (input.value && index < list.length - 1) {
                list[index + 1].focus();
            }
        });

        input.addEventListener("keydown", event => {
            if (event.key === "Backspace" && !input.value && index > 0) {
                list[index - 1].focus();
            }
        });

        input.addEventListener("paste", event => {

            const text = (event.clipboardData.getData("text") || "").replace(/\D/g, "");
            if (!text) return;

            event.preventDefault();

            text.split("").slice(0, list.length).forEach((char, i) => {
                list[i].value = char;
            });

            list[Math.min(text.length, list.length) - 1].focus();
        });
    });


    $("#authVerifyOtp")?.addEventListener("click", async event => {

        const code = Array.from($$(".auth-otp-input")).map(i => i.value).join("");

        if (code.length < 6) {
            authShowError("Kode OTP harus 6 digit.");
            return;
        }

        const button = event.currentTarget;
        authBusy(button, true, "Memverifikasi...");

        const result = await (window.LSBAuth?.verifyOtp?.(code) ??
            Promise.resolve({ ok: false, message: "Modul Firebase belum dimuat." }));

        authBusy(button, false);

        if (result.ok) finishAuth(result.user);
        else authShowError(result.message);
    });


    $("#authResendOtp")?.addEventListener("click", () => {
        authShowView("phone");
    });
}


function startOtpCountdown() {

    const button = $("#authResendOtp");
    const timerText = $("#authResendTimer");

    if (!button || !timerText) return;

    let seconds = 30;

    button.disabled = true;
    timerText.textContent = seconds;

    clearInterval(authOtpTimer);

    authOtpTimer = setInterval(() => {

        seconds -= 1;
        timerText.textContent = seconds;

        if (seconds <= 0) {
            clearInterval(authOtpTimer);
            button.disabled = false;
            button.innerHTML = "Kirim ulang kode";
        }
    }, 1000);
}


function finishAuth(user) {

    showToast(`Selamat datang, ${user?.displayName || "Bunda"}!`);

    renderAccount(user);

    enterStore();
}


function enterStore() {

    const introScreen = $("#introScreen");

    introScreen?.classList.add("intro-hidden");

    document.body.classList.remove("intro-locked");

    sessionStorage.setItem("littleStarIntroSeen", "true");

    stopIntroStarfield();

    clearInterval(authOtpTimer);

    if (!sessionStorage.getItem("lsbVoicePlayed")) {
        sessionStorage.setItem("lsbVoicePlayed", "true");
        speakWelcome();
    }
}


function openAuthScreen() {

    const introScreen = $("#introScreen");
    if (!introScreen) return;

    sessionStorage.removeItem("littleStarIntroSeen");

    introScreen.classList.remove("intro-hidden");

    document.body.classList.add("intro-locked");

    $("#authBootWrap") && ($("#authBootWrap").hidden = true);
    $("#authPanel") && ($("#authPanel").hidden = false);

    authShowView("providers");
    updateAuthModeBadge();
    startIntroStarfield();
}


/* ---------------------------------------------------------
   53C. TAMPILAN AKUN DI NAVBAR
--------------------------------------------------------- */

let currentUser = null;


function renderAccount(user) {

    currentUser = user || null;

    const avatar = $("#accountAvatar");
    const initial = $("#accountInitial");
    const name = $("#accountName");
    const menuName = $("#accountMenuName");
    const menuMeta = $("#accountMenuMeta");
    const loginItem = $("#menuLogin");
    const logoutItem = $("#menuLogout");

    if (!user) {

        if (avatar) avatar.hidden = true;
        if (initial) {
            initial.hidden = false;
            initial.innerHTML = `<i class="bi bi-person"></i>`;
        }
        if (name) name.textContent = "Tamu";
        if (menuName) menuName.textContent = "Tamu";
        if (menuMeta) menuMeta.textContent = "Belum masuk";
        if (loginItem) loginItem.hidden = false;
        if (logoutItem) logoutItem.hidden = true;

        return;
    }

    const label = user.displayName || user.phoneNumber || "Pengguna";

    if (user.photoURL && avatar) {
        avatar.src = user.photoURL;
        avatar.hidden = false;
        if (initial) initial.hidden = true;
    }
    else {
        if (avatar) avatar.hidden = true;
        if (initial) {
            initial.hidden = false;
            initial.textContent = label.trim().charAt(0).toUpperCase();
        }
    }

    if (name) name.textContent = label.split(" ")[0];
    if (menuName) menuName.textContent = label;
    if (menuMeta) menuMeta.textContent = user.email || user.phoneNumber || "Akun aktif";
    if (loginItem) loginItem.hidden = true;
    if (logoutItem) logoutItem.hidden = false;

    /* isi otomatis form checkout */
    const checkoutName = $("#customerName");
    const checkoutEmail = $("#customerEmail");
    const checkoutPhone = $("#customerPhone");

    if (checkoutName && !checkoutName.value) checkoutName.value = user.displayName || "";
    if (checkoutEmail && !checkoutEmail.value) checkoutEmail.value = user.email || "";
    if (checkoutPhone && !checkoutPhone.value && user.phoneNumber) {
        checkoutPhone.value = user.phoneNumber.replace("+62", "0");
    }
}


function initAccountMenu() {

    window.addEventListener("lsb-auth-changed", event => {
        renderAccount(event.detail);
    });

    window.addEventListener("lsb-auth-ready", updateAuthModeBadge);

    $("#menuLogin")?.addEventListener("click", openAuthScreen);

    $("#menuLogout")?.addEventListener("click", async () => {
        await window.LSBAuth?.logout?.();
        renderAccount(null);
        showToast("Anda telah keluar.");
    });

    $("#menuWishlist")?.addEventListener("click", openWishlist);
    $("#menuOrders")?.addEventListener("click", openTrackModal);
}


/* =========================================================
   53B. INTRO STARFIELD CANVAS
   Bintang berkelip + bintang jatuh (shooting stars)
========================================================= */

let introStarsRAF = null;

function startIntroStarfield() {

    const canvas = $("#introStars");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const STAR_COLORS = ["#d98b91", "#83bdcf", "#7f9d83", "#e8c07d", "#ffffff"];

    const stars = [];
    const TOTAL_STARS = 90;

    let shootingStars = [];
    let nextShootTime = 0;


    function resize() {

        const rect = canvas.parentElement.getBoundingClientRect();

        width = canvas.width = rect.width * devicePixelRatio;
        height = canvas.height = rect.height * devicePixelRatio;

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
    }

    resize();

    window.addEventListener("resize", resize);


    function createStar() {
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            radius: (Math.random() * 1.6 + 0.6) * devicePixelRatio,
            color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.02 + 0.008,
            maxAlpha: Math.random() * 0.5 + 0.4
        };
    }

    for (let i = 0; i < TOTAL_STARS; i++) {
        stars.push(createStar());
    }


    function spawnShootingStar() {

        const fromLeft = Math.random() > 0.5;

        shootingStars.push({
            x: fromLeft ? Math.random() * width * 0.4 : width * (0.6 + Math.random() * 0.4),
            y: Math.random() * height * 0.35,
            vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 5) * devicePixelRatio,
            vy: (3 + Math.random() * 3) * devicePixelRatio,
            life: 1,
            decay: 0.012 + Math.random() * 0.01
        });
    }


    function isDark() {
        return document.body.classList.contains("dark-mode");
    }


    function frame(now) {

        ctx.clearRect(0, 0, width, height);

        /* bintang berkelip */
        stars.forEach(star => {

            star.phase += star.speed;

            const alpha =
                star.maxAlpha *
                (0.5 + 0.5 * Math.sin(star.phase));

            ctx.globalAlpha = alpha;
            ctx.fillStyle = star.color;

            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.globalAlpha = 1;

        /* bintang jatuh */
        if (now > nextShootTime) {
            spawnShootingStar();
            nextShootTime = now + 1800 + Math.random() * 2500;
        }

        shootingStars = shootingStars.filter(star => star.life > 0);

        shootingStars.forEach(star => {

            star.x += star.vx;
            star.y += star.vy;
            star.life -= star.decay;

            const tail = 14 * devicePixelRatio;

            const gradient = ctx.createLinearGradient(
                star.x,
                star.y,
                star.x - star.vx * tail / devicePixelRatio,
                star.y - star.vy * tail / devicePixelRatio
            );

            const coreColor = isDark() ? "255,255,255" : "217,139,145";

            gradient.addColorStop(0, `rgba(${coreColor},${star.life})`);
            gradient.addColorStop(1, `rgba(${coreColor},0)`);

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2 * devicePixelRatio;
            ctx.lineCap = "round";

            ctx.beginPath();
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(
                star.x - star.vx * tail / devicePixelRatio,
                star.y - star.vy * tail / devicePixelRatio
            );
            ctx.stroke();
        });

        introStarsRAF = requestAnimationFrame(frame);
    }

    introStarsRAF = requestAnimationFrame(frame);
}


function stopIntroStarfield() {

    if (introStarsRAF) {
        cancelAnimationFrame(introStarsRAF);
        introStarsRAF = null;
    }
}


/* =========================================================
   54. SUARA SAMBUTAN AI (Web Speech API)
   Suara AI bawaan browser, otomatis memilih suara Bahasa
   Indonesia jika tersedia di perangkat pengguna.
========================================================= */

function loadVoices() {

    if (!("speechSynthesis" in window)) {
        availableVoices = [];
        return;
    }

    availableVoices = speechSynthesis.getVoices();
}


function speakWelcome() {

    if (!voiceEnabled) return;

    if (!("speechSynthesis" in window)) {
        showToast("Suara tidak didukung di browser ini.");
        return;
    }

    try {

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(VOICE_CONFIG.message);

        utterance.lang = VOICE_CONFIG.lang;
        utterance.rate = VOICE_CONFIG.rate;
        utterance.pitch = VOICE_CONFIG.pitch;
        utterance.volume = 1;

        const idVoice = availableVoices.find(voice =>
            voice.lang &&
            voice.lang.toLowerCase().startsWith("id")
        );

        if (idVoice) {
            utterance.voice = idVoice;
        }

        speechSynthesis.speak(utterance);
    }
    catch {
        /* abaikan jika browser menolak */
    }
}


function toggleVoice() {

    voiceEnabled = !voiceEnabled;

    localStorage.setItem("lsbVoice", voiceEnabled ? "on" : "off");

    if (!voiceEnabled && "speechSynthesis" in window) {
        speechSynthesis.cancel();
    }

    updateVoiceButtons();

    showToast(voiceEnabled ? "Suara sambutan aktif" : "Suara sambutan dimatikan");
}


function updateVoiceButtons() {

    const navbarButton = $("#soundButton");
    const introButton = $("#introSoundToggle");

    const iconClass = voiceEnabled
        ? "bi bi-volume-up-fill"
        : "bi bi-volume-mute-fill";

    if (navbarButton) {
        navbarButton.innerHTML = `<i class="${iconClass}"></i>`;
        navbarButton.classList.toggle("muted", !voiceEnabled);
        navbarButton.setAttribute(
            "aria-label",
            voiceEnabled ? "Matikan suara sambutan" : "Aktifkan suara sambutan"
        );
    }

    if (introButton) {
        introButton.innerHTML = `<i class="${iconClass}"></i>`;
        introButton.classList.toggle("muted", !voiceEnabled);
    }
}


/* =========================================================
   55. ANNOUNCEMENT ROTATOR
   Pesan announcement berganti-ganti dengan efek fade.
========================================================= */

const ANNOUNCEMENT_MESSAGES = [
    `<i class="bi bi-truck"></i><span>Gratis ongkir min. belanja Rp300.000</span>
     <span class="announcement-divider">•</span>
     <i class="bi bi-shield-check"></i><span>Produk terpilih &amp; aman untuk si kecil</span>`,

    `<i class="bi bi-gift"></i><span>Gunakan kode <strong>STAR50</strong> untuk diskon spesial</span>
     <span class="announcement-divider">•</span>
     <i class="bi bi-star-fill"></i><span>Rating 4.9/5 dari 2.500+ orang tua</span>`,

    `<i class="bi bi-clock"></i><span>Layanan CS Senin–Sabtu, 09.00–18.00 WIB</span>
     <span class="announcement-divider">•</span>
     <i class="bi bi-arrow-repeat"></i><span>Mudah ditukar jika ada kendala produk</span>`
];


function initAnnouncementRotator() {

    const container = $("#announcementContent");
    if (!container) return;

    let index = 0;

    setInterval(() => {

        container.classList.add("announcement-fading");

        setTimeout(() => {

            index = (index + 1) % ANNOUNCEMENT_MESSAGES.length;
            container.innerHTML = ANNOUNCEMENT_MESSAGES[index];
            container.classList.remove("announcement-fading");

        }, 400);

    }, 5000);
}


/* =========================================================
   56. SCROLL REVEAL
   Animasi muncul halus saat elemen masuk viewport.
========================================================= */

function initScrollReveal() {

    const reducedMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) return;

    const targets = [
        ".section-heading",
        ".category-card",
        ".promo-card",
        ".review-card",
        ".why-card",
        ".about-text",
        ".about-image",
        ".newsletter-card",
        ".contact-card",
        ".contact-form-wrapper"
    ];

    const elements = [];

    targets.forEach(selector => {
        $$(selector).forEach((element, i) => {
            element.classList.add("lsb-reveal");
            element.style.setProperty("--reveal-delay", `${(i % 4) * 0.08}s`);
            elements.push(element);
        });
    });

    if (!("IntersectionObserver" in window)) {
        elements.forEach(element => element.classList.add("lsb-revealed"));
        return;
    }

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("lsb-revealed");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    });

    elements.forEach(element => observer.observe(element));
}


/* =========================================================
   56B. SISTEM CHECKOUT, PEMBAYARAN & RESI
   ---------------------------------------------------------
   PENTING — status implementasi:
   - Alur, tampilan, nomor VA, QRIS, dan nomor resi di bawah ini
     berjalan penuh di sisi front-end (simulasi).
   - Untuk transaksi UANG SUNGGUHAN, sambungkan PAYMENT_GATEWAY
     di bawah ke Midtrans Snap / Xendit / Doku lewat server
     (API key rahasia TIDAK BOLEH ditaruh di file ini).
   - Untuk resi asli, sambungkan ke API kurir/agregator
     (Biteship, RajaOngkir Komerce, atau API resmi JNE/J&T).
========================================================= */

const PAYMENT_GATEWAY = {
    enabled: false,                 /* true jika sudah punya endpoint server */
    createTransactionUrl: "",       /* mis. https://api.tokoanda.com/pay/create */
    checkStatusUrl: "",             /* mis. https://api.tokoanda.com/pay/status */
    provider: "midtrans"            /* midtrans | xendit | doku */
};


const SHIPPING_COURIERS = [
    { id: "jne-reg",   name: "JNE REG",        eta: "2–3 hari",   cost: 18000, prefix: "JP",  icon: "bi-truck" },
    { id: "jne-yes",   name: "JNE YES",        eta: "1 hari",     cost: 32000, prefix: "JY",  icon: "bi-lightning-charge" },
    { id: "jnt",       name: "J&T Express",    eta: "2–3 hari",   cost: 17000, prefix: "JT",  icon: "bi-truck" },
    { id: "sicepat",   name: "SiCepat BEST",   eta: "1–2 hari",   cost: 24000, prefix: "SC",  icon: "bi-lightning-charge" },
    { id: "anteraja",  name: "AnterAja",       eta: "2–3 hari",   cost: 16000, prefix: "AA",  icon: "bi-truck" },
    { id: "pos",       name: "POS Indonesia",  eta: "3–5 hari",   cost: 14000, prefix: "PS",  icon: "bi-mailbox" },
    { id: "instant",   name: "Instant (≤ 3 jam)", eta: "Hari ini", cost: 45000, prefix: "IN", icon: "bi-scooter" }
];


const PAYMENT_METHODS = [
    {
        group: "QRIS — Paling Cepat",
        items: [
            { id: "qris", type: "qris", name: "QRIS", desc: "Scan pakai GoPay, OVO, DANA, ShopeePay, m-banking", fee: 0, badge: "Instan", icon: "bi-qr-code" }
        ]
    },
    {
        group: "E-Wallet",
        items: [
            { id: "gopay",      type: "ewallet", name: "GoPay",      desc: "Bayar lewat aplikasi Gojek",       fee: 0,    icon: "bi-wallet2" },
            { id: "ovo",        type: "ewallet", name: "OVO",        desc: "Konfirmasi di aplikasi OVO",       fee: 0,    icon: "bi-wallet2" },
            { id: "dana",       type: "ewallet", name: "DANA",       desc: "Bayar lewat aplikasi DANA",        fee: 0,    icon: "bi-wallet2" },
            { id: "shopeepay",  type: "ewallet", name: "ShopeePay",  desc: "Bayar lewat aplikasi Shopee",      fee: 0,    icon: "bi-wallet2" },
            { id: "linkaja",    type: "ewallet", name: "LinkAja",    desc: "Bayar lewat aplikasi LinkAja",     fee: 1000, icon: "bi-wallet2" }
        ]
    },
    {
        group: "Virtual Account (Transfer Otomatis)",
        items: [
            { id: "va-bca",     type: "va", name: "BCA Virtual Account",     desc: "Verifikasi otomatis 24 jam",  fee: 4000, bank: "BCA",     code: "39",  icon: "bi-bank" },
            { id: "va-bni",     type: "va", name: "BNI Virtual Account",     desc: "Verifikasi otomatis 24 jam",  fee: 4000, bank: "BNI",     code: "88",  icon: "bi-bank" },
            { id: "va-bri",     type: "va", name: "BRI Virtual Account",     desc: "Verifikasi otomatis 24 jam",  fee: 4000, bank: "BRI",     code: "26",  icon: "bi-bank" },
            { id: "va-mandiri", type: "va", name: "Mandiri Virtual Account", desc: "Verifikasi otomatis 24 jam",  fee: 4000, bank: "Mandiri", code: "70",  icon: "bi-bank" },
            { id: "va-bsi",     type: "va", name: "BSI Virtual Account",     desc: "Verifikasi otomatis 24 jam",  fee: 4000, bank: "BSI",     code: "90",  icon: "bi-bank" }
        ]
    },
    {
        group: "Kartu & Cicilan",
        items: [
            { id: "card",     type: "card",    name: "Kartu Kredit / Debit", desc: "Visa, Mastercard, JCB — 3D Secure", fee: 0, badge: "Aman", icon: "bi-credit-card" },
            { id: "paylater", type: "paylater", name: "PayLater",            desc: "Cicilan 3, 6, atau 12 bulan",       fee: 0, icon: "bi-calendar2-check" }
        ]
    },
    {
        group: "Lainnya",
        items: [
            { id: "transfer", type: "manual", name: "Transfer Bank Manual", desc: "Unggah bukti lewat WhatsApp", fee: 0,    icon: "bi-arrow-left-right" },
            { id: "cod",      type: "cod",    name: "COD — Bayar di Tempat", desc: "Tersedia untuk area terpilih", fee: 5000, icon: "bi-cash-coin" }
        ]
    }
];


/* ---------------- state checkout ---------------- */

let checkoutState = {
    step: 1,
    courier: SHIPPING_COURIERS[0],
    method: null,
    order: null
};

let payCountdownTimer = null;


/* ---------------- util ---------------- */

function pad(value, length) {
    return String(value).padStart(length, "0");
}


function randomDigits(length) {

    let output = "";

    for (let i = 0; i < length; i++) {
        output += Math.floor(Math.random() * 10);
    }

    return output;
}


function copyText(text, message) {

    navigator.clipboard?.writeText(text)
        .then(() => showToast(message || "Berhasil disalin."))
        .catch(() => showToast("Salin manual: " + text));
}


/* ---------------- render kurir ---------------- */

function renderCourierOptions() {

    const grid = $("#courierGrid");
    if (!grid) return;

    grid.innerHTML = SHIPPING_COURIERS.map(courier => `
        <button type="button"
                class="courier-option ${courier.id === checkoutState.courier.id ? "is-selected" : ""}"
                data-courier="${courier.id}">
            <i class="bi ${courier.icon}"></i>
            <span class="courier-name">${courier.name}</span>
            <span class="courier-eta">${courier.eta}</span>
            <span class="courier-cost">${rupiah(courier.cost)}</span>
        </button>
    `).join("");

    grid.querySelectorAll("[data-courier]").forEach(button => {

        button.addEventListener("click", () => {

            checkoutState.courier =
                SHIPPING_COURIERS.find(c => c.id === button.dataset.courier) ||
                SHIPPING_COURIERS[0];

            renderCourierOptions();
        });
    });
}


/* ---------------- render metode pembayaran ---------------- */

function renderPaymentMethods() {

    const container = $("#paymentGroups");
    if (!container) return;

    container.innerHTML = PAYMENT_METHODS.map(group => `
        <div class="payment-group">
            <h6 class="payment-group-title">${group.group}</h6>
            <div class="payment-list">
                ${group.items.map(item => `
                    <button type="button" class="payment-option" data-method="${item.id}">
                        <span class="payment-option-icon"><i class="bi ${item.icon}"></i></span>
                        <span class="payment-option-body">
                            <strong>${item.name} ${item.badge ? `<em class="payment-badge">${item.badge}</em>` : ""}</strong>
                            <small>${item.desc}</small>
                        </span>
                        <span class="payment-option-fee">
                            ${item.fee ? `+${rupiah(item.fee)}` : "Gratis"}
                        </span>
                    </button>
                `).join("")}
            </div>
        </div>
    `).join("");

    container.querySelectorAll("[data-method]").forEach(button => {

        button.addEventListener("click", () => {

            container.querySelectorAll(".payment-option")
                     .forEach(option => option.classList.remove("is-selected"));

            button.classList.add("is-selected");

            checkoutState.method = findPaymentMethod(button.dataset.method);

            const payButton = $("#payNowButton");
            if (payButton) payButton.disabled = false;

            renderCheckoutSummary();
        });
    });
}


function findPaymentMethod(id) {

    for (const group of PAYMENT_METHODS) {
        const found = group.items.find(item => item.id === id);
        if (found) return found;
    }

    return null;
}


/* ---------------- ringkasan biaya ---------------- */

function checkoutTotals() {

    const base = calculateCart();

    const shipping = checkoutState.courier ? checkoutState.courier.cost : 0;
    const fee = checkoutState.method ? (checkoutState.method.fee || 0) : 0;

    /* gratis ongkir mengikuti aturan keranjang */
    const finalShipping = base.shipping === 0 ? 0 : shipping;

    return {
        subtotal: base.subtotal,
        discount: base.discount,
        shipping: finalShipping,
        fee,
        total: base.subtotal - base.discount + finalShipping + fee
    };
}


function renderCheckoutSummary() {

    const box = $("#checkoutSummary");
    if (!box) return;

    const totals = checkoutTotals();

    box.innerHTML = `
        <h6 class="checkout-summary-title">Ringkasan Pembayaran</h6>
        <div class="summary-row"><span>Subtotal (${cart.reduce((sum, i) => sum + i.quantity, 0)} item)</span><strong>${rupiah(totals.subtotal)}</strong></div>
        <div class="summary-row"><span>Diskon</span><strong class="text-success">− ${rupiah(totals.discount)}</strong></div>
        <div class="summary-row"><span>Ongkir — ${checkoutState.courier.name}</span><strong>${totals.shipping === 0 ? "Gratis" : rupiah(totals.shipping)}</strong></div>
        <div class="summary-row"><span>Biaya layanan${checkoutState.method ? ` — ${checkoutState.method.name}` : ""}</span><strong>${totals.fee ? rupiah(totals.fee) : "Rp0"}</strong></div>
        <div class="summary-row summary-total"><span>Total Bayar</span><strong>${rupiah(totals.total)}</strong></div>
    `;
}


/* ---------------- navigasi langkah ---------------- */

function gotoCheckoutStep(step) {

    checkoutState.step = step;

    $$("[data-step-panel]").forEach(panel => {
        panel.hidden = Number(panel.dataset.stepPanel) !== step;
    });

    $$("#checkoutSteps li").forEach(item => {
        const index = Number(item.dataset.step);
        item.classList.toggle("is-active", index === step);
        item.classList.toggle("is-done", index < step);
    });
}


/* ---------------- QRIS ---------------- */

function crc16(payload) {

    let crc = 0xFFFF;

    for (let i = 0; i < payload.length; i++) {

        crc ^= payload.charCodeAt(i) << 8;

        for (let j = 0; j < 8; j++) {
            crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
        }
    }

    return crc.toString(16).toUpperCase().padStart(4, "0");
}


function emv(tag, value) {
    return `${tag}${pad(value.length, 2)}${value}`;
}


/* Membentuk payload QRIS dinamis.
   Ganti merchantId & nmid dengan data merchant QRIS resmi Anda
   (didapat dari bank/PJSP saat mendaftar QRIS merchant). */
function buildQrisPayload(amount, reference) {

    const merchantId = "936000141234567890";
    const nmid = "ID1024311122334";
    const merchantName = "LITTLE STAR BABY";
    const merchantCity = "JAKARTA";

    const account =
        emv("00", "ID.CO.QRIS.WWW") +
        emv("01", merchantId) +
        emv("02", nmid) +
        emv("03", "UMI");

    let payload =
        emv("00", "01") +
        emv("01", "12") +
        emv("26", account) +
        emv("52", "5641") +
        emv("53", "360") +
        emv("54", String(Math.round(amount))) +
        emv("58", "ID") +
        emv("59", merchantName) +
        emv("60", merchantCity) +
        emv("62", emv("05", reference));

    payload += "6304";

    return payload + crc16(payload);
}


function renderQrisCanvas(payload) {

    const canvas = $("#qrisCanvas");
    if (!canvas) return;

    if (typeof QRCode === "undefined") {
        canvas.replaceWith(Object.assign(document.createElement("div"), {
            className: "qris-fallback",
            textContent: "Library QR gagal dimuat. Periksa koneksi internet."
        }));
        return;
    }

    QRCode.toCanvas(canvas, payload, {
        width: 230,
        margin: 1,
        color: { dark: "#484540", light: "#ffffff" }
    }, error => {
        if (error) console.error(error);
    });
}


/* ---------------- instruksi pembayaran ---------------- */

function buildPaymentInstruction() {

    const box = $("#payInstruction");
    if (!box) return;

    const method = checkoutState.method;
    const totals = checkoutTotals();
    const reference = `LSB${Date.now().toString().slice(-8)}`;

    checkoutState.reference = reference;

    if (!method) return;

    /* ---------- QRIS ---------- */
    if (method.type === "qris") {

        box.innerHTML = `
            <div class="pay-qris">
                <div class="pay-qris-head">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/QRIS_logo.svg"
                         alt="QRIS" class="qris-logo"
                         onerror="this.style.display='none';">
                    <span>Scan dengan aplikasi apa pun berlogo QRIS</span>
                </div>

                <canvas id="qrisCanvas" class="qris-canvas"></canvas>

                <div class="pay-amount">
                    <small>Total pembayaran</small>
                    <strong>${rupiah(totals.total)}</strong>
                </div>

                <div class="qris-apps">
                    <span>GoPay</span><span>OVO</span><span>DANA</span>
                    <span>ShopeePay</span><span>LinkAja</span><span>m-Banking</span>
                </div>

                <p class="pay-note">
                    Nominal sudah tertanam di dalam QR — tidak perlu ketik manual.
                    Kode transaksi: <strong>${reference}</strong>
                </p>
            </div>
        `;

        renderQrisCanvas(buildQrisPayload(totals.total, reference));
        return;
    }

    /* ---------- Virtual Account ---------- */
    if (method.type === "va") {

        const vaNumber = `${method.code}${randomDigits(10)}`;
        checkoutState.vaNumber = vaNumber;

        box.innerHTML = `
            <div class="pay-va">
                <div class="pay-va-bank"><i class="bi bi-bank"></i> ${method.bank} Virtual Account</div>

                <div class="pay-copy-row">
                    <div>
                        <small>Nomor Virtual Account</small>
                        <strong id="vaNumberText">${vaNumber}</strong>
                    </div>
                    <button type="button" class="btn btn-soft btn-sm"
                            onclick="copyText('${vaNumber}','Nomor VA disalin.')">
                        <i class="bi bi-clipboard"></i> Salin
                    </button>
                </div>

                <div class="pay-copy-row">
                    <div>
                        <small>Total pembayaran</small>
                        <strong>${rupiah(totals.total)}</strong>
                    </div>
                    <button type="button" class="btn btn-soft btn-sm"
                            onclick="copyText('${Math.round(totals.total)}','Nominal disalin.')">
                        <i class="bi bi-clipboard"></i> Salin
                    </button>
                </div>

                <div class="pay-steps">
                    <h6>Cara Pembayaran</h6>
                    <ol>
                        <li>Buka aplikasi m-Banking / ATM ${method.bank}.</li>
                        <li>Pilih menu <strong>Transfer → Virtual Account</strong>.</li>
                        <li>Masukkan nomor VA di atas, lalu periksa nama penerima.</li>
                        <li>Pastikan nominal sesuai, lalu konfirmasi pembayaran.</li>
                        <li>Pesanan diproses otomatis setelah pembayaran terverifikasi.</li>
                    </ol>
                </div>
            </div>
        `;
        return;
    }

    /* ---------- E-Wallet ---------- */
    if (method.type === "ewallet") {

        box.innerHTML = `
            <div class="pay-ewallet">
                <div class="pay-wallet-icon"><i class="bi bi-wallet2"></i></div>
                <h6>Bayar dengan ${method.name}</h6>

                <div class="pay-amount">
                    <small>Total pembayaran</small>
                    <strong>${rupiah(totals.total)}</strong>
                </div>

                <p class="pay-note">
                    Ketuk tombol di bawah untuk membuka aplikasi ${method.name}.
                    Selesaikan pembayaran, lalu kembali ke halaman ini.
                </p>

                <button type="button" class="btn btn-soft w-100" onclick="showToast('Membuka aplikasi ${method.name}...')">
                    <i class="bi bi-box-arrow-up-right"></i> Buka ${method.name}
                </button>

                <p class="pay-note mt-2">Kode transaksi: <strong>${reference}</strong></p>
            </div>
        `;
        return;
    }

    /* ---------- Kartu ---------- */
    if (method.type === "card") {

        box.innerHTML = `
            <div class="pay-card-form">
                <div class="pay-secure"><i class="bi bi-shield-lock"></i> Terenkripsi & diverifikasi 3D Secure</div>

                <label class="form-label small">Nomor Kartu</label>
                <input type="text" class="form-control" id="cardNumber" inputmode="numeric"
                       placeholder="4xxx xxxx xxxx xxxx" maxlength="19">

                <div class="row g-2 mt-1">
                    <div class="col-6">
                        <label class="form-label small">Masa Berlaku</label>
                        <input type="text" class="form-control" id="cardExpiry" placeholder="MM/YY" maxlength="5">
                    </div>
                    <div class="col-6">
                        <label class="form-label small">CVV</label>
                        <input type="password" class="form-control" id="cardCvv" inputmode="numeric" placeholder="•••" maxlength="4">
                    </div>
                </div>

                <label class="form-label small mt-2">Nama di Kartu</label>
                <input type="text" class="form-control" id="cardHolder" placeholder="Nama pemegang kartu">

                <div class="pay-amount mt-3">
                    <small>Total pembayaran</small>
                    <strong>${rupiah(totals.total)}</strong>
                </div>

                <p class="pay-note">
                    Data kartu tidak disimpan di server toko — diteruskan langsung
                    ke penyedia pembayaran berstandar PCI-DSS.
                </p>
            </div>
        `;

        $("#cardNumber")?.addEventListener("input", event => {
            event.target.value = event.target.value
                .replace(/\D/g, "")
                .slice(0, 16)
                .replace(/(.{4})/g, "$1 ")
                .trim();
        });

        $("#cardExpiry")?.addEventListener("input", event => {
            const digits = event.target.value.replace(/\D/g, "").slice(0, 4);
            event.target.value = digits.length > 2
                ? `${digits.slice(0, 2)}/${digits.slice(2)}`
                : digits;
        });

        return;
    }

    /* ---------- PayLater ---------- */
    if (method.type === "paylater") {

        const options = [3, 6, 12].map(month => {
            const monthly = Math.ceil(totals.total / month / 1000) * 1000;
            return `
                <label class="paylater-option">
                    <input type="radio" name="paylaterTenor" value="${month}" ${month === 3 ? "checked" : ""}>
                    <span><strong>${month}× cicilan</strong><small>${rupiah(monthly)} / bulan</small></span>
                </label>
            `;
        }).join("");

        box.innerHTML = `
            <div class="pay-paylater">
                <h6>Pilih Tenor Cicilan</h6>
                ${options}
                <div class="pay-amount mt-3">
                    <small>Total pembayaran</small>
                    <strong>${rupiah(totals.total)}</strong>
                </div>
                <p class="pay-note">Persetujuan mengikuti kebijakan penyedia PayLater.</p>
            </div>
        `;
        return;
    }

    /* ---------- COD ---------- */
    if (method.type === "cod") {

        box.innerHTML = `
            <div class="pay-cod">
                <div class="pay-wallet-icon"><i class="bi bi-cash-coin"></i></div>
                <h6>Bayar di Tempat (COD)</h6>
                <div class="pay-amount">
                    <small>Siapkan uang tunai</small>
                    <strong>${rupiah(totals.total)}</strong>
                </div>
                <p class="pay-note">
                    Kurir akan menagih saat paket tiba. Mohon periksa paket sebelum membayar.
                    Ketersediaan COD mengikuti jangkauan kurir di kota Anda.
                </p>
            </div>
        `;
        return;
    }

    /* ---------- Transfer manual ---------- */
    box.innerHTML = `
        <div class="pay-va">
            <div class="pay-va-bank"><i class="bi bi-bank"></i> Transfer Bank Manual</div>

            <div class="pay-copy-row">
                <div>
                    <small>BCA a.n. Little Star Baby</small>
                    <strong>123 456 7890</strong>
                </div>
                <button type="button" class="btn btn-soft btn-sm" onclick="copyText('1234567890','Nomor rekening disalin.')">
                    <i class="bi bi-clipboard"></i> Salin
                </button>
            </div>

            <div class="pay-copy-row">
                <div>
                    <small>Total pembayaran</small>
                    <strong>${rupiah(totals.total)}</strong>
                </div>
                <button type="button" class="btn btn-soft btn-sm" onclick="copyText('${Math.round(totals.total)}','Nominal disalin.')">
                    <i class="bi bi-clipboard"></i> Salin
                </button>
            </div>

            <p class="pay-note">
                Setelah transfer, kirim bukti pembayaran lewat WhatsApp agar pesanan
                segera diproses. Kode transaksi: <strong>${reference}</strong>
            </p>
        </div>
    `;
}


/* ---------------- hitung mundur pembayaran ---------------- */

function startPayCountdown(minutes = 15) {

    const element = $("#payTimer");
    if (!element) return;

    clearInterval(payCountdownTimer);

    let remaining = minutes * 60;

    function render() {

        const m = String(Math.floor(remaining / 60)).padStart(2, "0");
        const s = String(remaining % 60).padStart(2, "0");

        element.textContent = `${m}:${s}`;

        if (remaining <= 0) {
            clearInterval(payCountdownTimer);
            showToast("Waktu pembayaran habis. Silakan ulangi checkout.");
            gotoCheckoutStep(2);
        }

        remaining -= 1;
    }

    render();
    payCountdownTimer = setInterval(render, 1000);
}


/* ---------------- nomor resi ---------------- */

function generateResi(courier) {

    const now = new Date();

    const stamp =
        pad(now.getDate(), 2) +
        pad(now.getMonth() + 1, 2) +
        String(now.getFullYear()).slice(2);

    return `${courier.prefix}${stamp}${randomDigits(7)}`;
}


/* ---------------- buat pesanan ---------------- */

async function createOrder() {

    const totals = checkoutTotals();
    const courier = checkoutState.courier;
    const method = checkoutState.method;

    const resi = generateResi(courier);

    const order = {
        resi,
        reference: checkoutState.reference || `LSB${Date.now().toString().slice(-8)}`,
        createdAt: new Date().toISOString(),
        status: method.type === "cod" ? "diproses" : "dibayar",
        customer: {
            name: $("#customerName")?.value.trim() || "",
            phone: $("#customerPhone")?.value.trim() || "",
            email: $("#customerEmail")?.value.trim() || "",
            address: $("#customerAddress")?.value.trim() || "",
            city: $("#customerCity")?.value.trim() || "",
            note: $("#customerNote")?.value.trim() || ""
        },
        courier: { id: courier.id, name: courier.name, eta: courier.eta },
        payment: {
            id: method.id,
            name: method.name,
            type: method.type,
            va: checkoutState.vaNumber || null
        },
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            color: item.color,
            size: item.size,
            quantity: item.quantity,
            price: item.price
        })),
        totals,
        uid: currentUser?.uid || "guest"
    };

    /* simpan ke Firestore bila terkonfigurasi, jika tidak ke localStorage */
    await (window.LSBAuth?.saveOrder?.(order) ?? Promise.resolve());

    saveOrderLocal(order);

    checkoutState.order = order;

    return order;
}


function saveOrderLocal(order) {

    const list = JSON.parse(localStorage.getItem("littleStarOrders") || "[]");

    if (!list.some(o => o.resi === order.resi)) {
        list.unshift(order);
    }

    localStorage.setItem("littleStarOrders", JSON.stringify(list.slice(0, 50)));
}


function renderOrderSuccess(order) {

    const box = $("#orderSuccess");
    if (!box) return;

    box.innerHTML = `
        <div class="order-success">
            <div class="order-success-icon"><i class="bi bi-check-lg"></i></div>
            <h4>Pesanan Berhasil Dibuat</h4>
            <p class="order-success-sub">
                Terima kasih, ${order.customer.name || "Bunda"}. Bukti pesanan telah kami siapkan.
            </p>

            <div class="resi-card">
                <small>Nomor Resi Pengiriman</small>
                <strong id="resiValue">${order.resi}</strong>
                <span class="resi-courier">${order.courier.name} · estimasi ${order.courier.eta}</span>

                <div class="resi-actions">
                    <button type="button" class="btn btn-soft btn-sm" onclick="copyText('${order.resi}','Nomor resi disalin.')">
                        <i class="bi bi-clipboard"></i> Salin Resi
                    </button>
                    <button type="button" class="btn btn-soft btn-sm" onclick="openTrackModal('${order.resi}')">
                        <i class="bi bi-geo-alt"></i> Lacak
                    </button>
                </div>
            </div>

            <div class="order-recap">
                <div class="summary-row"><span>Kode Transaksi</span><strong>${order.reference}</strong></div>
                <div class="summary-row"><span>Metode Bayar</span><strong>${order.payment.name}</strong></div>
                <div class="summary-row"><span>Total Dibayar</span><strong>${rupiah(order.totals.total)}</strong></div>
                <div class="summary-row"><span>Dikirim ke</span><strong>${order.customer.city || "-"}</strong></div>
            </div>

            <div class="d-flex flex-wrap gap-2 mt-3">
                <button type="button" class="btn btn-primary-custom flex-grow-1" onclick="sendOrderToWhatsApp()">
                    <i class="bi bi-whatsapp"></i> Kirim Detail ke WhatsApp
                </button>
                <button type="button" class="btn btn-soft" data-bs-dismiss="modal">
                    Selesai
                </button>
            </div>
        </div>
    `;
}


function sendOrderToWhatsApp() {

    const order = checkoutState.order;
    if (!order) return;

    let message = `Halo ${STORE.name}\n\n`;
    message += `Konfirmasi pesanan:\n`;
    message += `Kode Transaksi: ${order.reference}\n`;
    message += `Nomor Resi: ${order.resi}\n\n`;

    order.items.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        message += `   Warna: ${item.color} | Ukuran: ${item.size}\n`;
        message += `   Jumlah: ${item.quantity} × ${rupiah(item.price)}\n\n`;
    });

    message += `Subtotal: ${rupiah(order.totals.subtotal)}\n`;
    message += `Diskon: ${rupiah(order.totals.discount)}\n`;
    message += `Ongkir (${order.courier.name}): ${order.totals.shipping === 0 ? "Gratis" : rupiah(order.totals.shipping)}\n`;
    message += `Biaya layanan: ${rupiah(order.totals.fee)}\n`;
    message += `Total: ${rupiah(order.totals.total)}\n`;
    message += `Metode Bayar: ${order.payment.name}\n`;
    if (order.payment.va) message += `Virtual Account: ${order.payment.va}\n`;

    message += `\nPenerima: ${order.customer.name}\n`;
    message += `WhatsApp: ${order.customer.phone}\n`;
    message += `Alamat: ${order.customer.address}, ${order.customer.city}\n`;
    if (order.customer.note) message += `Catatan: ${order.customer.note}\n`;

    message += `\nMohon dibantu proses pengirimannya. Terima kasih.`;

    window.open(
        `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`,
        "_blank"
    );
}


/* ---------------- pelacakan pesanan ---------------- */

const TRACKING_STAGES = [
    { key: "dibayar",    label: "Pembayaran diterima",         icon: "bi-credit-card-2-front", afterMinutes: 0 },
    { key: "diproses",   label: "Pesanan sedang disiapkan",    icon: "bi-box-seam",            afterMinutes: 30 },
    { key: "dijemput",   label: "Paket dijemput kurir",        icon: "bi-truck",               afterMinutes: 180 },
    { key: "transit",    label: "Dalam perjalanan (transit)",  icon: "bi-signpost-split",      afterMinutes: 900 },
    { key: "pengiriman", label: "Sedang diantar ke alamat",    icon: "bi-scooter",             afterMinutes: 2160 },
    { key: "selesai",    label: "Paket diterima",              icon: "bi-house-check",         afterMinutes: 2880 }
];


function trackingTimeline(order) {

    const created = new Date(order.createdAt).getTime();
    const elapsed = (Date.now() - created) / 60000;

    return TRACKING_STAGES.map(stage => ({
        ...stage,
        done: elapsed >= stage.afterMinutes,
        time: new Date(created + stage.afterMinutes * 60000)
    }));
}


function formatDateTime(date) {

    return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}


function renderTracking(order) {

    const box = $("#trackResult");
    if (!box) return;

    if (!order) {
        box.innerHTML = `
            <div class="track-empty">
                <i class="bi bi-search"></i>
                <p>Nomor resi tidak ditemukan. Periksa kembali atau hubungi CS kami.</p>
            </div>`;
        return;
    }

    const stages = trackingTimeline(order);
    const current = [...stages].reverse().find(stage => stage.done) || stages[0];

    box.innerHTML = `
        <div class="track-head">
            <div>
                <small>Nomor Resi</small>
                <strong>${order.resi}</strong>
                <span class="track-courier">${order.courier.name} · ${order.courier.eta}</span>
            </div>
            <span class="track-status">${current.label}</span>
        </div>

        <div class="track-timeline">
            ${stages.map(stage => `
                <div class="track-step ${stage.done ? "is-done" : ""}">
                    <span class="track-dot"><i class="bi ${stage.icon}"></i></span>
                    <div class="track-step-body">
                        <strong>${stage.label}</strong>
                        <small>${stage.done ? formatDateTime(stage.time) : "Menunggu"}</small>
                    </div>
                </div>
            `).join("")}
        </div>

        <div class="track-detail">
            <div class="summary-row"><span>Penerima</span><strong>${order.customer.name || "-"}</strong></div>
            <div class="summary-row"><span>Tujuan</span><strong>${order.customer.city || "-"}</strong></div>
            <div class="summary-row"><span>Metode Bayar</span><strong>${order.payment.name}</strong></div>
            <div class="summary-row"><span>Total</span><strong>${rupiah(order.totals.total)}</strong></div>
        </div>

        <button type="button" class="btn btn-soft w-100 mt-3" onclick="copyText('${order.resi}','Nomor resi disalin.')">
            <i class="bi bi-clipboard"></i> Salin Nomor Resi
        </button>
    `;
}


async function trackOrder(resi) {

    const value = String(resi || "").trim();

    if (!value) {
        showToast("Masukkan nomor resi terlebih dahulu.");
        return;
    }

    let order = null;

    try {
        order = await (window.LSBAuth?.findOrder?.(value) ?? null);
    }
    catch { /* abaikan */ }

    if (!order) {
        const list = JSON.parse(localStorage.getItem("littleStarOrders") || "[]");
        order = list.find(o => o.resi.toUpperCase() === value.toUpperCase()) || null;
    }

    renderTracking(order);
}


function renderOrderHistory() {

    const box = $("#orderHistory");
    if (!box) return;

    const list = JSON.parse(localStorage.getItem("littleStarOrders") || "[]");

    if (!list.length) {
        box.innerHTML = `<p class="track-empty-small">Belum ada pesanan tersimpan di perangkat ini.</p>`;
        return;
    }

    box.innerHTML = list.slice(0, 6).map(order => `
        <button type="button" class="order-history-item" onclick="trackOrder('${order.resi}')">
            <span class="order-history-main">
                <strong>${order.resi}</strong>
                <small>${order.courier.name} · ${order.items.length} item · ${rupiah(order.totals.total)}</small>
            </span>
            <span class="order-history-date">${new Date(order.createdAt).toLocaleDateString("id-ID")}</span>
        </button>
    `).join("");
}


function openTrackModal(resi) {

    const modal = bootstrap.Modal.getOrCreateInstance($("#trackModal"));

    renderOrderHistory();

    if (typeof resi === "string" && resi) {
        const input = $("#trackInput");
        if (input) input.value = resi;
        trackOrder(resi);
    }

    modal.show();
}


/* ---------------- inisialisasi ---------------- */

function initCheckoutSystem() {

    renderCourierOptions();
    renderPaymentMethods();
    renderCheckoutSummary();

    /* langkah 1 → 2 */
    $("#checkoutForm")?.addEventListener("submit", event => {

        event.preventDefault();

        const required = ["#customerName", "#customerPhone", "#customerAddress", "#customerCity"];

        if (required.some(selector => !$(selector)?.value.trim())) {
            showToast("Lengkapi data pengiriman terlebih dahulu.");
            return;
        }

        renderCheckoutSummary();
        gotoCheckoutStep(2);
    });

    /* tombol kembali */
    $$("[data-checkout-back]").forEach(button => {
        button.addEventListener("click", () => {
            clearInterval(payCountdownTimer);
            gotoCheckoutStep(Number(button.dataset.checkoutBack));
        });
    });

    /* langkah 2 → 3 */
    $("#payNowButton")?.addEventListener("click", async () => {

        if (!checkoutState.method) {
            showToast("Pilih metode pembayaran terlebih dahulu.");
            return;
        }

        /* COD tidak perlu instruksi bayar, langsung buat pesanan */
        if (checkoutState.method.type === "cod") {
            const order = await createOrder();
            renderOrderSuccess(order);
            cart = [];
            saveCart();
            updateCartUI();
            gotoCheckoutStep(4);
            return;
        }

        if (PAYMENT_GATEWAY.enabled) {
            showToast("Menghubungkan ke penyedia pembayaran...");
            /* sambungkan di sini ke PAYMENT_GATEWAY.createTransactionUrl */
        }

        buildPaymentInstruction();
        gotoCheckoutStep(3);
        startPayCountdown(15);
    });

    /* langkah 3 → 4 */
    $("#confirmPayButton")?.addEventListener("click", async event => {

        const button = event.currentTarget;

        button.disabled = true;
        button.innerHTML = `<span class="auth-spinner"></span> Memverifikasi pembayaran...`;

        setTimeout(async () => {

            const order = await createOrder();

            clearInterval(payCountdownTimer);

            renderOrderSuccess(order);

            cart = [];
            saveCart();
            updateCartUI();

            gotoCheckoutStep(4);

            button.disabled = false;
            button.innerHTML = `<i class="bi bi-check2-circle"></i> Saya Sudah Bayar`;

            showToast(`Pembayaran terverifikasi. Resi: ${order.resi}`);

        }, 1400);
    });

    /* pelacakan */
    $("#trackButton")?.addEventListener("click", () => openTrackModal());

    $("#trackSubmit")?.addEventListener("click", () => trackOrder($("#trackInput")?.value));

    $("#trackInput")?.addEventListener("keydown", event => {
        if (event.key === "Enter") trackOrder(event.target.value);
    });
}


/* =========================================================
   57. INIT
========================================================= */

function initApp() {

    loadVoices();
    if ("speechSynthesis" in window) {
        speechSynthesis.onvoiceschanged = loadVoices;
    }

    initAuthScreen();

    initAccountMenu();

    initCheckoutSystem();

    loadTheme();

    renderCategoryOptions();

    renderProducts(products);

    updateCartUI();

    updateWishlistCount();

    updateWishlistUI();

    renderRecentlyViewed();

    updatePromoContent();

    startCountdown();

    initBackToTop();

    initScrollProgress();

    initSearch();

    initCategoryButtons();

    initNavigation();

    initEventListeners();

    initAnnouncementRotator();

    updateVoiceButtons();

    setCurrentYear();

    /* reveal setelah konten awal dirender */
    requestAnimationFrame(initScrollReveal);
}


document.addEventListener("DOMContentLoaded", initApp);
