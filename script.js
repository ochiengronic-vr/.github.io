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
    // =====================================
    // 2. TEST JAVASCRIPT
    // =====================================

    console.log("Rocky Portfolio JavaScript is connected!");
    // =====================================
    // 3. MOBILE NAVIGATION
    // =====================================

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", function () {
            navLinks.classList.toggle("active");
            // Change hamburger icon
            const icon = menuBtn.querySelector("i");
            if (icon) {
                if (navLinks.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            }
        });
        // Close menu when navigation link is clicked
        const navItems = navLinks.querySelectorAll("a");
        navItems.forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("active");
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });
        });

    }
    // =====================================
    // 4. CLOSE MOBILE MENU WITH ESCAPE
    // =====================================
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            if (navLinks) {
                navLinks.classList.remove("active");
            }
            if (menuBtn) {
                const icon = menuBtn.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        }

    });
    // =====================================
    // 5. TYPING ANIMATION
    // =====================================
    if (typingText) {
        const messages = [
            "Full Stack Developer",
            "Software Engineering Student",
            "Cloud Engineering Enthusiast",
            "Cybersecurity",
            "Creative Problem Solver"
        ];

        let messageIndex = 0;
        let characterIndex = 0;
        let deleting = false;
        function typeEffect() {
            const currentMessage = messages[messageIndex];
            // Typing
            if (!deleting) {
                typingText.textContent =
                    currentMessage.substring(
                        0,
                        characterIndex + 1
                    );

                characterIndex++;
                // Finished typing
                if (characterIndex === currentMessage.length) {
                    deleting = true;
                    setTimeout(typeEffect, 1800);
                    return;
                }
            }
            // Deleting
            else {
                typingText.textContent =
                    currentMessage.substring(
                        0,
                        characterIndex - 1
                    );

                characterIndex--;
                // Finished deleting
                if (characterIndex === 0) {
                    deleting = false;
                    messageIndex++;
                    // Return to first message
                    if (messageIndex >= messages.length) {
                        messageIndex = 0;
                    }
                }
            }
            setTimeout(
                typeEffect,
                deleting ? 50 : 100
            );
        }
        typeEffect();
    }
    // =====================================
    // 6. DARK / LIGHT MODE
    // =====================================
    if (themeBtn) {
        const savedTheme =
            localStorage.getItem("rocky-theme");
        // Load saved theme

        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
            themeBtn.textContent = "☀️";
        } else {
            themeBtn.textContent = "🌙";
        }
        // Change theme
        themeBtn.addEventListener("click", function () {
            document.body.classList.toggle("light-mode");
            if (
                document.body.classList.contains("light-mode")
            ) {
                themeBtn.textContent = "☀️";
                localStorage.setItem(
                    "rocky-theme",
                    "light"
                );
            } else {
                themeBtn.textContent = "🌙";
                localStorage.setItem(
                    "rocky-theme",
                    "dark"
                );
            }
        });

    }
    // =====================================
    // 7. BACK TO TOP BUTTON
    // =====================================
    if (topBtn) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 500) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }
        });
        topBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
    // =====================================
    // 8. SMOOTH NAVIGATION
    // =====================================
    const allLinks =
        document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId =
                link.getAttribute("href");
            if (
                targetId &&
                targetId !== "#"
            ) {
                const target =
                    document.querySelector(targetId);
                if (target) {

                    event.preventDefault();
                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });
    // =====================================
    // 9. SCROLL REVEAL ANIMATION
    // =====================================
    const revealElements =
        document.querySelectorAll(
            ".card, .project-card, .service-card, .education-card"
        );
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
                threshold: 0.15
            }
        );
    revealElements.forEach(function (element) {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
    // =====================================
    // 10. ACTIVE NAVIGATION LINK
    // =====================================
    const sections =
        document.querySelectorAll("section[id]");
    const navigationItems =
        document.querySelectorAll(
            '#navLinks a[href^="#"]'
        );
    window.addEventListener("scroll", function () {
        let currentSection = "";
        sections.forEach(function (section) {
            const sectionTop =
                section.offsetTop - 150;
            const sectionHeight =
                section.offsetHeight;
            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {
                currentSection =
                    section.getAttribute("id");
            }
        });
        navigationItems.forEach(function (link) {
            link.classList.remove("active-link");
            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {
                link.classList.add(
                    "active-link"
                );
            }
        });
    });
    // =====================================
    // 11. AUTOMATIC COPYRIGHT YEAR
    // =====================================
    if (currentYear) {
        currentYear.textContent =
            new Date().getFullYear();

    }
    // =====================================
    // 12. PROJECT CARD INTERACTION
    // =====================================
    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );
    projectCards.forEach(function (card) {
        card.addEventListener(
            "mouseenter",
            function () {
                card.classList.add(
                    "project-hover"
                );
            }
        );
        card.addEventListener(
            "mouseleave",
            function () {
                card.classList.remove(
                    "project-hover"
                );
            }
        );
    });
    // =====================================
    // 13. SERVICE CARD INTERACTION
    // =====================================
    const serviceCards =
        document.querySelectorAll(
            ".service-card"
        );
    serviceCards.forEach(function (card) {
        card.addEventListener(
            "click",
            function () {
                card.classList.toggle(
                    "service-selected"
                );
            }
        );
    });
    // =====================================
    // 14. IMAGE LOADING EFFECT
    // =====================================]
    const profileImage =
        document.querySelector(".profile");
    if (profileImage) {
        profileImage.addEventListener(
            "load",
            function () {
                profileImage.classList.add(
                    "image-loaded"
                );
            }
        );
    }
    // =====================================
    // 15. CONSOLE INFORMATION
    // =====================================
    console.log(
        "🚀 Rocky Portfolio loaded successfully!"
    );
    // =====================================
// 16. API - FETCH USERS
// =====================================
const apiUsers = document.getElementById("apiUsers");
async function getApiData() {
    try {
        // Send request to API
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );
        // Convert response to JSON
        const users = await response.json();
        console.log("API DATA:");
        console.log(users);

        // Display users on website
        users.forEach(function(user) {
            const userCard =
                document.createElement("div");


            userCard.classList.add("api-card");
            userCard.innerHTML = `
                <h3>${user.name}</h3>
                <p>
                    Username: ${user.username}
                </p>
                <p>
                    Email: ${user.email}
                </p>
                <p>
                    City: ${user.address.city}
                </p>
            `;
            apiUsers.appendChild(userCard);
        });
    }
    catch (error) {
        console.error(
            "API Error:",
            error
        );
        apiUsers.innerHTML = `
            <p>
                Unable to load API data.
            </p>
        `;
    }
}
// Start API
if (apiUsers) {
    getApiData();
}
console.log(
    "💻 Full Stack Developer Portfolio"
);
// =====================================
// 16. GITHUB API
// =====================================

