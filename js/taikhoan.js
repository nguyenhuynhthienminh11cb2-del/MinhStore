// Tài khoản lưu trong localStorage
let currentUser = null;

// Hàm validation email (kiểm tra có @ và dấu chấm)
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
    return emailRegex.test(email);
}

// Hàm validation số điện thoại Việt Nam
function isValidPhone(phone) {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    return phoneRegex.test(phone);
}

// Hàm cuộn lên phần thông báo
function scrollToMessage(messageElementId) {
    const messageElement = document.getElementById(messageElementId);
    if (messageElement) {
        // Cuộn mượt mà đến phần thông báo
        messageElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center',
            inline: 'nearest'
        });
        
        // Thêm hiệu ứng nhấp nháy cho thông báo
        messageElement.style.transition = 'all 0.3s ease';
        messageElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            messageElement.style.transform = 'scale(1)';
        }, 500);
    }
}

// Khởi tạo
function initAuth() {
    // Kiểm tra đăng nhập từ localStorage
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
    
    // Xử lý form đăng ký
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Xử lý form đăng nhập
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Cập nhật UI auth trên các trang
    updateAuthUI();
}

function handleRegister(e) {
    e.preventDefault();
    
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Validation tiếng Việt
    if (!fullname) {
        showMessage('registerMsg', '❌ Vui lòng nhập họ và tên!', 'error');
        scrollToMessage('registerMsg');
        return;
    }
    
    if (!email) {
        showMessage('registerMsg', '❌ Vui lòng nhập địa chỉ email!', 'error');
        scrollToMessage('registerMsg');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('registerMsg', '❌ Email không hợp lệ! Vui lòng nhập đúng định dạng (bao gồm @ và tên miền, ví dụ: ten@example.com)', 'error');
        scrollToMessage('registerMsg');
        return;
    }
    
    if (!phone) {
        showMessage('registerMsg', '❌ Vui lòng nhập số điện thoại!', 'error');
        scrollToMessage('registerMsg');
        return;
    }
    
    if (!isValidPhone(phone)) {
        showMessage('registerMsg', '❌ Số điện thoại không hợp lệ! Vui lòng nhập số điện thoại Việt Nam (bắt đầu bằng 03, 05, 07, 08, 09 và có 10 số)', 'error');
        scrollToMessage('registerMsg');
        return;
    }
    
    if (!address) {
        showMessage('registerMsg', '❌ Vui lòng nhập địa chỉ!', 'error');
        scrollToMessage('registerMsg');
        return;
    }
    
    if (!password) {
        showMessage('registerMsg', '❌ Vui lòng nhập mật khẩu!', 'error');
        scrollToMessage('registerMsg');
        return;
    }
    
    if (password.length < 6) {
        showMessage('registerMsg', '❌ Mật khẩu phải có ít nhất 6 ký tự!', 'error');
        scrollToMessage('registerMsg');
        return;
    }
    
    if (password !== confirmPassword) {
        showMessage('registerMsg', '❌ Mật khẩu xác nhận không khớp!', 'error');
        scrollToMessage('registerMsg');
        return;
    }
    
    // Lấy danh sách users từ localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Kiểm tra email đã tồn tại
    if (users.find(u => u.email === email)) {
        showMessage('registerMsg', '❌ Email này đã được đăng ký! Vui lòng sử dụng email khác.', 'error');
        scrollToMessage('registerMsg');
        return;
    }
    
    // Tạo user mới
    const newUser = {
        id: Date.now(),
        fullname,
        email,
        phone,
        address,
        password
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showMessage('registerMsg', '✅ Đăng ký thành công! Vui lòng đăng nhập.', 'success');
    scrollToMessage('registerMsg');
    
    setTimeout(() => {
        window.location.href = 'dangnhap.html';
    }, 1500);
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validation tiếng Việt
    if (!email) {
        showMessage('loginMsg', '❌ Vui lòng nhập email!', 'error');
        scrollToMessage('loginMsg');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('loginMsg', '❌ Email không hợp lệ! Vui lòng nhập đúng định dạng (bao gồm @ và tên miền)', 'error');
        scrollToMessage('loginMsg');
        return;
    }
    
    if (!password) {
        showMessage('loginMsg', '❌ Vui lòng nhập mật khẩu!', 'error');
        scrollToMessage('loginMsg');
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMessage('loginMsg', '✅ Đăng nhập thành công!', 'success');
        scrollToMessage('loginMsg');
        
        setTimeout(() => {
            // Chuyển về trang trước đó hoặc trang chủ
            const returnUrl = sessionStorage.getItem('returnUrl') || 'index.html';
            sessionStorage.removeItem('returnUrl');
            window.location.href = returnUrl;
        }, 1000);
    } else {
        showMessage('loginMsg', '❌ Email hoặc mật khẩu không đúng! Vui lòng thử lại.', 'error');
        scrollToMessage('loginMsg');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();
    window.location.href = 'index.html';
}

function updateAuthUI() {
    const authLink = document.getElementById('authLink');
    if (!authLink) return;
    
    if (currentUser) {
        authLink.innerHTML = `👤 ${currentUser.fullname.split(' ').pop()} ▼`;
        // Tạo dropdown menu cho user
        if (!document.getElementById('userDropdown')) {
            const dropdown = document.createElement('ul');
            dropdown.id = 'userDropdown';
            dropdown.className = 'submenu user-menu';
            dropdown.innerHTML = `
                <li><a href="taikhoan.html">👤 Tài khoản của tôi</a></li>
                <li><a href="#" onclick="logout()">🚪 Đăng xuất</a></li>
            `;
            authLink.parentElement.appendChild(dropdown);
        }
    } else {
        authLink.innerHTML = '🔑 Đăng nhập';
        const existingDropdown = document.getElementById('userDropdown');
        if (existingDropdown) existingDropdown.remove();
    }
}

function showMessage(elementId, message, type) {
    const msgDiv = document.getElementById(elementId);
    if (msgDiv) {
        msgDiv.textContent = message;
        msgDiv.className = `msg ${type}`;
        
        // Tự động ẩn sau 4 giây
        setTimeout(() => {
            if (msgDiv) {
                msgDiv.textContent = '';
                msgDiv.className = 'msg';
            }
        }, 4000);
    }
}

function isLoggedIn() {
    return currentUser !== null;
}

function getCurrentUser() {
    return currentUser;
}

// Chạy init khi trang load
document.addEventListener('DOMContentLoaded', initAuth);