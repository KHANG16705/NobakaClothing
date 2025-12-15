const tabLogin = document.getElementById("tabLogin");
const tabRegister = document.getElementById("tabRegister");

const formLogin = document.getElementById("formLogin");
const formRegister = document.getElementById("formRegister");

// TAB SWITCH
tabLogin.onclick = () => {
  tabLogin.classList.add("active");
  tabRegister.classList.remove("active");
  formLogin.classList.add("active");
  formRegister.classList.remove("active");
};

tabRegister.onclick = () => {
  tabRegister.classList.add("active");
  tabLogin.classList.remove("active");
  formRegister.classList.add("active");
  formLogin.classList.remove("active");
};

/* =========================
   ĐĂNG KÝ
========================= */
formRegister.addEventListener("submit", function (e) {
  // ngăn chăn loadtrang
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  const user = {
    firstName,
    lastName,
    email,
    password,
  };

  // Lưu vào localStorage
  localStorage.setItem("user", JSON.stringify(user));

  alert("Đăng ký thành công! Vui lòng đăng nhập.");

  // Tự chuyển sang tab đăng nhập
  tabLogin.click();
});

/* =========================
   ĐĂNG NHẬP
========================= */
formLogin.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser) {
    alert("Chưa có tài khoản. Vui lòng đăng ký!");
    return;
  }

  if (email === storedUser.email && password === storedUser.password) {
    alert("Đăng nhập thành công!");
    window.location.href = "./clicksanpham.html"; // TRANG CHỦ
  } else {
    alert("Sai email hoặc mật khẩu!");
  }
});
