# Product API with JWT Authentication

This is a RESTful API built with Node.js and Express that implements a JWT authentication system and product management.

## Requirements

- Node.js (v14 or higher)
- npm or yarn
- Configured environment variables (see `.env.example`)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd [project-name]
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

4. Edit the `.env` file with your values.

## Environment Variables

```
PORT=3000
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
```

## Endpoints

### Authentication (Public)

- `POST /api/auth/register`
  - Register a new user
  - Body: `{ "email": "string", "password": "string" }`

- `POST /api/auth/login`
  - Login and return a JWT token
  - Body: `{ "email": "string", "password": "string" }`
  - Response: `{ "token": "jwt.token.here" }`

### Products (Protected - Requires JWT)

- `GET /api/products`
  - Get all products
  - Headers: `Authorization: Bearer <token>`

- `POST /api/products`
  - Create a new product
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "name": "string", "price": number, "description": "string" }`

### Categories (Protected - Requires JWT)

- `GET /api/categories`
  - Get all categories
  - Headers: `Authorization: Bearer <token>`

- `POST /api/categories`
  - Create a new category
  - Headers: `Authorization: Bearer <token>`
  - Body: `{ "name": "string", "description": "string" }`

## Project Structure

```
/src
  /middleware
    auth.js       # JWT authentication middleware
  /routes
    auth.js       # Authentication routes
    products.js   # Product routes
    categories.js # Category routes
  app.js          # Main entry point
.env.example     # Environment variables example
```

## Execution

To start the server in development mode:
```bash
npm start
```

The server will be available at `http://localhost:3000`

## Usage Examples

### User registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

### Get products (protected)
```bash
curl -X GET http://localhost:3000/api/products \
  -H "Authorization: Bearer <your_jwt_token>"
```

### Get categories (protected)
```bash
curl -X 'GET' 'http://localhost:3000/api/categories' \
  -H "Authorization: Bearer <your_jwt_token>'
```

## License

MIT