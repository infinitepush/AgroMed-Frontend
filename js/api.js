// Simple API Service for Agro Med
class ApiService {
    constructor() {
        this.baseURL = 'https://agro-med-backend-isuh.onrender.com';
    }

    // AUTHENTICATION
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

    // USER PROFILE
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

    // IMAGE AND PREDICTION
    async uploadImage(imageFile, token) {
        try {
            if (!token) {
                throw new Error('Not authenticated.');
            }
            const formData = new FormData();
            formData.append('image', imageFile);

            const response = await fetch(`${this.baseURL}/upload`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
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

async getPrediction(imageId, token) {
    try {
        if (!token) {
            throw new Error('Not authenticated.');
        }
        const response = await fetch(`${this.baseURL}/predict/${imageId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({}) // send empty object if no body is needed
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

    async getHistory(token) {
        try {
            if (!token) {
                throw new Error('Not authenticated.');
            }
            const response = await fetch(`${this.baseURL}/history`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('History fetch error:', error);
            throw error;
        }
    }

    async submitFeedback(predictionId, isCorrect, notes, token) {
        try {
            if (!token) {
                throw new Error('Not authenticated.');
            }
            const response = await fetch(`${this.baseURL}/feedback`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
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
}

const api = new ApiService();