// Updated API Service for Agro Med
class ApiService {
    constructor() {
        this.baseURL = 'https://agro-med-backend-isuh.onrender.com/api'; // <-- added `/api` prefix for consistency
    }

    // ---- AUTHENTICATION ----
    async signup(fullname, email, password, phone) {
        return this._post('/auth/signup', { fullname, email, password, phone });
    }

    async signin(email, password) {
        return this._post('/auth/signin', { email, password });
    }

    async getUserProfile(token) {
        return this._get('/auth/profile', token);
    }

    async updateProfile(token, userData) {
        return this._put('/auth/profile', userData, token);
    }

    async changePassword(token, newPassword) {
        return this._post('/auth/change-password', { newPassword }, token);
    }

    // ---- IMAGE UPLOAD & PREDICTION ----
    async uploadImage(imageFile, token) {
        if (!token) throw new Error('Not authenticated.');

        const formData = new FormData();
        formData.append('image', imageFile);

        const response = await fetch(`${this.baseURL}/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        return this._handleResponse(response);
    }

    async getPrediction(imageId, token) {
        if (!token) throw new Error('Not authenticated.');

        const response = await fetch(`${this.baseURL}/predict/${imageId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({}) // some servers expect at least an empty JSON object
        });

        return this._handleResponse(response);
    }

    async getHistory(token) {
        return this._get('/history', token);
    }

    async submitFeedback(predictionId, isCorrect, notes, token) {
        return this._post('/feedback', {
            prediction_id: predictionId,
            is_correct: isCorrect,
            notes
        }, token);
    }

    // ---- GENERIC HELPERS ----
    async _get(path, token) {
        const response = await fetch(`${this.baseURL}${path}`, {
            method: 'GET',
            headers: this._authHeaders(token)
        });
        return this._handleResponse(response);
    }

    async _post(path, body, token) {
        const response = await fetch(`${this.baseURL}${path}`, {
            method: 'POST',
            headers: this._jsonHeaders(token),
            body: JSON.stringify(body)
        });
        return this._handleResponse(response);
    }

    async _put(path, body, token) {
        const response = await fetch(`${this.baseURL}${path}`, {
            method: 'PUT',
            headers: this._jsonHeaders(token),
            body: JSON.stringify(body)
        });
        return this._handleResponse(response);
    }

    _jsonHeaders(token) {
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return headers;
    }

    _authHeaders(token) {
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }

    async _handleResponse(response) {
        let data;
        try {
            data = await response.json();
        } catch {
            throw new Error(`Invalid JSON response. Status: ${response.status}`);
        }
        if (!response.ok) {
            throw new Error(data.message || `Request failed with status ${response.status}`);
        }
        return data;
    }
}

const api = new ApiService();
