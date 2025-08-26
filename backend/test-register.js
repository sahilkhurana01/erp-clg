const axios = require('axios');

const API_BASE_URL = 'http://localhost:4000/api';

async function testRegister() {
  try {
    console.log('🚀 Testing user registration...');

    const testUser = {
      name: 'Test Student',
      email: 'test@erp.com',
      password: 'test123',
      role: 'student'
    };

    console.log('📝 Creating test user:', testUser.email);
    const response = await axios.post(`${API_BASE_URL}/auth/register`, testUser);
    
    if (response.data.success) {
      console.log('✅ Test user created successfully!');
      console.log('🔑 Login credentials:');
      console.log('Email:', testUser.email);
      console.log('Password:', testUser.password);
      console.log('Role:', testUser.role);
    } else {
      console.log('❌ Failed to create user:', response.data.message);
    }

  } catch (error) {
    if (error.response) {
      console.error('❌ API Error:', error.response.data);
    } else {
      console.error('❌ Network Error:', error.message);
    }
  }
}

testRegister();
