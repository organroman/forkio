let burger = document.querySelector('.burger');
let menu = document.querySelector('.menu');

const toggleMenu = () => {
    menu.classList.toggle('active');
}

burger.addEventListener('click', e => {
    e.stopPropagation();

    toggleMenu();
});

document.addEventListener('click', e => {
    let target = e.target;
    let its_menu = target === menu || menu.contains(target);
    let its_burger = target === burger;
    let menu_is_active = menu.classList.contains('active');

    if (!its_menu && !its_burger && menu_is_active) {
        toggleMenu();
    }
})