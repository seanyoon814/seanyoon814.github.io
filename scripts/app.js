//Animations
const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
        else{
            entry.target.classList.remove('show');
        }
    })
})
const hiddenElements = document.querySelectorAll('.hidden');
const fadeInElements = document.querySelectorAll('.fade-in');
const fadeRightElements = document.querySelectorAll('.fade-right');
const fadeLeftElements = document.querySelectorAll('.fade-left');
hiddenElements.forEach((el) => observer.observe(el));
fadeInElements.forEach((el) => observer.observe(el));
fadeRightElements.forEach((el) => observer.observe(el));
fadeLeftElements.forEach((el) => observer.observe(el));

const toggleBtn = document.querySelector('.toggle_btn')
const toggleBtnIcon = document.querySelector('.toggle_btn i')
const dropDownMenu = document.querySelector('.dropdown_menu')

toggleBtn.onclick = function(){
    dropDownMenu.classList.toggle('open')
    const isOpen = dropDownMenu.classList.contains('open')

    toggleBtnIcon.classList = isOpen
        ? 'fa-solid fa-xmark'
        : 'fa-solid fa-bars'
}

window.onload = function() {
    // Scroll to top when page is loaded
    window.scrollTo(0, 0);
  }

function stars(){
    let count = 50;
    if(window.innerWidth <= 500)
    {
        count = 25;
    }
    let scene = document.querySelector('.scene');
    let i = 0;
    while(i<count)
    {
        let star = document.createElement('i');
        let x = Math.floor(Math.random() * window.innerWidth);

        let duration = Math.random() + 1;
        let h = Math.random() * 100;

        star.style.left = x + 'px';
        star.style.width = 1 + 'px';
        star.style.height = 30 + h + 'px';
        star.style.animationDuration = duration + 's';
        let num = Math.random();
        if(num <= 0.5)
        {
            star.style.backgroundColor = "cyan";
        }
        else
        {
            star.style.backgroundColor = "silver";
        }
        scene.appendChild(star);

        i++;
    }
}

//stars();
setTimeout(function(){
    stars();
}, 2500)