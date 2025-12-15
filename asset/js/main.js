const panels = document.querySelectorAll(".order-nav_panel");

panels.forEach((panel) => {
  panel.addEventListener("click", function (e) {
    e.preventDefault(); // chặn thẻ <a> nhảy trang

    document
      .querySelector(".order-nav_panel.active")
      .classList.remove("active");

    this.classList.add("active");
    console.log(this.classList.add("active"));
  });
});
