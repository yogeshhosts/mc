// Manvitha Wellness Empire - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initAnimatedCounters();
    initBMICalculator();
    initTestimonialCarousel();
    initScrollAnimations();
    initContactForm();
    initFloatingElements();
    initServiceCards();
    initSmoothScrolling();
    initBackToTop();
});

// Navigation functionality
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });
}

// Animated counters for statistics
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (current > target) current = target;
                
                // Format number display
                if (target === 500) {
                    counter.textContent = Math.ceil(current) + '+';
                } else if (target === 5) {
                    counter.textContent = Math.ceil(current) + '+';
                } else if (target === 98) {
                    counter.textContent = Math.ceil(current) + '%';
                } else {
                    counter.textContent = Math.ceil(current);
                }
                
                requestAnimationFrame(updateCounter);
            }
        };
        updateCounter();
    };

    // Intersection Observer for triggering animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                observer.unobserve(counter);
            }
        });
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// BMI Calculator functionality
function initBMICalculator() {
    const calculateBtn = document.getElementById('calculate-bmi');
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const bmiNumber = document.getElementById('bmi-number');
    const bmiCategory = document.getElementById('bmi-category');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateBMI);
    }

    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        if (!height || !weight || height <= 0 || weight <= 0) {
            showBMIError('Please enter valid height and weight values');
            return;
        }

        // Convert height from cm to meters
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        // Update display
        bmiNumber.textContent = bmi.toFixed(1);
        
        // Determine category and color
        let category, color;
        if (bmi < 18.5) {
            category = 'Underweight';
            color = '#3498db';
        } else if (bmi < 25) {
            category = 'Normal Weight';
            color = '#2E7D32';
        } else if (bmi < 30) {
            category = 'Overweight';
            color = '#FF8C00';
        } else {
            category = 'Obese';
            color = '#e74c3c';
        }

        bmiCategory.textContent = category;
        bmiNumber.style.color = color;
        
        // Add animation
        const result = document.getElementById('bmi-result');
        result.style.transform = 'scale(0.9)';
        result.style.transition = 'transform 0.3s ease';
        setTimeout(() => {
            result.style.transform = 'scale(1)';
        }, 100);

        // Show recommendation
        showBMIRecommendation(bmi);
    }

    function showBMIError(message) {
        bmiCategory.textContent = message;
        bmiCategory.style.color = '#e74c3c';
        bmiNumber.textContent = '0.0';
        bmiNumber.style.color = '#666';
    }

    function showBMIRecommendation(bmi) {
        let recommendation;
        if (bmi < 18.5) {
            recommendation = 'Consider consulting our nutritionist for healthy weight gain strategies.';
        } else if (bmi >= 25) {
            recommendation = 'Let us help you achieve your ideal weight with our personalized programs.';
        } else {
            recommendation = 'Great! Maintain your healthy weight with our wellness guidance.';
        }

        // Create recommendation element if it doesn't exist
        let recElement = document.getElementById('bmi-recommendation');
        if (!recElement) {
            recElement = document.createElement('div');
            recElement.id = 'bmi-recommendation';
            recElement.style.marginTop = '16px';
            recElement.style.fontSize = '14px';
            recElement.style.fontStyle = 'italic';
            document.getElementById('bmi-result').appendChild(recElement);
        }
        
        recElement.textContent = recommendation;
        recElement.style.color = '#666';
    }
}

// Testimonial carousel functionality
function initTestimonialCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.testimonial-dot');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Show current testimonial and dot
        if (testimonials[index]) {
            testimonials[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
    }

    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        });
    });

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Scroll animations
function initScrollAnimations() {
    const animationElements = document.querySelectorAll('.animate-fadeInUp, .animate-fadeInRight, .service-card, .feature-item, .transformation-img');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in', 'visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animationElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// Contact form functionality
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    function handleContactSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!validateContactForm(data)) {
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            showContactSuccess();
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    }

    function validateContactForm(data) {
        const { name, email, phone } = data;
        
        if (!name.trim()) {
            showContactError('Please enter your name');
            return false;
        }
        
        if (!email.trim() || !isValidEmail(email)) {
            showContactError('Please enter a valid email address');
            return false;
        }
        
        if (!phone.trim()) {
            showContactError('Please enter your phone number');
            return false;
        }
        
        return true;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showContactSuccess() {
        showNotification('Thank you! Your message has been sent. We\'ll get back to you soon.', 'success');
    }

    function showContactError(message) {
        showNotification(message, 'error');
    }

    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background: #2E7D32;' : 'background: #e74c3c;'}
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }
}

