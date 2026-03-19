// frontend/js/app.js
document.addEventListener('DOMContentLoaded', async () => {
    // For prototype purposes, hardcode a mock worker ID
    const currentWorkerId = 'W_1001'; //ID for prototype only!

    console.log("FIKA App Initialized");

    // --- Modal Logic ---
    const profileIcon = document.querySelector('.user-profile');
    const modal = document.getElementById('profile-modal');
    const closeBtn = document.getElementById('close-modal');

    if (profileIcon && modal && closeBtn) {
        // Open modal
        profileIcon.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });

        // Close modal when clicking the X
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        // Close modal when clicking outside the white box (on the dark overlay)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
    // (Inside your DOMContentLoaded block, right after modal.addEventListener)
        
        const logoutBtn = document.querySelector('.log-out-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                // In a real app, you would clear the user's session token here
                window.location.href = "login.html";
            });
        }

    // Check which page we are on
    const path = window.location.pathname;

    if (path.includes('index.html') || path === '/' || path.endsWith('frontend/')) {
        // uiElements.showLoading();
        const data = await fikaAPI.getDashboardData(currentWorkerId);
        // uiElements.renderDashboard(data);
        // uiElements.hideLoading();
    } 
    else if (path.includes('history.html')) {
        // Load payout history
        const payouts = await fikaAPI.getPayoutHistory(currentWorkerId);
        // Render history list...
    }
});

// Function for handling the subscription button click
function handleSubscribe() {
    const btn = document.getElementById('subscribe-btn');
    
    // Simulate API call loading state
    btn.innerText = "Processing UPI...";
    btn.style.opacity = "0.7";
    
    setTimeout(() => {
        // Success state
        btn.innerText = "Subscribed Successfully!";
        btn.style.background = "#10B981"; // Green color
        btn.style.opacity = "1";
        
        // Redirect back to dashboard after a short delay
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    }, 2000);
}

// Function to dismiss the active alert card
function dismissAlert() {
    const alertCard = document.getElementById('current-alert');
    if (alertCard) {
        // Fade out and shrink slightly
        alertCard.style.opacity = '0';
        alertCard.style.transform = 'scale(0.95)';
        
        // Wait for the animation to finish before removing it completely
        setTimeout(() => {
            alertCard.style.display = 'none';
        }, 400); 
    }
}

// --- Login Page Logic ---

function sendOTP() {
    const phoneInput = document.getElementById('phone-input').value;
    const btn = document.getElementById('btn-send-otp');
    
    if (phoneInput.length < 10) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    // Simulate API request to send OTP
    btn.innerText = "Sending...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
        // Hide Step 1, Show Step 2
        document.getElementById('step-phone').classList.add('hidden');
        
        const stepOtp = document.getElementById('step-otp');
        stepOtp.classList.remove('hidden');
        
        // Populate the phone number in the text
        document.getElementById('display-phone').innerText = "+91 " + phoneInput;
        
        // Reset button state for next time
        btn.innerText = "Send OTP";
        btn.style.opacity = "1";
    }, 1000);
}

function verifyOTP() {
    const btn = document.getElementById('btn-verify');
    
    // Simulate verification delay
    btn.innerText = "Verifying...";
    btn.style.opacity = "0.7";

    setTimeout(() => {
        // Redirect to the Dashboard on success
        window.location.href = "index.html";
    }, 1500);
}

function goBackToPhone() {
    document.getElementById('step-otp').classList.add('hidden');
    document.getElementById('step-phone').classList.remove('hidden');
}

// Helper function to auto-focus the next OTP box as they type
function moveToNext(current, nextFieldID) {
    if (current.value.length >= current.maxLength) {
        document.getElementById(nextFieldID).focus();
    }
}

