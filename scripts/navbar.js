// get path of navbar.html
function getNavbarPath() {
    const pathname = window.location.pathname;

    if (pathname.includes('/pages/')) {
        return '../navbar.html'; 
    } else {
        return '/navbar.html';
    }
}

// inject navbar html into navbar div
fetch(getNavbarPath())
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
    })
    .catch(error => console.error('Error loading navbar:', error));

// handle mobile hamburger menu
let isMenuOpen = false;
let navMain;
let menuBtn;

function setUpMenu() {
    navMain = document.querySelector(".main-nav");
    menuBtn = document.querySelector(".menu-btn");

    if (navMain && menuBtn) {
        menuBtn.onclick = function() {
            if (!isMenuOpen) {
                navMain.style.display = "flex";
                isMenuOpen = true;
            } else {
                navMain.style.display = "none";
                isMenuOpen = false;
            }
        };
    }
}

// wait for navbar to be loaded
setTimeout(setUpMenu, 500); // wait 500ms (hope this works on slow machines lol)

// handle window resizing logic
window.addEventListener('resize', function() {
    if (window.innerWidth > 900) {
        // reset the navMain display when the screen width is greater than 900px
        if (navMain) {
            navMain.style.display = "flex"; // ensure the nav is always visible
        }
    } else {
        // if the screen is resized back to a width of 900px or less, the hamburger menu will manage visibility
        if (navMain && !isMenuOpen) {
            navMain.style.display = "none"; // hide menu if it's not open
        }
    }
});