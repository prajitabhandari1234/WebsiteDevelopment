// Smooth scrolling for internal links
function smoothScroll(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

// Newsletter subscription
function subscribeNewsletter() {
    const email = document.querySelector('.startup-newsletter input').value;
    
    if (!email) {
        alert('Please enter your email address!');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Simulate subscription process
    alert(`Thanks for subscribing with ${email}! You'll receive updates about our latest projects and events.`);
    document.querySelector('.startup-newsletter input').value = '';
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Event registration functions
function registerEvent(eventType) {
    const eventMessages = {
        'pitch-night': 'Registration for Startup Pitch Night is now open! We\'ll send you more details via email.',
        'ai-workshop': 'You\'re registered for the AI Workshop Series! Get ready to build amazing AI applications.',
        'hackathon': '48-Hour Hackathon registration successful! Start forming your team and brainstorming ideas.'
    };
    
    const message = eventMessages[eventType] || 'Event registration successful!';
    alert(message);
}

// Join meetup function
function joinMeetup() {
    alert('Great! You\'ll receive a calendar invite for our next weekly meetup. See you Thursday at 7 PM!');
}

// Join form submission
function submitJoinForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const major = formData.get('major');
    const interests = formData.getAll('interests');
    const about = formData.get('about');
    
    // Validation
    if (!name || !email || !major) {
        alert('Please fill in all required fields!');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address!');
        return;
    }
    
    // Simulate form submission
    const welcomeMessage = `Welcome to SCE Startup Club, ${name}! 🚀\n\nWe're excited to have you join our community of builders and innovators. You'll receive an email soon with next steps and information about our upcoming events.\n\nInterests: ${interests.join(', ') || 'Not specified'}\nMajor: ${major}`;
    
    alert(welcomeMessage);
    
    // Reset form
    event.target.reset();
}

// Scroll to join form
function scrollToForm() {
    const joinForm = document.getElementById('joinForm');
    if (joinForm) {
        joinForm.scrollIntoView({ behavior: 'smooth' });
    } else {
        // If not on join page, redirect to join page
        window.location.href = 'join.html';
    }
}

// Discord integration
function joinDiscord() {
    alert('Discord invite sent! 💬\n\nJoin our community server to:\n• Connect with other builders\n• Get real-time project updates\n• Participate in coding challenges\n• Find teammates for hackathons\n\nCheck your email for the invite link!');
}

// Contact functions
function emailUs() {
    const subject = 'Question about SCE Startup Club';
    const body = 'Hi SCE Team,\n\nI have a question about...\n\nThanks!';
    window.location.href = `mailto:hello@sce-startup.club?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function visitUs() {
    alert('📍 Visit us at:\n\nInnovation Hub, Room 201\nUniversity Campus\n\nOffice Hours:\nMonday-Friday: 2:00 PM - 6:00 PM\nWeekly Meetups: Thursday 7:00 PM\n\nSee you there!');
}

// Sign in function
function showSignIn() {
    alert('Member Dashboard coming soon! 🚀\n\nFor now, join our Discord or email us for member access.');
}

// Interactive stats animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.startup-stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue);
                
                if (!isNaN(numericValue)) {
                    animateNumber(target, 0, numericValue, 1500);
                }
                observer.unobserve(target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// Number animation helper
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutCubic(progress));
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Easing function
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Progress bar animation
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.startup-progress-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    });
    
    progressBars.forEach(bar => observer.observe(bar));
}

// Mobile menu toggle (for responsive design)
function toggleMobileMenu() {
    const nav = document.querySelector('.startup-nav');
    nav.classList.toggle('mobile-active');
}

// Theme switcher (bonus feature)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load saved theme
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Parallax effect for hero sections
function initParallax() {
    const parallaxElements = document.querySelectorAll('.startup-hero, .join-hero');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrollTop * speed}px)`;
        });
    });
}

