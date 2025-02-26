# Medicare Backend API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require JWT authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <jwt_token>
```

## API Endpoints

### 1. User Registration
Register a new user account.

**Endpoint:** `POST /auth/register/user`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "address": "123 Main St, City, Country"
}
```

**Validation Rules:**
- Name: Required
- Email: Valid email format
- Password: Minimum 8 characters
- Address: Required

**Response:**
```json
{
  "message": "User registered successfully. Please check your email for verification."
}
```

**Status Codes:**
- 201: Created successfully
- 400: Validation error or user already exists
- 500: Server error

### 2. Pharmacy Registration
Register a new pharmacy account.

**Endpoint:** `POST /auth/register/pharmacy`

**Request Body:**
```json
{
  "name": "MedCare Pharmacy",
  "email": "pharmacy@example.com",
  "password": "password123",
  "address": "456 Health St, City, Country",
  "licenseNumber": "PHR123456"
}
```

**Validation Rules:**
- Name: Required
- Email: Valid email format
- Password: Minimum 8 characters
- Address: Required
- License Number: Required, Unique

**Response:**
```json
{
  "message": "Pharmacy registered successfully. Please check your email for verification."
}
```

**Status Codes:**
- 201: Created successfully
- 400: Validation error or pharmacy already exists
- 500: Server error

### 3. Email Verification
Verify user/pharmacy email address.

**Endpoint:** `GET /auth/verify/:token`

**Parameters:**
- token: Email verification token (received via email)

**Response:**
```json
{
  "message": "Email verified successfully"
}
```

**Status Codes:**
- 200: Verified successfully
- 400: Invalid or expired token
- 500: Server error

### 4. Login
Login for both users and pharmacies.

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "user@example.com",
    "type": "user" // or "pharmacy"
  }
}
```

**Status Codes:**
- 200: Login successful
- 401: Invalid credentials or email not verified
- 500: Server error

### 5. Forgot Password
Request password reset link.

**Endpoint:** `POST /auth/forgot-password`

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset link sent to your email"
}
```

**Status Codes:**
- 200: Reset link sent successfully
- 404: User not found
- 500: Server error

### 6. Reset Password
Reset password using reset token.

**Endpoint:** `POST /auth/reset-password/:token`

**Parameters:**
- token: Password reset token (received via email)

**Request Body:**
```json
{
  "password": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password reset successful"
}
```

**Status Codes:**
- 200: Password reset successful
- 400: Invalid or expired token
- 500: Server error

### 7. Logout
Logout user/pharmacy (requires authentication).

**Endpoint:** `POST /auth/logout`

**Headers Required:**
- Authorization: Bearer <jwt_token>

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

**Status Codes:**
- 200: Logout successful
- 401: Unauthorized or invalid token
- 500: Server error

## Security Features

1. **Password Security:**
   - Passwords are hashed using bcrypt
   - Minimum length: 8 characters

2. **Email Verification:**
   - Verification link expires in 5 minutes
   - Single-use verification tokens
   - Required before login

3. **Password Reset:**
   - Reset link expires in 5 minutes
   - Single-use reset tokens
   - Secure password update process

4. **JWT Authentication:**
   - Token expiration: 72 hours
   - Secured routes using middleware
   - Token-based authentication

## Error Responses
All error responses follow this format:
```json
{
  "message": "Error message here",
  "error": "Detailed error information" // Only in development
}
```

## Notes
2. All IDs are MongoDB ObjectIds
3. JWT tokens should be included in the Authorization header as Bearer tokens
4. Email verification is mandatory for both users and pharmacies
5. Environment variables must be properly configured for database functionality

## Development Setup
1. Install dependencies:
```bash
npm install
```

2. Configure environment variables in `.env`:
```
PORT=5000
MONGODB_URI=mongodb_uri
JWT_SECRET=jwt_secret
```

3. Start the server:
```bash
npm start # Development mode with nodemon
```

## Database Models

### User Model
```javascript
{
  name: String,
  email: String,
  password: String,
  address: String,
  isVerified: Boolean,
  verificationToken: String,
  verificationTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
  createdAt: Date,
  updatedAt: Date
}
```

### Pharmacy Model
```javascript
{
  name: String,
  email: String,
  password: String,
  address: String,
  licenseNumber: String,
  isVerified: Boolean,
  verificationToken: String,
  verificationTokenExpiry: Date,
  resetPasswordToken: String,
  resetPasswordExpiry: Date,
  createdAt: Date,
  updatedAt: Date
}
```
<!-- ============================ -->
<!-- Additional Endpoints: My Works -->
<!-- ============================ -->

# Additional API Endpoints – Product Management

These endpoints provide advanced operations for managing products. All endpoints in this section require JWT authentication (include the `Authorization: Bearer <jwt_token>` header).

## 8. Product Management Endpoints

