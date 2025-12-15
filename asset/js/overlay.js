const payQR = document.getElementById("pay-qr");
const payCOD = document.getElementById("pay-cod");
const orderBtn = document.querySelector(".order-summit");

const overlay = document.querySelector(".overlay");
const overlayContent = document.querySelector(".overlay_content");
const changeMethod = document.querySelector(".change-method");

orderBtn.addEventListener("click", () => {
  // Nếu chọn QR
  if (payQR.checked) {
    overlay.style.display = "block";
    overlayContent.style.display = "block";
    return;
  }

  // Nếu chọn COD
  if (payCOD.checked) {
    window.location.href = "bill.html";
    return;
  }

  // Nếu chưa chọn gì
  alert("Vui lòng chọn phương thức thanh toán!");
});

// Click overlay để đóng
overlay.addEventListener("click", closeOverlay);
changeMethod.addEventListener("click", closeOverlay);

function closeOverlay() {
  overlay.style.display = "none";
  overlayContent.style.display = "none";
  payQR.checked = false;
}
