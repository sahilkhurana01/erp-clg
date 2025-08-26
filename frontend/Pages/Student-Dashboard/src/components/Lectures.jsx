// src/components/TodaysClasses.jsx
import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  MapPin, 
  User, 
  BookOpen, 
  Coffee, 
  Zap, 
  Star, 
  TrendingUp,
  Calendar,
  Bell,
  Play,
  Pause,
  Utensils
} from 'lucide-react';
import { timetableAPI } from '../../../../api';

const TodaysClasses = ({ studentData }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timetableData, setTimetableData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get today's day index (0 = Monday, 1 = Tuesday, etc.)
  const getTodayIndex = () => {
    const today = new Date().getDay();
    // Convert Sunday (0) to 6, and shift other days back by 1
    return today === 0 ? 6 : today - 1;
  };
  
  const [selectedDay, setSelectedDay] = useState(getTodayIndex());

  // Fetch timetable data
  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        setLoading(true);
        if (studentData?.classId) {
          const timetable = await timetableAPI.getClassTimetable(studentData.classId);
          setTimetableData(timetable.data || []);
        }
      } catch (error) {
        console.error('Error fetching timetable:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, [studentData]);

  // Update time every minute
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const today = currentTime;
  const day = today.toLocaleDateString('en-US', { weekday: 'long' });
  const date = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Convert timetable data to schedule format
  const schedule = timetableData
    .filter(item => item.day === weekDays[selectedDay])
    .map(item => ({
      time: `${item.startTime} - ${item.endTime}`,
      subject: item.subjectName || 'Subject',
      room: item.room || 'Room TBD',
      type: 'lecture',
      status: 'upcoming'
    }))
    .sort((a, b) => {
      const [startTimeA] = a.time.split(' - ');
      const [startTimeB] = b.time.split(' - ');
      return startTimeA.localeCompare(startTimeB);
    });

  // Add breaks between classes
  const scheduleWithBreaks = [];
  schedule.forEach((item, index) => {
    if (index > 0) {
      // Add a break
      scheduleWithBreaks.push({
        time: 'Break',
        subject: 'Break Time',
        room: 'Canteen',
        type: 'break',
        status: 'upcoming'
      });
    }
    scheduleWithBreaks.push(item);
  });

  const getCurrentItem = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    return scheduleWithBreaks.find(item => {
      if (item.type === 'break') return false;
      const [startTime] = item.time.split(' - ');
      const [time, period] = startTime.split(' ');
      let [hours, minutes] = time.split(':').map(Number);
      if (period === 'PM' && hours !== 12) hours += 12;
      if (period === 'AM' && hours === 12) hours = 0;
      const itemStart = hours * 60 + minutes;
      
      const [endTime] = item.time.split(' - ').slice(-1);
      const [endTimeStr, endPeriod] = endTime.split(' ');
      let [endHours, endMinutes] = endTimeStr.split(':').map(Number);
      if (endPeriod === 'PM' && endHours !== 12) endHours += 12;
      if (endPeriod === 'AM' && endHours === 12) endHours = 0;
      const itemEnd = endHours * 60 + endMinutes;
      
      return now >= itemStart && now <= itemEnd;
    });
  };

  const currentItem = getCurrentItem();

  const getStatus = (item) => {
    if (item.type === 'break') return 'upcoming';
    
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    const [startTime] = item.time.split(' - ');
    const [time, period] = startTime.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    const itemStart = hours * 60 + minutes;
    
    const [endTime] = item.time.split(' - ').slice(-1);
    const [endTimeStr, endPeriod] = endTime.split(' ');
    let [endHours, endMinutes] = endTimeStr.split(':').map(Number);
    if (endPeriod === 'PM' && endHours !== 12) endHours += 12;
    if (endPeriod === 'AM' && endHours === 12) endHours = 0;
    const itemEnd = endHours * 60 + endMinutes;
    
    if (now >= itemStart && now <= itemEnd) return 'current';
    if (now > itemEnd) return 'completed';
    return 'upcoming';
  };

  if (loading) {
    return (
      <div className="w-full px-4 lg:px-8 py-10">
        <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-xl p-6 lg:p-8 border border-blue-100 mb-[5rem]">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 lg:px-8 py-10   ">
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl shadow-xl p-6 lg:p-8 border border-blue-100 mb-[5rem]">
        
        {/* Header with Gradient */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg mb-4">
            <Calendar className="w-5 h-5" />
            <h2 className="text-xl lg:text-2xl font-bold">Weekly Schedule</h2>
          </div>
        </div>

        {/* Week Day Selector - Mobile Optimized */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-2xl shadow-md p-2 border border-gray-100 w-full max-w-md">
            <div className="grid grid-cols-7 gap-1">
              {weekDays.map((day, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedDay(idx)}
                  className={`px-2 py-2 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm ${
                    selectedDay === idx
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Item Highlight */}
        {currentItem && (
          <div className="mb-6">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-4 shadow-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 rounded-full p-2">
                    {currentItem.type === 'break' ? <Coffee className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">
                      {currentItem.type === 'break' ? 'Break Time!' : 'Currently Live!'}
                    </h3>
                    <p className="text-green-100">{currentItem.subject}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-green-100">{currentItem.room}</p>
                  <p className="text-sm text-green-100">{currentItem.time}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Grid */}
        <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {scheduleWithBreaks.length > 0 ? (
            scheduleWithBreaks.map((item, idx) => {
              const status = getStatus(item);
              const isCurrent = status === 'current';
              const isCompleted = status === 'completed';
              const isBreak = item.type === 'break';
              
              return (
                <div
                  key={idx}
                  className={`group relative overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-102 ${
                    isCurrent 
                      ? 'ring-2 ring-green-400 bg-green-50 border border-green-200' 
                      : isCompleted
                        ? 'bg-gray-50 border border-gray-200'
                        : 'bg-white border border-gray-200'
                  }`}
                >
                  {/* Content */}
                  <div className="p-4">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`rounded-full p-2 ${
                        isCurrent 
                          ? 'bg-green-100 text-green-600' 
                          : isCompleted
                            ? 'bg-gray-100 text-gray-500'
                            : isBreak
                              ? 'bg-orange-100 text-orange-600'
                              : 'bg-blue-100 text-blue-600'
                      }`}>
                        {isBreak ? <Coffee className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isCurrent 
                          ? 'bg-green-500 text-white' 
                          : isCompleted
                            ? 'bg-gray-500 text-white'
                            : 'bg-blue-500 text-white'
                      }`}>
                        {isCurrent ? 'LIVE' : isCompleted ? 'COMPLETED' : 'UPCOMING'}
                      </div>
                    </div>

                    {/* Subject */}
                    <h3 className={`text-base font-semibold mb-2 ${
                      isCompleted ? 'text-gray-500 line-through' : 'text-gray-800'
                    }`}>
                      {item.subject}
                    </h3>

                    {/* Time */}
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{item.time}</span>
                    </div>

                    {/* Room */}
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{item.room}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No classes scheduled for {weekDays[selectedDay]}</p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-600">{scheduleWithBreaks.filter(s => s.type === 'lecture').length}</div>
            <div className="text-sm text-gray-600">Total Classes</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-2xl font-bold text-green-600">{scheduleWithBreaks.filter(s => getStatus(s) === 'current').length}</div>
            <div className="text-sm text-gray-600">Live Now</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-600">{scheduleWithBreaks.filter(s => getStatus(s) === 'completed').length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-2xl font-bold text-orange-600">{scheduleWithBreaks.filter(s => s.type === 'break').length}</div>
            <div className="text-sm text-gray-600">Breaks</div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default TodaysClasses;
