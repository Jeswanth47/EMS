**Employee Management System**

**Introduction**
The Employee Management System (EMS) is a web-based application designed to streamline HR operations by providing an efficient and user-friendly interface for managing employees, departments, salaries, and leave 
requests. This system is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, ensuring a seamless, secure, and scalable solution for organizations.
With role-based access control, EMS allows administrators to manage employees and departments, while employees can view their profiles, track attendance, apply for leave, and access salary details. The system 
ensures secure authentication using JWT tokens, real-time data updates, and intuitive UI components for smooth interaction.

**Tech Stack:**

**Frontend**:
React.js
React Router (Navigation)
Axios (API calls)
Tailwind CSS (Styling)
React Data Table (Tabular Data)

**Backend:**
Node.js (Server-side runtime)
Express.js (Web framework)
MongoDB (Database)
Mongoose (ODM for MongoDB)
JWT (Authentication)

**Backend Configuration**
Before running the backend, ensure you create a .env file inside the backend folder. This file should contain essential configurations such as:
- Database Connection(e.g., MongoDB)
- Other Environment Variables(such as API keys, authentication secrets, etc.)

> Example .env file
**MongoDB Localhost Configuration**
MONGO_URI=mongodb://localhost:27017/ems
**Other Configuration**
SECRET_KEY=your_secret_key
PORT=5000

**Running the Project**

**Running the Backend:**
- Navigate to the backend folder and install dependencies.
- commands : cd Backend , npm i
- Start the backend server : npm start
  
**Running the Frontend**:
- Navigate to the Frontend folder and install dependencies.
- commands : cd Frontend , npm i
- Start the frontend server : npm start
