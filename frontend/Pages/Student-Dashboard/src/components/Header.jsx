import { Bell } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Header = ({ studentData }) => {
    return (
        <div className="flex items-center justify-between p-6 bg-gradient-to-br  rounded-2xl shadow-sm">
            {/* Left side - Profile and greeting */}
            <div className="flex items-center gap-4">
                {/* Profile Picture */}
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                        src="https://imgs.search.brave.com/QS2Cxd8QDZoHsYyGVeicBs__DX2iIhjHW-1Hhz0mXP4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9wcm9m/aWxlLXBpY3R1cmUv/eW91bmctbWFsZS1l/bXBsb3llZS1vZmZp/Y2UtcHJvZmlsZS1w/aWN0dXJlLXlvdW5n/LWNhdWNhc2lhbi1t/YWxlLWVtcGxveWVl/LXBvc2luZy1vZmZp/Y2UtaGVhZHNob3Qt/MTk4MDIyMzY5Lmpw/Zw"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Greeting Text */}
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">
                        Hi, {studentData?.name || 'Student'}
                    </h1>
                    <p className="text-gray-600 text-sm">
                        {studentData?.classId ? `Class: ${studentData.classId}` : 'Student'}
                    </p>
                    <p className="text-gray-600 text-sm">
                        {studentData?.section ? `Section: ${studentData.section}` : 'Welcome back!'}
                    </p>
                </div>
            </div>

            {/* Right side - Notification Bell */}
            <div className="relative">
                <NavLink
                    to="/notifications"
                    className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-110 active:scale-95"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5 text-teal-600" />
                </NavLink>

                {/* Notification Dot */}
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white animate-ping"></span>
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-white"></span>
            </div>
        </div>
    );
};

export default Header;
