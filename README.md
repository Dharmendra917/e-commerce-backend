# E-Commerce Backend

This is the backend service for the E-Commerce application. It provides APIs for user authentication, product management, order processing, and more.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/Dharmendra917/e-commerce-backend.git
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

## Usage

1. Start the development server:
   ```sh
   npm run dev
   ```
2. The server will be running at `http://localhost:4999`.

## API Endpoints

## User Routes

POST /api/v1/user/signup - Register a new user
POST /api/v1/user/signin - Login a user
GET /api/v1/user/signout - Logout a user
GET /api/v1/user/current - Get user profile

## Product Routes

GET /api/v1/products/read - Get all products
GET /api/v1/products/single/:id - Get a single product by ID
POST /api/v1/products/add-product - Create a new product
PUT /api/v1/products/update/:id - Update a product by ID
DELETE /api/v1/products/delete/:id - Delete a product by ID

## Environment Variables

Create a `.env` file in the root directory and add the following variables:

PORT = 4999
MONGODB_URL = 'mongodb://127.0.0.1:27017/ecommerce'

EXPRESS_SESSION_SECRET = 'EXPRESS_SESSION_SECRET'
JWT_SECRET = 'JWT_SECRET'
JWT_EXPIRE = '12h'
COOKIE_EXIPRES = 1

PUBLICKEY_IMAGEKIT =
PRIVATEKEY_IMAGEKIT =
URLENDPOINT_IMAGEKIT =

```

```
