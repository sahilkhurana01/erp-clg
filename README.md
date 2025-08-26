# College ERP System

A comprehensive College ERP (Enterprise Resource Planning) system built with React frontend and Node.js backend, featuring real-time data management for students, teachers, and administrators.

## 🚀 Features

### For Students
- **Dashboard**: View attendance, results, and personal information
- **Timetable**: Access class schedules and upcoming lectures
- **Profile Management**: Update personal details and view academic progress
- **Real-time Data**: All information is fetched from the database in real-time

### For Teachers
- **Dashboard**: View class statistics, attendance rates, and performance metrics
- **Attendance Management**: Mark and manage student attendance
- **Class Management**: View assigned classes and subjects
- **Performance Tracking**: Monitor student performance and engagement

### For Administrators
- **User Management**: Create and manage students, teachers, and staff
- **Class Management**: Create and assign classes with teachers
- **Subject Management**: Manage subjects and assign teachers
- **Announcements**: Create and manage school-wide announcements
- **Data Analytics**: View comprehensive statistics and reports

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** enabled for cross-origin requests

### Frontend
- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Router** for navigation
- **Lucide React** for icons

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd erp-clg
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/erp_college
# or for MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/erp_college
PORT=4000
JWT_SECRET=your_jwt_secret_here
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Start the Backend Server
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

### 5. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```

### 6. Create Test Data
```bash
cd backend
node create-test-data-api.js
```

This will create:
- Admin user
- 3 teacher accounts
- 5 student accounts
- 5 classes
- 8 subjects
- Sample announcements

## 🔑 Default Login Credentials

### Admin
- Email: `admin@erp.com`
- Password: `admin123`

### Teachers
- Email: `john.smith@erp.com`
- Password: `teacher123`
- Email: `sarah.johnson@erp.com`
- Password: `teacher123`
- Email: `michael.brown@erp.com`
- Password: `teacher123`

### Students
- Email: `student1@erp.com`
- Password: `student123`
- Email: `student2@erp.com`
- Password: `student123`
- Email: `student3@erp.com`
- Password: `student123`

## 📱 Usage Guide

### Student Dashboard
1. Login with student credentials
2. View attendance statistics and performance metrics
3. Access class timetable and upcoming lectures
4. View personal profile and academic information

### Teacher Dashboard
1. Login with teacher credentials
2. View assigned classes and subjects
3. Mark student attendance for classes
4. Monitor class performance and engagement
5. Access teaching schedule and statistics

### Admin Dashboard
1. Login with admin credentials
2. Manage users (students, teachers, staff)
3. Create and assign classes
4. Manage subjects and curriculum
5. Create announcements
6. View system statistics and reports

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Students
- `GET /api/students` - Get all students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teachers
- `GET /api/teachers` - Get all teachers
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Classes
- `GET /api/classes` - Get all classes
- `POST /api/classes` - Create class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Subjects
- `GET /api/subjects` - Get all subjects
- `POST /api/subjects` - Create subject
- `PUT /api/subjects/:id` - Update subject
- `DELETE /api/subjects/:id` - Delete subject

### Attendance
- `GET /api/attendance/class/:classId` - Get class attendance
- `POST /api/attendance` - Mark attendance
- `PUT /api/attendance/:id` - Update attendance

### Results
- `GET /api/results/class/:classId` - Get class results
- `GET /api/results/student/:studentId` - Get student results
- `POST /api/results` - Create result

### Announcements
- `GET /api/announcements` - Get all announcements
- `POST /api/announcements` - Create announcement
- `PUT /api/announcements/:id` - Update announcement
- `DELETE /api/announcements/:id` - Delete announcement

## 🗄️ Database Schema

### User Model
- Basic user information (name, email, password, role)
- Authentication and authorization

### Student Model
- Personal information (name, email, roll number)
- Academic details (class, section)
- Contact information (phone, address, blood group)
- Parent information

### Teacher Model
- Professional information (name, email, employee ID)
- Subject specialization
- Contact details and qualifications
- Experience and salary information

### Class Model
- Class name and section
- Capacity and assigned teacher
- Academic year information

### Subject Model
- Subject name and code
- Assigned class and teacher
- Curriculum details

### Attendance Model
- Student, class, and subject references
- Date and attendance status
- Marked by information

### Result Model
- Student, class, and subject references
- Exam type and marks
- Performance metrics

## 🚀 Deployment

### Backend Deployment
1. Set environment variables for production
2. Use PM2 or similar process manager
3. Configure MongoDB Atlas for production
4. Set up proper CORS settings

### Frontend Deployment
1. Build the production version: `npm run build`
2. Deploy to Vercel, Netlify, or similar platforms
3. Configure environment variables for production API

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Updates and Maintenance

- Regular security updates
- Performance optimizations
- New feature additions
- Bug fixes and improvements

---

**Note**: This ERP system is designed for educational institutions and includes all necessary features for managing student, teacher, and administrative workflows. All data is stored securely in MongoDB and accessed through authenticated API endpoints. 