# HR Candidate Management System

## Project Overview

The HR Candidate Management System is a full-stack web application designed to streamline the recruitment process. It provides distinct portals for Admins, HR personnel, and Applicants, facilitating job opportunity management, application tracking, and user authentication with role-based access control.

## Features

### Admin Panel
- Add and manage HR accounts.
- Create and manage job opportunities.
- Oversee all system activities.

### HR Panel
- Create and publish new job opportunities.
- View and manage applications for their posted opportunities.

### Applicant Panel
- Browse available job opportunities.
- Apply to opportunities by submitting their profile and CV.
- Track the status of their applications.
- Manage their profile information.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web application framework for Node.js.
- **MySQL**: Relational database management system.
- **Sequelize**: ORM (Object-Relational Mapper) for Node.js and MySQL.
- **jsonwebtoken**: For implementing JWT-based authentication.
- **multer**: For handling file uploads (e.g., CVs).
- **dotenv**: For managing environment variables.
- **cors**: For enabling Cross-Origin Resource Sharing.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **React Router DOM**: For declarative routing in React applications.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **React Context API**: For state management, particularly authentication.
- **Vite**: Next generation frontend tooling.

## Setup and Installation

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- MySQL Server

### 1. Clone the repository

```bash
git clone <repository_url>
cd "HR Candidate Management System"
```

### 2. Backend Setup

Navigate to the `Backend` directory:
```bash
cd Backend
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the `Backend` directory and add the following environment variables. Replace the placeholder values with your actual database credentials and a strong JWT secret.

```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=hr_management_db
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
```

Initialize the database and start the backend server:
```bash
npm start
```
The backend server will run on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal and navigate to the `Frontend` directory:
```bash
cd Frontend
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm run dev
```
The frontend application will run on `http://localhost:5173`.

## Usage

1.  **Register/Login**: Open your browser and go to `http://localhost:5173`. You can sign up as a new user.
2.  **Role-Based Access**:
    *   **Admin**: After logging in, an admin can manage HR accounts and job opportunities.
    *   **HR**: HR personnel can create new job opportunities and view applications.
    *   **Applicant**: Applicants can browse opportunities, apply, and manage their profiles.

## Project Structure

```
.
├── Backend/
│   ├── config/             # Database configuration
│   ├── controllers/        # Business logic for different modules
│   ├── middleware/         # Authentication, authorization, and upload middleware
│   ├── models/             # Sequelize models and associations
│   ├── routes/             # API routes for different modules
│   ├── uploads/            # Stores uploaded files like CVs
│   ├── server.js           # Main backend application file
│   └── ...
└── Frontend/
    ├── public/             # Static assets
    ├── src/
    │   ├── api/            # API service calls
    │   ├── assets/         # Frontend assets
    │   ├── components/     # Reusable React components
    │   ├── context/        # React Context for global state (e.g., Auth)
    │   ├── pages/          # Page-level components organized by role and feature
    │   ├── App.jsx         # Main React application component
    │   ├── main.jsx        # Entry point for React app
    │   └── ...
    └── ...
```

## Contributing

Please feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).