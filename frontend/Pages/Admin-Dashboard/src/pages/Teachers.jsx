import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { teachersAPI } from '../../../../api';

const TeachersPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '', email: '', password: '', employeeId: '', subject: ''
  });

  const load = async () => {
    setLoading(true);
    try {
      const res = await teachersAPI.getAll(1, 50, '');
      setItems(res.data || res.items || res.results || res.teachers || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await teachersAPI.create(form);
    setForm({ name: '', email: '', password: '', employeeId: '', subject: '' });
    await load();
    window.dispatchEvent(new Event('admin-data-changed'));
  };

  const remove = async (id) => {
    await teachersAPI.delete(id);
    await load();
    window.dispatchEvent(new Event('admin-data-changed'));
  };

  return (
    <div className="min-h-screen">
      <Header title="Teachers" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-3">All Teachers</h2>
          {loading ? 'Loading...' : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Employee ID</th>
                    <th className="py-2 pr-4">Subject</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(t => (
                    <tr key={t.id} className="border-b last:border-0">
                      <td className="py-2 pr-4">{t.name}</td>
                      <td className="py-2 pr-4">{t.email}</td>
                      <td className="py-2 pr-4">{t.employeeId}</td>
                      <td className="py-2 pr-4">{t.subject}</td>
                      <td className="py-2">
                        <button onClick={() => remove(t.id)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <form onSubmit={create} className="bg-white rounded-lg shadow p-4 space-y-3">
          <h2 className="font-semibold">Create Teacher</h2>
          <input className="w-full border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="w-full border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          <input className="w-full border rounded px-3 py-2" placeholder="Employee ID" value={form.employeeId} onChange={e=>setForm({...form,employeeId:e.target.value})} />
          <input className="w-full border rounded px-3 py-2" placeholder="Subject" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Create</button>
        </form>
      </div>
    </div>
  );
};

export default TeachersPage;