// Floating elements functionality
function initFloatingElements() {
    const floatingBtn = document.getElementById('floating-contact');
    
    if (floatingBtn) {
        floatingBtn.addEventListener('click', () => {
            window.location.href = 'tel:+919876543210';
        });
    }

    // Consultation buttons
    const consultationBtns = document.querySelectorAll('.btn-consultation');
    consultationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Service cards interactions
function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const service = card.getAttribute('data-service');
            handleServiceClick(service);
        });

        // Enhanced hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    function handleServiceClick(service) {
        // Pre-fill contact form with selected service
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.value = service;
        }

        // Scroll to contact form
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });

        // Highlight the form briefly
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.style.boxShadow = '0 0 20px rgba(46, 125, 50, 0.3)';
            setTimeout(() => {
                contactForm.style.boxShadow = '';
            }, 2000);
        }
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero buttons functionality
    const startJourneyBtns = document.querySelectorAll('.hero-buttons .btn--primary');
    const viewServicesBtns = document.querySelectorAll('.hero-buttons .btn--outline');

    startJourneyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    });

    viewServicesBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Back to top functionality
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');
    
    if (backToTopBtn) {
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Nutrition tips carousel (bonus feature)
function initNutritionTips() {
    const tips = [
        "💧 Start your day with a glass of water to boost metabolism",
        "🥗 Include colorful vegetables in every meal for optimal nutrition",
        "🥜 Healthy fats like nuts and seeds support hormone production",
        "🍎 Eat fruits as snacks instead of processed foods",
        "🥛 Choose Greek yogurt for protein and probiotics",
        "🌾 Opt for whole grains over refined carbohydrates"
    ];

    // Create tip element if it doesn't exist
    let tipElement = document.getElementById('nutrition-tip');
    if (!tipElement && document.querySelector('.hero')) {
        tipElement = document.createElement('div');
        tipElement.id = 'nutrition-tip';
        tipElement.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 20px;
            background: rgba(46, 125, 50, 0.9);
            color: white;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            max-width: 300px;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
            backdrop-filter: blur(10px);
        `;
        document.body.appendChild(tipElement);
    }

    let currentTip = 0;

    function showTip() {
        if (tipElement) {
            tipElement.textContent = tips[currentTip];
            tipElement.style.opacity = '1';
            tipElement.style.transform = 'translateY(0)';

            setTimeout(() => {
                tipElement.style.opacity = '0';
                tipElement.style.transform = 'translateY(20px)';
            }, 4000);

            currentTip = (currentTip + 1) % tips.length;
        }
    }

    // Show first tip after page load
    setTimeout(showTip, 3000);

    // Show tips every 8 seconds
    setInterval(showTip, 8000);
}

// Initialize nutrition tips
setTimeout(initNutritionTips, 1000);

// Add some extra interactivity
document.addEventListener('mousemove', (e) => {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatingIcons.forEach((icon, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        
        icon.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Performance optimization: Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            img.addEventListener('load', () => {
                img.style.opacity = '1';
            });
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
initLazyLoading();

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        const navMenu = document.querySelector('.nav-menu');
        const navToggle = document.querySelector('.nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }
});

// Add focus management for accessibility
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        const focusable = Array.from(document.querySelectorAll(focusableElements));
        const currentIndex = focusable.indexOf(document.activeElement);
        
        if (e.shiftKey) {
            // Shift + Tab (backwards)
            if (currentIndex <= 0) {
                e.preventDefault();
                focusable[focusable.length - 1].focus();
            }
        } else {
            // Tab (forwards)
            if (currentIndex >= focusable.length - 1) {
                e.preventDefault();
                focusable[0].focus();
            }
        }
    }
});