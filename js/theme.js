/* SCTTS - Shared Behaviour */


/* ---------- Theme ---------- */

function toggleTheme() {

    var html = document.documentElement;

    var theme = html.getAttribute("data-theme");

    if (theme == "dark") {
        html.setAttribute("data-theme", "light");
        localStorage.setItem("sctts-theme", "light");
    } else {
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("sctts-theme", "dark");
    }

    syncThemeIcon();
}


function syncThemeIcon() {

    var theme = document.documentElement.getAttribute("data-theme");

    var icons = document.querySelectorAll("[data-theme-icon]");

    for (var i = 0; i < icons.length; i++) {

        if (theme == "dark") {
            icons[i].className = "fa-solid fa-sun";
        } else {
            icons[i].className = "fa-solid fa-moon";
        }
    }
}


/* ---------- Toast ---------- */

function toast(message, description) {

    var box = document.getElementById("toasts");

    if (!box) {
        return;
    }

    var toastBox = document.createElement("div");

    toastBox.className = "toast";

    toastBox.innerHTML =
        "<strong>" + message + "</strong>";

    if (description) {
        toastBox.innerHTML +=
            "<small>" + description + "</small>";
    }

    box.appendChild(toastBox);

    setTimeout(function () {

        toastBox.classList.add("out");

        setTimeout(function () {
            toastBox.remove();
        }, 250);

    }, 3200);
}


/* ---------- Navbar ---------- */

document.addEventListener("DOMContentLoaded", function () {

    syncThemeIcon();


    // Navbar scroll
    var nav = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {

        if (nav) {

            if (window.scrollY > 12) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        }
    });


    // Mobile Menu
    var burger = document.querySelector(".burger");

    var menu = document.querySelector(".mobile-menu");

    if (burger && menu) {

        burger.addEventListener("click", function () {

            if (menu.classList.contains("open")) {

                menu.classList.remove("open");
                burger.classList.remove("open");

            } else {

                menu.classList.add("open");
                burger.classList.add("open");
            }
        });


        var links = menu.querySelectorAll("a");

        for (var i = 0; i < links.length; i++) {

            links[i].addEventListener("click", function () {

                menu.classList.remove("open");
                burger.classList.remove("open");
            });
        }
    }


    // Theme Button
    var themeButtons =
        document.querySelectorAll("[data-theme-toggle]");

    for (var i = 0; i < themeButtons.length; i++) {

        themeButtons[i].addEventListener("click", toggleTheme);
    }


    // Current Page
    var file =
        location.pathname.split("/").pop();

    if (file == "") {
        file = "index.html";
    }

    var links =
        document.querySelectorAll(".nav-links a, .mobile-menu a");

    for (var i = 0; i < links.length; i++) {

        if (links[i].getAttribute("href") == file) {
            links[i].classList.add("active");
        }
    }


    // Toast Buttons
    var buttons =
        document.querySelectorAll("[data-toast]");

    for (var i = 0; i < buttons.length; i++) {

        buttons[i].addEventListener("click", function () {

            var message =
                this.getAttribute("data-toast");

            var description =
                this.getAttribute("data-toast-desc");

            toast(message, description);
        });
    }


    // Reveal Animation
    var reveal =
        document.querySelectorAll(".reveal");

    for (var i = 0; i < reveal.length; i++) {

        reveal[i].classList.add("shown");
    }


    // Count Numbers
    var counters =
        document.querySelectorAll("[data-count]");

    for (var i = 0; i < counters.length; i++) {

        countUp(counters[i]);
    }

});


/* ---------- Count Up ---------- */

function countUp(element) {

    var number =
        Number(element.getAttribute("data-count"));

    var suffix =
        element.getAttribute("data-suffix") || "";

    var current = 0;

    var id = setInterval(function () {

        current++;

        element.textContent =
            current.toLocaleString() + suffix;

        if (current >= number) {
            clearInterval(id);
        }

    }, 20);
}