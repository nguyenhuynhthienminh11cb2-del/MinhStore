// Dữ liệu sản phẩm
const products = [
    { id: 1, name: 'Bút bi xanh đen', price: 15000, category: 'but', image: 'images/pen.jpg', featured: true },
    { id: 2, name: 'Vở 200 trang', price: 25000, category: 'vo', image: 'images/notebook.jpg', featured: true },
    { id: 3, name: 'Balô laptop 15 inch', price: 350000, category: 'balo', image: 'images/backpack.jpg', featured: true },
    { id: 4, name: 'Máy tính Casio', price: 180000, category: 'thietbi', image: 'images/calculator.jpg', featured: true },
    { id: 5, name: 'Bút máy thanh tú', price: 45000, category: 'but', image: 'images/fountain.jpg', featured: false },
    { id: 6, name: 'Bút nhũ kim tuyến', price: 12000, category: 'but', image: 'images/glitter.jpg', featured: false },
    { id: 7, name: 'Tập giấy A4 500 tờ', price: 55000, category: 'vo', image: 'images/a4paper.jpg', featured: false },
    { id: 8, name: 'Sổ tay bìa da', price: 89000, category: 'vo', image: 'images/notebook2.jpg', featured: false },
    { id: 9, name: 'Balô chống sốc', price: 420000, category: 'balo', image: 'images/backpack2.jpg', featured: false },
    { id: 10, name: 'Túi đựng bút vải', price: 35000, category: 'balo', image: 'images/pencilcase.jpg', featured: false },
    { id: 11, name: 'Bút chì than', price: 5000, category: 'but', image: 'images/pencil.jpg', featured: false },
    { id: 12, name: 'USB 32GB Kingmax', price: 120000, category: 'thietbi', image: 'images/usb.jpg', featured: false },
    { id: 13, name: 'Thước kẻ 30cm', price: 8000, category: 'phuongtien', image: 'images/ruler.jpg', featured: false },
    { id: 14, name: 'Compa vẽ hình', price: 25000, category: 'phuongtien', image: 'images/compass.jpg', featured: false },
    { id: 15, name: 'Tẩy 2B cao cấp', price: 5000, category: 'phuongtien', image: 'images/eraser.jpg', featured: false }
];

// Giỏ hàng lưu trong localStorage
let cart = [];

function initCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartUI();
}

function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification('Đã thêm ' + product.name + ' vào giỏ hàng!');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartUI();
    }
}

function updateCartUI() {
    // Cập nhật số lượng trên icon giỏ hàng
    const cartCountSpans = document.querySelectorAll('#cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountSpans.forEach(span => {
        if (span) span.textContent = totalItems;
    });
    
    // Cập nhật trang giỏ hàng
    const cartItemsDiv = document.getElementById('cartItems');
    if (cartItemsDiv) {
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<div class="empty-cart">Giỏ hàng của bạn đang trống</div>';
        } else {
            cartItemsDiv.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}" onerror="this.src='https://placehold.co/80x80?text=SP'">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>${item.price.toLocaleString()}đ</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                    <div class="cart-item-total">${(item.price * item.quantity).toLocaleString()}đ</div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">🗑️</button>
                </div>
            `).join('');
        }
        
        // Tính tổng tiền
        const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shipping = 30000;
        const total = subtotal + shipping;
        
        const subtotalSpan = document.getElementById('subtotal');
        const totalSpan = document.getElementById('total');
        if (subtotalSpan) subtotalSpan.textContent = subtotal.toLocaleString() + 'đ';
        if (totalSpan) totalSpan.textContent = total.toLocaleString() + 'đ';
    }
    
    // Cập nhật trang sản phẩm và trang chủ
    renderProducts();
}

function renderProducts() {
    // Render sản phẩm tiêu biểu trên trang chủ
    const featuredDiv = document.getElementById('featuredProducts');
    if (featuredDiv) {
        const featuredProducts = products.filter(p => p.featured);
        featuredDiv.innerHTML = featuredProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/300x200?text=${product.name}'">
                <h3>${product.name}</h3>
                <p class="price">${product.price.toLocaleString()}đ</p>
                <button onclick="addToCart(${product.id})">🛒 Thêm giỏ</button>
            </div>
        `).join('');
    }
    
    // Render tất cả sản phẩm trên trang sanpham.html
    const allProductsDiv = document.getElementById('allProducts');
    if (allProductsDiv) {
        const category = currentFilter || 'all';
        let filteredProducts = products;
        if (category !== 'all') {
            filteredProducts = products.filter(p => p.category === category);
        }
        
        allProductsDiv.innerHTML = filteredProducts.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/300x200?text=${product.name}'">
                <h3>${product.name}</h3>
                <p class="price">${product.price.toLocaleString()}đ</p>
                <button onclick="addToCart(${product.id})">🛒 Thêm giỏ</button>
            </div>
        `).join('');
    }
}

let currentFilter = 'all';

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentFilter = btn.dataset.category;
                renderProducts();
            });
        });
    }
}

function showNotification(message) {
    const notif = document.getElementById('cartNotification');
    if (notif) {
        notif.textContent = message;
        notif.style.display = 'block';
        setTimeout(() => {
            notif.style.display = 'none';
        }, 2000);
    } else {
        alert(message);
    }
}

function checkout() {
    if (!isLoggedIn()) {
        sessionStorage.setItem('returnUrl', 'giohang.html');
        showNotification('Vui lòng đăng nhập để thanh toán!');
        setTimeout(() => {
            window.location.href = 'dangnhap.html';
        }, 1000);
        return;
    }
    
    if (cart.length === 0) {
        showNotification('Giỏ hàng trống!');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 30000;
    alert(`Thanh toán thành công!\nĐơn hàng của bạn đã được ghi nhận.\nTổng tiền: ${total.toLocaleString()}đ\n📧 Chúng tôi sẽ gửi xác nhận qua email.`);
    
    // Xóa giỏ hàng sau khi thanh toán
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    window.location.href = 'index.html';
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', () => {
    initCart();
    setupFilters();
    renderProducts();
    
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', checkout);
    }
});