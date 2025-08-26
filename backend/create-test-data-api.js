// Test data creation script using API endpoints
// Run this after starting the backend server

const axios = require('axios');

const API_BASE_URL = 'http://localhost:4000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Test data
const testData = {
  users: [
    {
      name: 'Admin User',
      email: 'admin@erp.com',
      password: 'admin123',
      role: 'admin'
    },
    {
      name: 'John Smith',
      email: 'john.smith@erp.com',
      password: 'teacher123',
      role: 'teacher'
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@erp.com',
      password: 'teacher123',
      role: 'teacher'
    },
    {
      name: 'Michael Brown',
      email: 'michael.brown@erp.com',
      password: 'teacher123',
      role: 'teacher'
    },
    {
      name: 'Student One',
      email: 'student1@erp.com',
      password: 'student123',
      role: 'student'
    },
    {
      name: 'Student Two',
      email: 'student2@erp.com',
      password: 'student123',
      role: 'student'
    },
    {
      name: 'Student Three',
      email: 'student3@erp.com',
      password: 'student123',
      role: 'student'
    },
    {
      name: 'Student Four',
      email: 'student4@erp.com',
      password: 'student123',
      role: 'student'
    },
    {
      name: 'Student Five',
      email: 'student5@erp.com',
      password: 'student123',
      role: 'student'
    }
  ],
  classes: [
    { name: 'Class 10', section: 'A', capacity: 30 },
    { name: 'Class 10', section: 'B', capacity: 30 },
    { name: 'Class 11', section: 'A', capacity: 25 },
    { name: 'Class 11', section: 'B', capacity: 25 },
    { name: 'Class 12', section: 'A', capacity: 28 }
  ],
  subjects: [
    { name: 'Mathematics', code: 'MATH101' },
    { name: 'Physics', code: 'PHY101' },
    { name: 'Chemistry', code: 'CHEM101' },
    { name: 'Biology', code: 'BIO101' },
    { name: 'English', code: 'ENG101' },
    { name: 'History', code: 'HIST101' },
    { name: 'Geography', code: 'GEO101' },
    { name: 'Computer Science', code: 'CS101' }
  ]
};

// Helper function to create user and get token
async function createUserAndLogin(userData) {
  try {
    // Register user
    const registerResponse = await api.post('/api/auth/register', userData);
    console.log(`✅ Created ${userData.role}: ${userData.name}`);
    
    // Login to get token
    const loginResponse = await api.post('/api/auth/login', {
      email: userData.email,
      password: userData.password,
      role: userData.role
    });
    
    return {
      user: registerResponse.data,
      token: loginResponse.data.token
    };
  } catch (error) {
    console.error(`❌ Error creating ${userData.role} ${userData.name}:`, error.response?.data?.error || error.message);
    return null;
  }
}

// Helper function to create teacher profile
async function createTeacherProfile(userData, teacherData) {
  try {
    const apiWithToken = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Content-Type': 'application/json'
      }
    });

    const response = await apiWithToken.post('/api/teachers', {
      name: teacherData.name,
      email: teacherData.email,
      employeeId: teacherData.employeeId,
      subject: teacherData.subject,
      phone: teacherData.phone,
      address: teacherData.address,
      qualification: teacherData.qualification,
      experience: teacherData.experience,
      salary: teacherData.salary
    });

    console.log(`✅ Created teacher profile for: ${teacherData.name}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creating teacher profile for ${teacherData.name}:`, error.response?.data?.error || error.message);
    return null;
  }
}

// Helper function to create student profile
async function createStudentProfile(userData, studentData) {
  try {
    const apiWithToken = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Authorization': `Bearer ${userData.token}`,
        'Content-Type': 'application/json'
      }
    });

    const response = await apiWithToken.post('/api/students', {
      name: studentData.name,
      email: studentData.email,
      rollNo: studentData.rollNo,
      classId: studentData.classId,
      section: studentData.section,
      phone: studentData.phone,
      address: studentData.address,
      bloodGroup: studentData.bloodGroup,
      parentName: studentData.parentName,
      parentPhone: studentData.parentPhone
    });

    console.log(`✅ Created student profile for: ${studentData.name}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error creating student profile for ${studentData.name}:`, error.response?.data?.error || error.message);
    return null;
  }
}

