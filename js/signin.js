// js/signin.js

document.addEventListener('DOMContentLoaded', function() {
    const successMsg = document.getElementById('success-message');
    const errorMsg = document.getElementById('error-message');
    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');

    document.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = passwordInput.value.trim();

        hideMessages();

        if (!email || !password) {
            showError('Please enter both email and password.');
            return;
        }

        try {
            const response = await api.signin(email, password);

            if (response.success) {
                localStorage.setItem('token', response.token); 
                showSuccess('Login successful! Redirecting to dashboard...');
                setTimeout(() => {
                    window.location.href = "/dashboard.html";
                }, 1500); // Wait 1.5 seconds before redirecting
            } else {
                showError(response.message || 'An error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Signin failed:', error);
            if (error.message.includes('401')) {
                showError('Invalid email or password. Please try again.');
            } else {
                showError('Signin failed. Check your network or server.');
            }
        }
    });

    // Toggle password visibility
    if (togglePasswordBtn) {
        togglePasswordBtn.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    }

    function hideMessages() {
        successMsg.classList.add('hidden');
        errorMsg.classList.add('hidden');
    }

    function showSuccess(message) {
        successMsg.textContent = message;
        successMsg.classList.remove('hidden');
    }

    function showError(message) {
        errorMsg.textContent = message;
        errorMsg.classList.remove('hidden');
    }
});