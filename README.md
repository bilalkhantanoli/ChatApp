# ChatApp

ChatApp is a real-time chat application where users can create an account and chat with others. It uses the MERN stack (MongoDB, Express, React, Node.js) and Socket.io for real-time communication.

## Features

- User authentication (sign up, log in, log out)
- Real-time messaging using Socket.io
- Create and join chat rooms
- User profile management

## Technologies Used

- MongoDB
- Express
- React
- Node.js
- Socket.io

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/ChatApp.git
   cd ChatApp/Backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `Backend` directory and add the following environment variables:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the backend server:

   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `Frontend` directory:

   ```bash
   cd ../Frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

### Running the Application

1. Ensure that both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3000`.
3. Create an account or log in to start chatting in real-time.

## License
