# Job Posting Website - Backend

Welcome to the Job Posting Website Backend! This application serves as the backend for the job posting platform, providing APIs for user authentication, job postings, and candidate notifications.

## Features

- **User Authentication**: 
  - Job givers can sign up with their email and mobile number.
  - Email and mobile verification are implemented to ensure valid accounts.

- **Job Management**: 
  - Users can create, read job postings.

- **Candidate Notification**: 
  - Notify candidates about job postings they are interested in.

## Technologies Used

- **Backend**: 
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)

- **Database**: 
  - [MongoDB](https://www.mongodb.com/)

- **Authentication**: 
  - Email and mobile verification using OTP.

## Installation

To install and run the backend locally, follow these steps:

```bash
1. Clone the repository:
   git clone https://github.com/shashankkr20/JPB_Backend.git

2. Navigate to the project directory:
   cd JPB_Backend

3. Install dependencies:
   npm install

4. Set up your environment variables in a `.env` file:
   # Example .env
   MONGODB_URI=<your-mongodb-uri>
   PORT=3000

5. Run the application:
   node index.js
