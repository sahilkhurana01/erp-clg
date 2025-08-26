import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import api from '../../../../api';

const Overview = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalSubjects: 0,
    totalAnnouncements: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get('/api/dashboard/stats');
        const d = res?.data || res;
        setStats({
          totalStudents: d?.totalStudents || 0,
          totalTeachers: d?.totalTeachers || 0,
          totalClasses: d?.totalClasses || 0,
          totalSubjects: d?.totalSubjects || 0,
          totalAnnouncements: d?.totalAnnouncements || 0
        });
      } catch (e) {
        // keep defaults
      } finally {
        setLoading(false);
      }
    };
    load();

    const onDataChanged = () => load();
    window.addEventListener('admin-data-changed', onDataChanged);
    return () => window.removeEventListener('admin-data-changed', onDataChanged);
  }, []);

  return (
    <div className="min-h-screen">
      <Header title="Admin Dashboard" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
        {[{
          label: 'Students', value: stats.totalStudents, color: 'from-blue-500 to-indigo-500'
        },{
          label: 'Teachers', value: stats.totalTeachers, color: 'from-emerald-500 to-green-500'
        },{
          label: 'Classes', value: stats.totalClasses, color: 'from-purple-500 to-fuchsia-500'
        },{
          label: 'Subjects', value: stats.totalSubjects, color: 'from-orange-500 to-amber-500'
        },{
          label: 'Announcements', value: stats.totalAnnouncements, color: 'from-pink-500 to-rose-500'
        }].map((card) => (
          <div key={card.label} className="bg-white rounded-2xl shadow p-5 border border-white/60 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-10`} />
            <div className="relative">
              <div className="text-sm text-gray-600 mb-1">{card.label}</div>
              <div className="text-4xl font-extrabold tracking-tight text-gray-900">{loading ? '...' : card.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;


