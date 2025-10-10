// Handle interest item selection visual feedback
document.addEventListener('DOMContentLoaded', function() {
    // Handle checkbox visual feedback
    document.querySelectorAll('.interest-item input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                this.closest('.interest-item').classList.add('selected');
            } else {
                this.closest('.interest-item').classList.remove('selected');
            }
        });
    });

    // Auto-focus first input for better UX
    const nameInput = document.getElementById('name');
    if (nameInput) {
        nameInput.focus();
    }
});

// Form submission handler
function submitForm(event) {
    event.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('joinForm');
    const successMessage = document.getElementById('successMessage');
    
    // Show loading state
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    form.classList.add('loading');
    
    // Collect form data
    const formData = new FormData(form);
    const interests = [];
    formData.getAll('interests').forEach(interest => {
        interests.push(interest);
    });
    
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        major: formData.get('major'),
        interests: interests,
        about: formData.get('about')
    };
    
    console.log('Form data:', data);
    
    // Simulate form submission (replace with actual API call)
    // Example API call:
    /*
    fetch('/api/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        // Handle success
        showSuccess();
    })
    .catch(error => {
        // Handle error
        console.error('Error:', error);
        showError();
    });
    */
    
    setTimeout(() => {
        showSuccess();
    }, 2000);
    
    function showSuccess() {
        // Reset button
        submitBtn.textContent = 'Join CQU Innovation Community';
        submitBtn.disabled = false;
        form.classList.remove('loading');
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Reset form
        form.reset();
        
        // Remove selected states from interests
        document.querySelectorAll('.interest-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
    
    function showError() {
        // Reset button
        submitBtn.textContent = 'Try Again';
        submitBtn.disabled = false;
        form.classList.remove('loading');
        
        // You could show an error message here
        alert('Something went wrong. Please try again.');
    }
}

// Navigation functions (replace with actual implementations)
function showSignIn() {
    // Redirect to sign-in page or show modal
    window.location.href = '../Html/signin.html';
    // Or: alert('Sign-in functionality would be implemented here');
}

function joinDiscord() {
    // Open Discord invitation link
    window.open('https://discord.gg/your-invite-code', '_blank');
    // Or: alert('Discord invitation would open here');
}

function visitUs() {
    // Show campus location or directions
    window.open('https://maps.google.com/?q=Central+Queensland+University', '_blank');
    // Or: alert('Campus location information would be shown here');
}

// Form validation helpers
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formData) {
    const errors = [];
    
    if (!formData.get('name') || formData.get('name').trim().length < 2) {
        errors.push('Please enter a valid name');
    }
    
    if (!formData.get('email') || !validateEmail(formData.get('email'))) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.get('major')) {
        errors.push('Please select your major');
    }
    
    return errors;
}

// Add smooth scroll behavior for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});