# Medicare API Documentation

## Overview

Medicare is a web application that provides medicine ordering and delivery services. This API documentation covers the endpoints and usage of the Medicare backend services for frontend developers.

## Base URL

```
http://localhost:5001/api
```

## Authentication

Most endpoints require authentication. The API uses JWT (JSON Web Token) for authentication.

- When a user logs in, they receive a token
- This token must be included in subsequent requests in the Authorization header:

```
Authorization: Bearer {token}
```

## API Endpoints

### Authentication

#### Register User

- **URL**: `/auth/register/user`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "address": {
      "houseNo": "123",
      "road": "Main Street",
      "area": "Downtown"
    }
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully. Please check your email for verification."
  }
  ```

#### Register Pharmacy

- **URL**: `/auth/register/pharmacy`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "name": "City Pharmacy",
    "email": "pharmacy@example.com",
    "password": "password123",
    "address": {
      "shopNo": "456",
      "road": "Main Street",
      "area": "Downtown"
    },
    "licenseNumber": "PHR12345"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Pharmacy registered successfully. Please check your email for verification."
  }
  ```

#### Verify Email

- **URL**: `/auth/verify/:token`
- **Method**: `POST`
- **Authentication**: Not required
- **Response**:
  ```json
  {
    "message": "Email verified successfully. You may login now."
  }
  ```

#### Login

- **URL**: `/auth/login`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "jwt_token_here",
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "user@example.com",
      "address": {
        "houseNo": "123",
        "road": "Main Street",
        "area": "Downtown"
      },
      "type": "user" // or "pharmacy"
    }
  }
  ```

#### Forgot Password

- **URL**: `/auth/forgot-password`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Password reset link sent to your email"
  }
  ```

#### Reset Password

- **URL**: `/auth/reset-password`
- **Method**: `POST`
- **Authentication**: Not required
- **Request Body**:
  ```json
  {
    "token": "reset_token_from_email",
    "password": "new_password"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Password reset successful"
  }
  ```

#### Update User Profile

- **URL**: `/auth/update-user-profile`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "id": "user_id",
    "name": "Updated Name",
    "address": {
      "houseNo": "123",
      "road": "New Street",
      "area": "Uptown"
    }
  }
  ```
- **Response**:
  ```json
  {
    "user": {
      "id": "user_id",
      "name": "Updated Name",
      "email": "user@example.com",
      "address": {
        "houseNo": "123",
        "road": "New Street",
        "area": "Uptown"
      },
      "type": "user"
    }
  }
  ```

#### Logout

- **URL**: `/auth/logout`
- **Method**: `POST`
- **Authentication**: Required
- **Response**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Medicines

#### Get All Medicines

- **URL**: `/medicine`
- **Method**: `GET`
- **Authentication**: Not required
- **Response**:
  ```json
  {
    "success": true,
    "count": 10,
    "data": [
      {
        "_id": "medicine_id",
        "category": "Pain Relief",
        "mediname": "Paracetamol",
        "subname": "Tablet",
        "mediimage": "image_url.jpg",
        "price": 10.99,
        "quantity": "10 tablets"
      }
    ]
  }
  ```

#### Get All Categories

- **URL**: `/medicine/categories`
- **Method**: `GET`
- **Authentication**: Not required
- **Response**:
  ```json
  {
    "success": true,
    "count": 5,
    "data": ["Pain Relief", "Antibiotics", "Vitamins", "Skincare", "First Aid"]
  }
  ```

#### Get Medicines by Category

- **URL**: `/medicine/:category`
- **Method**: `GET`
- **Authentication**: Not required
- **Response**:
  ```json
  {
    "success": true,
    "count": 3,
    "data": [
      {
        "_id": "medicine_id",
        "category": "Pain Relief",
        "mediname": "Paracetamol",
        "subname": "Tablet",
        "mediimage": "image_url.jpg",
        "price": 10.99,
        "quantity": "10 tablets"
      }
    ]
  }
  ```

#### Get Medicine by Name

- **URL**: `/medicine/medicinename/:name`
- **Method**: `GET`
- **Authentication**: Not required
- **Response**:
  ```json
  {
    "success": true,
    "data": {
      "_id": "medicine_id",
      "category": "Pain Relief",
      "mediname": "Paracetamol",
      "subname": "Tablet",
      "mediimage": "image_url.jpg",
      "price": 10.99,
      "quantity": "10 tablets"
    }
  }
  ```

### Orders

#### Create Order

- **URL**: `/order/create`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "userId": "user_id",
    "products": [
      {
        "image": "image_url.jpg",
        "name": "Paracetamol",
        "subname": "Tablet",
        "price": 10.99,
        "quantity": 2
      }
    ],
    "area": "Downtown"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Order created successfully",
    "order": {
      "_id": "order_id",
      "user": "user_id",
      "products": [
        {
          "image": "image_url.jpg",
          "name": "Paracetamol",
          "subname": "Tablet",
          "price": 10.99,
          "quantity": 2
        }
      ],
      "totalAmount": 21.98,
      "orderArea": "Downtown",
      "status": "pending",
      "accepted": false,
      "createdAt": "2025-04-15T12:00:00.000Z"
    }
  }
  ```

#### Get User Orders

