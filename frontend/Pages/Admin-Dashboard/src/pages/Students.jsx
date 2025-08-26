import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { studentsAPI } from '../../../../api';

const StudentsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: '', email: '', password: '', rollNo: '', classId: '', section: ''
  });

  const load = async () => {
    setLoading(true);
    try {
      const res = await studentsAPI.getAll(1, 50, '');
      setItems(res.data || res.items || res.results || res.students || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await studentsAPI.create(form);
    setForm({ name: '', email: '', password: '', rollNo: '', classId: '', section: '' });
    await load();
    window.dispatchEvent(new Event('admin-data-changed'));
  };

  const remove = async (id) => {
    await studentsAPI.delete(id);
    await load();
    window.dispatchEvent(new Event('admin-data-changed'));
  };

  return (
    <div className="min-h-screen">
      <Header title="Students" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-3">All Students</h2>
          {loading ? 'Loading...' : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Roll No</th>
                    <th className="py-2 pr-4">Section</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(s => (
                    <tr key={s.id} className="border-b last:border-0">
                      <td className="py-2 pr-4">{s.name}</td>
                      <td className="py-2 pr-4">{s.email}</td>
                      <td className="py-2 pr-4">{s.rollNo}</td>
                      <td className="py-2 pr-4">{s.section}</td>
                      <td className="py-2">
                        <button onClick={() => remove(s.id)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <form onSubmit={create} className="bg-white rounded-lg shadow p-4 space-y-3">
          <h2 className="font-semibold">Create Student</h2>
          <input className="w-full border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="w-full border rounded px-3 py-2" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          <input type="password" className="w-full border rounded px-3 py-2" placeholder="Password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} />
          <input className="w-full border rounded px-3 py-2" placeholder="Roll No" value={form.rollNo} onChange={e=>setForm({...form,rollNo:e.target.value})} />
          <input className="w-full border rounded px-3 py-2" placeholder="Class ID" value={form.classId} onChange={e=>setForm({...form,classId:e.target.value})} />
          <input className="w-full border rounded px-3 py-2" placeholder="Section" value={form.section} onChange={e=>setForm({...form,section:e.target.value})} />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Create</button>
        </form>
      </div>
    </div>
  );
};

export default StudentsPage;


