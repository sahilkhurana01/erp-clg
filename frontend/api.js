import axios from 'axios';
import { buildApiUrl } from './config';

// Create axios instance with default config
const api = axios.create({
  baseURL: buildApiUrl(''),
  timeout: 30000, // Increased timeout to 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    
    // Handle timeout errors specifically
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      return Promise.reject({
        success: false,
        message: 'Request timeout. Please check your internet connection and try again.'
      });
    }
    
    return Promise.reject(error.response?.data || error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password, role) => 
    api.post('/api/auth/login', { email, password, role }),
  
  register: (userData) => 
    api.post('/api/auth/register', userData),
  
  getProfile: () => 
    api.get('/api/auth/profile'),
  
  sendResetOTP: (email) => 
    api.post('/api/auth/send-reset-otp', { email }),
  
  resetPassword: (email, otp, newPassword) => 
    api.post('/api/auth/reset-password', { email, otp, newPassword }),
  
  logout: () => 
    api.post('/api/auth/logout')
};

// Students API
export const studentsAPI = {
  getAll: (page = 1, limit = 10, search = '') => 
    api.get(`/api/students?page=${page}&limit=${limit}&search=${search}`),
  
  getById: (id) => 
    api.get(`/api/students/${id}`),
  
  create: (studentData) => 
    api.post('/api/students', studentData),
  
  update: (id, studentData) => 
    api.put(`/api/students/${id}`, studentData),
  
  delete: (id) => 
    api.delete(`/api/students/${id}`),
  
  getAttendance: (id, startDate, endDate) => 
    api.get(`/api/students/${id}/attendance?startDate=${startDate}&endDate=${endDate}`),
  
  getResults: (id) => 
    api.get(`/api/students/${id}/results`)
};

// Teachers API
export const teachersAPI = {
  getAll: (page = 1, limit = 10, search = '') => 
    api.get(`/api/teachers?page=${page}&limit=${limit}&search=${search}`),
  
  getById: (id) => 
    api.get(`/api/teachers/${id}`),
  
  create: (teacherData) => 
    api.post('/api/teachers', teacherData),
  
  update: (id, teacherData) => 
    api.put(`/api/teachers/${id}`, teacherData),
  
  delete: (id) => 
    api.delete(`/api/teachers/${id}`),
  
  getClasses: (id) => 
    api.get(`/api/teachers/${id}/classes`),
  
  getSubjects: (id) => 
    api.get(`/api/teachers/${id}/subjects`)
};

// Classes API
export const classesAPI = {
  getAll: (page = 1, limit = 10) => 
    api.get(`/api/classes?page=${page}&limit=${limit}`),
  
  getById: (id) => 
    api.get(`/api/classes/${id}`),
  
  create: (classData) => 
    api.post('/api/classes', classData),
  
  update: (id, classData) => 
    api.put(`/api/classes/${id}`, classData),
  
  delete: (id) => 
    api.delete(`/api/classes/${id}`),
  
  getStudents: (id) => 
    api.get(`/api/classes/${id}/students`),
  
  getSubjects: (id) => 
    api.get(`/api/classes/${id}/subjects`)
};

// Subjects API
export const subjectsAPI = {
  getAll: (page = 1, limit = 10) => 
    api.get(`/api/subjects?page=${page}&limit=${limit}`),
  
  getById: (id) => 
    api.get(`/api/subjects/${id}`),
  
  create: (subjectData) => 
    api.post('/api/subjects', subjectData),
  
  update: (id, subjectData) => 
    api.put(`/api/subjects/${id}`, subjectData),
  
  delete: (id) => 
    api.delete(`/api/subjects/${id}`)
};

// Attendance API
export const attendanceAPI = {
  getByClass: (classId, date) => 
    api.get(`/api/attendance/class/${classId}?date=${date}`),
  
  markAttendance: (attendanceData) => 
    api.post('/api/attendance', attendanceData),
  
  updateAttendance: (id, attendanceData) => 
    api.put(`/api/attendance/${id}`, attendanceData),
  
  getStudentAttendance: (studentId, startDate, endDate) => 
    api.get(`/api/attendance/student/${studentId}?startDate=${startDate}&endDate=${endDate}`),
  
  getClassAttendance: (classId, startDate, endDate) => 
    api.get(`/api/attendance/class/${classId}?startDate=${startDate}&endDate=${endDate}`)
};

// Results API
export const resultsAPI = {
  getByClass: (classId, examType) => 
    api.get(`/api/results/class/${classId}?examType=${examType}`),
  
  getByStudent: (studentId) => 
    api.get(`/api/results/student/${studentId}`),
  
  create: (resultData) => 
    api.post('/api/results', resultData),
  
  update: (id, resultData) => 
    api.put(`/api/results/${id}`, resultData),
  
  delete: (id) => 
    api.delete(`/api/results/${id}`),
  
  bulkCreate: (resultsData) => 
    api.post('/api/results/bulk', resultsData)
};

// Announcements API
export const announcementsAPI = {
  getAll: (page = 1, limit = 10) => 
    api.get(`/api/announcements?page=${page}&limit=${limit}`),
  
  getById: (id) => 
    api.get(`/api/announcements/${id}`),
  
  create: (announcementData) => 
    api.post('/api/announcements', announcementData),
  
  update: (id, announcementData) => 
    api.put(`/api/announcements/${id}`, announcementData),
  
  delete: (id) => 
    api.delete(`/api/announcements/${id}`),
  
  toggleStatus: (id) => 
    api.patch(`/api/announcements/${id}/toggle`)
};

// Timetable API
export const timetableAPI = {
  getClassTimetable: (classId) => 
    api.get(`/api/timetable/class/${classId}`),
  
  createEntry: (timetableData) => 
    api.post('/api/timetable', timetableData),
  
  updateEntry: (id, timetableData) => 
    api.put(`/api/timetable/${id}`, timetableData),
  
  deleteEntry: (id) => 
    api.delete(`/api/timetable/${id}`)
};

// Dashboard API
export const dashboardAPI = {
  getStats: () => 
    api.get('/api/dashboard/stats'),
  
  getRecentActivity: () => 
    api.get('/api/dashboard/recent-activity'),
  
  getAttendanceChart: (classId, period = 'week') => 
    api.get(`/api/dashboard/attendance-chart/${classId}?period=${period}`),
  
  getPerformanceChart: (classId, subjectId) => 
    api.get(`/api/dashboard/performance-chart/${classId}/${subjectId}`)
};

export default api;