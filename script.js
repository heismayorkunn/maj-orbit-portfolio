
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


// Contact form powered by Formspree

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    const formData = new FormData(contactForm);

    // Prevent duplicate submissions
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formStatus.textContent = "Sending your message...";
    formStatus.classList.remove("success", "error");

    try {

        const response = await fetch(contactForm.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        });

        if (response.ok) {

            formStatus.textContent =
                "Your message has been sent successfully! I'll get back to you soon.";

            formStatus.classList.add("success");

            contactForm.reset();

            // Reset character counter
            document.getElementById("character-count").textContent =
                "0 / 500 characters";

       } else {

    const result = await response.json();

    formStatus.textContent =
        result.errors
            ? result.errors.map(error => error.message).join(", ")
            : "Sorry, your message could not be sent. Please try again.";

    formStatus.classList.add("error");

}

    } catch (error) {

        formStatus.textContent =
            "Network error. Please check your internet connection and try again.";

        formStatus.classList.add("error");

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Send Message →";

    }

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

    const progress = scrollableHeight > 0
    ? (scrollPosition / scrollableHeight) * 100
    : 0;

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


