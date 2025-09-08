document.addEventListener("DOMContentLoaded", () => {
  // === GLOBAL FEATURES (WORKS ACROSS ALL DEVICES) ===

  // 1. NAVBAR TOGGLE (Mobile-friendly)
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show");
      navToggle.setAttribute(
        "aria-expanded",
        navMenu.classList.contains("show") ? "true" : "false"
      );
    });
  }

  // 2. SCROLL TO TOP BUTTON (Progressive Enhancement)
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    const toggleScrollBtn = () => {
      scrollTopBtn.classList.toggle("visible", window.scrollY > 300);
    };
    window.addEventListener("scroll", toggleScrollBtn, { passive: true });
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    toggleScrollBtn(); // Run on page load
  }

  // 3. PAGE LOAD ANIMATION
  requestAnimationFrame(() => {
    document.body.classList.add("loaded");
  });

  // === PAGE-SPECIFIC FEATURES ===

  // --- Bootstrap Toast Function ---
  function showToast(message, type = "primary") {
    const toastEl = document.getElementById("liveToast");
    const toastMessage = document.getElementById("toastMessage");

    if (!toastEl || !toastMessage) return; // Skip if toast not present

    // Update toast content and style
    toastMessage.textContent = message;
    toastEl.className = `toast align-items-center text-white border-0 text-bg-${type}`;

    // Show toast
    new bootstrap.Toast(toastEl, { delay: 3000 }).show();
  }

  // --- CONTACT FORM (Only runs if form exists) ---
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Sending...`;

      const formData = new FormData(contactForm);

      try {
        const res = await fetch("contact.php", { method: "POST", body: formData });
        const responseText = (await res.text()).trim();

        if (responseText === "success") {
          showToast("Your message has been sent successfully!", "success");
          contactForm.reset();
        } else {
          showToast("Failed to send message. Try again.", "danger");
        }
      } catch {
        showToast("Network error. Please try again.", "danger");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send Message";
      }
    });
  }
});
