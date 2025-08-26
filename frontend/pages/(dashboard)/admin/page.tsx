import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import useAuthStore from '../../../store/authStore';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalSubjects: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/admin');
      return;
    }
    
    // Initialize dashboard data
    loadDashboardData();
  }, [user, navigate]);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls - replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStats({
        totalStudents: 150,
        totalTeachers: 25,
        totalClasses: 12,
        totalSubjects: 45
      });

      setRecentActivity([
        { id: 1, action: 'New student registered', time: '2 minutes ago', type: 'student' },
        { id: 2, action: 'Attendance marked for Class 10A', time: '5 minutes ago', type: 'attendance' },
        { id: 3, action: 'New announcement posted', time: '10 minutes ago', type: 'announcement' },
        { id: 4, action: 'Exam results uploaded', time: '15 minutes ago', type: 'result' }
      ]);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/admin');
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'addStudent':
        navigate('/admin/students/add');
        break;
      case 'addTeacher':
        navigate('/admin/teachers/add');
        break;
      case 'addClass':
        navigate('/admin/classes/add');
        break;
      case 'addSubject':
        navigate('/admin/subjects/add');
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">ERP Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-700">{user?.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <GraduationCap className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Teachers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalTeachers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Classes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalClasses}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Subjects</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSubjects}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => handleQuickAction('addStudent')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                <Plus className="h-8 w-8 text-indigo-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Add Student</span>
              </button>

              <button
                onClick={() => handleQuickAction('addTeacher')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                <Plus className="h-8 w-8 text-indigo-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Add Teacher</span>
              </button>

              <button
                onClick={() => handleQuickAction('addClass')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                <Plus className="h-8 w-8 text-indigo-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Add Class</span>
              </button>

              <button
                onClick={() => handleQuickAction('addSubject')}
                className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-colors"
              >
                <Plus className="h-8 w-8 text-indigo-600 mb-2" />
                <span className="text-sm font-medium text-gray-700">Add Subject</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'students', label: 'Students', icon: Users },
                { id: 'teachers', label: 'Teachers', icon: GraduationCap },
                { id: 'classes', label: 'Classes', icon: BookOpen },
                { id: 'subjects', label: 'Subjects', icon: Calendar },
                { id: 'announcements', label: 'Announcements', icon: Bell },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'student' ? 'bg-blue-500' :
                          activity.type === 'attendance' ? 'bg-green-500' :
                          activity.type === 'announcement' ? 'bg-purple-500' :
                          'bg-orange-500'
                        }`} />
                        <span className="text-sm text-gray-700">{activity.action}</span>
                        <span className="text-xs text-gray-500 ml-auto">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'students' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Manage Students</h3>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Add New Student
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                  Student management interface will be implemented here
                </div>
              </div>
            )}

            {activeTab === 'teachers' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Manage Teachers</h3>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Add New Teacher
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                  Teacher management interface will be implemented here
                </div>
              </div>
            )}

            {activeTab === 'classes' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Manage Classes</h3>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Add New Class
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                  Class management interface will be implemented here
                </div>
              </div>
            )}

            {activeTab === 'subjects' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Manage Subjects</h3>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Add New Subject
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                  Subject management interface will be implemented here
                </div>
              </div>
            )}

            {activeTab === 'announcements' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Manage Announcements</h3>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                    Add New Announcement
                  </button>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                  Announcement management interface will be implemented here
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">System Settings</h3>
                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                  System settings interface will be implemented here
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
