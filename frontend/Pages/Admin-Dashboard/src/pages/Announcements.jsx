import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { announcementsAPI } from '../../../../api';

const AnnouncementsPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', content: '' });

  const load = async () => {
    setLoading(true);
    try {
      const res = await announcementsAPI.getAll(1, 100);
      setItems(res?.data || res?.items || res || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await announcementsAPI.create(form);
    setForm({ title: '', content: '' });
    await load();
  };

  const remove = async (id) => {
    await announcementsAPI.delete(id);
    await load();
  };

  const toggle = async (id) => {
    await announcementsAPI.toggleStatus(id);
    await load();
  };

  return (
    <div className="min-h-screen">
      <Header title="Announcements" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-4">
          <h2 className="font-semibold mb-3">All Announcements</h2>
          {loading ? 'Loading...' : (
            <div className="space-y-3">
              {(items || []).map(a => (
                <div key={a.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{a.title}</div>
                      <div className="text-sm text-gray-600">{a.content}</div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toggle(a.id)} className={`px-2 py-1 rounded text-white ${a.isActive ? 'bg-yellow-500' : 'bg-green-600'}`}>{a.isActive ? 'Deactivate' : 'Activate'}</button>
                      <button onClick={() => remove(a.id)} className="px-2 py-1 rounded text-white bg-red-600">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={create} className="bg-white rounded-lg shadow p-4 space-y-3">
          <h2 className="font-semibold">Create Announcement</h2>
          <input className="w-full border rounded px-3 py-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
          <textarea className="w-full border rounded px-3 py-2" placeholder="Content" rows={4} value={form.content} onChange={e=>setForm({...form,content:e.target.value})} />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Create</button>
        </form>
      </div>
    </div>
  );
};

export default AnnouncementsPage;


