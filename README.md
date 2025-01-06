# Task Manager - Full Stack MERN Application

![GitHub stars](https://img.shields.io/github/stars/maheshchichkoti/task-management-application?style=social)
![GitHub forks](https://img.shields.io/github/forks/maheshchichkoti/task-management-application?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/maheshchichkoti/task-management-application?style=social)
![GitHub last commit](https://img.shields.io/github/last-commit/maheshchichkoti/task-management-application)

[Live Demo](https://task-management-application-dpig.onrender.com/)

## Overview

The **Task Manager** is a comprehensive, full-stack web application built using the **MERN stack** (MongoDB, Express.js, React, Node.js). It's designed to be a robust and user-friendly solution for both individual and team-based task management. This application showcases my skills in full-stack development, emphasizing modern web development practices and efficient user interface design.

## Features

- **User Authentication:**
  - Secure signup and login functionality.
  - JWT (JSON Web Token) based authentication for enhanced security.
- **Task Management:**
  - Intuitive interface for creating, viewing, updating, and deleting tasks.
  - Real-time updates for immediate feedback on task operations.
- **Profile Management:**
  - Users can view and update their profile information.
- **Responsive Design:**
  - Fully responsive and mobile-friendly design, ensuring a seamless experience across all devices.

## Technologies Used

- **Frontend:**
  - **React:** For building the dynamic user interface.
  - **Redux:** For efficient state management.
  - **Axios:** For making API requests to the backend.
  - **React Router:** For client-side routing.
  - **React Toastify:** For displaying user-friendly notifications.
- **Backend:**
  - **Node.js:** For the server-side runtime environment.
  - **Express.js:** For building the RESTful API and handling server-side routing.
  - **MongoDB:** For the NoSQL document database.
  - **Mongoose:** For elegant MongoDB object modeling.
  - **JWT:** For user authentication.
  - **Bcrypt:** For password hashing and security.
- **Deployment:**
  - **Render:** For hosting the live application.

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/maheshchichkoti/task-management-application.git
   cd task-management-application
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Variables:**

   - Create a `.env` file in the `backend` directory and add the following:

     ```
     MONGODB_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     FRONTEND_URL=http://localhost:3000
     ```

     Replace `<your_mongodb_connection_string>` with your actual MongoDB connection string and `<your_jwt_secret>` with a strong, unique secret for JWT.

   - Create a `.env` file in the `frontend` directory and add the following:

     ```
     REACT_APP_API_BASE_URL=http://localhost:5000
     ```

5. **Run the Application:**

   - Start the backend server:

     ```bash
     cd backend
     npm start
     ```

   - Start the frontend development server:

     ```bash
     cd frontend
     npm start
     ```

6. **Access the Application:**

   Open your web browser and navigate to `http://localhost:3000`.

## API Endpoints

The application provides the following RESTful API endpoints:

### Authentication

- `POST /api/auth/signup`: Register a new user.
- `POST /api/auth/login`: Log in an existing user.

### Tasks

- `GET /api/tasks`: Retrieve all tasks for the authenticated user.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/:taskId`: Update an existing task by ID.
- `DELETE /api/tasks/:taskId`: Delete a task by ID.

### Profile

- `GET /api/profile`: Get the profile of the authenticated user.
- `PUT /api/profile`: Update the profile of the authenticated user.

## Future Improvements

- **Enhanced Task Categorization:** Implement features for assigning tasks to projects or categories.
- **Collaboration Features:** Allow users to share tasks and collaborate with other users.
- **Calendar Integration:** Integrate a calendar view to visualize tasks based on due dates.
- **Drag and Drop:** Implement drag-and-drop functionality for reordering tasks.
- **Notifications:** Add email or push notifications for task reminders.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `bugfix/issue-description`.
3. Make your changes and commit them with clear, descriptive commit messages.
4. Push your branch to your forked repository: `git push origin feature/your-feature-name`.
5. Create a pull request from your forked repository to the main branch of the original repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions, suggestions, or feedback, please feel free to reach out:

- **Mahesh Chichkoti**
- **Email:** [maheshchitkoti@gmail.com](mailto:maheshchitkoti@gmail.com)
- **GitHub:** [https://github.com/maheshchichkoti](https://github.com/maheshchichkoti)
- **LinkedIn:** [https://www.linkedin.com/in/maheshchitakoti/](https://www.linkedin.com/in/maheshchitakoti/)

---
