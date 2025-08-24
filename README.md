# 🏫 ERP College Management System

A comprehensive Enterprise Resource Planning (ERP) system designed specifically for educational institutions. This system provides complete management of students, teachers, classes, attendance, results, and administrative functions.

## ✨ Features

### 🔐 Authentication & Authorization
- **Multi-role login system** (Admin, Teacher, Student)
- **JWT-based authentication** with secure token management
- **Role-based access control** ensuring data security
- **Password reset functionality** with OTP verification

### 👥 User Management
- **Admin Portal**: Complete system administration
- **Teacher Portal**: Class and student management
- **Student Portal**: Personal information and results access
- **Profile management** with secure data handling

### 🏫 Academic Management
- **Class Management**: Create and manage classes with sections
- **Subject Management**: Organize subjects by class and teacher
- **Student Registration**: Comprehensive student profiles
- **Teacher Assignment**: Subject and class assignments

### 📊 Attendance System
- **Daily attendance tracking** by teachers
- **Attendance reports** and analytics
- **Student attendance history** with detailed records
- **Bulk attendance marking** for efficiency

### 📈 Results & Performance
- **Exam result management** (Midterm, Final, Assignments)
- **Grade calculation** and percentage computation
- **Performance analytics** and reporting
- **Result history** tracking

### 📢 Communication
- **Announcement system** with priority levels
- **Email notifications** for important updates
- **Real-time updates** across the system

### 🎯 Dashboard & Analytics
- **Comprehensive dashboards** for each role
- **Statistical overviews** with visual charts
- **Recent activity tracking**
- **Quick action buttons** for common tasks

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** database with Prisma ORM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Nodemailer** for email functionality
- **Helmet** and rate limiting for security

### Frontend
- **React 18** with modern hooks
- **Vite** for fast development and building
- **Tailwind CSS** for responsive design
- **Zustand** for state management
- **React Router** for navigation
- **Axios** for API communication
- **Lucide React** for beautiful icons

### Database
- **MongoDB** for flexible document storage
- **Prisma** for type-safe database operations
- **MongoDB Atlas** ready for cloud deployment

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

### Automated Setup (Recommended)

#### Windows
```bash
# Run the setup script
setup.bat
```

#### Linux/macOS
```bash
# Make script executable and run
chmod +x setup.sh
./setup.sh
```

### Manual Setup

#### 1. Backend Setup
```bash
cd erp-clg/backend

# Install dependencies
npm install

# Create .env file (copy from env.example)
cp env.example .env

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Seed database with sample data
npm run db:seed

# Start development server
npm run dev
```

#### 2. Frontend Setup
```bash
cd erp-clg/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

#### 3. MongoDB Setup
```bash
# Start MongoDB service
sudo systemctl start mongod

# Check status
sudo systemctl status mongod

# Create database
mongosh
use erp_college
exit
```

## 🔑 Default Login Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@erp.com | admin123 |
| **Teacher** | john.smith@erp.com | teacher123 |
| **Student** | student1@erp.com | student123 |

## 📱 Access URLs

- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:4000
- **API Health Check**: http://localhost:4000/
- **API Status**: http://localhost:4000/api/status

## 🏗️ Project Structure

```
erp-clg/
├── 📁 backend/                 # Backend API server
│   ├── 📁 controllers/        # Route controllers
│   ├── 📁 middleware/         # Authentication & authorization
│   ├── 📁 routes/            # API route definitions
│   ├── 📁 prisma/            # Database schema & migrations
│   ├── 📄 server.js          # Main server file
│   ├── 📄 package.json       # Backend dependencies
│   └── 📄 .env               # Environment configuration
├── 📁 frontend/               # React frontend application
│   ├── 📁 components/        # Reusable UI components
│   ├── 📁 Pages/            # Page components & layouts
│   ├── 📁 store/            # State management (Zustand)
│   ├── 📄 api.js            # API service functions
│   ├── 📄 App.jsx           # Main application component
│   └── 📄 package.json      # Frontend dependencies
├── 📁 shared/                # Shared utilities & types
├── 📄 setup.md               # Detailed setup guide
├── 📄 setup.sh               # Linux/macOS setup script
├── 📄 setup.bat              # Windows setup script
└── 📄 README.md              # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile
- `POST /api/auth/logout` - User logout
- `POST /api/auth/send-reset-otp` - Send password reset OTP
- `POST /api/auth/reset-password` - Reset password with OTP

### Students
- `GET /api/students` - Get all students (paginated)
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create new student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student
- `GET /api/students/:id/attendance` - Get student attendance
- `GET /api/students/:id/results` - Get student results

### Teachers
- `GET /api/teachers` - Get all teachers (paginated)
- `GET /api/teachers/:id` - Get teacher by ID
- `POST /api/teachers` - Create new teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher
- `GET /api/teachers/:id/classes` - Get teacher's classes
- `GET /api/teachers/:id/subjects` - Get teacher's subjects

