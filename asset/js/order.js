// Lấy các phần tử
const btnMinus = document.querySelector(".numberG");
const btnPlus = document.querySelector(".numberT");
const inputNumber = document.querySelector(".input-number");

// Giá trị mặc định
inputNumber.value = 1;

// Nút cộng
btnPlus.addEventListener("click", () => {
  let value = parseInt(inputNumber.value) || 1;
  inputNumber.value = value + 1;
});

// Nút trừ
btnMinus.addEventListener("click", () => {
  let value = parseInt(inputNumber.value) || 1;
  if (value > 1) {
    inputNumber.value = value - 1;
  }
});

// Chỉ cho nhập số & không nhỏ hơn 1
inputNumber.addEventListener("input", () => {
  let value = parseInt(inputNumber.value);
  if (isNaN(value) || value < 1) {
    inputNumber.value = 1;
  }
});

// Lấy tất cả ảnh style
const styleImgs = document.querySelectorAll(".product_style-img");

// Lấy 4 ảnh lớn
const productImgs = document.querySelectorAll(".product_left-img");

// Mapping style → bộ ảnh
const styleMap = {
  0: [
    "./asset/img2/product1.png",
    "./asset/img2/product2.png",
    "./asset/img2/product3.png",
    "./asset/img2/product4.png",
  ],
  1: [
    "./asset/img2/style1.1.avif",
    "./asset/img2/style1.2.avif",
    "./asset/img2/style1.3.avif",
    "./asset/img2/style1.4.avif",
  ],
  2: [
    "./asset/img2/style2.1.avif",
    "./asset/img2/style2.2.avif",
    "./asset/img2/style2.3.avif",
    "./asset/img2/style2.4.avif",
  ],
  3: [
    "./asset/img2/style2.5.avif",
    "./asset/img2/style2.6.avif",
    "./asset/img2/style2.7.avif",
    "./asset/img2/style2.8.avif",
  ],
  4: [
    "./asset/img2/style3.1.avif",
    "./asset/img2/style3.2.avif",
    "./asset/img2/style3.3.avif",
    "./asset/img2/style2.4.avif",
  ],
  5: [
    "./asset/img2/style.4.1.avif",
    "./asset/img2/style.4.2.avif",
    "./asset/img2/style.4.3.avif",
    "./asset/img2/style.4.4.avif",
  ],
  6: [
    "./asset/img2/style.4.5.avif",
    "./asset/img2/style.4.6.avif",
    "./asset/img2/style.4.7.avif",
    "./asset/img2/style.4.8.avif",
  ],
};

// Gắn click cho từng style
styleImgs.forEach((styleImg, index) => {
  styleImg.addEventListener("click", () => {
    const images = styleMap[index];

    // Đổi 4 ảnh lớn
    productImgs.forEach((img, i) => {
      img.src = images[i];
    });

    // Active style
    styleImgs.forEach((img) => img.classList.remove("active"));
    styleImg.classList.add("active");
  });
});

const overlay = document.querySelector(".overlay");
const btnSize = document.querySelector(".btn-size");
const boxsize = document.querySelector(".size-box");

btnSize.addEventListener("click", () => {
  overlay.classList.add("active");
  boxsize.classList.add("active");
});

overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  boxsize.classList.remove("active");
});
// lấy size
const sizeNumber = document.querySelectorAll(".size-box .size");
const sizeInput = document.querySelector(".btn-size_input");
let selected = null;
sizeNumber.forEach((item) => {
  item.addEventListener("click", () => {
    const sizeValue = item.textContent.trim();
    sizeInput.value = sizeValue;
    selected = sizeInput.value;
    // getNumber(selected);
    overlay.classList.remove("active");
    boxsize.classList.remove("active");
  });
});

//

const btnAddToCart = document.querySelector(".shopcart");

btnAddToCart.addEventListener("click", () => {
  // 1. Kiểm tra xem khách đã chọn size chưa
  if (!sizeInput.value) {
    alert("Vui lòng chọn kích thước giày!");
    return;
  }

  // 2. Lấy các thông tin cần thiết
  // Lấy tên
  const productName = document.querySelector(".product_name").innerText;

  // Lấy giá: Vì HTML của bạn là <span>1.800...</span> 720.00đ -> ta cần lấy text cuối cùng
  const priceText = document
    .querySelector(".product_price")
    .lastChild.textContent.trim();

  // Lấy ảnh: Lấy src của ảnh lớn đang hiển thị (phần tử đầu tiên trong list ảnh lớn)
  // Lưu ý: Bạn cần đảm bảo class .product_left-img tồn tại bên HTML (cột trái)
  const productImg = document.querySelector(".product_left-img")
    ? document.querySelector(".product_left-img").src
    : "./asset/img2/product1.png"; // Fallback nếu không tìm thấy

  const productSize = sizeInput.value;
  const productQty = parseInt(inputNumber.value);

  // 3. Tạo đối tượng sản phẩm
  const newItem = {
    id: Date.now(), // Tạo ID riêng để phân biệt
    name: productName,
    price: priceText, // Dạng chuỗi "720.00 ₫"
    img: productImg,
    size: productSize,
    qty: productQty,
  };

  // 4. Lưu vào LocalStorage
  // Lấy giỏ hàng cũ từ bộ nhớ (nếu có), nếu chưa có thì tạo mảng rỗng
  let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

  // Kiểm tra xem sản phẩm này (cùng size) đã có trong giỏ chưa để cộng dồn số lượng
  const existingItemIndex = cart.findIndex(
    (item) => item.name === newItem.name && item.size === newItem.size
  );

  if (existingItemIndex > -1) {
    // Nếu đã có -> cộng dồn số lượng
    cart[existingItemIndex].qty += newItem.qty;
  } else {
    // Nếu chưa có -> thêm mới
    cart.push(newItem);
  }

  // Lưu lại vào localStorage
  localStorage.setItem("shoppingCart", JSON.stringify(cart));

  // 5. Thông báo và chuyển trang
  alert("Đã thêm vào giỏ hàng!");
  window.location.href = "shopping_cart.html";
});
