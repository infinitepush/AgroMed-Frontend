// Test page functionality
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const previewCard = document.getElementById('previewCard');
    const loadingCard = document.getElementById('loadingCard');
    const resultCard = document.getElementById('resultCard');
    const previewImg = document.getElementById('previewImg');
    const userIdInput = document.getElementById('userId');
    const submitBtn = document.getElementById('submitBtn');
    const errorModal = document.getElementById('errorModal');
    const errorMessage = document.getElementById('errorMessage');
    const closeErrorModal = document.getElementById('closeErrorModal');
    const newTestBtn = document.getElementById('newTestBtn');
    const viewHistoryBtn = document.getElementById('viewHistoryBtn');

    let currentFile = null;

    // Show preview on file select
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            currentFile = file;
            previewImg.src = URL.createObjectURL(file);
            hideAllCards();
            previewCard.classList.remove('hidden');
            previewCard.classList.add('fade-enter-active');
        }
    });

    // Reset preview when selecting new file
    fileInput.addEventListener('click', () => {
        fileInput.value = null;
        currentFile = null;
        hideAllCards();
    });

    // Camera button (simulated)
    document.getElementById('cameraBtn').addEventListener('click', () => {
        alert('Camera functionality not implemented. Please upload an image.');
    });

    // Submit for analysis (Corrected)
    submitBtn.addEventListener('click', async () => {
        if (!currentFile) {
            showError('Please select an image first.');
            return;
        }

        hideAllCards();
        loadingCard.classList.remove('hidden');

        try {
            // Step 1: Upload the image to the backend
            const uploadResponse = await api.uploadImage(currentFile);
            if (!uploadResponse.success) {
                throw new Error(uploadResponse.message);
            }
            const imageId = uploadResponse.image.id;

            // Step 2: Get the prediction using the image ID
            const predictionResponse = await api.getPrediction(imageId);
            if (!predictionResponse.success) {
                throw new Error(predictionResponse.message);
            }

            displayResult(predictionResponse);
        } catch (error) {
            showError('Failed to analyze image. Please try again.');
        } finally {
            loadingCard.classList.add('hidden');
        }
    });

    // Display analysis result (Corrected)
    function displayResult(data) {
        const resultContent = document.getElementById('resultContent');
        const prediction = data.prediction;
        const suggestion = data.suggestion;
        
        resultContent.innerHTML = `
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-lg mb-2">Prediction Result</h4>
                    <p><strong>Disease:</strong> ${prediction.disease}</p>
                    <p><strong>Confidence:</strong> ${(prediction.confidence * 100).toFixed(2)}%</p>
                </div>
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-semibold text-lg mb-2">Suggestion</h4>
                    <p>${suggestion.remedy}</p>
                </div>
            </div>
        `;

        hideAllCards();
        resultCard.classList.remove('hidden');
    }

    // Hide all cards
    function hideAllCards() {
        previewCard.classList.add('hidden');
        loadingCard.classList.add('hidden');
        resultCard.classList.add('hidden');
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
        userIdInput.value = '';
        currentFile = null;
    });

    // View history button (Corrected)
    viewHistoryBtn.addEventListener('click', async () => {
        hideAllCards();
        loadingCard.classList.remove('hidden');

        try {
            const history = await api.getHistory(); // Call getHistory without a user ID
            if (!history.success) {
                throw new Error(history.message);
            }
            displayHistory(history);
        } catch (error) {
            showError('Failed to load history. Please try again.');
        } finally {
            loadingCard.classList.add('hidden');
        }
    });

    // Display history (Corrected)
    function displayHistory(data) {
        const resultContent = document.getElementById('resultContent');
        const predictions = data.predictions;
        
        let historyHtml = '<h4 class="font-semibold text-lg mb-4">User History</h4>';
        if (predictions.length === 0) {
            historyHtml += '<p class="text-gray-600">No history found.</p>';
        } else {
            predictions.forEach(p => {
                historyHtml += `
                    <div class="bg-gray-50 p-4 rounded-lg mb-4">
                        <img src="${p.image_url}" alt="Prediction Image" class="w-full h-32 object-cover rounded-md mb-2">
                        <p><strong>ID:</strong> ${p.id}</p>
                        <p><strong>Disease:</strong> ${p.disease}</p>
                        <p><strong>Confidence:</strong> ${p.confidence}%</p>
                        <p><strong>Analysis:</strong> ${p.explanation}</p>
                        <p><strong>Date:</strong> ${new Date(p.created_at).toLocaleDateString()}</p>
                    </div>
                `;
            });
        }
        
        resultContent.innerHTML = historyHtml;

        hideAllCards();
        resultCard.classList.remove('hidden');
    }
});