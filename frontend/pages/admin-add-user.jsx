import React, { useState } from 'react';
import { register } from '../api';

const AdminAddUser = () => {
  const [role, setRole] = useState('student');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const data = await register({ ...form, role });
      if (data.success) {
        setSuccess(`${role.charAt(0).toUpperCase() + role.slice(1)} added successfully!`);
        setForm({ name: '', email: '', password: '' });
      } else {
        setError(data.message || 'Failed to add user');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold mb-4">Add Student/Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <select value={role} onChange={e => setRole(e.target.value)} className="w-full border px-4 py-2 rounded">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border px-4 py-2 rounded" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border px-4 py-2 rounded" required />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" className="w-full border px-4 py-2 rounded" required />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>{loading ? 'Adding...' : 'Add User'}</button>
        {success && <p className="text-green-600 text-sm">{success}</p>}
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default AdminAddUser;