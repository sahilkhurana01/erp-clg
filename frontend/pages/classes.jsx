import React, { useEffect, useState } from 'react';
import { apiGet, apiPost, apiPut, apiDelete } from '../api';

const ClassesPage = () => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const data = await apiGet('/api/classes');
      setClasses(data);
    } catch (err) {
      setError('Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await apiPut(`/api/classes/${editingId}`, form);
      } else {
        await apiPost('/api/classes', form);
      }
      setForm({ name: '' });
      setEditingId(null);
      fetchClasses();
    } catch (err) {
      setError('Failed to save class');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (classObj) => {
    setForm({ name: classObj.name });
    setEditingId(classObj.id);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await apiDelete(`/api/classes/${id}`);
      fetchClasses();
    } catch (err) {
      setError('Failed to delete class');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Classes</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={form.name} onChange={handleChange} placeholder="Class Name" required />
        <button type="submit" disabled={loading}>{editingId ? 'Update' : 'Add'} Class</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ name: '' }); }}>Cancel</button>}
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {classes.map((classObj) => (
          <li key={classObj.id}>
            {classObj.name}
            <button onClick={() => handleEdit(classObj)}>Edit</button>
            <button onClick={() => handleDelete(classObj.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassesPage;