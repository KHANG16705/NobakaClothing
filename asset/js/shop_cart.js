// Hàm định dạng tiền tệ (chuyển số thành dạng 1.000.000 đ)
function formatCurrency(amount) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

// Hàm parse giá tiền từ chuỗi "7200.00 ₫" về số 720000 để tính toán
function parsePrice(priceString) {
  // Loại bỏ chữ '₫', dấu chấm, khoảng trắng
  return parseInt(priceString.replace(/[₫\.\s]/g, "")) || 0;
}

function loadCart() {
  const cartContainer = document.getElementById("cart-items-container");
  const totalElement = document.querySelector(".summary-total span:last-child");
  const subTotalElement = document.querySelector(
    ".summary-row.muted span:last-child"
  ); // Tổng phụ

  // 1. Lấy dữ liệu từ LocalStorage
  const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  // Nếu giỏ hàng trống
  if (cart.length === 0) {
    cartContainer.innerHTML =
      "<p style='padding:20px'>Giỏ hàng của bạn đang trống.</p>";
    if (totalElement) totalElement.innerText = "0 đ";
    if (subTotalElement) subTotalElement.innerText = "0 đ";
    return;
  }

  let totalBill = 0;
  let html = "";

  // 2. Duyệt qua từng sản phẩm để tạo HTML
  cart.forEach((item, index) => {
    // Tính thành tiền của item này (Giá x Số lượng)
    // Lưu ý: Giá lưu trong storage đang là chuỗi "720.00 ₫", cần xử lý chút nếu muốn tính toán chuẩn
    // Ở đây mình giả định giá bạn lưu là đúng format số học hoặc mình lấy số lượng hiển thị thôi.

    // Để tính tổng tiền, ta cần chuyển giá về số
    let unitPrice = parsePrice(item.price);
    let itemTotal = unitPrice * item.qty;
    totalBill += itemTotal;

    html += `
        <div class="item" data-index="${index}">
          <div class="thumb">
            <img src="${item.img}" alt="${item.name}" />
          </div>
          <div class="item-info">
            <div class="item-title">${item.name}</div>
            <div class="item-meta">Size: ${item.size}</div>
            <div class="item-qty">
                Số lượng: <input type="number" min="1" value="${
                  item.qty
                }" onchange="updateQty(${index}, this.value)" style="width: 40px; text-align: center;">
            </div>
            <div class="item-remove" style="margin-top:5px; cursor:pointer; color:red; font-size:12px" onclick="removeItem(${index})">Xóa</div>
          </div>
          <div class="item-price">${formatCurrency(itemTotal)}</div>
        </div>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
        `;
  });

  // 3. Render ra màn hình
  cartContainer.innerHTML = html;

  // 4. Cập nhật tổng tiền
  if (subTotalElement) subTotalElement.innerText = formatCurrency(totalBill);
  if (totalElement) totalElement.innerText = formatCurrency(totalBill);
}

// Hàm xóa sản phẩm
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  cart.splice(index, 1); // Xóa phần tử tại index
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  loadCart(); // Load lại giao diện
}

// Hàm cập nhật số lượng
function updateQty(index, newQty) {
  let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
  if (newQty < 1) newQty = 1;
  cart[index].qty = parseInt(newQty);
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
  loadCart(); // Load lại giao diện
}

// Chạy hàm khi trang tải xong
document.addEventListener("DOMContentLoaded", loadCart);
