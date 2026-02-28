// ========== MAIN JAVASCRIPT FILE (FULLY FIXED) ==========

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get modal elements
    const modal = document.getElementById('start-modal');
    const closeBtn = document.getElementById('start-close');
    const consultForm = document.getElementById('consultForm');
    const feedbackDiv = document.getElementById('form-feedback');
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            // Toggle menu visibility
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between bars and times (X)
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
        
        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuButton.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // ========== MODAL FUNCTIONALITY ==========
    
    // Open modal when any button with class 'open-start-model' is clicked
    document.addEventListener('click', function(e) {
        if (e.target.closest('.open-start-model')) {
            e.preventDefault();
            if (modal) {
                modal.classList.remove('hidden');
                document.body.classList.add('overflow-hidden'); // Prevent background scrolling
            }
        }
    });
    
    // Close modal when X button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        });
    }
    
    // Close modal when clicking outside the modal content
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.classList.remove('overflow-hidden');
            }
        });
    }
    
    // ========== FORM VALIDATION ==========
    
    if (consultForm) {
        consultForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const fullName = document.getElementById('fullName')?.value.trim() || '';
            const phoneNumber = document.getElementById('phoneNumber')?.value.trim() || '';
            const emailAddress = document.getElementById('emailAddress')?.value.trim() || '';
            const businessType = document.getElementById('businessType')?.value.trim() || 'Not specified';
            
            // Validate required fields
            if (!fullName) {
                alert('Please enter your full name');
                return;
            }
            
            if (!phoneNumber) {
                alert('Please enter your phone number');
                return;
            }
            
            if (!emailAddress) {
                alert('Please enter your email address');
                return;
            }
            
            // Validate email format (simple check)
            if (!emailAddress.includes('@') || !emailAddress.includes('.')) {
                alert('Please enter a valid email address');
                return;
            }
            
            // If validation passes, show success message
            if (feedbackDiv) {
                feedbackDiv.innerText = '✓ Form validated! Now sending to WhatsApp and Email...';
                feedbackDiv.style.color = '#059669';
            }
            
            // Call the function from connect-backend.js
            if (typeof window.sendToWhatsAppAndEmail === 'function') {
                window.sendToWhatsAppAndEmail(fullName, phoneNumber, emailAddress, businessType);
            } else {
                console.error('sendToWhatsAppAndEmail function not found');
                alert('Backend connection not available. Please check connect-backend.js file.');
            }
        });
    }
    
    // ========== NEWSLETTER FORM ==========
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for subscribing! You will receive updates soon.');
            this.reset(); // Clear the form
        });
    }
    
    // ========== SMOOTH SCROLLING FOR NAVIGATION (FIXED) ==========
    
    // Get all navigation buttons with data-section attributes
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get section ID from data attribute
            const sectionId = this.getAttribute('data-section');
            
            if (sectionId) {
                const section = document.getElementById(sectionId);
                if (section) {
                    // Smooth scroll to section
                    section.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        
                        // Change hamburger icon back to bars
                        const menuButton = document.getElementById('mobile-menu-button');
                        if (menuButton) {
                            const icon = menuButton.querySelector('i');
                            if (icon) {
                                icon.classList.remove('fa-times');
                                icon.classList.add('fa-bars');
                            }
                        }
                    }
                }
            }
        });
    });
    
    // ========== ADD ACTIVE CLASS TO NAVIGATION ON SCROLL ==========
    
    window.addEventListener('scroll', function() {
        const sections = ['services', 'packages', 'steps', 'why'];
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    currentSection = sectionId;
                }
            }
        });
        
        // Highlight active nav button
        navLinks.forEach(link => {
            link.classList.remove('text-blue-700', 'font-bold');
            if (link.getAttribute('data-section') === currentSection) {
                link.classList.add('text-blue-700', 'font-bold');
            }
        });
    });
    
    console.log('✅ Script.js loaded successfully with all fixes!');
});