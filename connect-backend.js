// ========== BACKEND CONNECTION HANDLER (FIXED) ==========
// This file handles sending data to WhatsApp and Email

// Configuration - UPDATED WITH YOUR CORRECT DETAILS
const CONFIG = {
    // WhatsApp number (WITHOUT + sign, with country code)
    // For India: 91 + your 10-digit number = 919117318735
    whatsappNumber: '919117318735', // ✅ CORRECT: +91 9117318735 = 919117318735
    
    // Email recipient
    emailRecipient: 'bibhavpandey78@gmail.com', // Your email
    
    // Email subject
    emailSubject: 'New Consultation Request from AR Consultancy'
};

// Make the function globally available
window.sendToWhatsAppAndEmail = function(name, phone, email, businessType) {
    
    // Prepare the message text (URL encoded for WhatsApp)
    const messageText = `Hello AR Consultancy, I need a consultation!%0A%0A` +
                        `Name: ${encodeURIComponent(name)}%0A` +
                        `Phone: ${encodeURIComponent(phone)}%0A` +
                        `Email: ${encodeURIComponent(email)}%0A` +
                        `Business type: ${encodeURIComponent(businessType)}`;
    
    // ===== WHATSAPP LINK =====
    const whatsappLink = `https://wa.me/${CONFIG.whatsappNumber}?text=${messageText}`;
    
    // ===== EMAIL LINK =====
    const emailBody = `Name: ${name}\n` +
                      `Phone: ${phone}\n` +
                      `Email: ${email}\n` +
                      `Business type: ${businessType}`;
    
    const mailtoLink = `mailto:${CONFIG.emailRecipient}?subject=${encodeURIComponent(CONFIG.emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // ===== OPEN BOTH LINKS =====
    
    // Open WhatsApp in a new tab
    window.open(whatsappLink, '_blank');
    
    // Open email in a new tab too
    window.open(mailtoLink, '_blank');
    
    // Show success message
    const feedbackDiv = document.getElementById('form-feedback');
    if (feedbackDiv) {
        feedbackDiv.innerText = '✓ Request sent! Check WhatsApp and your email app.';
        feedbackDiv.style.color = '#059669';
    }
    
    // Reset form after 3 seconds
    setTimeout(() => {
        const consultForm = document.getElementById('consultForm');
        if (consultForm) {
            consultForm.reset();
        }
        
        // Close modal after 3 seconds
        const modal = document.getElementById('start-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
        
        // Clear feedback
        if (feedbackDiv) {
            feedbackDiv.innerText = '';
        }
    }, 3000);
    
    console.log('✅ Data sent to WhatsApp and Email');
    console.log('WhatsApp link:', whatsappLink);
};

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Connect-backend.js loaded');
    console.log('WhatsApp number configured:', CONFIG.whatsappNumber, '(from +91 9117318735)');
    console.log('Email recipient configured:', CONFIG.emailRecipient);
});