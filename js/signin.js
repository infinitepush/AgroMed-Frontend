// js/signin.js
// Add this code to your js/signin.js file
document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing code)

    const passwordInput = document.getElementById('password');
    const togglePasswordBtn = document.getElementById('togglePassword');

    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // You can also toggle the eye icon here
    });

    // ... (the rest of your existing code)
});


document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const errorMsg = document.getElementById('error-message');

        errorMsg.textContent = '';
        errorMsg.classList.add('hidden');

        if (!email || !password) {
            errorMsg.textContent = 'Please enter both email and password.';
            errorMsg.classList.remove('hidden');
            return;
        }

        try {
            const response = await api.signin(email, password);

            if (response.success) {
                alert('Login successful! Redirecting to dashboard...');
                localStorage.setItem('token', response.token); 
                window.location.href = "/dashboard.html";
            } else if (response.status === 401) {
                // Specific check for 401 Unauthorized error
                errorMsg.textContent = 'Invalid email or password. Please try again.';
                errorMsg.classList.remove('hidden');
            } else {
                errorMsg.textContent = response.message || 'An error occurred. Please try again.';
                errorMsg.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Signin failed:', error);
            // This will catch network errors (e.g., server offline)
            if (error.message.includes('401')) {
                errorMsg.textContent = 'Invalid email or password. Please try again.';
            } else {
                errorMsg.textContent = 'Signin failed. Check your network or server.';
            }
            errorMsg.classList.remove('hidden');
        }
    });
});