
// Select the menu button
const menuToggle = document.getElementById("menu-toggle");

// Select the navigation
const mainNav = document.getElementById("main-nav");

// Listen for clicks on the menu button
menuToggle.addEventListener("click", function () {

    // Toggle the active class
    mainNav.classList.toggle("active");

    // Check whether the menu is open
    const isOpen = mainNav.classList.contains("active");

    // Update the button's appearance and accessibility state
    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

});


const navLinks = mainNav.querySelectorAll("a");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mainNav.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });

});


// Select the sections and cards to animate
const revealElements = document.querySelectorAll(
    ".content-section, .project-card, .skill-card, .experience-card"
);

// Create an observer
const revealObserver = new IntersectionObserver(
    function (entries, observer) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.15
    }
);

// Apply the reveal effect
revealElements.forEach(function (element) {

    element.classList.add("reveal");

    revealObserver.observe(element);

});

// Select all sections with IDs
const pageSections = document.querySelectorAll("main section[id]");

// Select all navigation links
const navigationLinks = document.querySelectorAll("#main-nav a");

// Observe sections as they enter the screen
const sectionObserver = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                // Remove active class from all links
                navigationLinks.forEach(function (link) {
                    link.classList.remove("active");
                });

                // Find the link matching the visible section
                const activeLink = document.querySelector(
                    '#main-nav a[href="#' + entry.target.id + '"]'
                );

                // Highlight the matching link
                if (activeLink) {
                    activeLink.classList.add("active");
                }

            }

        });

    },
    {
        threshold: 0.4
    }
);

// Observe every section
pageSections.forEach(function (section) {
    sectionObserver.observe(section);
});

// Select the Back to Top button
const backToTop = document.getElementById("back-to-top");

// Listen for scrolling
window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

// Scroll back to the top when clicked
backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// Select the contact form
const contactForm = document.getElementById("contact-form");

// Listen for form submission
contactForm.addEventListener("submit", function (event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Collect the visitor's information
    const name = document.getElementById("fullname").value.trim();

    const email = document.getElementById("email").value.trim();

    const message = document.getElementById("message").value.trim();

    // Check that the fields are not empty
    if (!name || !email || !message) {

        alert("Please complete all fields.");

        return;

    }

    // Prepare the email
    const subject = encodeURIComponent("Portfolio Contact from " + name);

    const body = encodeURIComponent(
        "Name: " + name +
        "\nEmail: " + email +
        "\n\nMessage:\n" + message
    );

    // Open the visitor's email application
    window.location.href =
        "mailto:igohigbunuisaiah91@gmail.com?subject=" +
        subject + "&body=" + body;

});

// Select the message field and character counter
const messageInput = document.getElementById("message");
const characterCount = document.getElementById("character-count");

// Listen for typing
messageInput.addEventListener("input", function () {

    // Count the characters
    const currentLength = messageInput.value.length;

    // Display the character count
    characterCount.textContent =
        currentLength + " / 500 characters";

});


// Select all filter buttons
const filterButtons = document.querySelectorAll(".filter-btn");

// Select all project cards
const projectCards = document.querySelectorAll(".project-card");

// Listen for clicks on each filter button
filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Get the selected category
        const selectedCategory = button.dataset.filter;

        // Update the active button
        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        // Filter the project cards
        projectCards.forEach(function (card) {

            const projectCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === projectCategory
            ) {
                card.classList.remove("hidden");
            } else {
                card.classList.add("hidden");
            }

        });

    });

});


// Dark and light mode with saved preference

const themeToggle = document.getElementById("theme-toggle");

// Check the visitor's saved preference
const savedTheme = localStorage.getItem("preferred-theme");

// Apply the saved theme when the page loads
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
}

// Update the theme button
function updateThemeButton() {
    const isLightMode = document.body.classList.contains("light-mode");

    themeToggle.textContent = isLightMode ? "🌙" : "☀️";

    themeToggle.setAttribute(
        "aria-label",
        isLightMode ? "Switch to dark mode" : "Switch to light mode"
    );
}

// Set the correct icon on page load
updateThemeButton();

// Switch and save the visitor's preference
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("light-mode");

    const isLightMode = document.body.classList.contains("light-mode");

    localStorage.setItem(
        "preferred-theme",
        isLightMode ? "light" : "dark"
    );

    updateThemeButton();
});

// Typing animation

const typingText = document.getElementById("typing-text");

const words = [
    "Frontend Developer",
    "Software Engineer",
    "Technology Builder",
    "Startup Co-founder"
];

let wordIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent = currentWord.substring(0, characterIndex);

    let typingSpeed = isDeleting ? 60 : 100;

    if (!isDeleting && characterIndex === currentWord.length) {
        isDeleting = true;
        typingSpeed = 1500;
    } else if (isDeleting && characterIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }

    setTimeout(typeEffect, typingSpeed);
}

typeEffect();

// Scroll progress indicator

const scrollProgress = document.getElementById("scroll-progress");

window.addEventListener("scroll", function () {
    const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const scrollPosition = window.scrollY;

    const progress =
        (scrollPosition / scrollableHeight) * 100;

    scrollProgress.style.width = progress + "%";
});

// Copy email address

const copyEmailButton = document.getElementById("copy-email");
const copyStatus = document.getElementById("copy-status");

copyEmailButton.addEventListener("click", function () {

    const email = "igohigbunuisaiah91@gmail.com";

    navigator.clipboard.writeText(email)
        .then(function () {
            copyStatus.textContent = "Email address copied successfully!";
        })
        .catch(function () {
            copyStatus.textContent = "Unable to copy. Please copy the email manually.";
        });

});

// Page loading screen

window.addEventListener("load", function () {
    const pageLoader = document.getElementById("page-loader");

    pageLoader.classList.add("loader-hidden");
});


