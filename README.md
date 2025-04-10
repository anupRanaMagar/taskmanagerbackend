# Task Manager API

A simple Express.js REST API for user authentication and task management. This project uses JWT-based authentication with access and refresh tokens.

---

## 🚀 Features

- User registration and login
- JWT authentication (access & refresh tokens)
- Task CRUD operations
- Protected routes
- Refresh token rotation
- CORS and cookie-based session handling

---

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Add Environment Variables

Create a `.env` file using the following template and replace with your values.

## ⚙️ Environment Variables

```env
DATABASE_URL=your_postgres_url
PORT=8000
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
ROOT_ORIGIN=http://localhost:3000
```

### 4. Run the Server

```bash
npm run dev
```

Server should start on `http://localhost:8000`.

---

## 📂 Tech Stack

- **Node.js**
- **Express.js**
- **PostgreSQL** (via `DATABASE_URL`)
- **JWT** for authentication

---

## 📦 API Endpoints

### Auth Routes

#### `POST /auth/register`

Register a new user.  
**Request Body:**

```json
{
  "name": "yourusername",
  "email": "youremail",
  "password": "yourpassword"
}
```

#### `POST /auth/login`

Authenticate a user and return **access** and **refresh tokens** in `httpOnly` cookies.  
**Request Body:**

```json
{
  "email": "youremail",
  "password": "yourpassword"
}
```

#### `POST /auth/logout`

Logs out a user by:

- Clearing the `accessToken` and `refreshToken` cookies.
- Removing the refresh token from the server-side store (if implemented).

**Response:**

```json
{
  "message": "Logged out successfully"
}
```

> This ensures that the refresh token cannot be reused after logout.

#### `POST /auth/refresh-token`

Generates a new access token using a valid refresh token. This is useful when the access token expires.

**Behavior:**

- Looks for `refreshToken` in the cookies.
- Validates the refresh token.
- If valid, issues a new access token (and optionally a new refresh token).

**Response:**

```json
{
  "accessToken": "newlyIssuedAccessToken"
}
```

> This route is usually called automatically from the frontend when a 401 (Unauthorized) is encountered, using `axios` interceptors.

---

### Task Routes (Protected – Require Valid Access Token)

#### `GET /tasks/get-tasks`

Fetch all tasks for the authenticated user.

#### `POST /create-task`

Add a new task.  
**Request Body:**

```json
{
  "title": "Task title",
  "description": "Task description"
}
```

#### `DELETE /tasks/delete-tasks/:id`

Delete a task by its ID.

---

## 🍪 Cookie Configuration

- `accessToken`: Stored at `localstorage` with a short expiration time.
- `refreshToken`: Stored as an `httpOnly`, `secure` cookie for long-term session handling.

---

## 🔐 Authentication Flow

1. **Login** – Generates and sends `accessToken` + `refreshToken`.
2. **Access Protected Route** – Use `accessToken` in cookies to access protected APIs.
3. **Token Expired?** – Frontend sends `POST /auth/refresh-token` to get a new `accessToken`.
4. **Logout** – Clears cookies and invalidates refresh tokens.

---

## 📬 Contact

For questions, reach out via GitHub or email.

---
