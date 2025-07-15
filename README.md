# 📦 EVENT-MANAGER-API

<p align="center">
	<img src="https://img.shields.io/github/last-commit/rajatsingh23/event-manager-api?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/rajatsingh23/event-manager-api?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/rajatsingh23/event-manager-api?style=default&color=0080ff" alt="repo-language-count">
</p>

---

## 📖 Table of Contents

- [📘 Overview](#-overview)
- [✨ Features](#-features)
- [📁 Project Structure](#-project-structure)
  - [📂 Project Index](#-project-index)
- [🚀 Getting Started](#-getting-started)
  - [⚙️ Prerequisites](#-prerequisites)
  - [🔧 Installation](#-installation)
- [📌 Usage](#-usage)
- [📚 API Endpoints](#-api-endpoints)
- [📤 Example Requests & Responses](#-example-requests--responses)

---

## 📘 Overview

A RESTful API built with **Node.js**, **Express**, and **PostgreSQL** to manage events, users, and registrations. It allows you to create events, register users, view stats, and more.

---

## ✨ Features

- Create and manage events with capacity constraints
- Register and cancel user registrations
- Prevent duplicate or past event registrations
- View stats for any event
- Built-in error handling middleware

---

## 📁 Project Structure

```sh
└── event-manager-api/
    ├── package-lock.json
    ├── package.json
    ├── .env
    └── src
        ├── config/
        ├── controller/
        ├── data/
        ├── index.js
        ├── middleware/
        ├── models/
        └── routes/
```

---

## 🚀 Getting Started

### ⚙️ Prerequisites

- **Node.js** and **npm**
- **PostgreSQL** installed and running
- A PostgreSQL database created

### 🔧 Installation

1. Clone the repository:

```sh
git clone https://github.com/rajatsingh23/event-manager-api
cd event-manager-api
```

2. Install dependencies:

```sh
npm install
```

3. Create a `.env` file in the **root** directory:

```env
PORT=3001
DB_USER=your_postgres_username
DB_HOST=localhost
DB_DATABASE=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432
```

4. Start the development server:

```sh
npm run dev
```

---

## 📚 API Endpoints

### 🔹 Events

| Method | Endpoint                        | Description                      |
|--------|----------------------------------|----------------------------------|
| POST   | `/api/event`                    | Create a new event               |
| GET    | `/api/event/:eventId`           | Get event details + users        |
| POST   | `/api/event/:eventId/register`  | Register a user                  |
| DELETE | `/api/event/:eventId/cancel`    | Cancel a user's registration     |
| GET    | `/api/events`                   | List all upcoming events         |
| GET    | `/api/event/:eventId/stats`     | Get event stats                  |

### 🔹 Users

| Method | Endpoint            | Description          |
|--------|----------------------|----------------------|
| POST   | `/api/user`         | Create a user        |
| GET    | `/api/user/:userId` | Get a specific user  |
| GET    | `/api/users`        | Get all users        |

---

## 📤 Example Requests & Responses

### ✅ Create an Event

```http
POST /api/event
```

**Body:**

```json
{
  "title": "Hackathon 2025",
  "dateTime": "2025-08-10T09:30:00Z",
  "location": "Bangalore",
  "capacity": 150
}
```

**Response:**

```json
{
  "status": 201,
  "message": "Event created successfully",
  "data": { "id": 1 }
}
```

---

### 👤 Register a User

```http
POST /api/user
```

**Body:**

```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

---

### 📝 Register for Event

```http
POST /api/event/1/register
```

**Body:**

```json
{
  "userId": 1
}
```

---

### 📊 Event Stats

```http
GET /api/event/1/stats
```

**Response:**

```json
{
  "totalRegistrations": 42,
  "remainingCapacity": 108,
  "percentageOfCapacityUsed": "28.00%"
}
```

---


