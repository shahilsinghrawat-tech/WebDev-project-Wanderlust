Wanderlust – Full-Stack Travel Listing Platform

Wanderlust is a full-stack web application inspired by Airbnb that allows users to discover, create, and manage travel property listings. Users can securely register, upload property images, leave reviews, and explore accommodations through an intuitive interface.

Live Demo: **https://webdev-project-wanderlust.onrender.com**

	
✨ Features
🔐 User Authentication (Sign Up, Login & Logout)
🏡 Create, Edit & Delete Property Listings
📷 Image Upload using Cloudinary
⭐ Review & Rating System
🛡️ Authorization (Only owners can edit/delete their listings)
📍 Interactive Maps for Property Locations
💬 Flash Messages & Form Validation
🔍 Basic Search Functionality
🏷️ Category Filters
☁️ MongoDB Atlas Cloud Database
🚀 Deployed on Render

Tech Stack
Frontend
HTML5
CSS3
Bootstrap 5
EJS (Embedded JavaScript Templates)

Backend
Node.js
Express.js
Database
MongoDB Atlas
Mongoose

Authentication
Passport.js
Passport Local
Express Session

Cloud Services
Cloudinary (Image Storage)
Mapbox / MapTiler (Maps & Geocoding)

Other Packages
Multer
Joi
Method Override
Connect Flash
Connect Mongo
Dotenv

📂 Project Structure
Wanderlust
│
├── controllers/
├── models/
├── routes/
├── middleware/
├── views/
├── public/
├── utils/
├── init/
├── cloudConfig.js
├── schema.js
├── app.js
├── package.json
└── README.md

⚙️ Installation

Clone the repository

git clone https://github.com/shahilsinghrawat-tech/WebDev-project-Wanderlust.git

Go to the project directory

cd WebDev-project-Wanderlust

Install dependencies

npm install

Create a .env file and add:

ATLASDB_URL=your_mongodb_connection_string

SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_or_maptiler_token

Run the application

nodemon app.js

Visit

http://localhost:3000

leware
Server-side Validation using Joi
🚀 Deployment
Frontend & Backend: Render
Database: MongoDB Atlas
Image Storage: Cloudinary

Live Application

👉 https://webdev-project-wanderlust.onrender.com

🎯 Future Improvements
❤️ Wishlist
📅 Booking System
💳 Online Payments
👤 User Profiles
📧 Email Notifications
🌐 Google OAuth Login

* What I Learned**

Through this project I gained practical experience with:

Building RESTful APIs
MVC Architecture
Authentication & Authorization
MongoDB Atlas Integration
Image Uploads using Cloudinary
Express Sessions
Deployment on Render
Environment Variables
Error Handling & Validation
Full-Stack Project Structure

👨‍💻 Author
Shahil Singh Rawat

GitHub: https://github.com/shahilsinghrawat-tech
Live Project: https://webdev-project-wanderlust.onrender.com

If you like this project, consider giving it a ⭐ Star on GitHub. It motivates me to build more projects!
