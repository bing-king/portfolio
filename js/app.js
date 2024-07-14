const header = document.querySelector("header");
const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");
const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");
const links = document.querySelectorAll(".nav-link");
const toogle_btn = document.querySelector(".toogle-btn");
const hamburger = document.querySelector("#hamburger-icon");

/* ---sticky Navbar--- */

function stickyNavbar() {
    header.classList.toggle('scorlled', window.scrollY > 0);
}

window.addEventListener('scroll', () => {
    activeLink();
    stickyNavbar();
    if (!mlPlayed) mlCounters();
});


function updateCount(num, maxNum) {
    let currentNum = +num.innerText;
    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum)
        }, 12);
    }
}
/* ---sticky Navbar--- */

let sr = ScrollReveal({
    duration: 2500,
    distance: '60px'
});

sr.reveal('.showcase-info', { delay: 600 });
sr.reveal('.card-container', { origin: "top", delay: 700 });

/* ---services Animation---  */

let mlPlayed = false;

function hasReached(el) {
    let topPosition = el.getBoundingClientRect().top;

    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

function mlCounters() {
    if (!hasReached(ml_section)) return;
    mlPlayed = true;
    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target;

        setTimeout(() => {
            updateCount(ctr, target);
        }, 400);
    });
}

/* ---protfolio filter animation---  */

let mixer = mixitup('.portfolio-gallery', {
    selectors: {
        target: '.prt-card'
    },
    animation: {
        duration: 500,
    },
});

/* ---Modal POP UP Animation animation---  */

let currentIndex = 0;

zoom_icons.forEach((icn, index) =>
    icn.addEventListener("click", () => {
        prt_section.classList.add("open")
        document.body.classList.add("stopScrolling")
        currentIndex = index;
        changeImage(currentIndex)
    }));

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open")
    document.body.classList.remove("stopScrolling")
})

prev_btn.addEventListener("click", () => {
    if (currentIndex === 0) {
        currentIndex = images.length - 1
    } else {
        currentIndex--
    }
    changeImage(currentIndex)
})

next_btn.addEventListener("click", () => {
    if (currentIndex === images.length - 1) {
        currentIndex = 0
    } else {
        currentIndex++
    }
    changeImage(currentIndex)
})

function changeImage(index) {
    images.forEach(img => img.classList.remove("showImage"))
    images[index].classList.add("showImage")
}

/* ---swiper---  */

/* ---swiper for testimonials---  */
document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper', {
        spaceBetween: 10,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 3000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }

    });
});

/* ---swiper for skills---  */
document.addEventListener('DOMContentLoaded', () => {
    const swiper = new Swiper('.swiper-skills', {
        spaceBetween: 10,
        loop: true,
        speed: 1500,
        autoplay: {
            delay: 1000,
        },
        breakpoints: {
            500: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 40,
            },
            1280: {
                slidesPerView: 5,
                spaceBetween: 50,
            },
        }
    });
});

/* ---change active link on scroll---  */
function activeLink() {
    let sections = document.querySelectorAll('section[id]');
    let passedSections = Array.from(sections)
        .map((sct, i) => {
            return {
                y: sct.getBoundingClientRect().top - header.offsetHeight,
                id: i,
            };
        }).filter(sct => sct.y <= 0);

    let currSectionId = passedSections.at(-1).id;
    links.forEach(l => l.classList.remove('active'));
    links[currSectionId].classList.add('active');
}

activeLink()

/* ---change page theme---  */
function changeTheme() {
    const body = document.body;
    const hasDarkClass = body.classList.contains("dark");
    const oldClass = hasDarkClass ? "fa-moon" : "fa-sun";
    const newClass = hasDarkClass ? "fa-sun" : "fa-moon";

    body.classList.toggle("dark");
    toogle_btn.classList.replace(oldClass, newClass);

    localStorage.setItem("theme", body.classList.contains("dark"));
}

toogle_btn.addEventListener("click", changeTheme);

document.addEventListener("DOMContentLoaded", () => {
    const isDark = localStorage.getItem("theme") === "true";
    document.body.classList.toggle("dark", isDark);
    toogle_btn.classList.replace(isDark ? "fa-sun" : "fa-moon", isDark ? "fa-moon" : "fa-sun");
});

/* --- open and close navbar--- */

hamburger.addEventListener("click", (event) => {
    const link = event.target;
    if (link && link.tagName === "A") {
        document.body.classList.remove("open");
        document.body.classList.remove("stopScrolling");
    }
});

hamburger.addEventListener("touchstart", (event) => {
    const link = event.target;
    if (link && link.tagName === "A") {
        document.body.classList.remove("open");
        document.body.classList.remove("stopScrolling");
    }
});

hamburger.addEventListener("click", () => {
    document.body.classList.toggle("open");
    document.body.classList.toggle("stopScrolling");
});