// GitHub HTML elements
const githubProjects =
    document.getElementById("githubProjects");
const repoSearch =
    document.getElementById("repoSearch");
const languageFilter =
    document.getElementById("languageFilter");
const githubProfileBtn =
    document.getElementById("githubProfileBtn");
// =====================================
// GITHUB USERNAME
// =====================================

const githubUsername = "ochiengronic-vr";
// =====================================
// GITHUB API URL
// =====================================
const githubAPI =
    `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=100`;
// Store repositories
let repositories = [];

// =====================================
// VIEW ALL GITHUB PROJECTS BUTTON
// =====================================

if (githubProfileBtn) {
    githubProfileBtn.href =
        `https://github.com/${githubUsername}`;
}
// =====================================
// LOAD GITHUB REPOSITORIES
// =====================================

async function loadGitHubProjects() {
    try {
        githubProjects.innerHTML = `
            <p class="loading">
                Loading GitHub projects...
            </p>
        `;
        const response =
            await fetch(githubAPI);
        // Check API response
        if (!response.ok) {
            throw new Error(
                `GitHub API Error: ${response.status}`
            );
        }
        // Convert response to JSON
        repositories =
            await response.json();
        console.log(
            "GitHub repositories:",
            repositories
        );
        // If there are no repositories
        if (repositories.length === 0) {
            githubProjects.innerHTML = `
                <p class="github-error">
                    No public GitHub repositories found.
                </p>
            `;
            return;
        }
        // Create language dropdown
        createLanguageFilters();
        // Display repositories
        displayRepositories(repositories);
    } catch (error) {
        console.error(
            "GitHub API Error:",
            error
        );
        githubProjects.innerHTML = `
            <p class="github-error">
                ❌ Unable to load GitHub projects.
                Please try again later.
            </p>
        `;
    }
}
// =====================================
// CREATE LANGUAGE FILTER
// =====================================

