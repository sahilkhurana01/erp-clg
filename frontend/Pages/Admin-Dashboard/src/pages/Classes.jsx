import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { classesAPI, teachersAPI } from '../../../../api';

const ClassesPage = () => {
  const [items, setItems] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', section: '', capacity: 30, teacherId: '' });

  const load = async () => {
    setLoading(true);
    try {
      const [c, t] = await Promise.all([classesAPI.getAll(1, 100), teachersAPI.getAll(1, 100, '')]);
      setItems(c?.data || c?.items || c || []);
      setTeachers(t?.data || t?.items || t || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await classesAPI.create(form);
    setForm({ name: '', section: '', capacity: 30, teacherId: '' });
    await load();
    window.dispatchEvent(new Event('admin-data-changed'));
  };

  const remove = async (id) => {
    await classesAPI.delete(id);
    await load();
    window.dispatchEvent(new Event('admin-data-changed'));
  };

  return (
    <div className="min-h-screen">
      <Header title="Classes" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-3">All Classes</h2>
          {loading ? 'Loading...' : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Section</th>
                    <th className="py-2 pr-4">Capacity</th>
                    <th className="py-2 pr-4">Teacher</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(items || []).map(c => (
                    <tr key={c.id} className="border-b last:border-0">
                      <td className="py-2 pr-4">{c.name}</td>
                      <td className="py-2 pr-4">{c.section}</td>
                      <td className="py-2 pr-4">{c.capacity}</td>
                      <td className="py-2 pr-4">{c.teacher?.name || '-'}</td>
                      <td className="py-2">
                        <button onClick={() => remove(c.id)} className="text-red-600 hover:underline">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <form onSubmit={create} className="bg-white rounded-lg shadow p-4 space-y-3">
          <h2 className="font-semibold">Create Class</h2>
          <input className="w-full border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="w-full border rounded px-3 py-2" placeholder="Section" value={form.section} onChange={e=>setForm({...form,section:e.target.value})} />
          <input type="number" className="w-full border rounded px-3 py-2" placeholder="Capacity" value={form.capacity} onChange={e=>setForm({...form,capacity:Number(e.target.value)})} />
          <select className="w-full border rounded px-3 py-2" value={form.teacherId} onChange={e=>setForm({...form,teacherId:e.target.value})}>
            <option value="">Assign Teacher (optional)</option>
            {(teachers || []).map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
          <button className="w-full bg-blue-600 text-white py-2 rounded">Create</button>
        </form>
      </div>
    </div>
  );
};

export default ClassesPage;