### a. Create a New Product
**Endpoint:** `POST /products`

**Description:** Create a new product.

**Request Body:**
```json
{
  "name": "Product Name",
  "brand": "Product Brand",
  "description": "Detailed product description",
  "category": "Category Name",
  "price": {
    "original": 100,
    "discounted": 80
  },
  "stock": 10,
  "weight": { "value": 500, "unit": "gm" },
  "images": ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  "tags": ["tag1", "tag2"]
}
```

**Response:**
```json
{
  "message": "Product created successfully",
  "product": { /* Product object */ }
}
```

**Status Codes:**
- 201: Created successfully
- 400: Validation error

---

### b. Get All Products (with Filtering, Search, Sorting & Pagination)
**Endpoint:** `GET /products`

**Query Parameters:**
- `search`: *(optional)* Filter by product name (regex search)
- `category`: *(optional)* Filter by category
- `brand`: *(optional)* Filter by brand
- `minPrice`: *(optional)* Minimum discounted price
- `maxPrice`: *(optional)* Maximum discounted price
- `page`: *(optional, default: 1)* Page number
- `limit`: *(optional, default: 10)* Number of products per page
- `sortBy`: *(optional)* Field to sort by (e.g., `price.discounted`, `createdAt`)
- `order`: *(optional)* `asc` or `desc` (default is ascending)

**Response:**
```json
{
  "total": 100,
  "page": 1,
  "pages": 10,
  "products": [ /* Array of product objects */ ]
}
```

**Status Codes:**
- 200: OK
- 500: Server error

---

### c. Get a Single Product by ID
**Endpoint:** `GET /products/:id`

**Response:**
```json
{
  "product": { /* Product object */ }
}
```

**Status Codes:**
- 200: OK
- 404: Product not found

---

### d. Update a Product (Full Update)
**Endpoint:** `PUT /products/:id`

**Description:** Replace all product fields.

**Request Body:** All product fields required.

**Response:**
```json
{
  "product": { /* Updated product object */ }
}
```

**Status Codes:**
- 200: OK
- 404: Product not found

---

### e. Partially Update a Product (PATCH)
**Endpoint:** `PATCH /products/:id`

**Description:** Update specific fields of a product.

**Request Body:** Any subset of product fields.

**Response:**
```json
{
  "product": { /* Updated product object */ }
}
```

**Status Codes:**
- 200: OK
- 404: Product not found

---

### f. Delete a Product
**Endpoint:** `DELETE /products/:id`

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

**Status Codes:**
- 200: OK
- 404: Product not found

---

### g. Add a Review to a Product
**Endpoint:** `POST /products/:id/review`

**Description:** Add a new review and update the product's rating.

**Request Body:**
```json
{
  "rating": 4,
  "comment": "Great product!",
  "user": "user_object_id"
}
```

**Response:**
```json
{
  "product": { /* Updated product object with new review and recalculated ratings */ }
}
```

**Status Codes:**
- 200: OK
- 404: Product not found

---

### h. Like a Product
**Endpoint:** `PATCH /products/:id/like`

**Description:** Increment the like count for the product.

**Response:**
```json
{
  "product": { /* Updated product object with incremented likes */ }
}
```

**Status Codes:**
- 200: OK
- 404: Product not found

---

### i. Get Similar Products for a Given Product
**Endpoint:** `GET /products/:id/similar`

**Query Parameters:**
- `page`: *(optional, default: 1)* Page number
- `limit`: *(optional, default: 5)* Number of similar products per page

**Response:**
```json
[
  { /* Similar product object */ },
  { /* Similar product object */ }
]
```

**Status Codes:**
- 200: OK
- 404: Product not found

---

### j. Add a Similar Product Reference
**Endpoint:** `POST /products/:id/similar`

**Description:** Add another product as similar to the current one.

**Request Body:**
```json
{
  "similarProductId": "another_product_object_id"
}
```

**Response:**
```json
{
  "product": { /* Updated product object with new similar product added */ }
}
```

**Status Codes:**
- 200: OK
- 400: Similar product already added
- 404: Product not found

---

### k. Get Popular Products
**Endpoint:** `GET /products/popular`

**Description:** Retrieve a list of popular products based on likes and views.

**Response:**
```json
[
  { /* Popular product object */ },
  { /* Popular product object */ }
]
```

**Status Codes:**
- 200: OK
- 500: Server error

---

### l. Get Aggregated Product Statistics
**Endpoint:** `GET /products/stats`

**Description:** Retrieve aggregated statistics grouped by category, including:
- Total products per category
- Average discounted price
- Average rating

**Response:**
```json
[
  {
    "_id": "Category Name",
    "totalProducts": 10,
    "averagePrice": 80,
    "averageRating": 4.5
  },
  { /* More aggregated data per category */ }
]
```

**Status Codes:**
- 200: OK
- 500: Server error
```