import React, { useEffect, useState } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await apiGet('/api/students');
      setStudents(data);
    } catch (err) {
      setError('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await apiPut(`/api/students/${editingId}`, form);
      } else {
        await apiPost('/api/students', form);
      }
      setForm({ name: '', email: '' });
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      setError('Failed to save student');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (student) => {
    setForm({ name: student.name, email: student.email });
    setEditingId(student.id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await apiDelete(`/api/students/${id}`);
      fetchStudents();
    } catch (err) {
      setError('Failed to delete student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Students</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <button type="submit" disabled={loading}>{editingId ? 'Update' : 'Add'} Student</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', email: '' }); }}>Cancel</button>}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} ({student.email})
            <button onClick={() => handleEdit(student)}>Edit</button>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentsPage;