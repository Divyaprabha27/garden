// ===== GLOBAL VARIABLES =====
let currentTheme = localStorage.getItem('theme') || 'light'; // Use saved theme or default to light
let isScrolling = false;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    // Use saved theme preference
    currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    initializeTheme();
    initializeScrollAnimations();
    initializeTypingEffect();
    initializeCounters();
    initializeBackToTop();
    initializeGardenMap();
    initializeEventFilters();
    initializeCalendar();
    initializeMembershipForm();
    initializeNewsletterForms();
    initializeSmoothScroll();
    initializeParallax();
    initializeFloatingLeaves();
    initializeResponsiveFixes();
});

// ===== RESPONSIVE FIXES =====
function initializeResponsiveFixes() {
    // Prevent horizontal scroll
    preventHorizontalScroll();
    
    // Fix mobile viewport issues
    fixMobileViewport();
    
    // Handle window resize
    window.addEventListener('resize', debounce(() => {
        preventHorizontalScroll();
        fixMobileViewport();
    }, 250));
}

function preventHorizontalScroll() {
    const elements = document.querySelectorAll('img, video, iframe, .container, .container-fluid');
    elements.forEach(el => {
        if (el.scrollWidth > window.innerWidth) {
            el.style.maxWidth = '100%';
            el.style.overflow = 'hidden';
        }
    });
}

function fixMobileViewport() {
    // Fix mobile viewport height issues
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    // Update on resize
    window.addEventListener('resize', () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    });
}

// ===== THEME TOGGLE =====
function initializeTheme() {
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeToggle();
    
    // Add click event to desktop theme toggle button
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            toggleTheme();
        });
    }
    
    // Add click event to mobile theme toggle button
    const mobileThemeToggle = document.getElementById('mobileThemeToggle');
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', () => {
            toggleTheme();
        });
    }
    
    // Add keyboard shortcut for theme toggle (Ctrl/Cmd + Shift + D)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            toggleTheme();
        }
    });
}

function setTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeToggle();
    
    // Add smooth transition effect
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Update all theme-aware components
    updateThemeComponents();
    
    // Show theme change notification
    showThemeNotification(currentTheme);
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(currentTheme);
}

function updateThemeComponents() {
    // Update cards
    const cards = document.querySelectorAll('.glass-card, .card');
    cards.forEach(card => {
        card.style.transition = 'background-color 0.3s ease, border-color 0.3s ease';
    });
    
    // Update forms
    const forms = document.querySelectorAll('.form-control, .form-select');
    forms.forEach(form => {
        form.style.transition = 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease';
    });
    
    // Update navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.transition = 'background-color 0.3s ease, border-color 0.3s ease';
    }
}

function updateThemeToggle() {
    // Update desktop theme toggle icon
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        if (currentTheme === 'dark') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }
    
    // Update mobile theme toggle icon
    const mobileThemeIcon = document.getElementById('mobileThemeIcon');
    if (mobileThemeIcon) {
        if (currentTheme === 'dark') {
            mobileThemeIcon.className = 'fas fa-moon';
        } else {
            mobileThemeIcon.className = 'fas fa-sun';
        }
    }
}

function showThemeNotification(theme) {
    // Remove existing notification
    const existingNotification = document.querySelector('.theme-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.innerHTML = `
        <i class="fas ${theme === 'light' ? 'fa-sun' : 'fa-moon'}"></i>
        <span>${theme === 'light' ? 'Light Mode' : 'Dark Mode'} Activated</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${theme === 'light' ? 'var(--leaf-green)' : 'var(--forest-green)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        display: flex;
        align-items: center;
        gap: 0.5rem;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 2 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 2000);
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== MOBILE MENU ENHANCEMENTS =====
function initializeMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const offcanvas = document.querySelector('.offcanvas');
    
    if (navbarToggler && offcanvas) {
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!offcanvas.contains(e.target) && !navbarToggler.contains(e.target)) {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            }
        });
    }
}

// Initialize mobile menu on DOM load
document.addEventListener('DOMContentLoaded', initializeMobileMenu);

// ===== TYPING EFFECT (DISABLED) =====
function initializeTypingEffect() {
    // Typing animation disabled to keep text stable
    // Remove any existing typing animations
    const typingElements = document.querySelectorAll('.typing-text');
    typingElements.forEach(element => {
        element.style.borderRight = 'none';
        element.style.animation = 'none';
    });
}

