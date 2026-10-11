/* ==========================================================
   CONTACT.JS — Contact form validation
   IMPORTANT:
   This website has NO backend, so the form cannot save or
   email messages by itself. This script only:
     1. Checks that the fields are filled in correctly.
     2. Opens WhatsApp with the message pre-filled, so the
        visitor can press Send there to deliver it.
   ========================================================== */

// ---- EDIT THIS: your WhatsApp number, country code, NO plus sign, NO spaces ----
const WHATSAPP_NUMBER = "966500000000"; // PLACEHOLDER — replace it

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("contact-form");
  const statusBox = document.getElementById("form-status");

  if (!form) {
    return; // This script is only useful on the contact page
  }

  // ---- Validation helpers ----

  // Checks a simple email format like name@example.com
  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  // Accepts digits, spaces, +, - and brackets, with at least 7 digits
  function isValidPhone(value) {
    const digits = value.replace(/\D/g, "");
    return /^[+\d\s()-]+$/.test(value) && digits.length >= 7;
  }

  // Show or hide the error message under one field
  function setError(field, message) {
    const group = field.closest(".form-group");
    const errorBox = group.querySelector(".error-message");
    if (message) {
      group.classList.add("has-error");
      errorBox.textContent = message;
      field.setAttribute("aria-invalid", "true");
    } else {
      group.classList.remove("has-error");
      errorBox.textContent = "";
      field.setAttribute("aria-invalid", "false");
    }
  }

  // Check every field. Returns true only when all are valid.
  function validateForm() {
    const name = form.elements["fullName"];
    const phone = form.elements["phone"];
    const email = form.elements["email"];
    const subject = form.elements["subject"];
    const message = form.elements["message"];
    let allValid = true;

    if (name.value.trim().length < 3) {
      setError(name, "Please enter your full name (at least 3 letters).");
      allValid = false;
    } else {
      setError(name, "");
    }

    if (!isValidPhone(phone.value.trim())) {
      setError(phone, "Please enter a valid phone number.");
      allValid = false;
    } else {
      setError(phone, "");
    }

    if (!isValidEmail(email.value.trim())) {
      setError(email, "Please enter a valid email address.");
      allValid = false;
    } else {
      setError(email, "");
    }

    if (subject.value.trim().length < 3) {
      setError(subject, "Please write a short subject.");
      allValid = false;
    } else {
      setError(subject, "");
    }

    if (message.value.trim().length < 10) {
      setError(message, "Your message should be at least 10 characters.");
      allValid = false;
    } else {
      setError(message, "");
    }

    return allValid;
  }

  // Remove an error as soon as the visitor starts fixing the field
  form.querySelectorAll("input, textarea").forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.closest(".form-group").classList.contains("has-error")) {
        validateForm();
      }
    });
  });

  // ---- Form submission ----
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Stop the page from reloading

    if (!validateForm()) {
      statusBox.className = "form-status warning";
      statusBox.textContent = "Please fix the highlighted fields and try again.";
      return;
    }

    // Build the message text that will be pre-filled in WhatsApp
    const text =
      "New message from website\n\n" +
      "Name: " + form.elements["fullName"].value.trim() + "\n" +
      "Phone: " + form.elements["phone"].value.trim() + "\n" +
      "Email: " + form.elements["email"].value.trim() + "\n" +
      "Subject: " + form.elements["subject"].value.trim() + "\n\n" +
      form.elements["message"].value.trim();

    // encodeURIComponent makes spaces and symbols safe for a web link
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);

    statusBox.className = "form-status success";
    statusBox.textContent =
      "Your message is ready. WhatsApp will open — press Send there to deliver it.";

    window.open(url, "_blank");
    form.reset();
  });

});
