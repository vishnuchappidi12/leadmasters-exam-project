LeadMasters AI - Full-Stack Exam Application
Hello there! This project is a simple but complete full-stack web application built for the fresher selection assessment at LeadMasters AI Tech Solutions. It's a student-side exam interface where a user can register, log in, take a timed quiz, and see their score at the end.

The goal was to build a functional and clean application using core web development principles.

 Features
User Authentication: Secure user registration and login using JSON Web Tokens (JWT).

Timed Quiz: A 30-minute countdown timer that automatically submits the exam when time runs out.

Dynamic Questions: Fetches a random set of multiple-choice questions from the backend every time an exam starts.

Simple Navigation: Easy-to-use "Next" and "Previous" buttons to move through questions.

Instant Results: Calculates and displays the user's score immediately after submission.

 Tech Stack
This project was built using the MERN stack:

Frontend: React.js

Backend: Node.js & Express.js

Database: MongoDB (using MongoDB Atlas)

🚀 Getting Started
Ready to get this running on your own machine? Just follow these steps.

Prerequisites
Make sure you have these installed first:

Node.js (which comes with npm)

A free MongoDB Atlas account (for the database)

1. Backend Setup
Let's get the server running.

Clone the repository:

git clone [https://github.com/your-username/leadmasters-assessment.git](https://github.com/your-username/leadmasters-assessment.git)
cd leadmasters-assessment/backend

Create your environment file:
Create a new file in the backend folder named .env. This is where you'll put your secret keys. Copy and paste the following, adding your own details:

# Your MongoDB connection string from Atlas
MONGO_URI=mongodb+srv://<username>:<password>@yourcluster.mongodb.net/yourDatabaseName

# A long, random, secret string for JWT
JWT_SECRET=this_is_a_really_good_secret_key

Important: Remember to replace the placeholders with your actual MongoDB username, password, and cluster details!

Install dependencies:

npm install

Start the server:

npm start

The backend should now be running on http://localhost:5000.

2. Frontend Setup
Now for the user interface.

Open a new terminal and navigate to the frontend folder:

cd leadmasters-assessment/frontend

Install dependencies:

npm install

Start the client:

npm start

Your browser should automatically open to http://localhost:3000, where you'll see the login page.


API Testing (cURL Commands)
Here are a few simple curl commands to test the backend API directly.

Register a new user:

curl -X POST -H "Content-Type: application/json" -d '{"name":"Test User","email":"test@example.com","password":"password123"}' http://localhost:5000/api/auth/register

Login to get a token:

curl -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com","password":"password123"}' http://localhost:5000/api/auth/login

Get exam questions (replace YOUR_TOKEN_HERE with the token from login):

curl -X GET -H "x-auth-token: YOUR_TOKEN_HERE" http://localhost:5000/api/exam/questions

And that's it! Hope you enjoy looking through the project.
