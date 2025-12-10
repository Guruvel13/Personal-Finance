# Personal Finance Tracker

A comprehensive personal finance management application designed to help users track their income and expenses, visualize financial data, and manage their budget effectively. Built with the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features

- **User Authentication**: Secure login, registration, and profile management using JWT authentication.
- **Dashboard**: Interactive dashboard with graphical insights into your financial health.
- **Income & Expense Tracking**: Easily add, edit, and delete income and expense records.
- **Data Visualization**: Clear charts and graphs using Recharts to analyze spending habits.
- **Responsive Design**: Modern UI built with Tailwind CSS, fully responsive across devices.
- **Theme Support**: Customizable appearance (Dark/Light mode support).

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite)
- **Styling**: Tailwind CSS (v4)
- **State Management & API**: Context API / Axios
- **Routing**: React Router DOM
- **Visualization**: Recharts
- **Icons**: React Icons
- **Notifications**: React Hot Toast

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose)
- **Authentication**: JSON Web Tokens (JWT) & Bcryptjs
- **File Handling**: Multer (for image uploads)
- **Utilities**: Dotenv, CORS

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or Atlas Cluster)
- [Git](https://git-scm.com/)

## 📦 Installation & Setup

Follow these steps to set up the project locally.

### 1. Clone the repository

```bash
git clone <repository-url>
cd Finance
```

### 2. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Create a `.env` file in the `backend` folder and configure the following variables:
    ```env
    PORT=8000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_key
    CLIENT_URL=http://localhost:5173
    ```
    *(Replace `your_mongodb_connection_string` and `your_super_secret_key` with your actual credentials)*

4.  Start the backend server:
    ```bash
    npm run dev
    ```
    The server should now be running on `http://localhost:8000`.

### 3. Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```bash
    cd forntend/finance-tracker
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  (Optional) Create a `.env` file in the frontend directory if you need to override the default API URL:
    ```env
    VITE_API_BASE_URL=http://localhost:8000
    ```

4.  Start the development server:
    ```bash
    npm run dev
    ```

## 🖥️ Running the Application

Once both the backend and frontend servers are running:
1.  Open your browser and visit `http://localhost:5173`.
2.  Register for a new account.
3.  Log in to access the dashboard and start managing your finances!

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project, please:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the [ISC License](LICENSE).
