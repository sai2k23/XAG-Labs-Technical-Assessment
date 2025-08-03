let currentSlide = 0;
const slides = document.querySelectorAll('section');
const totalSlides = slides.length;

function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    currentSlide = index;
    document.querySelector('.nav-links a.active').classList.remove('active');
    document.querySelector(`.nav-links a[href="#${slides[index].id}"]`).classList.add('active');
    
    // Hide all slides
    slides.forEach(slide => {
        slide.style.display = 'none';
    });
    
    // Show current slide
    slides[currentSlide].style.display = 'block';
    
    // Smooth scroll to top of the slide
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToSection(id) {
    const index = Array.from(slides).findIndex(slide => slide.id === id);
    goToSlide(index);
}

// Initialize slides
goToSlide(0);

// Side tab functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const targetId = this.classList.contains('pink-tab') ? 'personal-details' : 'contact-us';
        scrollToSection(targetId);
    });
});

// Navigation link functionality
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});
// Add this to your script.js
document.querySelector('.personal-details-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = this.querySelector('input[type="text"]').value;
  const phone = this.querySelector('input[type="tel"]').value;
  const address = this.querySelector('textarea').value;
  
  // Basic validation
  if (!name || !phone || !address) {
    alert('Please fill in all fields');
    return;
  }
  
  // Phone number validation (basic)
  if (!/^[0-9]{10,15}$/.test(phone)) {
    alert('Please enter a valid phone number');
    return;
  }
  
  // Toast notification 
function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => toast.remove(), 3000);
}

// Usage
showToast(' ✅ Thank you for your submission!');
  
 
});