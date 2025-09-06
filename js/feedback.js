document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    const predictionIdInput = document.getElementById('predictionId');
    const notesInput = document.getElementById('notes');
    const statusMessage = document.getElementById('statusMessage');
    const noIdMessage = document.getElementById('noIdMessage');

    function showMessage(message, type) {
        statusMessage.textContent = message;
        statusMessage.classList.remove('hidden', 'bg-red-100', 'bg-green-100', 'text-red-700', 'text-green-700');
        statusMessage.classList.add(
            type === 'success' ? 'bg-green-100' : 'bg-red-100',
            type === 'success' ? 'text-green-700' : 'text-red-700'
        );
    }

    const urlParams = new URLSearchParams(window.location.search);
    const predictionId = urlParams.get('id');
    const token = localStorage.getItem('token');

    if (!token) {
        showMessage("You are not logged in. Please sign in.", "error");
        feedbackForm.classList.add('hidden');
        noIdMessage.classList.remove('hidden');
        return;
    }

    if (predictionId) {
        predictionIdInput.value = predictionId;
        feedbackForm.classList.remove('hidden');
        noIdMessage.classList.add('hidden');
    } else {
        feedbackForm.classList.add('hidden');
        noIdMessage.classList.remove('hidden');
    }

    feedbackForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const correctness = document.querySelector('input[name="correctness"]:checked').value;
        const notes = notesInput.value.trim();
        const isCorrect = correctness === 'true';

        try {
            const response = await api.submitFeedback(token, predictionId, isCorrect, notes);
            
            if (response.success) {
                showMessage("Feedback submitted successfully!", "success");
                feedbackForm.reset();
            } else {
                showMessage(response.message || "Failed to submit feedback.", "error");
            }
        } catch (error) {
            console.error('Feedback submission error:', error);
            showMessage("Failed to submit feedback. Check your network.", "error");
        }
    });
});