function createLanguageFilters() {
    if (!languageFilter) {
        return;
    }
    // Get languages
    const languages = repositories
        .map(function(repo) {
            return repo.language;
        })
        .filter(function(language) {
            return language !== null;
        });
    // Remove duplicate languages
    const uniqueLanguages =
        [...new Set(languages)];
    // Sort languages
    uniqueLanguages.sort();
    // Add languages to dropdown
    uniqueLanguages.forEach(function(language) {
        const option =
            document.createElement("option");
        option.value = language;
        option.textContent = language;
        languageFilter.appendChild(option);
    });
}
// =====================================
// DISPLAY REPOSITORIES
// =====================================
function displayRepositories(repos) {
    githubProjects.innerHTML = "";
    // No results
    if (repos.length === 0) {
        githubProjects.innerHTML = `
            <p class="no-results">
                🔎 No repositories match your search.
            </p>
        `;
        return;
    }
    // Create repository cards
    repos.forEach(function(repo) {
        const card =
            document.createElement("div");
        card.classList.add(
            "github-card"
        );
        // Description
        const description =
            repo.description ||
            "No description available.";
        // Language
        const language =
            repo.language ||
            "Not specified";
        // Create card
        card.innerHTML = `
            <h3>
                ${repo.name}
            </h3>
            <p>
                ${description}
            </p>
            <span class="github-language">
                ${language}
            </span>
            <div class="github-stats">
                <span class="github-stat">
                    ⭐ ${repo.stargazers_count}
                </span>
                <span class="github-stat">
                    🍴 ${repo.forks_count}
                </span>
            </div>
            <a
                href="${repo.html_url}"
                target="_blank"
                rel="noopener noreferrer"
                class="github-btn"
            >
                View Repository →
            </a>
        `;
        githubProjects.appendChild(card);
    });
}
// =====================================
// SEARCH + LANGUAGE FILTER
// =====================================

function filterRepositories() {
    const searchTerm =
        repoSearch.value
            .toLowerCase()
            .trim();
    const selectedLanguage =
        languageFilter.value;
    const filteredRepositories =
        repositories.filter(function(repo) {
            // Repository name
            const nameMatch =
                repo.name
                    .toLowerCase()
                    .includes(searchTerm);
            // Repository description
            const descriptionMatch =
                repo.description &&
                repo.description
                    .toLowerCase()
                    .includes(searchTerm);
            // Language
            const languageMatch =
                selectedLanguage === "all" ||
                repo.language === selectedLanguage;
            return (
                (nameMatch || descriptionMatch) &&
                languageMatch
            );

        });
    displayRepositories(
        filteredRepositories
    );
}
// =====================================
// SEARCH EVENT
// =====================================
if (repoSearch) {
    repoSearch.addEventListener(
        "input",
        filterRepositories
    );
}
// =====================================
// LANGUAGE FILTER EVENT
// =====================================
if (languageFilter) {
    languageFilter.addEventListener(
        "change",
        filterRepositories
    );
}
// =====================================
// START GITHUB API
// =====================================
if (githubProjects) {
    loadGitHubProjects();
}
})
