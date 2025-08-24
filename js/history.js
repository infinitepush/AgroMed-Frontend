// js/history.js

document.addEventListener('DOMContentLoaded', function() {
    // Add this check at the very beginning of the script
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'signin.html';
        return;
    }

    const historyTableBody = document.getElementById('historyTableBody');
    const loadingState = document.getElementById('loadingState');
    const errorState = document.getElementById('errorState');
    const emptyState = document.getElementById('emptyState');
    const historyTable = document.getElementById('historyTable');
    
    // This function will fetch all predictions from the backend
    const fetchHistory = async () => {
        showLoading();
        try {
            const response = await api.getHistory();
            if (response.success) {
                if (response.predictions.length === 0) {
                    showEmptyState();
                } else {
                    populateTable(response.predictions);
                }
            } else {
                showError('Failed to load history.');
            }
        } catch (error) {
            showError('Failed to load history. Please try again.');
        } finally {
            hideLoading();
        }
    };

    // Displays data in the table
    const populateTable = (predictions) => {
        historyTableBody.innerHTML = '';
        predictions.forEach(p => {
            const row = document.createElement('tr');
            row.className = "border-b hover:bg-green-50";
            row.innerHTML = `
                <td class="py-2 px-4">${new Date(p.created_at).toLocaleDateString()}</td>
                <td class="py-2 px-4">
                    <img src="${p.image_url}" alt="Crop image" class="h-10 w-10 rounded-full object-cover">
                </td>
                <td class="py-2 px-4 font-medium">N/A</td> 
                <td class="py-2 px-4 font-medium">${p.disease}</td>
                <td class="py-2 px-4">${p.confidence}%</td>
                <td class="py-2 px-4">
                    <div class="max-w-xs truncate" title="${p.explanation}">${p.explanation || 'N/A'}</div>
                </td>
                <td class="py-2 px-4">
                    <a href="feedback.html?id=${p.id}" class="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                        Feedback
                    </a>
                </td>
            `;
            historyTableBody.appendChild(row);
        });
        historyTable.classList.remove('hidden');
    };

    // Helper functions for UI states
    const showLoading = () => {
        loadingState.classList.remove('hidden');
        historyTable.classList.add('hidden');
        emptyState.classList.add('hidden');
        errorState.classList.add('hidden');
    };
    
    const hideLoading = () => {
        loadingState.classList.add('hidden');
    };

    const showError = (message) => {
        const errorMsgElement = errorState.querySelector('p');
        if (errorMsgElement) {
            errorMsgElement.textContent = message;
        }
        errorState.classList.remove('hidden');
    };

    const showEmptyState = () => {
        emptyState.classList.remove('hidden');
    };

    // Initial fetch when the page loads
    fetchHistory();
});