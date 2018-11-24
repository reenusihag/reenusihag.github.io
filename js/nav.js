/**
 * Navbar of http://worldorder.jp/
 * Thought it was a fun idea to make
 * my own implementation of that idea
 */
var selectors = {
    'navBar': '.navbar',
    'navItem': '.navbar .nav-item',
    'activeNavItem': '.navbar .nav-item.is-active',
    'magicLine': '.navbar .magic-line'

    // jQuery is for beginners
};var navBar = document.querySelector(selectors.navBar);
var navItems = document.querySelectorAll(selectors.navItem);
var magicLine = document.querySelector(selectors.magicLine);
var activeNavItem = document.querySelector(selectors.activeNavItem);

/**
 * Set the position of magic-line
 * to the position of navItem
 * @param {Object} navItem element
 * @return void
 */
function setMagicLine(navItem) {
    var x = navItem.offsetLeft;
    var width = navItem.offsetWidth;
    magicLine.style.transform = 'translateX(' + x + 'px)';
    magicLine.style.width = width + 'px';
}

/**
 * Return magic-line back to
 * active navItem when mouse
 * leave navbar
 */
setMagicLine(activeNavItem);
navBar.addEventListener('mouseleave', function (e) {
    setMagicLine(activeNavItem);
});

/**
 * Create a hover eventlistener
 * for every navItem, and execute
 * setMagicLine()
 */
navItems.forEach(function (navItem) {
    navItem.addEventListener('mouseenter', function (e) {
        setMagicLine(navItem);
    });
});


var slideIndex = 1;
showDivs(slideIndex);



function currentDiv(n) {
    showDivs(slideIndex = n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demos");
    if (n > x.length) {slideIndex = 1}
    if (n < 1) {slideIndex = x.length}
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" w3-opacity-off", "");
    }
    x[slideIndex-1].style.display = "block";
    x[slideIndex-1].style.height = "300px";
    x[slideIndex-1].style.width = "450px";
    dots[slideIndex-1].className += " w3-opacity-off";
}