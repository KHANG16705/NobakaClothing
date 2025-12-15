export function SwitchSelect (button,content) {
    const allButton = document.querySelectorAll(button);
    const allContent = document.querySelectorAll(content);
    if (!allButton.length || !allContent.length) return;
    allButton.forEach (btn => {
        btn.addEventListener('click',(e)=>{
            const targetId = btn.dataset.target; 
            allButton.forEach(tmp1 => tmp1.classList.remove('active'));
            allContent.forEach(tmp2 => tmp2.classList.remove('show'));
            btn.classList.add('active');
            document.getElementById(targetId).classList.add('show');
        })
    });
}


export function activeTab(button, content) {
    const hash = window.location.hash.substring(1);
    let targetId = hash || 'my-acc';
    history.replaceState(null, null, window.location.pathname);
    const supportContent = ['introduce', 'policy', 'change', 'delivery', 'payment'];
    let Dadid = supportContent.includes(targetId) ? 'my-sup' : targetId;
    const allButtons = document.querySelectorAll(button);
    const allContents = document.querySelectorAll(content);
    allButtons.forEach(btn => btn.classList.remove('active'));
    allContents.forEach(content => content.classList.remove('show'));
    const buttonParent= document.querySelector(`${button}[data-target="${Dadid}"]`);
    buttonParent.classList.add('active');
    const parentContent = document.getElementById(Dadid);
    parentContent.classList.add('show');
    if (Dadid === 'my-sup') {
        const mainSupport = document.querySelector('.main-support');
        const subContents = document.querySelectorAll('.introduce, .policy, .change, .delivery, .payment');

        if (supportContent.includes(targetId)) {
            mainSupport.classList.remove('show');
            subContents.forEach(sub => sub.classList.remove('show'));
            document.getElementById(targetId)?.classList.add('show');
        } else {
            mainSupport.classList.add('show');
            subContents.forEach(sub => sub.classList.remove('show'));
        }
    }
}

export function SwitchSupportContent(button, closeButton, mainSupport, content) {
    const main = document.querySelector(mainSupport);
    const allContent = document.querySelectorAll(content);
    const allButton = document.querySelectorAll(button);
    if (!main || allButton.length === 0) return;
    allButton.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = btn.dataset.target;
            allContent.forEach(content => content.classList.remove('show'));
            main.classList.remove('show');
            const targetContent = document.getElementById(targetId);
            targetContent.classList.add('show');
        });
    });
    const closeButtons = document.querySelectorAll(closeButton);
    closeButtons.forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            const currentSubContent = closeBtn.closest(content);
            currentSubContent.classList.remove('show');
            main.classList.add('show');
        });
    });
}