// Main function to create test data
async function createTestData() {
  console.log('🚀 Starting test data creation...\n');

  try {
    // Create admin user first
    const adminUser = await createUserAndLogin(testData.users[0]);
    if (!adminUser) {
      console.error('❌ Failed to create admin user. Exiting.');
      return;
    }

    // Create API instance with admin token
    const adminApi = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Authorization': `Bearer ${adminUser.token}`,
        'Content-Type': 'application/json'
      }
    });

    // Create classes
    console.log('\n📚 Creating classes...');
    const createdClasses = [];
    for (const classData of testData.classes) {
      try {
        const response = await adminApi.post('/api/classes', classData);
        createdClasses.push(response.data);
        console.log(`✅ Created class: ${classData.name} Section ${classData.section}`);
      } catch (error) {
        console.error(`❌ Error creating class ${classData.name}:`, error.response?.data?.error || error.message);
      }
    }

    // Create subjects
    console.log('\n📖 Creating subjects...');
    const createdSubjects = [];
    for (const subjectData of testData.subjects) {
      try {
        const response = await adminApi.post('/api/subjects', subjectData);
        createdSubjects.push(response.data);
        console.log(`✅ Created subject: ${subjectData.name} (${subjectData.code})`);
      } catch (error) {
        console.error(`❌ Error creating subject ${subjectData.name}:`, error.response?.data?.error || error.message);
      }
    }

    // Create teachers
    console.log('\n👨‍🏫 Creating teachers...');
    const teacherProfiles = [
      {
        name: 'John Smith',
        email: 'john.smith@erp.com',
        employeeId: 'T001',
        subject: 'Mathematics',
        phone: '+1234567890',
        address: '123 Teacher St, City',
        qualification: 'MSc Mathematics',
        experience: 5,
        salary: 50000
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@erp.com',
        employeeId: 'T002',
        subject: 'Physics',
        phone: '+1234567891',
        address: '456 Teacher Ave, City',
        qualification: 'PhD Physics',
        experience: 8,
        salary: 60000
      },
      {
        name: 'Michael Brown',
        email: 'michael.brown@erp.com',
        employeeId: 'T003',
        subject: 'Computer Science',
        phone: '+1234567892',
        address: '789 Teacher Blvd, City',
        qualification: 'MSc Computer Science',
        experience: 6,
        salary: 55000
      }
    ];

    const createdTeachers = [];
    for (let i = 0; i < teacherProfiles.length; i++) {
      const teacherUser = await createUserAndLogin(testData.users[i + 1]); // +1 because index 0 is admin
      if (teacherUser) {
        const teacherProfile = await createTeacherProfile(teacherUser, teacherProfiles[i]);
        if (teacherProfile) {
          createdTeachers.push(teacherProfile);
        }
      }
    }

    // Create students
    console.log('\n👨‍🎓 Creating students...');
    const studentProfiles = [
      {
        name: 'Student One',
        email: 'student1@erp.com',
        rollNo: 'S001',
        classId: createdClasses[0]?._id || 'class1',
        section: 'A',
        phone: '+1234567001',
        address: '1 Student St, City',
        bloodGroup: 'A+',
        parentName: 'Parent of Student One',
        parentPhone: '+1234567001'
      },
      {
        name: 'Student Two',
        email: 'student2@erp.com',
        rollNo: 'S002',
        classId: createdClasses[0]?._id || 'class1',
        section: 'A',
        phone: '+1234567002',
        address: '2 Student St, City',
        bloodGroup: 'B+',
        parentName: 'Parent of Student Two',
        parentPhone: '+1234567002'
      },
      {
        name: 'Student Three',
        email: 'student3@erp.com',
        rollNo: 'S003',
        classId: createdClasses[1]?._id || 'class2',
        section: 'B',
        phone: '+1234567003',
        address: '3 Student St, City',
        bloodGroup: 'O+',
        parentName: 'Parent of Student Three',
        parentPhone: '+1234567003'
      },
      {
        name: 'Student Four',
        email: 'student4@erp.com',
        rollNo: 'S004',
        classId: createdClasses[1]?._id || 'class2',
        section: 'B',
        phone: '+1234567004',
        address: '4 Student St, City',
        bloodGroup: 'AB+',
        parentName: 'Parent of Student Four',
        parentPhone: '+1234567004'
      },
      {
        name: 'Student Five',
        email: 'student5@erp.com',
        rollNo: 'S005',
        classId: createdClasses[2]?._id || 'class3',
        section: 'A',
        phone: '+1234567005',
        address: '5 Student St, City',
        bloodGroup: 'A-',
        parentName: 'Parent of Student Five',
        parentPhone: '+1234567005'
      }
    ];

    const createdStudents = [];
    for (let i = 0; i < studentProfiles.length; i++) {
      const studentUser = await createUserAndLogin(testData.users[i + 4]); // +4 because first 4 are admin + 3 teachers
      if (studentUser) {
        const studentProfile = await createStudentProfile(studentUser, studentProfiles[i]);
        if (studentProfile) {
          createdStudents.push(studentProfile);
        }
      }
    }

    // Create announcements
    console.log('\n📢 Creating announcements...');
    const announcements = [
      {
        title: 'Welcome to New Academic Year',
        content: 'Welcome back students! We hope you had a great summer break. The new academic year begins with exciting opportunities and challenges.',
        isActive: true,
        priority: 'high'
      },
      {
        title: 'Parent-Teacher Meeting',
        content: 'Parent-teacher meeting will be held on Friday, 15th December. Please make sure to attend.',
        isActive: true,
        priority: 'medium'
      },
      {
        title: 'Sports Day Announcement',
        content: 'Annual sports day will be celebrated on 20th December. All students are encouraged to participate.',
        isActive: true,
        priority: 'low'
      }
    ];

    for (const announcement of announcements) {
      try {
        await adminApi.post('/api/announcements', announcement);
        console.log(`✅ Created announcement: ${announcement.title}`);
      } catch (error) {
        console.error(`❌ Error creating announcement ${announcement.title}:`, error.response?.data?.error || error.message);
      }
    }

    console.log('\n🎉 Test data creation completed!');
    console.log('\n📊 Summary:');
    console.log(`Classes: ${createdClasses.length}`);
    console.log(`Subjects: ${createdSubjects.length}`);
    console.log(`Teachers: ${createdTeachers.length}`);
    console.log(`Students: ${createdStudents.length}`);
    console.log('\n🔑 Login Credentials:');
    console.log('Admin: admin@erp.com / admin123');
    console.log('Teacher: john.smith@erp.com / teacher123');
    console.log('Student: student1@erp.com / student123');

  } catch (error) {
    console.error('❌ Error in test data creation:', error);
  }
}

// Run the script
if (require.main === module) {
  createTestData();
}

module.exports = { createTestData };