// Typewriter effect for hero titles
function typewriterEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typewriter on hero titles
function initTypewriter() {
    const heroTitles = document.querySelectorAll('.startup-hero-title');
    heroTitles.forEach(title => {
        const originalText = title.textContent;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typewriterEffect(title, originalText, 80);
                    observer.unobserve(title);
                }
            });
        });
        observer.observe(title);
    });
}

// Add hover effects to team cards
function initTeamCardEffects() {
    const teamCards = document.querySelectorAll('.startup-team-card');
    
    teamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Dynamic project status updates
function updateProjectStatuses() {
    const projects = [
        { name: 'StudyBuddy AI', progress: 85, status: 'MVP Testing' },
        { name: 'SecureVault', progress: 60, status: 'Smart Contract Audit' },
        { name: 'CampusGreen', progress: 40, status: 'Pilot Expansion' }
    ];
    
    // This could connect to a real API in production
    console.log('Project statuses updated:', projects);
}

// Event countdown timer
function startEventCountdown(eventDate, elementId) {
    const countdownElement = document.getElementById(elementId);
    if (!countdownElement) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        const distance = eventTime - now;
        
        if (distance < 0) {
            countdownElement.innerHTML = "Event Started!";
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Initialize page-specific features
function initPageFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    switch(currentPage) {
        case 'index.html':
        case '':
            animateStats();
            initTypewriter();
            break;
        case 'projects.html':
            animateProgressBars();
            updateProjectStatuses();
            break;
        case 'team.html':
            initTeamCardEffects();
            break;
        case 'events.html':
            // Start countdown for upcoming events
            startEventCountdown('2024-08-25 18:00:00', 'pitch-night-countdown');
            break;
        case 'join.html':
            // Focus on first form field
            const firstInput = document.querySelector('.join-form input');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 500);
            }
            break;
    }
}

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

function initKonamiCode() {
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
            activateEasterEgg();
            konamiCode = [];
        }
    });
}

function activateEasterEgg() {
    alert('🎉 EASTER EGG ACTIVATED! 🚀\n\nWelcome to the secret founders club! You\'ve unlocked:\n• Exclusive beta access to all projects\n• Priority event registration\n• Direct line to the core team\n\nEmail us with "KONAMI" in the subject line!');
    
    // Add special visual effect
    document.body.style.animation = 'rainbow 2s infinite';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}

// Add rainbow animation CSS
const rainbowCSS = `
@keyframes rainbow {
    0% { filter: hue-rotate(0deg); }
    100% { filter: hue-rotate(360deg); }
}
`;

// Add CSS to head
function addRainbowCSS() {
    const style = document.createElement('style');
    style.textContent = rainbowCSS;
    document.head.appendChild(style);
}

// Form enhancement - real-time validation
function initFormValidation() {
    const form = document.querySelector('.join-form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input[required], select[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = '';
    
    if (!value) {
        isValid = false;
        message = 'This field is required';
    } else if (field.type === 'email' && !isValidEmail(value)) {
        isValid = false;
        message = 'Please enter a valid email address';
    }
    
    if (!isValid) {
        showFieldError(field, message);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.color = '#ff6b6b';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    
    field.parentNode.appendChild(errorDiv);
    field.style.borderColor = '#ff6b6b';
}

function clearFieldError(field) {
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
    field.style.borderColor = '#f0f0f0';
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Core initializations
    loadTheme();
    addRainbowCSS();
    initParallax();
    initKonamiCode();
    initFormValidation();
    initPageFeatures();
    
    // Add smooth scrolling to all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Add loading animation completion
    document.body.classList.add('loaded');
    
    console.log('🚀 SCE Startup Club website loaded successfully!');
    console.log('💡 Try the Konami code for a surprise!');
});

// Add service worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // This would register a service worker in a production environment
        console.log('🔧 Service Worker support detected - PWA ready!');
    });
}

// Export functions for potential use in other scripts
window.SCE = {
    subscribeNewsletter,
    registerEvent,
    joinMeetup,
    submitJoinForm,
    scrollToForm,
    joinDiscord,
    emailUs,
    visitUs,
    showSignIn,
    toggleTheme
};