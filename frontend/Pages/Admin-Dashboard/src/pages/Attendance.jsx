import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { classesAPI, attendanceAPI, studentsAPI } from '../../../../api';

const AttendancePage = () => {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10));
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(false);

  const loadClasses = async () => {
    const res = await classesAPI.getAll(1, 100);
    setClasses(res?.data || res?.items || res || []);
  };

  const loadStudents = async (classId) => {
    if (!classId) return;
    setLoading(true);
    try {
      const res = await classesAPI.getStudents(classId);
      const list = res?.data || res?.students || res || [];
      setStudents(list);
      const today = await attendanceAPI.getByClass(classId, date);
      const map = {};
      (today?.data || today || []).forEach(r => { map[r.studentId] = r.status; });
      setRecords(map);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadClasses(); }, []);
  useEffect(() => { if (selectedClass) loadStudents(selectedClass); }, [selectedClass, date]);

  const toggle = (studentId) => {
    setRecords(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'present' ? 'absent' : 'present'
    }));
  };

  const save = async () => {
    const payload = Object.entries(records).map(([studentId, status]) => ({ studentId, classId: selectedClass, status, date }));
    await attendanceAPI.markAttendance(payload);
    await loadStudents(selectedClass);
  };

  return (
    <div className="min-h-screen">
      <Header title="Attendance" />
      <div className="bg-white rounded-lg shadow p-4 mt-6 space-y-4">
        <div className="flex gap-3 flex-wrap">
          <select className="border rounded px-3 py-2" value={selectedClass} onChange={e=>setSelectedClass(e.target.value)}>
            <option value="">Select Class</option>
            {(classes || []).map(c => <option key={c.id} value={c.id}>{c.name} {c.section}</option>)}
          </select>
          <input type="date" className="border rounded px-3 py-2" value={date} onChange={e=>setDate(e.target.value)} />
          <button onClick={save} disabled={!selectedClass || loading} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">Save</button>
        </div>
        {selectedClass && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {(students || []).map(s => (
              <div key={s.id} className={`p-3 border rounded-lg flex items-center justify-between ${records[s.id] === 'present' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div>
                  <div className="font-medium">{s.name}</div>
                  <div className="text-xs text-gray-600">{s.rollNo}</div>
                </div>
                <button onClick={() => toggle(s.id)} className={`px-2 py-1 rounded text-white ${records[s.id] === 'present' ? 'bg-green-600' : 'bg-red-600'}`}>
                  {records[s.id] === 'present' ? 'Present' : 'Absent'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AttendancePage;


