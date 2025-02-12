Ayush Dwivedi's Work India SDE- API Round submission



The API ensures proper user authentication using JWT tokens and protects admin routes using an API key.

## Tech Stack

- **Backend Framework**: Node.js with Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **ORM**: TypeORM (for PostgreSQL)
- **API Documentation**: Swagger/OpenAPI
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Environment Variables**: dotenv
- **Testing**: Jest (for unit tests)

## Features

1. **User Management**:
   - User registration with secure password hashing
   - User authentication using JWT
   - Role-based access control (Admin/User)

2. **Train Management (Admin)**:
   - Add/Update/Delete trains
   - Manage train schedules
   - View booking statistics

3. **Booking System (Users)**:
   - Check train availability
   - Book tickets with seat selection
   - View booking history
   - Cancel bookings

4. **Security Features**:
   - JWT-based authentication
   - Password hashing
   - Rate limiting
   - CORS protection
   - Security headers (via Helmet)

## API Documentation

API documentation is available at `/api-docs` when running the server. It provides detailed information about all available endpoints, request/response formats, and authentication requirements.

## Prerequisites

Before running this application, make sure you have:

1. Node.js (v14 or higher)
2. PostgreSQL (v12 or higher)
3. npm (Node Package Manager)


   ```

## API Endpoints

### Authentication Routes
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile

### Admin Routes
- `POST /api/admin/trains` - Add new train
- `PUT /api/admin/trains/:id` - Update train details
- `DELETE /api/admin/trains/:id` - Delete train
- `GET /api/admin/bookings` - View all bookings

### User Routes
- `GET /api/user/trains` - Search available trains
- `POST /api/user/bookings` - Create new booking
- `GET /api/user/bookings` - View user's bookings
- `DELETE /api/user/bookings/:id` - Cancel booking


```

