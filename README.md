# Agro Med - Simple API Integration

A simple crop disease detection application with basic API integration.

## 🚀 Quick Start

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm run dev
   ```

The backend will start on `http://localhost:3000`

### Frontend Setup

1. **Open the frontend files in your browser**
   - Simply open `index.html` in your browser, or
   - Use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve .
     ```

2. **Access the application**
   - Open `http://localhost:8000` in your browser

## 📡 API Endpoints

### 1. POST /predict-back
Upload an image for disease prediction.

**Request:**
- Method: `POST`
- URL: `http://localhost:3000/predict-back`
- Body: `FormData`
  - `file`: Image file (JPEG, PNG, WebP)
  - `userId`: User ID (string)

**Response:**
```json
{
  "success": true,
  "message": "Disease prediction completed successfully",
  "data": {
    "user_id": "12345",
    "date-time": "2024-01-15T10:30:00Z",
    "image_url": "http://localhost:3000/uploads/image.jpg",
    "crop": "Rice",
    "disease": "Bacterial Blight",
    "confidence": 0.92,
    "solution": "Use resistant varieties, apply appropriate fungicides for Bacterial Blight"
  }
}
```

### 2. GET /history/{user_id}
Get all past predictions for a user.

**Request:**
- Method: `GET`
- URL: `http://localhost:3000/history/12345`

**Response:**
```json
{
  "success": true,
  "message": "User history retrieved successfully",
  "data": [
    {
      "user_id": "12345",
      "date-time": "2024-01-15T10:30:00Z",
      "image_url": "http://localhost:3000/uploads/image.jpg",
      "crop": "Rice",
      "disease": "Bacterial Blight",
      "confidence": 0.92,
      "solution": "Use resistant varieties, apply appropriate fungicides for Bacterial Blight"
    }
  ]
}
```

## 🧪 Testing

### Test the API with cURL

**Upload an image:**
```bash
curl -X POST http://localhost:3000/predict-back \
  -F "file=@path/to/your/image.jpg" \
  -F "userId=12345"
```

**Get user history:**
```bash
curl -X GET http://localhost:3000/history/12345
```

### Test the Frontend

1. Open `test.html` in your browser
2. Enter a User ID (e.g., "12345")
3. Upload an image
4. Click "Analyze Image"
5. View the results

## 📁 Project Structure

```
agro-med/
├── js/
│   ├── api.js              # Simple API service
│   ├── test.js             # Test page functionality
│   ├── history.js          # History page functionality
│   ├── index.js            # Home page functionality
│   ├── signin.js           # Sign in page functionality
│   ├── signup.js           # Sign up page functionality
│   └── terms.js            # Terms page functionality
├── test.html               # Image upload and prediction page
├── history.html            # History viewing page
├── index.html              # Home page
├── signin.html             # Sign in page
├── signup.html             # Sign up page
├── terms.html              # Terms and conditions page
├── dashboard.html          # Dashboard page
├── news.html               # News page
├── account.html            # Account page
├── feedback.html           # Feedback page
├── forgotpassword.html     # Forgot password page
├── backend/
│   ├── server.js           # Express server
│   ├── package.json        # Dependencies
│   └── uploads/            # Uploaded images
└── README.md               # This file
```

## 🔧 Configuration

### Backend Configuration
- **Port**: 3000 (change in `server.js`)
- **File size limit**: 10MB
- **Supported formats**: JPEG, PNG, WebP

### Frontend Configuration
- **API Base URL**: `http://localhost:3000` (change in `js/api.js`)

## 📝 Notes

- This is a simple implementation for demonstration
- The disease detection is mocked (random results)
- Images are stored locally in the `uploads` folder
- No database is used (data is stored in memory)
- CORS is enabled for local development

## 🚀 Next Steps

To make this production-ready:
1. Integrate with a real ML model for disease detection
2. Add a database (PostgreSQL, MongoDB, etc.)
3. Use cloud storage for images (AWS S3, Cloudinary, etc.)
4. Add authentication and user management
5. Implement proper error handling and validation