// ===== COUNTER ANIMATION =====
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                const hasPlusSign = counter.textContent.includes('+');
                let count = 0;
                
                const updateCount = () => {
                    const increment = target / speed;
                    count += increment;
                    
                    if (count < target) {
                        const displayValue = Math.ceil(count);
                        counter.textContent = hasPlusSign ? `${displayValue.toLocaleString()}+` : displayValue.toLocaleString();
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.textContent = hasPlusSign ? `${target.toLocaleString()}+` : target.toLocaleString();
                    }
                };
                
                updateCount();
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.glass-card, .benefit-item, .collection-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        scrollObserver.observe(element);
    });
}

// ===== BACK TO TOP BUTTON =====
function initializeBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== GARDEN MAP INTERACTIONS =====
function initializeGardenMap() {
    const zones = document.querySelectorAll('.garden-zone');
    const zoneDetails = document.getElementById('zoneDetails');
    
    const zoneInfo = {
        entrance: {
            title: 'Main Entrance',
            description: 'Welcome to Green Haven! Our visitor center offers maps, information, and a beautiful gift shop with botanical treasures.',
            features: ['Visitor Center', 'Gift Shop', 'Information Desk', 'Restrooms'],
            hours: '9:00 AM - 6:00 PM'
        },
        rose: {
            title: 'Rose Garden',
            description: 'Our crown jewel featuring over 200 rose varieties from around the world. Peak bloom season is June through October.',
            features: ['Heritage Roses', 'Modern Hybrids', 'Climbing Roses', 'Fragrance Garden'],
            hours: '9:00 AM - 6:00 PM'
        },
        japanese: {
            title: 'Japanese Garden',
            description: 'A tranquil landscape designed in traditional Japanese style featuring a koi pond, tea house, and zen garden.',
            features: ['Tea House', 'Koi Pond', 'Zen Garden', 'Maple Collection'],
            hours: '9:00 AM - 5:00 PM'
        },
        tropical: {
            title: 'Tropical Conservatory',
            description: 'Year-round tropical paradise with exotic plants, waterfalls, and butterflies in our climate-controlled glasshouse.',
            features: ['Exotic Plants', 'Waterfall', 'Butterfly Exhibit', 'Humid Environment'],
            hours: '10:00 AM - 4:00 PM'
        },
        woodland: {
            title: 'Woodland Trail',
            description: 'Native forest ecosystem with mature trees, wildlife habitats, and peaceful walking paths through natural woodland.',
            features: ['Native Trees', 'Wildlife Viewing', 'Walking Trails', 'Educational Signs'],
            hours: 'Dawn to Dusk'
        },
        herb: {
            title: 'Herb Garden',
            description: 'Fragrant collection of medicinal and culinary herbs arranged by use and origin, with demonstrations and workshops.',
            features: ['Medicinal Herbs', 'Culinary Herbs', 'Demonstration Area', 'Sensory Garden'],
            hours: '9:00 AM - 6:00 PM'
        },
        children: {
            title: 'Children\'s Garden',
            description: 'Interactive learning space designed for young explorers with hands-on activities, play areas, and educational programs.',
            features: ['Play Area', 'Learning Activities', 'Story Circle', 'Interactive Exhibits'],
            hours: '10:00 AM - 5:00 PM'
        },
        cafe: {
            title: 'Garden Café',
            description: 'Relaxing dining spot with garden views, serving fresh lunches, snacks, and beverages made with local ingredients.',
            features: ['Indoor Seating', 'Patio Dining', 'Local Menu', 'Garden Views'],
            hours: '11:00 AM - 4:00 PM'
        }
    };
    
    zones.forEach(zone => {
        zone.addEventListener('click', () => {
            const zoneName = zone.getAttribute('data-zone');
            const info = zoneInfo[zoneName];
            
            if (info && zoneDetails) {
                zoneDetails.innerHTML = `
                    <h4>${info.title}</h4>
                    <p>${info.description}</p>
                    <div class="zone-features">
                        <h6>Features:</h6>
                        <ul>
                            ${info.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="zone-hours">
                        <strong>Hours:</strong> ${info.hours}
                    </div>
                `;
                
                // Add highlight animation
                zoneDetails.classList.add('fade-in-up');
                setTimeout(() => {
                    zoneDetails.classList.remove('fade-in-up');
                }, 800);
            }
        });
        
        // Add hover effect
        zone.addEventListener('mouseenter', () => {
            zone.style.transform = 'scale(1.05)';
        });
        
        zone.addEventListener('mouseleave', () => {
            zone.style.transform = 'scale(1)';
        });
    });
}

