# Job Application Tracker

This is a full-stack web application that allows users to track their job applications. It features user authentication, secure storage of user data, and a clean and responsive frontend built with React. The backend uses Node.js and Express to interact with a PostgreSQL database, and the project is fully containerized with Docker.

---

## Features

### User Authentication
- **Sign-Up**: Register with a username, email, and password.
- **Login**: Authenticate using email and password.
- **JWT-Based Authentication**: Secure API routes with JSON Web Tokens (JWT).

### Job Application Tracking
- **Add Job Applications**: Add job details such as title, company, salary, date applied, status, and interview stage.
- **View Job Applications**: Retrieve and display job applications specific to the logged-in user.

### Technology Stack
- **Frontend**: React with Tailwind CSS.
- **Backend**: Node.js, Express, PostgreSQL.
- **Authentication**: JWT with bcrypt for password hashing.
- **Containerization**: Docker for consistent deployment.

---

## Prerequisites

1. Install [Docker](https://www.docker.com/).
2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/job-application-tracker.git
   cd job-application-tracker
   ```
3. Ensure your `.env` file contains the following:
   ```env
   PORT=5000
   PG_USER=your_postgres_username
   PG_PASSWORD=your_postgres_password
   PG_HOST=your_postgres_host
   PG_PORT=5432
   PG_DATABASE=your_database_name
   JWT_SECRET=your_jwt_secret
   ```

---

## Setting Up the Project

### 1. Build and Run the Docker Containers

Build the Docker image:
```bash
docker build -t job-tracker .
```

Run the Docker container:
```bash
docker run -d -p 5000:5000 --name job-tracker job-tracker
```

### 2. Database Setup

Run the following SQL commands to create the necessary tables:

#### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Job Applications Table
```sql
CREATE TABLE job_applications (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    job_title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2),
    date_applied DATE,
    status VARCHAR(50),
    interview_stage VARCHAR(100)
);
```

---

## Running the Application

### Development Mode
1. Ensure Docker is running.
2. Run the container as described in the setup.
3. Access the application at `http://localhost:3000`.

---

## Troubleshooting

### Missing Dependencies
If you encounter errors like `Module not found`, ensure the dependencies are installed inside the Docker container. Rebuild the container after updating `package.json`:
```bash
docker build -t job-tracker .
```

### Check Installed Modules
To confirm installed modules:
```bash
docker exec -it job-tracker sh
cd /app
ls node_modules
```

### Rebuilding the Docker Image
If changes are made to the code or `Dockerfile`, rebuild the image:
```bash
docker build -t job-tracker .
```

---

## License
This project is licensed under the MIT License. See the `LICENSE` file for more details.

---

## Acknowledgments
- Thanks to [React](https://reactjs.org/) and [Node.js](https://nodejs.org/) communities for their resources and support.
- Special thanks to Docker for simplifying deployments.

