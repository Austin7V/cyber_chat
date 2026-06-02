# Cyber Chat API

Cyber Chat is a RESTful backend API built with **NestJS**.  
It allows users to register, log in, create discussion threads, add comments, and manage their own content securely.

The project was built as part of the neue fische Full-Stack Bootcamp to practice backend architecture, RESTful API design, database persistence, authentication, authorization, validation, and API documentation.

---

## What is this project?

Cyber Chat is a small threaded discussion API.

Users can:

- Register an account
- Log in with username and password
- Receive a JWT access token
- Create threads
- List threads with pagination
- Read a single thread with comments
- Add comments to threads
- Update their own threads
- Delete their own threads
- Soft-delete their own comments
- Access protected routes only with a valid JWT token
- Explore and test the API through Swagger UI

---

## Why was this project built?

The goal of this project is to understand how a professional backend application is structured in NestJS.

The project focuses on:

- Separating responsibilities with modules, controllers, services, and entities
- Persisting data in a database instead of memory
- Using DTOs for request validation
- Returning controlled response shapes with response DTOs
- Protecting routes with JWT authentication
- Using the authenticated user instead of trusting client-provided author data
- Documenting the API with Swagger/OpenAPI

---

## Tech Stack

- **NestJS** – Backend framework
- **TypeScript** – Main programming language
- **TypeORM** – ORM for database access
- **SQLite / better-sqlite3** – Local persistent database
- **JWT** – Token-based authentication
- **Passport** – Authentication middleware
- **bcrypt** – Password hashing
- **class-validator** – DTO validation
- **class-transformer** – Response serialization
- **Swagger / OpenAPI** – API documentation
- **Bun** – Package manager and script runner

---

## Project Structure

```txt
src/
  auth/
    dto/
    guards/
    strategies/
    auth.controller.ts
    auth.module.ts
    auth.service.ts

  users/
    dto/
    user.entity.ts
    users.controller.ts
    users.module.ts
    users.service.ts

  threads/
    dto/
    thread.entity.ts
    threads.controller.ts
    threads.module.ts
    threads.service.ts

  comments/
    dto/
    comment.entity.ts
    comments.controller.ts
    comments.module.ts
    comments.service.ts

  common/
    dto/

  app.module.ts
  main.ts
```

---

## **Main Features**

### **Authentication**

The API uses JWT authentication.

Users can register and log in.

Passwords are never stored as plain text. They are hashed with bcrypt before being saved to the database.

After login, the user receives an access token.

Protected routes require this header:

```
Authorization: Bearer 
```

---

### **Authorization**

Users can only edit or delete their own content.

For example:

- A user can update only their own thread
- A user can delete only their own thread
- A user can soft-delete only their own comment

If another user tries to modify content they do not own, the API returns:

```
403 Forbidden
```

---

### **Threads**

A thread contains:

- `id`
- `title`
- `body`
- `author`
- `createdAt`

Thread authors are not sent manually in the request body.

The author is taken from the authenticated JWT user.

---

### **Comments**

A comment contains:

- `id`
- `body`
- `author`
- `createdAt`

Comments belong to threads.

Deleting a comment does not remove it from the database.

Instead, the comment body is changed to:

```
deleted
```

This is a soft-delete approach.

---

### **Pagination**

The thread list supports pagination.

Example:

```
GET /threads?page=1&limit=5
```

The response contains:

```
{
  "data": [],
  "meta": {
    "page": 1,
    "limit": 5,
    "total": 0,
    "totalPages": 0
  }
}
```

---

## **API Documentation**

Swagger UI is available at:

```
http://localhost:3000/api
```

The raw OpenAPI JSON document is available at:

```
http://localhost:3000/api-json
```

Swagger can be used to:

- View all endpoints
- Check required request bodies
- See success and error responses
- Authorize with a JWT token
- Test protected routes directly in the browser

---

## **Environment Variables**

Create a `.env` file in the project root:

```
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=1h
```

Important:

The `.env` file should not be committed to GitHub.

Make sure `.env` is listed in `.gitignore`.

---

## **Installation**

Install dependencies:

```
bun install
```

---

## **Running the App**

Start the development server:

```
bun run start:dev
```

The API will run at:

```
http://localhost:3000
```

Swagger documentation:

```
http://localhost:3000/api
```

---

## **Example Workflow**

### **1. Register a user**

```
POST /auth/register
```

Request body:

```
{
  "username": "sergey",
  "password": "secret123"
}
```

---

### **2. Log in**

```
POST /auth/login
```

Request body:

```
{
  "username": "sergey",
  "password": "secret123"
}
```

Response:

```
{
  "accessToken": "your.jwt.token"
}
```

---

### **3. Use the token**

For protected routes, send:

```
Authorization: Bearer your.jwt.token
```

---

### **4. Create a thread**

```
POST /threads
```

Request body:

```
{
  "title": "How does JWT authentication work?",
  "body": "I want to understand how guards and strategies work in NestJS."
}
```

The author is automatically taken from the authenticated user.

---

### **5. List threads**

```
GET /threads?page=1&limit=5
```

---

### **6. Add a comment**

```
POST /threads/:id/comments
```

Request body:

```
{
  "body": "This explanation helped me understand the topic."
}
```

---

## **Important HTTP Status Codes**

The API uses RESTful status codes:

- `200 OK` – Successful GET or PATCH request
- `201 Created` – Resource created successfully
- `204 No Content` – Successful DELETE request
- `400 Bad Request` – Invalid request data
- `401 Unauthorized` – Missing or invalid JWT token
- `403 Forbidden` – User is not allowed to modify this resource
- `404 Not Found` – Resource does not exist
- `409 Conflict` – Username already exists

---

## **What I Learned**

During this project, I practiced:

- Building a modular NestJS backend
- Designing RESTful endpoints
- Using TypeORM entities and repositories
- Persisting data with SQLite
- Validating requests with DTOs
- Serializing responses with response DTOs
- Hashing passwords with bcrypt
- Implementing JWT authentication
- Protecting routes with guards
- Checking resource ownership
- Documenting an API with Swagger

---

## **Development Notes**

This project started with in-memory repositories using `Map`.

Later, the storage layer was replaced with TypeORM and SQLite.

This helped demonstrate the difference between:

```
Temporary in-memory storage
```

and

```
Persistent database storage
```

The final version stores data permanently in a SQLite database file.

---

## **Author**

Created as part of the neue fische Full-Stack Web Development Bootcamp.
