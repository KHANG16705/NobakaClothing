export function deactiveSingle(button,target,overlay=null){
    const btn = document.querySelector(button); 
    const tg = document.querySelector(target); 
    const ov  = overlay ? document.querySelector(overlay) : null;

    if(!btn || !tg) return ; 

    btn.addEventListener('click',(e)=>{
        // e.preventDefault();
        tg.classList.remove('active');
        if (ov) {
            ov.classList.remove('active');
        }
    });
}