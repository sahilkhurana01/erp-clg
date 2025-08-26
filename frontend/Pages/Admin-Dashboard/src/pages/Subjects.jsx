import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { subjectsAPI, classesAPI, teachersAPI } from '../../../../api';

const SubjectsPage = () => {
  const [items, setItems] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', code: '', classId: '', teacherId: '' });

  const load = async () => {
    setLoading(true);
    try {
      const [s, c, t] = await Promise.all([
        subjectsAPI.getAll(1, 100),
        classesAPI.getAll(1, 100),
        teachersAPI.getAll(1, 100, '')
      ]);
      setItems(s?.data || s?.items || s || []);
      setClasses(c?.data || c?.items || c || []);
      setTeachers(t?.data || t?.items || t || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await subjectsAPI.create(form);
    setForm({ name: '', code: '', classId: '', teacherId: '' });
    await load();
    window.dispatchEvent(new Event('admin-data-changed'));
  };

  const remove = async (id) => {
    await subjectsAPI.delete(id);
    await load();
  };

  return (
    <div className="min-h-screen">
      <Header title="Subjects" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-3">All Subjects</h2>
          {loading ? 'Loading...' : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Code</th>
                    <th className="py-2 pr-4">Class</th>
                    <th className="py-2 pr-4">Teacher</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {(items || []).map(s => (
                    <tr key={s.id} className="border-b last:border-0">
                      <td className="py-2 pr-4">{s.name}</td>
                      <td className="py-2 pr-4">{s.code}</td>
                      <td className="py-2 pr-4">{s.class?.name} {s.class?.section}</td>
                      <td className="py-2 pr-4">{s.teacher?.name}</td>
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
          <h2 className="font-semibold">Create Subject</h2>
          <input className="w-full border rounded px-3 py-2" placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          <input className="w-full border rounded px-3 py-2" placeholder="Code" value={form.code} onChange={e=>setForm({...form,code:e.target.value})} />
          <select className="w-full border rounded px-3 py-2" value={form.classId} onChange={e=>setForm({...form,classId:e.target.value})}>
            <option value="">Select Class</option>
            {(classes || []).map(c => (
              <option key={c.id} value={c.id}>{c.name} {c.section}</option>
            ))}
          </select>
          <select className="w-full border rounded px-3 py-2" value={form.teacherId} onChange={e=>setForm({...form,teacherId:e.target.value})}>
            <option value="">Select Teacher</option>
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

export default SubjectsPage;


