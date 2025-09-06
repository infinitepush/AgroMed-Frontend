// History page functionality
document.addEventListener('DOMContentLoaded', function() {
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
    
    const fetchHistory = async () => {
        showLoading();
        try {
            const response = await api.getHistory(token);
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

    const formatSuggestions = (suggestions) => {
    if (!suggestions) return "N/A";

    // If already an object
    if (typeof suggestions === "object") {
        if (suggestions.remedy) return suggestions.remedy;
        return Object.values(suggestions).join("; ");
    }

    // Try parsing once
    try {
        const parsed = JSON.parse(suggestions);
        if (parsed && typeof parsed === "object") {
            if (parsed.remedy) return parsed.remedy;
            return Object.values(parsed).join("; ");
        }
    } catch {}

    // 🚨 Handle double-encoded JSON (string inside a string)
    try {
        const parsedTwice = JSON.parse(JSON.parse(suggestions));
        if (parsedTwice && typeof parsedTwice === "object") {
            if (parsedTwice.remedy) return parsedTwice.remedy;
            return Object.values(parsedTwice).join("; ");
        }
    } catch {}

    // If everything fails, return as-is
    return suggestions;
};


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
                <td class="py-2 px-4 font-medium">${p.crop || 'N/A'}</td>
                <td class="py-2 px-4 font-medium">${p.disease}</td>
                <td class="py-2 px-4">${p.confidence ? (p.confidence * 100).toFixed(2) + '%' : 'N/A'}</td>
                <td class="py-2 px-4">
                    <div class="max-w-xs truncate" title="${formatSuggestions(p.suggestions)}">
                        ${formatSuggestions(p.suggestions)}
                    </div>
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
