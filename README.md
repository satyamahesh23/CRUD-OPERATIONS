# MERN CRUD API — Products

A simple RESTful API built with Node.js, Express, and MongoDB to perform CRUD operations on a Product resource.

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- cors

## Setup Instructions
1. Clone the repo and run `npm install`
2. Create a `.env` file (see `.env.example`) with your MongoDB URI
3. Run `node server.js`
4. Server runs at http://localhost:3000

## API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | Get all products |
| GET | /api/products/:id | Get single product |
| POST | /api/products | Create new product |
| PUT | /api/products/:id | Update product |
| DELETE | /api/products/:id | Delete product |