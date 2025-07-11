import React, { useEffect, useState } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const data = await apiGet('/api/teachers');
      setTeachers(data);
    } catch (err) {
      setError('Failed to fetch teachers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await apiPut(`/api/teachers/${editingId}`, form);
      } else {
        await apiPost('/api/teachers', form);
      }
      setForm({ name: '', email: '' });
      setEditingId(null);
      fetchTeachers();
    } catch (err) {
      setError('Failed to save teacher');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (teacher) => {
    setForm({ name: teacher.name, email: teacher.email });
    setEditingId(teacher.id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await apiDelete(`/api/teachers/${id}`);
      fetchTeachers();
    } catch (err) {
      setError('Failed to delete teacher');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Teachers</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit" disabled={loading}>{editingId ? 'Update' : 'Add'} Teacher</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', email: '' }); }}>Cancel</button>}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.name} ({teacher.email})
            <button onClick={() => handleEdit(teacher)}>Edit</button>
            <button onClick={() => handleDelete(teacher.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeachersPage;