import {activeSingle} from './active.js';
import { deactiveSingle } from './deactive.js';
import { SwitchSelect , SwitchSupportContent, activeTab } from './selected.js';

// slider 
const track = document.querySelector('.image-track');
const slides = document.querySelectorAll('.slide-img');
if (track && slides.length > 0) {
    let index = 0;
    let slideWidth = slides[0].clientWidth;
    const nextSlide = () => {
        index++;
        if (index > slides.length - 1) {
            index = 0;
        }
        track.style.transform = `translateX(${-index * slideWidth}px)`;
    };
    setInterval(nextSlide, 4000);
    window.addEventListener('resize', () => {
        slideWidth = slides[0].clientWidth;
        track.style.transform = `translateX(${-index * slideWidth}px)`;
    });
}

//add adress 
document.addEventListener('DOMContentLoaded', function() {
    const btnConfirmAdd = document.querySelector('.set-address .btn2');
    const addressList = document.getElementById('address-list');
    const inputName = document.getElementById('addr-name');
    const inputSdt = document.getElementById('addr-sdt');
    const inputDetail = document.getElementById('addr-detail');
    const inputCity = document.getElementById('addr-city');
    const inputTown = document.getElementById('addr-town');

    btnConfirmAdd.addEventListener('click', function(e) {
        e.preventDefault();

        if(inputName.value === '' || inputSdt.value === '' || inputDetail.value === '') {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        const fullAddress = `${inputDetail.value}, ${inputTown.value}, ${inputCity.value}`;

        const newItem = document.createElement('div');
        newItem.classList.add('address-item');
        
        newItem.innerHTML = `
            <div class="address-info">
                <p><strong>Họ tên:</strong> ${inputName.value}</p>
                <p><strong>Địa chỉ:</strong> ${fullAddress}</p>
                <p><strong>Số điện thoại:</strong> ${inputSdt.value}</p>
            </div>
            <button class="btn1 btn">Chỉnh sửa</button>
        `;
        addressList.appendChild(newItem);
        inputName.value = '';
        inputSdt.value = '';
        inputDetail.value = '';
        inputCity.value = '';
        inputDistrict.value = '';

        document.querySelector('.overlay-address').classList.toggle('.active'); 
        document.querySelector('.popup-address').classList.toggle('.active'); 
        alert("Đã thêm địa chỉ thành công");
    });
});

//open-search

document.addEventListener('DOMContentLoaded',()=>{
   activeSingle('.js-open-search','.search-ov'); 
})
document.addEventListener('DOMContentLoaded',()=>{
    deactiveSingle('.js-close-search','.search-ov');
})


// open-chat 
document.addEventListener('DOMContentLoaded',()=>{
    activeSingle('.js-open-chatbox','.chatbox-container','.overlay-chat')
})
document.addEventListener('DOMContentLoaded',()=>{
    deactiveSingle(' .js-close-chat','.chatbox-container','.overlay-chat')

})
// openshopingCart
document.addEventListener('DOMContentLoaded',()=>{
    activeSingle('.js-open-cart','.cart-main');
})
document.addEventListener('DOMContentLoaded',()=>{
    deactiveSingle('.btn-close-cart','.cart-main');
})

// menu-nav
document.addEventListener('DOMContentLoaded',()=>{
    activeSingle('.header-nav-btn','.menu-nav','.overlay1');
})
document.addEventListener('DOMContentLoaded',()=>{
    deactiveSingle(".overlay1",'.menu-nav','.overlay1') ;
})
document.addEventListener('DOMContentLoaded',()=>{
    deactiveSingle(".btn-close-footer",'.menu-nav','.overlay1') ;
})

document.addEventListener('DOMContentLoaded',()=>{
    SwitchSelect('.tab-btn','.tab-content');
})
// End-menu-nav

// acc-nav
document.addEventListener('DOMContentLoaded',()=>{
    activeSingle('.js-open-acc','.acc-nav','.overlay2');
})

document.addEventListener('DOMContentLoaded',()=>{
    deactiveSingle(".close-acc",'.acc-nav','.overlay2') ;
})

// End-acc-nav

// account
document.addEventListener('DOMContentLoaded',()=>{
    SwitchSelect('.acc-name button', '.account-content, .support-content,.order-main,.favories');
})
document.addEventListener('DOMContentLoaded',()=>{
    activeTab('.acc-name button', '.account-content, .support-content,.order-main,.favories');
})
document.addEventListener("DOMContentLoaded",()=>{
    window.addEventListener('hashchange', () => {
        activeTab('.acc-name button', '.account-content, .support-content,.order-main,.favories');
    });
})

// support 
document.addEventListener('DOMContentLoaded',()=>{
    SwitchSupportContent('.list-support .btn-list',
    '.introduce .fa-x, .policy .fa-x, .change .fa-x, .delivery .fa-x, .payment .fa-x',
    '.main-support',
    '.introduce, .policy, .change, .delivery, .payment'
    );
})



//open add-adress
document.addEventListener('DOMContentLoaded',()=>{
    activeSingle('.address-content .btn1','.popup-address','.overlay-address') ; 
})


//close add-adress 
document.addEventListener('DOMContentLoaded',()=>{
    deactiveSingle('.footer-address .btn1','.popup-address','.overlay-address'); 
})
document.addEventListener('DOMContentLoaded',()=>{
    deactiveSingle('.popup-address .fa-x','.popup-address','.overlay-address'); 
})


//open forget-pass
document.addEventListener('DOMContentLoaded',()=>{
    activeSingle('.change-pass','.popup-pw','.overlay-password') ; 
})

//close forget-pasas 
document.addEventListener('DOMContentLoaded',()=>{
   deactiveSingle('.popup-pw .fa-x','.popup-pw','.overlay-password');  
})

//change-selectbox to button tab 
document.addEventListener("DOMContentLoaded", function() {
    const toggle = document.getElementById('mobileNavToggle');
    const list = document.getElementById('mobileNavList');
    const currentText = document.getElementById('mobileNavCurrentText');
    const mobileItems = document.querySelectorAll('.mobile-nav-item');
    
    // 1. Bấm vào thanh tiêu đề để đóng/mở menu
    if(toggle){
        toggle.addEventListener('click', function() {
            list.classList.toggle('active');
        });
    }

    // 2. Xử lý khi chọn 1 mục ở Mobile
    mobileItems.forEach(item => {
        item.addEventListener('click', function() {
            // Lấy data-target của mục vừa bấm
            const target = this.getAttribute('data-target');
            const text = this.innerText;

            // Cập nhật giao diện Mobile (đổi tên hiển thị, đóng menu)
            currentText.innerText = text;
            list.classList.remove('active');

            // --- QUAN TRỌNG: KÍCH HOẠT LOGIC CŨ ---
            // Tìm nút button tương ứng ở bản Desktop và click nó
            const desktopBtn = document.querySelector(`.acc-name button[data-target='${target}']`);
            if(desktopBtn) {
                desktopBtn.click();
            }
        });
    });

    // 3. Click ra ngoài thì đóng menu (UX tốt hơn)
    document.addEventListener('click', function(e) {
        if (!toggle.contains(e.target) && !list.contains(e.target)) {
            list.classList.remove('active');
        }
    });
});

// --------------------------------------------------------------------------