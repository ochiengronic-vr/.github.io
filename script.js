// =====================================
// ROCKY PORTFOLIO JAVASCRIPT
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. GET HTML ELEMENTS
    // =====================================

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");
    const themeBtn = document.getElementById("themeBtn");
    const topBtn = document.getElementById("topBtn");
    const typingText = document.getElementById("typingText");
    const currentYear = document.getElementById("currentYear");
    const profileImage = document.querySelector(".profile");

    console.log("Rocky Portfolio JavaScript is connected!");

    // =====================================
    // 2. MOBILE NAVIGATION
    // =====================================

    function closeMobileMenu() {
        if (!navLinks) return;

        navLinks.classList.remove("active");

        if (menuBtn) {
            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        }
    }

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            const isOpen = navLinks.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-bars", "fa-xmark");
                icon.classList.add(isOpen ? "fa-xmark" : "fa-bars");
            }
        });

        const navItems = navLinks.querySelectorAll("a");

        navItems.forEach(function (link) {
            link.addEventListener("click", function () {
                closeMobileMenu();
            });
        });
    }

    // Close mobile menu with Escape
    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMobileMenu();
        }
    });

    // =====================================
    // 3. TYPING ANIMATION
    // =====================================

    if (typingText) {

        const messages = [
            "Full Stack Developer",
            "Software Engineering Student",
            "Cloud Engineering Enthusiast",
            "Cybersecurity Enthusiast",
            "Creative Problem Solver"
        ];

        let messageIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentMessage = messages[messageIndex];

            if (!deleting) {

                characterIndex++;

                typingText.textContent =
                    currentMessage.substring(0, characterIndex);

                if (characterIndex >= currentMessage.length) {

                    deleting = true;

                    setTimeout(typeEffect, 1800);

                    return;
                }

            } else {

                characterIndex--;

                typingText.textContent =
                    currentMessage.substring(0, characterIndex);

                if (characterIndex <= 0) {

                    characterIndex = 0;
                    deleting = false;

                    messageIndex++;

                    if (messageIndex >= messages.length) {
                        messageIndex = 0;
                    }
                }
            }

            setTimeout(
                typeEffect,
                deleting ? 45 : 85
            );
        }

        typeEffect();
    }

    // =====================================
    // 4. DARK / LIGHT MODE
    // =====================================

    if (themeBtn) {

        const savedTheme =
            localStorage.getItem("rocky-theme");

        if (savedTheme === "light") {

            document.body.classList.add("light-mode");

            themeBtn.textContent = "☀️";

            themeBtn.setAttribute(
                "aria-label",
                "Switch to dark mode"
            );

        } else {

            themeBtn.textContent = "🌙";

            themeBtn.setAttribute(
                "aria-label",
                "Switch to light mode"
            );
        }

        themeBtn.addEventListener("click", function () {

            const lightMode =
                document.body.classList.toggle("light-mode");

            if (lightMode) {

                themeBtn.textContent = "☀️";

                themeBtn.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );

                localStorage.setItem(
                    "rocky-theme",
                    "light"
                );

            } else {

                themeBtn.textContent = "🌙";

                themeBtn.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );

                localStorage.setItem(
                    "rocky-theme",
                    "dark"
                );
            }
        });
    }

    // =====================================
    // 5. BACK TO TOP BUTTON
    // =====================================

    if (topBtn) {

        function updateTopButton() {

            if (window.scrollY > 500) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }
        }

        window.addEventListener(
            "scroll",
            updateTopButton,
            { passive: true }
        );

        updateTopButton();

        topBtn.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // =====================================
    // 6. SMOOTH NAVIGATION
    // =====================================

    const allLinks =
        document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            let target = null;

            try {
                target = document.querySelector(targetId);
            } catch (error) {
                console.warn(
                    "Invalid navigation target:",
                    targetId
                );
                return;
            }

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // =====================================
    // 7. SCROLL REVEAL ANIMATION
    // =====================================

    const revealElements =
        document.querySelectorAll(
            ".card, .project-card, .service-card, .education-card, .interest-card"
        );

    if (revealElements.length > 0) {

        if ("IntersectionObserver" in window) {

            const revealObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(function (entry) {

                            if (entry.isIntersecting) {

                                entry.target.classList.add(
                                    "reveal-show"
                                );

                                revealObserver.unobserve(
                                    entry.target
                                );
                            }
                        });
                    },
                    {
                        threshold: 0.12,
                        rootMargin: "0px 0px -40px 0px"
                    }
                );

            revealElements.forEach(function (element, index) {

                element.classList.add("reveal");

                element.style.transitionDelay =
                    Math.min(index * 45, 250) + "ms";

                revealObserver.observe(element);
            });

        } else {

            revealElements.forEach(function (element) {
                element.classList.add("reveal-show");
            });
        }
    }

    // =====================================
    // 8. ACTIVE NAVIGATION LINK
    // =====================================

    const sections =
        document.querySelectorAll("section[id]");

    const navigationItems =
        document.querySelectorAll(
            '#navLinks a[href^="#"]'
        );

    if (
        sections.length > 0 &&
        navigationItems.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        const currentId =
                            entry.target.getAttribute("id");

                        navigationItems.forEach(function (link) {

                            link.classList.toggle(
                                "active-link",
                                link.getAttribute("href") ===
                                "#" + currentId
                            );
                        });
                    });

                },
                {
                    rootMargin: "-35% 0px -55% 0px"
                }
            );

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    }

    // =====================================
    // 9. AUTOMATIC COPYRIGHT YEAR
    // =====================================

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();
    }

    // =====================================
    // 10. PROJECT CARD INTERACTION
    // =====================================

    const projectCards =
        document.querySelectorAll(".project-card");

    projectCards.forEach(function (card) {

        card.addEventListener(
            "mouseenter",
            function () {
                card.classList.add("project-hover");
            }
        );

        card.addEventListener(
            "mouseleave",
            function () {
                card.classList.remove("project-hover");
            }
        );
    });

    // =====================================
    // 11. SERVICE CARD INTERACTION
    // =====================================

    const serviceCards =
        document.querySelectorAll(".service-card");

    serviceCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {
                card.classList.toggle("service-selected");
            }
        );
    });

    // =====================================
    // 12. PROFILE IMAGE
    // =====================================

    if (profileImage) {

        function imageLoaded() {
            profileImage.classList.add("image-loaded");
        }

        if (profileImage.complete) {
            imageLoaded();
        } else {
            profileImage.addEventListener(
                "load",
                imageLoaded,
                { once: true }
            );
        }

        profileImage.addEventListener(
            "error",
            function () {
                console.warn(
                    "Profile image could not be loaded."
                );
            },
            { once: true }
        );
    }

    // =====================================
    // 13. PAGE TITLE WHEN TAB CHANGES
    // =====================================

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                document.title =
                    "Come back — Rocky Portfolio";

            } else {

                document.title =
                    "Rocky Portfolio";
            }
        }
    );

    // =====================================
    // 14. DISABLE GITHUB JAVASCRIPT
    // =====================================
    // The GitHub section is hidden in the CSS,
    // so no GitHub API request is made.

    console.log(
        "💻 Full Stack Developer Portfolio ready!"
    );

});
