# Egyptian League Management API

## Description
The Egyptian League Management API is a RESTful API for managing the Egyptian Football League.  
It includes **Users, Teams, and Matches** with full **CRUD** operations for teams and matches.  
Authentication and authorization are implemented with JWT, and user roles (`user`, `manager`, `admin`) define different access levels:  
- Admin / Manager can manage teams and matches.  
- User can only view public data.  


## Features
- User registration and login with JWT authentication  
- Role-based access control (`user`, `manager`, `admin`)  
- Manage teams (create, read, update, delete)  
- Manage matches (create, read, update, delete)  
- Get all users 
- Data validation using validator  
- Password hashing with bcrypt  
- File upload support (e.g., team logos) using multer  


## Technologies Used
- Node.js + Express – Backend framework  
- MongoDB + Mongoose – Database and ODM  
- Multer – File uploads (e.g., team logos)  
- Validator – Input validation  
- Bcrypt – Password hashing  
- JSON Web Token (JWT) – Authentication & authorization  


## Usage
Use Postman or any REST client to test the API.

### Auth Routes
- **POST /api/users/register** → Register a new user  
- **POST /api/auth/login** → Login and receive a JWT

### User Routes
- **GET /api/users** → Get all users (admin only)  

### Team Routes
- **POST /api/teams** → Create a new team (admin/manager)  
- **GET /api/teams** → Get all teams
- **GET /api/teams/:id** → Get a team by ID   
- **PATCH /api/teams/:id** → Update team (admin/manager)  
- **DELETE /api/teams/:id** → Delete team (admin/manager)  

### Match Routes
- **POST /api/matches** → Create a new match (admin/manager)  
- **GET /api/matches** → Get all matches
- **GET /api/matches/:id** → Get a matche by ID  
- **PUT /api/matches/:id** → Update match (admin/manager)  
- **DELETE /api/matches/:id** → Delete match (admin/manager)  

## User Roles & Permissions
- **User** → Can view public data only  
- **Manager** → Can create, update, and delete teams & matches  
- **Admin** → Full access (users, teams, matches)  


## License
This project is licensed under the MIT License.
