// src/components/TodaysClasses.jsx
import React, { useState } from 'react';
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

const TodaysClasses = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Get today's day index (0 = Monday, 1 = Tuesday, etc.)
  const getTodayIndex = () => {
    const today = new Date().getDay();
    // Convert Sunday (0) to 6, and shift other days back by 1
    return today === 0 ? 6 : today - 1;
  };
  
  const [selectedDay, setSelectedDay] = useState(getTodayIndex());

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
  
  const schedule = [
    { 
      time: '09:00 AM - 10:00 AM', 
      subject: 'Data Structures & Algorithms', 
      room: 'Lab 301',
      type: 'lecture',
      status: 'completed'
    },
    { 
      time: '10:15 AM - 11:00 AM', 
      subject: 'Operating Systems', 
      room: 'Room 205',
      type: 'lecture',
      status: 'completed'
    },
    { 
      time: '11:00 AM - 11:25 AM', 
      subject: 'Tea Break', 
      room: 'Canteen',
      type: 'break',
      status: 'completed'
    },
    { 
      time: '11:30 AM - 12:30 PM', 
      subject: 'Discrete Mathematics', 
      room: 'Room 102',
      type: 'lecture',
      status: 'current'
    },
    { 
      time: '12:30 PM - 01:30 PM', 
      subject: 'Computer Networks', 
      room: 'Lab 401',
      type: 'lecture',
      status: 'upcoming'
    },
    { 
      time: '01:30 PM - 02:30 PM', 
      subject: 'Lunch Break', 
      room: 'Canteen',
      type: 'break',
      status: 'upcoming'
    },
    { 
      time: '02:45 PM - 03:45 PM', 
      subject: 'Database Management', 
      room: 'Room 308',
      type: 'lecture',
      status: 'upcoming'
    }
  ];

  const getCurrentItem = () => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    return schedule.find(item => {
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
          {schedule.map((item, idx) => {
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
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-2xl font-bold text-blue-600">{schedule.filter(s => s.type === 'lecture').length}</div>
            <div className="text-sm text-gray-600">Total Classes</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-2xl font-bold text-green-600">{schedule.filter(s => getStatus(s) === 'current').length}</div>
            <div className="text-sm text-gray-600">Live Now</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-2xl font-bold text-gray-600">{schedule.filter(s => getStatus(s) === 'completed').length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100 text-center">
            <div className="text-2xl font-bold text-orange-600">{schedule.filter(s => s.type === 'break').length}</div>
            <div className="text-sm text-gray-600">Breaks</div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default TodaysClasses;
