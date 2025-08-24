// js/signup.js

document.addEventListener('DOMContentLoaded', function() {
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const sendOtpBtn = document.getElementById('sendOtp');
    const otpSection = document.getElementById('otpSection');
    const otpInput = document.getElementById('otp');
    const errorMessage = document.getElementById('error-message');

    let generatedOtp = '';

    // Simulate OTP generation and show OTP input field
    sendOtpBtn.addEventListener('click', () => {
        const phone = phoneInput.value.trim();
        if (!phone) {
            showError('Please enter your phone number.');
            return;
        }
        // Generate a 6-digit OTP for testing purposes
        generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        otpSection.classList.remove('hidden');
        showError(`Simulated OTP (for testing): ${generatedOtp}`);
    });

    // Handle form submission for sign-up
    document.getElementById('signupForm').addEventListener('submit', async (e) => {
        e.preventDefault();

        const fullname = fullnameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();
        const enteredOtp = otpInput.value.trim();

        // Step 1: Frontend Validation
        if (!fullname || !email || !phone || !password || !confirmPassword) {
            showError('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            showError('Passwords do not match.');
            return;
        }
        if (enteredOtp !== generatedOtp) {
            showError('Invalid or missing OTP.');
            return;
        }

        try {
            // Step 2: Make API call to backend
            // The api.js script must be loaded before this one
            const response = await api.signup(fullname, email, password, phone);

            if (response.success) {
                showError('Sign-up successful! Redirecting to signin page...', 'success');
                setTimeout(() => {
                    window.location.href = 'signin.html';
                }, 1000);
            } else {
                showError(response.message || 'Sign-up failed. Please try again.');
            }
        } catch (error) {
            console.error('Signup failed:', error);
            showError('Sign-up failed. Check your network.');
        }
    });

    // Helper function to display errors
    function showError(message, type = 'error') {
        errorMessage.textContent = message;
        if (type === 'success') {
            errorMessage.classList.remove('hidden', 'bg-red-100', 'border-red-400', 'text-red-700');
            errorMessage.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        } else {
            errorMessage.classList.remove('hidden', 'bg-green-100', 'border-green-400', 'text-green-700');
            errorMessage.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        }
    }
});