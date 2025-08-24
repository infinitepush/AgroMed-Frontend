// Simple API Service for Agro Med
class ApiService {
    constructor() {
        this.baseURL = 'https://agro-med-backend-isuh.onrender.com';
    }

    async signup(fullname, email, password, phone) {
        try {
            const response = await fetch(`${this.baseURL}/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, email, password, phone })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Signup error:', error);
            throw error;
        }
    }

    async signin(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/auth/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Signin error:', error);
            throw error;
        }
    }

    // New API call for getting user profile
    // GET /auth/profile (protected route)
    async getUserProfile(token) {
        try {
            const response = await fetch(`${this.baseURL}/auth/profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.user;
        } catch (error) {
            console.error('Profile fetch error:', error);
            throw error;
        }
    }

    // New API call for uploading the image
    // POST /upload
    async uploadImage(imageFile) {
        try {
            const formData = new FormData();
            formData.append('image', imageFile); // CORRECT KEY: 'image'

            const response = await fetch(`${this.baseURL}/upload`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Upload error:', error);
            throw error;
        }
    }

    // New API call for getting a prediction
    // POST /predict/:imageId
    async getPrediction(imageId) {
        try {
            const response = await fetch(`${this.baseURL}/predict/${imageId}`, {
                method: 'POST' // Backend expects a POST request
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Prediction error:', error);
            throw error;
        }
    }

    // GET /history - Fetch all prediction history (fixed path)
    async getHistory() {
        try {
            const response = await fetch(`${this.baseURL}/history`, {
                method: 'GET'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await await response.json();
        } catch (error) {
            console.error('History fetch error:', error);
            throw error;
        }
    }

    // Add this method inside the ApiService class
    async submitFeedback(predictionId, isCorrect, notes) {
        try {
            const response = await fetch(`${this.baseURL}/feedback`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prediction_id: predictionId,
                    is_correct: isCorrect,
                    notes: notes
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Feedback submission error:', error);
            throw error;
        }
    }

    // Add this method to your ApiService class in js/api.js
async changePassword(token, newPassword) {
    try {
        const response = await fetch(`${this.baseURL}/auth/change-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ newPassword })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Change password error:', error);
        throw error;
    }
}
// Add this new method to the ApiService class in js/api.js
async updateProfile(token, userData) {
    try {
        const response = await fetch(`${this.baseURL}/auth/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Update profile error:', error);
        throw error;
    }
}
    // Helper method to handle errors
    handleError(error) {
        console.error('API Error:', error);
        return {
            success: false,
            message: error.message || 'An error occurred',
            error: error
        };
    }
}

const api = new ApiService();