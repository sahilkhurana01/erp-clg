import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Mid from '../components/Mid'
import BottomNav from '../components/BottomNav'
import Buttons from '../components/Buttons'
import Lectures from '../components/Lectures'
import { studentsAPI, resultsAPI, attendanceAPI } from '../../../../api'

const Home = () => {
  const [studentData, setStudentData] = useState(null);
  const [results, setResults] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.id) {
          // Fetch student profile
          const student = await studentsAPI.getById(user.id);
          setStudentData(student);
          
          // Fetch student results
          const studentResults = await resultsAPI.getByStudent(user.id);
          setResults(studentResults.data || []);
          
          // Fetch student attendance for current month
          const now = new Date();
          const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
          const endDate = now.toISOString().split('T')[0];
          const studentAttendance = await attendanceAPI.getStudentAttendance(user.id, startDate, endDate);
          setAttendance(studentAttendance.data || []);
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <>    
          <Header studentData={studentData} />
          <Mid studentData={studentData} results={results} attendance={attendance} />
          <BottomNav />
          {/* <Buttons /> */}
          <Lectures studentData={studentData} />
    </>
  )
}

export default Home