// Slide Management
let currentSlide = 0;
const slides = document.querySelectorAll('section');
const totalSlides = slides.length;

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSlides();
    setupNavigation();
    setupFormValidation();
});

function initializeSlides() {
    goToSlide(0); // Start with first slide visible
}

function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    currentSlide = index;
    updateActiveNavLink();
    toggleSlideVisibility();
    scrollToTop();
}

function updateActiveNavLink() {
    document.querySelector('.nav-links a.active')?.classList.remove('active');
    document.querySelector(`.nav-links a[href="#${slides[currentSlide].id}"]`)?.classList.add('active');
}

function toggleSlideVisibility() {
    slides.forEach((slide, i) => {
        slide.style.display = i === currentSlide ? 'block' : 'none';
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToSection(id) {
    const index = Array.from(slides).findIndex(slide => slide.id === id);
    goToSlide(index);
}

// Navigation Setup
function setupNavigation() {
    // Side tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const targetId = this.classList.contains('pink-tab') ? 'personal-details' : 'contact-us';
            scrollToSection(targetId);
        });
    });

    // Nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Form Handling
function setupFormValidation() {
    const form = document.querySelector('.personal-details-form');
    if (!form) return;

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this);
    });

    // Real-time validation
    form.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('input', () => validateForm(form));
    });
}

function handleFormSubmission(form) {
    const formData = {
        name: form.querySelector('input[type="text"]').value.trim(),
        phone: form.querySelector('input[type="tel"]').value.trim(),
        address: form.querySelector('textarea').value.trim()
    };

    // Validate form
    if (!validateFormFields(formData)) return;

    // Submit form (in a real app, you would send to server here)
    showToast('Thank you for your submission! ✅');
    form.reset();
}

function validateForm(form) {
    const submitBtn = form.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.disabled = !form.checkValidity();
    }
}

function validateFormFields({ name, phone, address }) {
    if (!name || !phone || !address) {
        showToast('Please fill in all fields', 'error');
        return false;
    }
    
    if (!/^[0-9]{10,15}$/.test(phone)) {
        showToast('Please enter a valid phone number', 'error');
        return false;
    }
    
    return true;
}

// Toast Notification System
function showToast(message, type = 'success') {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(toast => toast.remove());
    
    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Auto-remove after animation
    setTimeout(() => toast.remove(), 2500);
}