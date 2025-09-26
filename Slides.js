// Slides.js - JavaScript functionality for Web Forms Presentation

let currentSlideIndex = 0;
let slides = [];
let totalSlides = 0;

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeSlides();
});

function initializeSlides() {
  slides = document.querySelectorAll(".slide");
  totalSlides = slides.length;

  document.getElementById("totalSlides").textContent = totalSlides;
  showSlide(currentSlideIndex);
}

// --- Custom Message Box Function (Replacing alert()) ---
/**
 * Displays a non-blocking message box for the user.
 * @param {string} elementId The ID of the message box container (e.g., 'registerMessage').
 * @param {string} message The message text to display.
 * @param {boolean} isSuccess True for green success box, false for red error box.
 */
function showMessage(elementId, message, isSuccess = false) {
  const el = document.getElementById(elementId);
  if (el) {
    // Clear previous classes and set new ones
    el.classList.remove("success", "error");
    el.classList.add("message-box", isSuccess ? "success" : "error");

    el.innerHTML = message;
    el.style.display = "block";

    // Automatically hide the message after 5 seconds
    setTimeout(() => {
      el.style.display = "none";
    }, 5000);
  }
}

// Slide navigation functions
function showSlide(index) {
  if (slides.length === 0) {
    console.error("Slides not initialized yet");
    return;
  }

  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");

  document.getElementById("currentSlide").textContent = index + 1;

  // Update button states
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (prevBtn) prevBtn.disabled = index === 0;
  if (nextBtn) nextBtn.disabled = index === totalSlides - 1;
}

function nextSlide() {
  if (currentSlideIndex < totalSlides - 1) {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
  }
}

function previousSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
  }
}

// --- Demo functions (using the new showMessage) ---
function demoRegister() {
  const name = document.getElementById("demoName").value;
  const email = document.getElementById("demoEmail").value;
  const password = document.getElementById("demoPassword").value;
  const messageBoxId = "registerMessage";

  if (!name || !email || !password) {
    showMessage(messageBoxId, "Oops! Please fill in all fields. 🛑", false);
    return;
  }

  if (password.length < 6) {
    showMessage(
      messageBoxId,
      "Password must be at least 6 characters long. 🗝️",
      false
    );
    return;
  }

  if (!email.includes("@")) {
    showMessage(messageBoxId, "Please enter a valid email address. 📧", false);
    return;
  }

  showMessage(
    messageBoxId,
    "Account created successfully! Welcome, " + name + "! 🎉",
    true
  );

  // Clear the form
  document.getElementById("demoName").value = "";
  document.getElementById("demoEmail").value = "";
  document.getElementById("demoPassword").value = "";
}

function demoLogin() {
  const email = document.getElementById("loginDemoEmail").value;
  const password = document.getElementById("loginDemoPassword").value;
  const messageBoxId = "loginMessage";

  if (!email || !password) {
    showMessage(
      messageBoxId,
      "Please enter your email and password. 🛑",
      false
    );
    return;
  }

  showMessage(messageBoxId, "Login successful! Welcome back! 👋", true);

  // Clear the form
  document.getElementById("loginDemoEmail").value = "";
  document.getElementById("loginDemoPassword").value = "";
}

// --- Functions for Slide 7 (using the new showMessage, targeting validationOutput) ---
function register() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (name === "" || email === "" || password === "") {
    showMessage(
      "validationOutput",
      "Oops! Please fill in all fields. 🛑",
      false
    );
    return;
  }

  if (password.length < 6) {
    showMessage(
      "validationOutput",
      "Password must be at least 6 characters long. 🗝️",
      false
    );
    return;
  }

  if (!email.includes("@")) {
    showMessage(
      "validationOutput",
      "Please enter a valid email address. 📧",
      false
    );
    return;
  }

  showMessage(
    "validationOutput",
    "Success! Account created successfully! Welcome, " + name + "! 🎉",
    true
  );
}

function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  if (email === "" || password === "") {
    showMessage(
      "validationOutput",
      "Please enter your email and password. 🛑",
      false
    );
    return;
  }

  showMessage("validationOutput", "Login successful! Welcome back! 👋", true);
}

// Keyboard navigation
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") previousSlide();
});

// Make functions globally available
window.nextSlide = nextSlide;
window.previousSlide = previousSlide;
window.demoRegister = demoRegister;
window.demoLogin = demoLogin;
window.register = register;
window.login = login;
window.showMessage = showMessage;
