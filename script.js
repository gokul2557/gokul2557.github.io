const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

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

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.room-card, .amenity-card, .gallery-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

document.querySelectorAll('.room-card, .amenity-card, .gallery-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Booking Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const checkIn = document.getElementById('check-in').value;
            const checkOut = document.getElementById('check-out').value;
            const guests = document.getElementById('guests').value;
            const roomType = document.getElementById('room-type').value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const specialRequests = document.getElementById('special-requests').value;

            // Calculate number of nights
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            const nights = Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

            // Validate dates
            if (nights < 1) {
                alert('Check-out date must be after check-in date');
                return;
            }

            // Get room price based on room type
            let roomPrice;
            switch(roomType) {
                case 'standard':
                    roomPrice = 1499;
                    break;
                case 'deluxe':
                    roomPrice = 1999;
                    break;
                case 'executive':
                    roomPrice = 2999;
                    break;
                case 'luxury':
                    roomPrice = 3999;
                    break;
                case 'family':
                    roomPrice = 4999;
                    break;
                case 'presidential':
                    roomPrice = 5000;
                    break;
                case 'honeymoon':
                    roomPrice = 4499;
                    break;
                case 'villa':
                    roomPrice = 4999;
                    break;
                default:
                    roomPrice = 1999;
            }

            // Calculate total amount
            const totalAmount = roomPrice * nights;
            const taxes = Math.round(totalAmount * 0.1); // 10% tax
            const finalAmount = totalAmount + taxes;

            // Create URL parameters
            const params = new URLSearchParams({
                'check-in': checkIn,
                'check-out': checkOut,
                'guests': guests,
                'room-type': roomType,
                'name': name,
                'email': email,
                'phone': phone,
                'special-requests': specialRequests,
                'nights': nights,
                'room-price': roomPrice,
                'total-amount': totalAmount,
                'taxes': taxes,
                'final-amount': finalAmount
            });

            // Redirect to payment confirmation page with parameters
            window.location.href = `payment.html?${params.toString()}`;
        });
    }
});

// Auth Tabs Functionality
document.addEventListener('DOMContentLoaded', function() {
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));

            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            const formId = `${tab.dataset.tab}-form`;
            document.getElementById(formId).classList.add('active');
        });
    });

    // Login Form Handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;

            // Here you would typically make an API call to your backend
            console.log('Login attempt:', { email, password, rememberMe });

            // For demo purposes, show success message
            alert('Login successful!');
            window.location.href = 'index.html';
        });
    }

    // Signup Form Handling
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const phone = document.getElementById('signup-phone').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;

            // Basic validation
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }

            // Here you would typically make an API call to your backend
            console.log('Signup attempt:', { name, email, phone, password });

            // For demo purposes, show success message
            alert('Account created successfully!');
            window.location.href = 'index.html';
        });
    }

    // Social Login Buttons
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList.contains('google') ? 'Google' : 'Facebook';
            alert(`${platform} login functionality would be implemented here`);
        });
    });
}); 