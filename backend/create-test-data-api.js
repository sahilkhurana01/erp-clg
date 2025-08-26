const axios = require('axios');

const API_BASE_URL = 'http://localhost:4000/api';

// Test data
const testData = {
  admin: {
    name: 'Admin User',
    email: 'admin@erp.com',
    password: 'admin123',
    role: 'admin'
  },
  teacher: {
    name: 'John Smith',
    email: 'john.smith@erp.com',
    password: 'teacher123',
    role: 'teacher'
  },
  student: {
    name: 'Student 1',
    email: 'student1@erp.com',
    password: 'student123',
    role: 'student'
  }
};

async function createTestData() {
  try {
    console.log('🚀 Creating test data through API...');

    // 1. Create admin user
    console.log('👑 Creating admin user...');
    const adminResponse = await axios.post(`${API_BASE_URL}/auth/register`, testData.admin);
    console.log('✅ Admin user created:', adminResponse.data);

    // 2. Create teacher user
    console.log('👨‍🏫 Creating teacher user...');
    const teacherResponse = await axios.post(`${API_BASE_URL}/auth/register`, testData.teacher);
    console.log('✅ Teacher user created:', teacherResponse.data);

    // 3. Create student user
    console.log('👨‍🎓 Creating student user...');
    const studentResponse = await axios.post(`${API_BASE_URL}/auth/register`, testData.student);
    console.log('✅ Student user created:', studentResponse.data);

    console.log('\n🎉 Test data creation completed!');
    console.log('\n🔑 Login Credentials:');
    console.log('Admin: admin@erp.com / admin123');
    console.log('Teacher: john.smith@erp.com / teacher123');
    console.log('Student: student1@erp.com / student123');

  } catch (error) {
    if (error.response) {
      console.error('❌ API Error:', error.response.data);
    } else {
      console.error('❌ Network Error:', error.message);
    }
  }
}

// Check if server is running before creating data
async function checkServer() {
  try {
    const response = await axios.get('http://localhost:4000');
    console.log('✅ Server is running');
    return true;
  } catch (error) {
    console.error('❌ Server is not running. Please start the backend server first.');
    console.log('💡 Run: npm run dev (in backend directory)');
    return false;
  }
}

async function main() {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await createTestData();
  }
}

main();
