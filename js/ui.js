// js/ui.js
document.addEventListener('DOMContentLoaded', function() {
    const notificationContainer = document.getElementById('notification-container');
    const notificationMessage = document.getElementById('notification-message');

    window.showNotification = function(message, type = 'success') {
        notificationMessage.textContent = message;
        notificationMessage.classList.remove('hidden', 'bg-red-500', 'bg-green-500', 'text-white', 'text-red-700');

        if (type === 'success') {
            notificationMessage.classList.add('bg-green-500', 'text-white');
        } else if (type === 'error') {
            notificationMessage.classList.add('bg-red-500', 'text-white');
        }

        notificationMessage.classList.add('animate-slide-in');
        notificationMessage.classList.remove('animate-slide-out');
        notificationMessage.classList.remove('hidden');

        setTimeout(() => {
            notificationMessage.classList.remove('animate-slide-in');
            notificationMessage.classList.add('animate-slide-out');
            setTimeout(() => {
                notificationMessage.classList.add('hidden');
            }, 500); // Hide after animation
        }, 3000); // Show for 3 seconds
    };
});