### Classes
- `GET /api/classes` - Get all classes (paginated)
- `GET /api/classes/:id` - Get class by ID
- `POST /api/classes` - Create new class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class
- `GET /api/classes/:id/students` - Get class students
- `GET /api/classes/:id/subjects` - Get class subjects

### Subjects
- `GET /api/subjects` - Get all subjects (paginated)
- `GET /api/subjects/:id` - Get subject by ID
- `POST /api/subjects` - Create new subject
- `PUT /api/subjects/:id` - Update subject
- `DELETE /api/subjects/:id` - Delete subject

### Attendance
- `GET /api/attendance/class/:classId` - Get class attendance by date
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance
- `GET /api/attendance/student/:studentId` - Get student attendance history
- `GET /api/attendance/class/:classId` - Get class attendance history

### Results
- `GET /api/results/class/:classId` - Get class results by exam type
- `GET /api/results/student/:studentId` - Get student results
- `POST /api/results` - Create result
- `PUT /api/results/:id` - Update result
- `DELETE /api/results/:id` - Delete result
- `POST /api/results/bulk` - Bulk create results

### Announcements
- `GET /api/announcements` - Get all announcements (paginated)
- `GET /api/announcements/:id` - Get announcement by ID
- `POST /api/announcements` - Create announcement
- `PUT /api/announcements/:id` - Update announcement
- `DELETE /api/announcements/:id` - Delete announcement
- `PATCH /api/announcements/:id/toggle` - Toggle announcement status

## 🎯 Development Commands

### Backend
```bash
npm run dev          # Start development server
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:seed      # Seed database with sample data
npm run db:studio    # Open Prisma Studio
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🔒 Security Features

- **JWT Authentication** with secure token management
- **Password Hashing** using bcryptjs
- **Role-based Access Control** (RBAC)
- **CORS Protection** with configurable origins
- **Rate Limiting** to prevent abuse
- **Helmet Security Headers** for enhanced protection
- **Input Validation** and sanitization
- **Secure Environment Variables** management

## 📊 Database Models

### Core Models
- **User**: Base user model with authentication
- **Student**: Student profiles with academic details
- **Teacher**: Teacher profiles with qualifications
- **Class**: Class management with sections
- **Subject**: Subject organization and assignment

### Operational Models
- **Attendance**: Daily attendance tracking
- **Result**: Academic performance records
- **Announcement**: System-wide communications
- **Event**: Calendar events and schedules
- **Assignment**: Academic assignments and due dates

## 🚧 Development Roadmap

### Phase 1: Core System ✅
- [x] User authentication and authorization
- [x] Basic CRUD operations for all entities
- [x] Database schema and relationships
- [x] API endpoints and validation

### Phase 2: Enhanced Features 🚧
- [ ] File upload functionality
- [ ] Advanced reporting and analytics
- [ ] Real-time notifications (WebSocket)
- [ ] Mobile app development

### Phase 3: Advanced Features 📋
- [ ] Parent portal integration
- [ ] Financial management module
- [ ] Library management system
- [ ] Transportation tracking
- [ ] Hostel management

### Phase 4: Enterprise Features 📋
- [ ] Multi-branch support
- [ ] Advanced analytics dashboard
- [ ] API rate limiting and monitoring
- [ ] Automated backup systems
- [ ] Performance optimization

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Add proper error handling and validation
- Include comprehensive tests for new features
- Update documentation for any API changes
- Ensure all tests pass before submitting PR

## 🐛 Troubleshooting

### Common Issues

#### MongoDB Connection Error
```bash
# Check MongoDB status
sudo systemctl status mongod

# Start MongoDB service
sudo systemctl start mongod

# Verify connection string in .env file
DATABASE_URL="mongodb://localhost:27017/erp_college"
```

#### Prisma Errors
```bash
# Regenerate Prisma client
npm run db:generate

# Sync database schema
npm run db:push

# Reset database (WARNING: This will delete all data)
npm run db:reset
```

#### Frontend Build Errors
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version (requires v16+)
node --version
```

#### CORS Issues
- Verify `FRONTEND_URL` in backend `.env` file
- Ensure frontend is running on the correct port
- Check browser console for CORS error details

## 📞 Support

- **Documentation**: Check `setup.md` for detailed setup instructions
- **Issues**: Create an issue in the repository for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Prisma** for excellent database ORM
- **Tailwind CSS** for beautiful utility-first CSS framework
- **React** team for the amazing frontend library
- **Node.js** community for the robust backend runtime
- **MongoDB** for flexible document database

---

**Made with ❤️ for educational institutions worldwide**

*For questions or support, please open an issue in the repository.* 