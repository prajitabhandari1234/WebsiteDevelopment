// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Update active nav item
        updateActiveNavItem(sectionId);
    }
}

// Update active navigation item
function updateActiveNavItem(activeSection) {
    document.querySelectorAll('.startup-nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeNavItem = document.querySelector(`[onclick="scrollToSection('${activeSection}')"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }
}

// Update active nav on scroll
function handleScrollNavigation() {
    const sections = ['home', 'impact', 'projects', 'team', 'contact'];
    const navItems = document.querySelectorAll('.startup-nav-item');
    
    let current = '';
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            // Check if section is in viewport (with some offset for header)
            if (rect.top <= 150 && rect.bottom >= 150) {
                current = section;
            }
        }
    });
    
    // Update active nav item if current section changed
    if (current) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('onclick') && item.getAttribute('onclick').includes(current)) {
                item.classList.add('active');
            }
        });
    }
}

// Animate counter numbers
function animateCounter(element, start, end, duration) {
    if (element.classList.contains('counted')) return;
    
    element.classList.add('counted');
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.textContent = currentValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    window.requestAnimationFrame(step);
}

// Animate impact statistics when they come into view
function animateImpactStats() {
    const statCards = document.querySelectorAll('.impact-stat-card');
    
    statCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !card.classList.contains('animated')) {
            card.classList.add('animated');
            
            // Add entrance animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
            
            // Animate the counter
            const numberElement = card.querySelector('.stat-number');
            const targetValue = parseInt(numberElement.getAttribute('data-count'));
            
            setTimeout(() => {
                numberElement.classList.add('animate');
                animateCounter(numberElement, 0, targetValue, 2000);
            }, 300);
        }
    });
}

// Animate progress bars when they come into view
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.startup-progress-fill');
    
    progressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !bar.classList.contains('animated')) {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            bar.classList.add('animated');
            
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        }
    });
}

// Add hover effects to cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.startup-team-card, .startup-project-card, .completed-project-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add special hover effects for impact cards
function addImpactCardEffects() {
    const impactCards = document.querySelectorAll('.impact-stat-card');
    
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.05)';
            
            // Add glow effect
            const cardClass = Array.from(this.classList).find(cls => 
                ['coral', 'teal', 'blue', 'green'].includes(cls)
            );
            
            if (cardClass) {
                this.style.boxShadow = `0 25px 50px rgba(0, 0, 0, 0.2), 0 0 30px var(--${cardClass}-glow)`;
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
}

// Initialize parallax effect for background
function initializeParallax() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Apply parallax to background
        document.body.style.backgroundPosition = `center ${rate}px`;
    });
}

// Add typing effect to hero text
function addTypingEffect() {
    const heroTitle = document.querySelector('#home h3');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                // Add cursor blink effect
                heroTitle.style.borderRight = '2px solid white';
                heroTitle.style.animation = 'blink 1s infinite';
            }
        }, 100);
    }
}

// Add fade-in animation for sections
function addFadeInAnimations() {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('fade-animated')) {
                entry.target.classList.add('fade-animated', 'fade-in-up');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Add counter animation for other stats
function animateCounters() {
    const counters = document.querySelectorAll('.project-stats, .member-stats');
    
    counters.forEach(counter => {
        const rect = counter.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !counter.classList.contains('counted')) {
            counter.classList.add('counted');
            // Add a subtle pulse animation
            counter.style.animation = 'pulse 0.5s ease-in-out';
        }
    });
}

// Add CSS animations dynamically
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        @keyframes blink {
            0%, 50% { border-color: transparent; }
            51%, 100% { border-color: white; }
        }
        
        :root {
            --coral-glow: rgba(255, 107, 107, 0.4);
            --teal-glow: rgba(78, 205, 196, 0.4);
            --blue-glow: rgba(69, 183, 209, 0.4);
            --green-glow: rgba(150, 206, 180, 0.4);
        }
        
        .startup-cta {
            position: relative;
            overflow: hidden;
        }
        
        .startup-cta::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        
        .startup-cta:hover::before {
            left: 100%;
        }
        
        .impact-stat-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .stat-number {
            transition: all 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

// Initialize mobile menu toggle
function initializeMobileMenu() {
    const header = document.querySelector('.startup-header');
    const nav = document.querySelector('.startup-nav');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.classList.add('mobile-menu-btn');
    
    header.appendChild(mobileMenuBtn);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('mobile-active');
        mobileMenuBtn.innerHTML = nav.classList.contains('mobile-active') ? '✕' : '☰';
    });
    
    // Close mobile menu when clicking on nav items
    nav.querySelectorAll('.startup-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            nav.classList.remove('mobile-active');
            mobileMenuBtn.innerHTML = '☰';
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.classList.remove('mobile-active');
            mobileMenuBtn.innerHTML = '☰';
        }
    });
}

// Add click-to-copy functionality for email
function initializeEmailCopy() {
    const emailLink = document.querySelector('.footer-email');
    if (emailLink) {
        emailLink.addEventListener('click', function(e) {
            e.preventDefault();
            const email = this.textContent;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(email).then(() => {
                    showToast('Email copied to clipboard!');
                });
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('Email copied to clipboard!');
            }
        });
    }
}

// Show toast notification
function showToast(message) {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        z-index: 10000;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        font-weight: 600;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 100);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Add intersection observer for better performance
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                
                // Trigger impact stats animation
                if (target.id === 'impact') {
                    animateImpactStats();
                }
                
                // Trigger progress bar animation
                if (target.id === 'projects') {
                    animateProgressBars();
                }
                
                // Trigger counter animation
                animateCounters();
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize core functionality
    initializeSmoothScroll();
    initializeMobileMenu();
    initializeEmailCopy();
    initializeIntersectionObserver();
    
    // Add visual effects and styles
    addCardHoverEffects();
    addImpactCardEffects();
    addDynamicStyles();
    addFadeInAnimations();
    
    // Add event listeners for scroll-based animations
    window.addEventListener('scroll', function() {
        handleScrollNavigation();
        animateImpactStats();
        animateProgressBars();
        animateCounters();
    });
    
    // Initialize parallax (optional - can be removed if performance issues)
    initializeParallax();
    
    // Add typing effect after a short delay
    setTimeout(addTypingEffect, 500);
    
    // Log successful initialization
    console.log('🚀 CQU Initiation and Innovation website loaded successfully!');
    console.log('✨ All animations and interactions are ready!');
});