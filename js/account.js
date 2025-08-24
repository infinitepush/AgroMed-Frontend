// js/account.js
document.addEventListener('DOMContentLoaded', async function() {
    const fullnameInput = document.getElementById('fullname');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const saveBtn = document.getElementById('saveBtn');
    const changePassBtn = document.getElementById('changePassBtn');
    const passwordSection = document.getElementById('passwordSection');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordForm = document.getElementById('passwordForm');
    const toggleNewPasswordBtn = document.getElementById('toggleNewPassword');
    const toggleConfirmPasswordBtn = document.getElementById('toggleConfirmPassword');

    let token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = 'signin.html';
        return;
    }

    const fetchUserData = async () => {
        try {
            const user = await api.getUserProfile(token);
            if (user) {
                fullnameInput.value = user.fullname;
                emailInput.value = user.email;
                phoneInput.value = user.phone;
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            alert('Failed to load user profile. Please try again.');
        }
    };
    
    changePassBtn.addEventListener('click', () => {
        passwordSection.classList.toggle('hidden');
    });

    saveBtn.addEventListener('click', async () => {
        alert('Save Changes functionality is not yet implemented.');
    });

    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        try {
            const response = await api.changePassword(token, newPassword);
            if (response.success) {
                alert('Password changed successfully!');
                passwordSection.classList.add('hidden');
                passwordForm.reset();
            } else {
                alert(response.message || 'Failed to change password.');
            }
        } catch (error) {
            console.error('Failed to change password:', error);
            alert('Failed to change password. Please check your network.');
        }
    });

    // Toggle new password visibility
    toggleNewPasswordBtn.addEventListener('click', function() {
        const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        newPasswordInput.setAttribute('type', type);
    });

    // Toggle confirm password visibility
    toggleConfirmPasswordBtn.addEventListener('click', function() {
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);
    });

    fetchUserData();
});