// ===== EVENT FILTERS =====
function initializeEventFilters() {
    const filterButtons = document.querySelectorAll('[data-filter]');
    const eventItems = document.querySelectorAll('.event-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-primary');
            });
            button.classList.add('active');
            button.classList.remove('btn-outline-primary');
            button.classList.add('btn-primary');
            
            // Filter events
            eventItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.classList.add('fade-in-up');
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// ===== CALENDAR =====
function initializeCalendar() {
    const calendarDays = document.querySelector('.calendar-days');
    if (!calendarDays) return;
    
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Event dates (example)
    const eventDates = [15, 18, 22, 25, 28, 30];
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        calendarDays.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        if (eventDates.includes(day)) {
            dayElement.classList.add('has-event');
        }
        
        dayElement.addEventListener('click', () => {
            showDayEvents(day);
        });
        
        calendarDays.appendChild(dayElement);
    }
}

function showDayEvents(day) {
    // This would show events for the selected day
    console.log(`Events for day ${day}`);
}

// ===== MEMBERSHIP FORM =====
function initializeMembershipForm() {
    const form = document.getElementById('membershipForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        if (isValid) {
            // Show success message
            showSuccessMessage('Thank you for joining Green Haven! We\'ll send you a confirmation email shortly.');
            form.reset();
        }
    });
    
    // Add real-time validation
    const inputs = form.querySelectorAll('.form-control, .form-select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
    });
}

// ===== NEWSLETTER FORMS =====
function initializeNewsletterForms() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            
            if (email && validateEmail(email)) {
                showSuccessMessage('Thank you for subscribing to our newsletter!');
                form.reset();
            } else {
                showErrorMessage('Please enter a valid email address.');
            }
        });
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== SUCCESS/ERROR MESSAGES =====
function showSuccessMessage(message) {
    showMessage(message, 'success');
}

function showErrorMessage(message) {
    showMessage(message, 'error');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message-toast message-${type}`;
    messageElement.textContent = message;
    
    // Add styles
    messageElement.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: linear-gradient(135deg, #4caf50, #8bc34a);' : 'background: linear-gradient(135deg, #f44336, #ff6b9d);'}
    `;
    
    document.body.appendChild(messageElement);
    
    // Animate in
    setTimeout(() => {
        messageElement.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        messageElement.style.transform = 'translateX(400px)';
        setTimeout(() => {
            messageElement.remove();
        }, 300);
    }, 3000);
}

// ===== SMOOTH SCROLL =====
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECT =====
function initializeParallax() {
    const parallaxElements = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = element.getAttribute('data-speed') || 0.5;
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
                
                isScrolling = false;
            });
            
            isScrolling = true;
        }
    });
}

// ===== FLOATING LEAVES =====
function initializeFloatingLeaves() {
    const floatingContainer = document.querySelector('.floating-leaves');
    if (!floatingContainer) return;
    
    // Create multiple floating leaves
    for (let i = 0; i < 8; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'floating-leaf';
        leaf.textContent = '🍃';
        leaf.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 1.5 + 1}rem;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 15}s infinite linear;
            animation-delay: ${Math.random() * 10}s;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        floatingContainer.appendChild(leaf);
    }
}

// ===== MOBILE MENU ENHANCEMENTS =====
document.addEventListener('DOMContentLoaded', function() {
    // Close mobile menu when clicking outside
    const offcanvasElement = document.getElementById('navbarOffcanvas');
    if (offcanvasElement) {
        offcanvasElement.addEventListener('click', (e) => {
            if (e.target === offcanvasElement) {
                const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (bsOffcanvas) {
                    bsOffcanvas.hide();
                }
            }
        });
    }
    
    // Add active state to navigation based on current page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentPath.includes(linkPath) && linkPath !== 'index.html') {
            link.classList.add('active');
        } else if (linkPath === 'index.html' && currentPath.endsWith('/')) {
            link.classList.add('active');
        }
    });
});

// ===== LAZY LOADING FOR IMAGES =====
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== PERFORMANCE OPTIMIZATION =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounce scroll events for better performance
const debouncedScroll = debounce(() => {
    // Scroll-related functions
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    // Add keyboard navigation for garden map zones
    const zones = document.querySelectorAll('.garden-zone');
    zones.forEach((zone, index) => {
        zone.setAttribute('tabindex', '0');
        zone.setAttribute('role', 'button');
        zone.setAttribute('aria-label', `Garden zone ${index + 1}`);
        
        zone.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                zone.click();
            }
        });
    });
    
    // Add ARIA labels for dynamic content
    const zoneDetails = document.getElementById('zoneDetails');
    if (zoneDetails) {
        zoneDetails.setAttribute('aria-live', 'polite');
        zoneDetails.setAttribute('aria-atomic', 'true');
    }
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', initializeAccessibility);

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    // You could send this to an error tracking service
});

// ===== SERVICE WORKER (FOR PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