- **URL**: `/order/user/:userId`
- **Method**: `GET`
- **Authentication**: Required
- **Response**:
  ```json
  {
    "success": true,
    "count": 2,
    "orders": [
      {
        "_id": "order_id",
        "user": "user_id",
        "products": [
          {
            "image": "image_url.jpg",
            "name": "Paracetamol",
            "subname": "Tablet",
            "price": 10.99,
            "quantity": 2
          }
        ],
        "totalAmount": 21.98,
        "orderArea": "Downtown",
        "status": "pending",
        "accepted": false,
        "createdAt": "2025-04-15T12:00:00.000Z"
      }
    ]
  }
  ```

#### Get Order by ID

- **URL**: `/order/:orderId`
- **Method**: `GET`
- **Authentication**: Required
- **Response**:
  ```json
  {
    "success": true,
    "order": {
      "_id": "order_id",
      "user": "user_id",
      "products": [
        {
          "image": "image_url.jpg",
          "name": "Paracetamol",
          "subname": "Tablet",
          "price": 10.99,
          "quantity": 2
        }
      ],
      "totalAmount": 21.98,
      "orderArea": "Downtown",
      "status": "pending",
      "accepted": false,
      "createdAt": "2025-04-15T12:00:00.000Z"
    }
  }
  ```

#### Update Order Status

- **URL**: `/order/:orderId/status`
- **Method**: `PATCH`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "status": "processing" // One of: "pending", "processing", "delivered"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Order status updated successfully",
    "order": {
      "_id": "order_id",
      "status": "processing"
      // ...other order details
    }
  }
  ```

#### Get Pharmacy Order Requests

- **URL**: `/order/pharmacy/:pharmacyId?area=Downtown`
- **Method**: `GET`
- **Authentication**: Required
- **Query Parameters**: `area` (required)
- **Response**:
  ```json
  {
    "success": true,
    "count": 3,
    "orders": [
      {
        "_id": "order_id",
        "user": "user_id",
        "products": [
          {
            "image": "image_url.jpg",
            "name": "Paracetamol",
            "subname": "Tablet",
            "price": 10.99,
            "quantity": 2
          }
        ],
        "totalAmount": 21.98,
        "orderArea": "Downtown",
        "status": "pending",
        "accepted": false,
        "createdAt": "2025-04-15T12:00:00.000Z"
      }
    ]
  }
  ```

#### Accept Order

- **URL**: `/order/accept/:orderId`
- **Method**: `PATCH`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "pharmacyId": "pharmacy_id"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Order accepted successfully",
    "order": {
      "_id": "order_id",
      "status": "processing",
      "accepted": true,
      "acceptedBy": "pharmacy_id"
      // ...other order details
    }
  }
  ```

#### Get Pharmacy Orders

- **URL**: `/:pharmacyId/orders`
- **Method**: `GET`
- **Authentication**: Required
- **Response**:
  ```json
  {
    "success": true,
    "count": 2,
    "orders": [
      {
        "_id": "order_id",
        "user": "user_id",
        "products": [
          {
            "image": "image_url.jpg",
            "name": "Paracetamol",
            "subname": "Tablet",
            "price": 10.99,
            "quantity": 2
          }
        ],
        "totalAmount": 21.98,
        "orderArea": "Downtown",
        "status": "processing",
        "accepted": true,
        "acceptedBy": "pharmacy_id",
        "createdAt": "2025-04-15T12:00:00.000Z"
      }
    ]
  }
  ```

#### Deliver Order

- **URL**: `/order/deliver/:orderId`
- **Method**: `PATCH`
- **Authentication**: Required
- **Request Body**:
  ```json
  {
    "pharmacyId": "pharmacy_id"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Order marked as delivered successfully",
    "order": {
      "_id": "order_id",
      "status": "delivered"
      // ...other order details
    }
  }
  ```

## Error Handling

The API returns appropriate HTTP status codes along with JSON responses:

- **400 Bad Request**: Invalid input or validation failure
- **401 Unauthorized**: Missing or invalid authentication
- **404 Not Found**: Resource not found
- **500 Internal Server Error**: Server-side error

Example error response:
```json
{
  "success": false,
  "message": "Error message details",
  "error": "Additional error details (when applicable)"
}
```

## Data Models

### User

```javascript
{
  name: String,
  email: String,
  password: String,
  address: {
    houseNo: String,
    road: String,
    area: String
  },
  isVerified: Boolean,
  verificationToken: String,
  verificationTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date
}
```

### Pharmacy

```javascript
{
  name: String,
  email: String,
  password: String,
  address: {
    shopNo: String,
    road: String,
    area: String
  },
  licenseNumber: String,
  isVerified: Boolean,
  verificationToken: String,
  verificationTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date
}
```

### Medicine

```javascript
{
  category: String,
  mediname: String,
  subname: String,
  mediimage: String,
  price: Number,
  quantity: String
}
```

### Order

```javascript
{
  user: ObjectId,
  products: [
    {
      image: String,
      name: String,
      subname: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  accepted: Boolean,
  acceptedBy: ObjectId,
  orderArea: String,
  status: String, // "pending", "processing", "delivered"
  createdAt: Date
}
```

## Environment Variables

The application requires the following environment variables:

```
MONGODB_URI=mongodb://localhost:27017/medicare
JWT_SECRET=your-jwt-secret
PORT=5001
```

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with the required environment variables
4. Start the server: `npm start`

The server will run on `http://localhost:5001` by default.

## Contact

For any questions regarding the API, please contact:
- Email: shawalkabirchy2020@gmail.com