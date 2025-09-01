// Test page functionality
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const previewCard = document.getElementById('previewCard');
    const loadingCard = document.getElementById('loadingCard');
    const resultCard = document.getElementById('resultCard');
    const previewImg = document.getElementById('previewImg');
    const submitBtn = document.getElementById('submitBtn');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const closeErrorModal = document.getElementById('closeErrorModal');
    const newTestBtn = document.getElementById('newTestBtn');
    const viewHistoryBtn = document.getElementById('viewHistoryBtn');
    const cameraBtn = document.getElementById('cameraBtn');
    const cameraCard = document.getElementById('cameraCard');
    const cameraFeed = document.getElementById('cameraFeed');
    const takePhotoBtn = document.getElementById('takePhotoBtn');

    let currentFile = null;
    let cameraStream = null;
    
    // Check for authentication token once
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'signin.html';
        return;
    }

    // Show preview on file select
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            currentFile = file;
            previewImg.src = URL.createObjectURL(file);
            hideAllCards();
            previewCard.classList.remove('hidden');
            previewCard.classList.add('card-enter-active');
            stopCameraStream();
        }
    });

    // Reset preview when selecting new file
    fileInput.addEventListener('click', () => {
        fileInput.value = null;
        currentFile = null;
        hideAllCards();
        stopCameraStream();
    });

    // Camera button
    cameraBtn.addEventListener('click', async () => {
        hideAllCards();
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
            cameraFeed.srcObject = cameraStream;
            cameraCard.classList.remove('hidden');
        } catch (error) {
            console.error('Error accessing the camera:', error);
            showError('Failed to access camera. Please check your permissions.');
        }
    });

    // Take a photo from the camera stream
    takePhotoBtn.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = cameraFeed.videoWidth;
        canvas.height = cameraFeed.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(cameraFeed, 0, 0, canvas.width, canvas.height);
        
        canvas.toBlob(blob => {
            currentFile = new File([blob], 'photo.png', { type: 'image/png' });
            previewImg.src = URL.createObjectURL(currentFile);
            
            hideAllCards();
            previewCard.classList.remove('hidden');
            previewCard.classList.add('card-enter-active');
            stopCameraStream();
        }, 'image/png');
    });

    // Submit for analysis
    submitBtn.addEventListener('click', async () => {
        if (!currentFile) {
            showError('Please select an image first.');
            return;
        }

        hideAllCards();
        loadingCard.classList.remove('hidden');
        stopCameraStream();

        try {
            const uploadResponse = await api.uploadImage(currentFile, token);
            if (!uploadResponse.success) {
                throw new Error(uploadResponse.message);
            }

            const imageId = uploadResponse.image.id;
            const predictionResponse = await api.getPrediction(imageId, token);
            if (!predictionResponse.success || !predictionResponse.prediction) {
                throw new Error(predictionResponse.message || "No prediction returned");
            }

            displayResult(predictionResponse.prediction);
        } catch (error) {
            console.error("Prediction error:", error);
            showError('Failed to analyze image. Please try again.');
        } finally {
            loadingCard.classList.add('hidden');
        }
    });

    function displayResult(prediction) {
    const resultContent = document.getElementById('resultContent');
    const suggestion = prediction.suggestion || {};

    resultContent.innerHTML = `
        <div class="space-y-6">
            <!-- Image First -->
            <div class="bg-gray-50 p-4 rounded-lg text-center">
                <h4 class="font-semibold text-lg mb-2">Uploaded Image</h4>
                <img src="${prediction.imageUrl}" alt="Analyzed Image" 
                    class="mx-auto rounded-lg shadow-md max-h-64 object-contain" />
            </div>

            <!-- Prediction Result -->
            <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold text-lg mb-2">Prediction Result</h4>
                <p><strong>Crop:</strong> ${prediction.crop}</p>
                <p><strong>Disease:</strong> ${prediction.disease}</p>
                <p><strong>Confidence:</strong> ${(prediction.confidence * 100).toFixed(2)}%</p>
            </div>

            <!-- Suggestions -->
            <div class="bg-gray-50 p-4 rounded-lg">
                <h4 class="font-semibold text-lg mb-2">Suggestion</h4>
                <p><strong>Remedy:</strong> ${suggestion.remedy || "No remedy available"}</p>
                <p><strong>Prevention:</strong> ${suggestion.prevention || "No prevention available"}</p>
            </div>
        </div>
    `;

    hideAllCards();
    resultCard.classList.remove('hidden');
}




    // Stop the camera stream
    function stopCameraStream() {
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
            cameraStream = null;
        }
    }

    // Hide all cards
    function hideAllCards() {
        previewCard.classList.add('hidden');
        loadingCard.classList.add('hidden');
        resultCard.classList.add('hidden');
        cameraCard.classList.add('hidden');
    }

    // Show error modal
    function showError(message) {
        errorMessage.textContent = message;
        errorModal.classList.remove('hidden');
    }

    // Close error modal
    closeErrorModal.addEventListener('click', () => {
        errorModal.classList.add('hidden');
    });

    // New test button
    newTestBtn.addEventListener('click', () => {
        hideAllCards();
        fileInput.value = null;
        currentFile = null;
    });

    // View history button
    viewHistoryBtn.addEventListener('click', () => {
        window.location.href = 'history.html';
    });
});
