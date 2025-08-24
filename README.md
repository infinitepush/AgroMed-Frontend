🌿 AgroMed Frontend

The AgroMed Frontend is a responsive, user-friendly web interface designed to help farmers and gardeners identify crop diseases through image analysis. Built to work seamlessly with the AgroMed backend API, it allows users to upload plant images, view predictions, track their testing history, and provide valuable feedback.

🚀 Features

📸 Image Upload
Upload a picture of a plant to get a disease prediction from the backend.

🔐 User Authentication
Securely sign up and sign in to manage your profile and history.

📊 Prediction History
View a list of your past tests and disease detection results.

📝 Feedback System
Submit feedback on the accuracy of the predictions received.

👤 Dynamic Profile
View and update your personal account information.

🛠 Getting Started
✅ Prerequisites

A modern web browser

A running instance of the AgroMed Backend (deployed on Render or locally)

📦 Installation

Clone the repository:

git clone https://github.com/infinitepush/AgroMed-Frontend.git


Navigate into the project directory:

cd AgroMed-Frontend


Run the project using a local server (recommended: Live Server extension in VS Code):

Open the project in VS Code.

Right-click on index.html.

Select "Open with Live Server".

The frontend should now be running and connected to your live backend.

📁 Project Structure
AgroMed-Frontend/
├── assets/             # Images and static assets
├── js/                 # JavaScript files for front-end logic
│   ├── account.js      # User profile functionality
│   ├── api.js          # API request logic
│   ├── feedback.js     # Feedback submission logic
│   ├── history.js      # Prediction history logic
│   ├── signin.js       # Sign-in functionality
│   ├── signup.js       # Sign-up functionality
│   └── test.js         # Image upload and test logic
├── account.html        # User profile page
├── dashboard.html      # Main user dashboard
├── feedback.html       # Feedback form page
├── history.html        # Prediction history page
├── index.html          # Landing page
├── signin.html         # Sign-in page
├── signup.html         # Sign-up page
└── test.html           # Image upload & prediction page

🧰 Technologies Used

HTML5 – Markup structure

JavaScript (ES6+) – Frontend logic & API interaction

Tailwind CSS – Utility-first CSS for modern, responsive UI

🙏 Acknowledgments

Special thanks to TyroBytes team for the collaborative effort in building and debugging this project. Their persistence and contributions played a crucial role in making AgroMed a success.
