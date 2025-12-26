// ============================================
// Reset on Refresh
// ============================================
// Scroll to top on page load/refresh
window.addEventListener('load', function() {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Clear any form data from localStorage
    localStorage.removeItem('contactFormData');
    
    // Reset contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.reset();
    }
    
    // Reset border colors
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    formInputs.forEach(input => {
        input.style.borderColor = '';
    });
    
    // Close mobile menu if open
    if (window.innerWidth <= 768) {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.querySelector('.nav-links');
        const mobileOverlay = document.querySelector('.mobile-overlay');
        
        if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        if (navLinks) navLinks.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// Theme Toggle (Dark/Light Mode)
// ============================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme');
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// ============================================
// Mobile Menu Toggle - FIXED VERSION
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
const mobileOverlay = document.createElement('div');
mobileOverlay.className = 'mobile-overlay';

// Insert overlay after navbar
document.querySelector('.navbar').insertAdjacentElement('afterend', mobileOverlay);

// Toggle mobile menu
function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
}

// Close mobile menu
function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    navLinks.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Event listeners
mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMobileMenu();
});

mobileOverlay.addEventListener('click', closeMobileMenu);

// Close menu when clicking on nav items
const navLinkElements = document.querySelectorAll('.nav-link');
navLinkElements.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            closeMobileMenu();
        }
    });
});

// Close menu when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        navLinks.classList.contains('active') &&
        !navLinks.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)) {
        closeMobileMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        closeMobileMenu();
    }
});

// Close menu on window resize if desktop
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
});

// ============================================
// Smooth Scroll for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Only process internal links
        if (href === '#') return;
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                closeMobileMenu();
            }
            
            const offsetTop = targetElement.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Navbar Hide/Show on Scroll
// ============================================
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Only apply hide/show on desktop, keep navbar visible on mobile
    if (window.innerWidth > 768) {
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.classList.add('hidden');
        } else {
            // Scrolling up
            navbar.classList.remove('hidden');
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// Active Navigation Link Highlighting
// ============================================
const sections = document.querySelectorAll('section[id]');

function highlightActiveLink() {
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveLink);
window.addEventListener('load', highlightActiveLink);

// ============================================
// Scroll Reveal Animation
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Add scroll-reveal class to elements you want to animate
const revealElements = document.querySelectorAll('.project-card, .service-card, .skill-item, .soft-skill-card, .about-text, .contact-method');
revealElements.forEach(el => {
    el.classList.add('scroll-reveal');
    observer.observe(el);
});

// ============================================
// Skill Progress Bar Animation
// ============================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            
            // Use setTimeout to trigger animation
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// ============================================
// Contact Form WhatsApp Integration
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('Mohon lengkapi semua field terlebih dahulu!');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Mohon masukkan email yang valid!');
            return;
        }
        
        // Format message for WhatsApp
        const whatsappMessage = `
Halo Edra, saya ${formData.name}!

*Subjek:* ${formData.subject}
*Email:* ${formData.email}

*Pesan:*
${formData.message}

---
*Pesan ini dikirim melalui website portfolio Edra Dipa Hafidzi.*
        `.trim();
        
        // WhatsApp number (085198674763)
        // Format: 62 (country code) + 85198674763 (without leading 0)
        const phoneNumber = '6285198674763';
        
        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        
        // Show confirmation message
        const userConfirmed = confirm(`Anda akan diarahkan ke WhatsApp untuk mengirim pesan:\n\nNama: ${formData.name}\nEmail: ${formData.email}\n\nKlik OK untuk melanjutkan.`);
        
        if (userConfirmed) {
            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Reset border colors
            const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
            formInputs.forEach(input => {
                input.style.borderColor = '';
            });
            
            // Clear localStorage
            localStorage.removeItem('contactFormData');
            
            // Optional: Track form submission in console
            console.log('Form submitted:', {
                ...formData,
                whatsappURL: whatsappURL
            });
        }
    });
}

// ============================================
// Form Validation Feedback
// ============================================
// Add real-time validation feedback
const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '') {
            this.style.borderColor = '#ff4757';
        } else {
            this.style.borderColor = '';
        }
    });
    
    // Special validation for email
    if (input.type === 'email') {
        input.addEventListener('input', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value.trim() !== '' && !emailRegex.test(this.value.trim())) {
                this.style.borderColor = '#ff4757';
            } else if (this.value.trim() !== '') {
                this.style.borderColor = '#2ecc71';
            } else {
                this.style.borderColor = '';
            }
        });
    }
});

// ============================================
// Initialize on DOM Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Highlight active link on page load
    highlightActiveLink();
    
    // Add smooth scroll to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// Handle Browser Back/Forward Navigation
// ============================================
// Force scroll to top when using browser back/forward buttons
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        window.scrollTo(0, 0);
    }
});

// ============================================
// Reset Form on Page Unload
// ============================================
// Clear form data when leaving the page
window.addEventListener('beforeunload', function() {
    // Remove saved form data
    localStorage.removeItem('contactFormData');
    
    // Reset form if it exists
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.reset();
    }
});

// ============================================
// Console Message
// ============================================
console.log('%c👋 Welcome to My Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cInterested in the code? Check out the repository!', 'color: #b4b4b8; font-size: 14px;');
console.log('%c💡 Tips: Form contact akan mengirim pesan langsung ke WhatsApp!', 'color: #6366f1; font-size: 14px;');