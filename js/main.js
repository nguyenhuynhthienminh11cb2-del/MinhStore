// Giỏ hàng đơn giản
document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.product-card button');
    const cartSpan = document.querySelector('.cart-icon span');
    let count = 0;

    if (addButtons.length > 0) {
        addButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                count++;
                cartSpan.innerText = count;
                alert('✅ Đã thêm sản phẩm vào giỏ hàng!');
            });
        });
    }
    // Giỏ hàng
document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.product-card button');
    const cartSpan = document.querySelector('.cart-icon span');
    let count = 0;

    if (addButtons.length > 0) {
        addButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                count++;
                cartSpan.innerText = count;
                alert('✅ Đã thêm sản phẩm vào giỏ hàng!');
            });
        });
    }

    // Tương tác: highlight menu lab khi hover (tuỳ chọn)
    const labLink = document.getElementById('labMenuLink');
    if (labLink) {
        labLink.addEventListener('click', (e) => {
            e.preventDefault();
        });
    }
});

// Hàm tiện ích: lấy tên lab từ path hiện tại
function getCurrentLabInfo() {
    const path = window.location.pathname;
    const match = path.match(/\/Lab(\d{2})\//);
    if (match) {
        const labNumber = match[1];
        const labNames = {
            '01': 'HTML cơ bản',
            '02': 'Table & List',
            '03': 'Frame & Form',
            '04': 'CSS cơ bản',
            '05': 'CSS nâng cao',
            '06': 'Layout Responsive',
            '07': 'JavaScript cơ bản',
            '08': 'JavaScript nâng cao'
        };
        return {
            number: labNumber,
            name: labNames[labNumber] || `Lab${labNumber}`,
            folder: `Lab${labNumber}`
        };
    }
    return null;
}
});