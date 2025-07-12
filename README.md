# ERP System - School Management

A comprehensive School ERP (Enterprise Resource Planning) system built with React frontend and Node.js backend, featuring role-based authentication for Admin, Teacher, and Student users.

## 🚀 Features

### Authentication & Authorization
- **Role-based access control** (Admin, Teacher, Student)
- **JWT token authentication**
- **Password hashing with bcrypt**
- **Password reset functionality with OTP**
- **Email notifications** (optional)

### Admin Features
- Manage students, teachers, classes, and subjects
- View and manage attendance records
- Handle announcements
- System administration

### Teacher Features
- Manage attendance for assigned classes
- Record and manage student results
- View class information

### Student Features
- View attendance records
- Check academic results
- Access announcements

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **Prisma** ORM with SQLite
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Nodemailer** for email notifications

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd erp
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# Seed the database with default data
npm run db:seed
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

### 4. Start the Application

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

## 🔐 Default Login Credentials

### Admin
- **Email**: admin@erp.com
- **Password**: admin123

### Sample Teachers
- **Email**: john.smith@school.com
- **Email**: sarah.johnson@school.com
- **Email**: michael.brown@school.com

### Sample Students
- **Email**: alice.wilson@student.com
- **Email**: bob.davis@student.com
- **Email**: carol.miller@student.com

*Note: Sample teachers and students need to be registered first through the admin panel.*

## 📁 Project Structure

```
erp/
├── backend/
│   ├── controllers/          # Route controllers
│   ├── middleware/           # Authentication middleware
│   ├── prisma/              # Database schema and migrations
│   ├── routes/              # API routes
│   ├── server.js            # Main server file
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── pages/           # Page components
│   │   └── main.jsx         # App entry point
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# JWT Secret (change this in production!)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# Server Configuration
PORT=4000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SENDER_EMAIL=your-email@gmail.com
```

### Email Setup (Optional)

To enable email notifications:

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password
3. Update the SMTP settings in your `.env` file

## 🗄️ Database

The application uses SQLite with Prisma ORM. The database includes:

- **Users**: Authentication and user management
- **Students**: Student information and records
- **Teachers**: Teacher information and assignments
- **Classes**: Class and section management
- **Subjects**: Subject information and teacher assignments
- **Attendance**: Student attendance records
- **Results**: Academic results and grades
- **Announcements**: System announcements

## 🔒 Security Features

- **Password hashing** with bcrypt
- **JWT token authentication**
- **Role-based access control**
- **Input validation and sanitization**
- **CORS protection**
- **Environment variable protection**

## 🚀 Deployment

### Backend Deployment
1. Set up a production database (PostgreSQL recommended)
2. Update environment variables for production
3. Run `npm run build` (if applicable)
4. Use PM2 or similar process manager

### Frontend Deployment
1. Update API base URL in `authService.js`
2. Run `npm run build`
3. Deploy the `dist` folder to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments

## 🔄 Updates

### Recent Updates
- Added comprehensive authentication system
- Implemented role-based access control
- Added password reset functionality
- Created sample data seeding
- Improved UI/UX with Tailwind CSS
- Added email notification system

---

**Happy Coding! 🎉** 