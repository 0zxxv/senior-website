/**
 * Wessal Edu - Future Schools Website
 * Senior Project - Kingdom of Bahrain
 * 
 * This script handles:
 * - Navigation scroll behavior
 * - Mobile menu toggle
 * - Scroll animations (fade-in effects)
 * - Form submission handling
 * - Smooth scrolling
 * - Phone gallery/slideshow functionality
 */

// ===================================
// DOM Elements
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const contactForm = document.getElementById('contactForm');

// Gallery elements
const fullscreenGallery = document.getElementById('fullscreenGallery');
const galleryClose = document.getElementById('galleryClose');
const galleryPrev = document.getElementById('galleryPrev');
const galleryNext = document.getElementById('galleryNext');
const galleryScreen = document.getElementById('galleryScreen');
const galleryUserType = document.getElementById('galleryUserType');
const galleryScreenName = document.getElementById('galleryScreenName');
const galleryCounter = document.getElementById('galleryCounter');

// ===================================
// App Screenshots Configuration
// ===================================
// Configure your screenshots here. Add your actual screenshot paths.
// The structure is: userType -> array of { name, image } objects
const appScreenshots = {
    student: [
        { name: 'Dashboard', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.35 AM.jpeg' },
        { name: 'Dashboard 2', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.36 AM.jpeg' },
        { name: 'Notifications', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.36 AM (1).jpeg' },
        { name: 'Side Menu', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.36 AM (2).jpeg' },
        { name: 'Homework', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.36 AM (3).jpeg' },
        { name: 'Profile', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.37 AM.jpeg' },
        { name: 'Attendance', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.37 AM (1).jpeg' },
        { name: 'Academic Year', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.37 AM (2).jpeg' },
        { name: 'Game 1 - Math CHallenge', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.37 AM (3).jpeg' },
        { name: 'Game 2 - Card Match', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.37 AM (4).jpeg' },
        { name: 'Game 3 - Speed Tap', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.38 AM.jpeg' },
        { name: 'Game 4 - Color Match', image: 'photos/student/WhatsApp Image 2026-01-13 at 1.09.38 AM (1).jpeg' },
    ],
    parent: [
        { name: 'Dashboard', image: 'photos/parent/WhatsApp Image 2026-01-13 at 1.22.27 AM.jpeg' },
        { name: 'Students Functions', image: 'photos/parent/WhatsApp Image 2026-01-13 at 1.22.27 AM (1).jpeg' },
        { name: 'Announcements', image: 'photos/parent/WhatsApp Image 2026-01-13 at 1.22.27 AM (2).jpeg' },
        { name: 'Chat', image: 'photos/parent/WhatsApp Image 2026-01-13 at 1.22.28 AM.jpeg' },
        { name: 'Chat 2', image: 'photos/parent/WhatsApp Image 2026-01-13 at 1.22.28 AM (1).jpeg' },
    ],
    teacher: [
        { name: 'Dashboard', image: 'photos/teacher/WhatsApp Image 2026-01-13 at 1.19.47 AM.jpeg' },
        { name: 'Dashboard 2', image: 'photos/teacher/WhatsApp Image 2026-01-13 at 1.19.47 AM (1).jpeg' },
        { name: 'Notifications', image: 'photos/teacher/WhatsApp Image 2026-01-13 at 1.19.48 AM.jpeg' },
        { name: 'Profile', image: 'photos/teacher/WhatsApp Image 2026-01-13 at 1.19.48 AM (1).jpeg' },
        { name: 'Attendance', image: 'photos/teacher/WhatsApp Image 2026-01-13 at 1.19.48 AM (2).jpeg' },
        { name: 'Manual Attendance', image: 'photos/teacher/WhatsApp Image 2026-01-13 at 1.19.48 AM (3).jpeg' },
        { name: 'Bracelet Attendance', image: 'photos/teacher/WhatsApp Image 2026-01-13 at 1.19.49 AM.jpeg' },
        { name: 'Camera AI Attendance', image: 'photos/teacher/WhatsApp Image 2026-01-13 at 1.19.49 AM (1).jpeg' },
        { name: 'Chat', image: 'photos/teacher/WhatsApp Image 2026-01-13 at 1.19.49 AM (2).jpeg' },
        { name: 'CHat 2', image: 'photos/teacher/WhatsApp Image 2026-01-13 at 1.19.49 AM (3).jpeg' },
        { name: 'Teacher Attendance', image: 'photos/teacher/WhatsApp Image 2026-01-13 at 1.19.49 AM (4).jpeg' },
    ],
    admin: [
        { name: 'Dashboard', image: 'photos/admin/WhatsApp Image 2026-01-13 at 1.25.01 AM.jpeg' },
        { name: 'Dashboard 2', image: 'photos/admin/WhatsApp Image 2026-01-13 at 1.25.03 AM.jpeg' },
    ],
    driver: [
        { name: 'Dashboard', image: 'photos/driver/WhatsApp Image 2026-01-13 at 1.26.37 AM.jpeg' },
        { name: 'Attendance', image: 'photos/driver/WhatsApp Image 2026-01-13 at 1.26.38 AM.jpeg' },
    ]
};

// User type display names
const userTypeNames = {
    student: 'Student',
    parent: 'Parent',
    teacher: 'Teacher',
    admin: 'Administrator',
    driver: 'Bus Driver'
};

// Gallery state
let currentUserType = null;
let currentScreenIndex = 0;

// ===================================
// Navigation Scroll Behavior
// ===================================
let lastScrollY = window.scrollY;

function handleNavbarScroll() {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class based on scroll position
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
}

// Throttled scroll handler for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

window.addEventListener('scroll', throttle(handleNavbarScroll, 10));

// ===================================
// Mobile Menu Toggle
// ===================================
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
}

navToggle.addEventListener('click', toggleMobileMenu);

// Close menu when clicking on a link
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !navToggle.contains(e.target)) {
        toggleMobileMenu();
    }
});

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
function initScrollAnimations() {
    // Elements to animate
    const animatedElements = document.querySelectorAll(
        '.vision-card, .pillar-card, .benefit-card, .tech-category, .phone-showcase-item, .section-header, .team-card'
    );
    
    // Add fade-in class to elements
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
    });
    
    // Create observer
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index within its container
                const parent = entry.target.parentElement;
                const siblings = parent.querySelectorAll('.fade-in');
                const index = Array.from(siblings).indexOf(entry.target);
                
                entry.target.style.transitionDelay = `${index * 100}ms`;
                entry.target.classList.add('visible');
                
                // Stop observing once animated
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each element
    animatedElements.forEach(el => observer.observe(el));
}

// ===================================
// Smooth Scrolling for Anchor Links
// ===================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Phone Gallery Functions
// ===================================
function initPhoneGallery() {
    // Add click handlers to phone showcase items
    const phoneItems = document.querySelectorAll('.phone-showcase-item');
    
    phoneItems.forEach(item => {
        item.addEventListener('click', () => {
            const userType = item.dataset.user;
            openGallery(userType);
        });
    });
    
    // Close button
    if (galleryClose) {
        galleryClose.addEventListener('click', closeGallery);
    }
    
    // Previous button
    if (galleryPrev) {
        galleryPrev.addEventListener('click', () => {
            navigateGallery(-1);
        });
    }
    
    // Next button
    if (galleryNext) {
        galleryNext.addEventListener('click', () => {
            navigateGallery(1);
        });
    }
    
    // Close on background click
    if (fullscreenGallery) {
        fullscreenGallery.addEventListener('click', (e) => {
            if (e.target === fullscreenGallery) {
                closeGallery();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!fullscreenGallery || !fullscreenGallery.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeGallery();
                break;
            case 'ArrowLeft':
                navigateGallery(-1);
                break;
            case 'ArrowRight':
                navigateGallery(1);
                break;
        }
    });
}

function openGallery(userType) {
    if (!appScreenshots[userType] || appScreenshots[userType].length === 0) {
        console.log(`No screenshots configured for ${userType}`);
        // Still open the gallery with a placeholder message
    }
    
    currentUserType = userType;
    currentScreenIndex = 0;
    
    updateGalleryDisplay();
    
    fullscreenGallery.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    fullscreenGallery.classList.remove('active');
    document.body.style.overflow = '';
    currentUserType = null;
    currentScreenIndex = 0;
}

function navigateGallery(direction) {
    if (!currentUserType) return;
    
    const screenshots = appScreenshots[currentUserType];
    if (!screenshots || screenshots.length === 0) return;
    
    currentScreenIndex += direction;
    
    // Loop around
    if (currentScreenIndex < 0) {
        currentScreenIndex = screenshots.length - 1;
    } else if (currentScreenIndex >= screenshots.length) {
        currentScreenIndex = 0;
    }
    
    updateGalleryDisplay();
}

function updateGalleryDisplay() {
    if (!currentUserType) return;
    
    const screenshots = appScreenshots[currentUserType];
    const userTypeName = userTypeNames[currentUserType] || currentUserType;
    
    // Update user type display
    if (galleryUserType) {
        galleryUserType.textContent = userTypeName;
    }
    
    if (!screenshots || screenshots.length === 0) {
        // Show placeholder for no screenshots
        if (galleryScreen) {
            galleryScreen.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #1d2599, #2630b3); color: white; padding: 20px; text-align: center;">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width: 60px; height: 60px; margin-bottom: 16px; opacity: 0.7;">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <p style="font-size: 14px; opacity: 0.8;">Add your ${userTypeName} screenshots to:<br><code style="background: rgba(255,255,255,0.2); padding: 4px 8px; border-radius: 4px; margin-top: 8px; display: inline-block;">screenshots/${currentUserType}/</code></p>
                </div>
            `;
        }
        if (galleryScreenName) {
            galleryScreenName.textContent = 'No screenshots yet';
        }
        if (galleryCounter) {
            galleryCounter.textContent = '0 / 0';
        }
        return;
    }
    
    const currentScreen = screenshots[currentScreenIndex];
    
    // Update screen display
    if (galleryScreen) {
        galleryScreen.innerHTML = `
            <img src="${currentScreen.image}" alt="${currentScreen.name}" 
                 onerror="this.onerror=null; this.parentElement.innerHTML='<div style=\\'display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #1d2599, #2630b3); color: white; padding: 20px; text-align: center;\\'><svg viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1.5\\' style=\\'width: 60px; height: 60px; margin-bottom: 16px; opacity: 0.7;\\'><rect x=\\'3\\' y=\\'3\\' width=\\'18\\' height=\\'18\\' rx=\\'2\\' ry=\\'2\\'/><circle cx=\\'8.5\\' cy=\\'8.5\\' r=\\'1.5\\'/><polyline points=\\'21 15 16 10 5 21\\'/></svg><p style=\\'font-size: 14px; opacity: 0.8;\\'>${currentScreen.name}<br><small>Image not found</small></p></div>';">
        `;
    }
    
    // Update screen name
    if (galleryScreenName) {
        galleryScreenName.textContent = currentScreen.name;
    }
    
    // Update counter
    if (galleryCounter) {
        galleryCounter.textContent = `${currentScreenIndex + 1} / ${screenshots.length}`;
    }
    
    // Update button states
    updateGalleryButtons();
}

function updateGalleryButtons() {
    // Buttons are always enabled since we loop around
    // But you could disable them at edges if preferred
}

// ===================================
// Contact Form Handling
// ===================================
function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="32" stroke-dashoffset="32">
                    <animate attributeName="stroke-dashoffset" values="32;0" dur="1s" repeatCount="indefinite"/>
                </circle>
            </svg>
        `;
        
        // Collect form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Simulate form submission (replace with actual API call)
        try {
            await simulateFormSubmission(data);
            
            // Show success message
            showNotification('Thank you! Your message has been sent successfully.', 'success');
            contactForm.reset();
        } catch (error) {
            // Show error message
            showNotification('Oops! Something went wrong. Please try again.', 'error');
        } finally {
            // Restore button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
        }
    });
}

// Simulate form submission (demo purposes)
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        console.log('Form data submitted:', data);
        setTimeout(() => {
            // Simulate 90% success rate
            if (Math.random() > 0.1) {
                resolve({ success: true });
            } else {
                reject(new Error('Network error'));
            }
        }, 1500);
    });
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification-toast notification-${type}`;
    notification.innerHTML = `
        <span class="notification-icon">${type === 'success' ? '✓' : '!'}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">&times;</button>
    `;
    
    // Add styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notification-toast {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 16px 20px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        }
        
        .notification-success {
            border-left: 4px solid #00b894;
        }
        
        .notification-error {
            border-left: 4px solid #d63031;
        }
        
        .notification-icon {
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            font-size: 14px;
            font-weight: bold;
        }
        
        .notification-success .notification-icon {
            background: #00b894;
            color: white;
        }
        
        .notification-error .notification-icon {
            background: #d63031;
            color: white;
        }
        
        .notification-message {
            flex: 1;
            color: #333;
            font-size: 14px;
        }
        
        .notification-close {
            background: none;
            border: none;
            font-size: 20px;
            color: #999;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-close:hover {
            color: #333;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        closeNotification(notification);
    });
    
    // Auto close after 5 seconds
    setTimeout(() => {
        closeNotification(notification);
    }, 5000);
}

function closeNotification(notification) {
    if (!notification) return;
    
    notification.style.animation = 'slideOut 0.3s ease-out forwards';
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// ===================================
// Pillar Cards Hover Effect
// ===================================
function initPillarHoverEffects() {
    const pillarCards = document.querySelectorAll('.pillar-card');
    
    pillarCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Add subtle tilt effect
            card.style.transform = 'translateY(-5px) perspective(1000px) rotateX(2deg)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===================================
// Team Card Hover Effects
// ===================================
function initTeamCardEffects() {
    const teamCards = document.querySelectorAll('.team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===================================
// Stats Counter Animation
// ===================================
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                
                // Only animate if it's a number
                if (!isNaN(parseInt(finalValue))) {
                    animateNumber(target, 0, parseInt(finalValue), 1000);
                }
                
                observer.unobserve(target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => observer.observe(stat));
}

function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        const currentValue = Math.floor(start + (end - start) * easeOut);
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = end;
        }
    }
    
    requestAnimationFrame(update);
}

// ===================================
// Keyboard Navigation Support
// ===================================
function initKeyboardSupport() {
    // Handle escape key to close mobile menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    });
    
    // Add focus trap for mobile menu
    const focusableElements = navMenu.querySelectorAll('a, button');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    navMenu.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        
        if (e.shiftKey) {
            if (document.activeElement === firstFocusable) {
                lastFocusable.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastFocusable) {
                firstFocusable.focus();
                e.preventDefault();
            }
        }
    });
}

// ===================================
// Parallax Effect for Hero Orbs
// ===================================
function initParallax() {
    const orbs = document.querySelectorAll('.orb');
    
    // Only enable parallax on desktop
    if (window.matchMedia('(min-width: 768px)').matches) {
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 50;
            const y = (e.clientY - window.innerHeight / 2) / 50;
            
            orbs.forEach((orb, index) => {
                const speed = (index + 1) * 0.5;
                orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            });
        });
    }
}

// ===================================
// CV Download Handler
// ===================================
function initCVDownloads() {
    const cvButtons = document.querySelectorAll('.cv-download');
    
    cvButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const member = button.dataset.member;
            
            // Update these paths to your actual CV file locations
            const cvPaths = {
                zahra: 'cv/zahra-cv.pdf',
                hanan: 'cv/hanan-cv.pdf',
                fatima: 'cv/fatima-cv.pdf',
                ahmed: 'cv/ahmed-cv.pdf'
            };
            
            if (cvPaths[member]) {
                // Create a temporary link and trigger download
                const link = document.createElement('a');
                link.href = cvPaths[member];
                link.download = `${member}-cv.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                showNotification('CV download not available yet.', 'info');
            }
        });
    });
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    initScrollAnimations();
    initSmoothScroll();
    initContactForm();
    initPillarHoverEffects();
    initTeamCardEffects();
    initPhoneGallery();
    initCVDownloads();
    animateStats();
    initKeyboardSupport();
    initParallax();
    
    // Initial navbar check
    handleNavbarScroll();
    
    console.log('🎓 Wessal Edu website initialized successfully!');
    console.log('📚 Future Schools Project - Kingdom of Bahrain');
    console.log('👥 Team: Zahra, Hanan, Fatima, Ahmed');
});

// ===================================
// Handle Window Resize
// ===================================
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
            toggleMobileMenu();
        }
    }, 250);
});

// ===================================
// Touch Swipe Support for Gallery
// ===================================
let touchStartX = 0;
let touchEndX = 0;

if (fullscreenGallery) {
    fullscreenGallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    fullscreenGallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next
            navigateGallery(1);
        } else {
            // Swipe right - previous
            navigateGallery(-1);
        }
    }
}

// ===================================
// Service Worker Registration (Optional - for PWA)
// ===================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment below to register service worker for PWA functionality
        // navigator.serviceWorker.register('/sw.js')
        //     .then(reg => console.log('Service Worker registered'))
        //     .catch(err => console.log('Service Worker registration failed:', err));
    });
}
