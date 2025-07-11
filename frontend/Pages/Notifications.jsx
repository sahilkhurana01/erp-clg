import React, { useState, useEffect } from "react";
import { Bell, AlertCircle, CalendarCheck, MessageCircle, CheckCircle2, X, Eye, EyeOff, Zap, TrendingUp, BookOpen, Users, Coffee, Clock, Search, Filter, MoreVertical, Archive, Star, Menu } from "lucide-react";
import BottomNav from "../components/BottomNav";

const notifications = [
    {
        id: 1,
        type: "Exam Alert",
        message: "Data Structures exam tomorrow at 2 PM",
        detail: "Room: CS-101 | Duration: 3 hours | Bring calculator",
        icon: CalendarCheck,
        time: "2 hours ago",
        priority: "high",
        category: "academic",
        isRead: false,
        isStarred: true,
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
        emoji: "🔥"
    },
    {
        id: 2,
        type: "Assignment Due",
        message: "Machine Learning project submission overdue",
        detail: "Extended deadline: Tonight 11:59 PM | Upload to portal",
        icon: AlertCircle,
        time: "1 day ago",
        priority: "urgent",
        category: "academic",
        isRead: false,
        isStarred: false,
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
        emoji: "⚡"
    },
    {
        id: 3,
        type: "New Resources",
        message: "Prof. Sharma uploaded React tutorials",
        detail: "Advanced hooks, context API, and performance optimization",
        icon: BookOpen,
        time: "3 days ago",
        priority: "medium",
        category: "resources",
        isRead: true,
        isStarred: false,
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        emoji: "📚"
    },
    {
        id: 4,
        type: "Study Group",
        message: "JavaScript study session tonight",
        detail: "Library room 204 at 7 PM | Bring your laptops",
        icon: Users,
        time: "5 hours ago",
        priority: "medium",
        category: "social",
        isRead: false,
        isStarred: true,
        color: "text-purple-600",
        bg: "bg-purple-50",
        border: "border-purple-200",
        emoji: "👥"
    },
    {
        id: 5,
        type: "Attendance",
        message: "Attendance updated for Database Systems",
        detail: "Current: 85% | Required: 75% | You're doing great!",
        icon: TrendingUp,
        time: "1 week ago",
        priority: "low",
        category: "admin",
        isRead: true,
        isStarred: false,
        color: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        emoji: "📈"
    },
    {
        id: 6,
        type: "Campus Event",
        message: "Tech fest registration open",
        detail: "CodeFest 2025 | Win prizes worth ₹50,000 | Register now!",
        icon: Zap,
        time: "2 days ago",
        priority: "medium",
        category: "events",
        isRead: false,
        isStarred: false,
        color: "text-yellow-600",
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        emoji: "🎉"
    }
];

const categories = [
    { id: "all", name: "All", icon: Bell, count: notifications.length, color: "text-gray-600" },
    { id: "academic", name: "Academic", icon: BookOpen, count: notifications.filter(n => n.category === "academic").length, color: "text-blue-600" },
    { id: "social", name: "Social", icon: Users, count: notifications.filter(n => n.category === "social").length, color: "text-purple-600" },
    { id: "events", name: "Events", icon: Zap, count: notifications.filter(n => n.category === "events").length, color: "text-yellow-600" },
];

const Notifications = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [notificationList, setNotificationList] = useState(notifications);
    const [showOnlyUnread, setShowOnlyUnread] = useState(false);
    const [animatingItems, setAnimatingItems] = useState(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const filteredNotifications = notificationList.filter(notification => {
        const categoryMatch = selectedCategory === "all" || notification.category === selectedCategory;
        const readMatch = showOnlyUnread ? !notification.isRead : true;
        const searchMatch = searchTerm === "" ||
            notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notification.type.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && readMatch && searchMatch;
    });

    const unreadCount = notificationList.filter(n => !n.isRead).length;
    const starredCount = notificationList.filter(n => n.isStarred).length;

    const markAsRead = (id) => {
        setAnimatingItems(prev => new Set(prev).add(id));
        setTimeout(() => {
            setNotificationList(prev =>
                prev.map(notification =>
                    notification.id === id ? { ...notification, isRead: true } : notification
                )
            );
            setAnimatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }, 300);
    };

    const toggleStar = (id) => {
        setNotificationList(prev =>
            prev.map(notification =>
                notification.id === id ? { ...notification, isStarred: !notification.isStarred } : notification
            )
        );
    };

    const deleteNotification = (id) => {
        setAnimatingItems(prev => new Set(prev).add(id));
        setTimeout(() => {
            setNotificationList(prev => prev.filter(n => n.id !== id));
            setAnimatingItems(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }, 300);
    };

    const markAllAsRead = () => {
        setNotificationList(prev => prev.map(n => ({ ...n, isRead: true })));
    };

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case "urgent": return "bg-red-100 text-red-800 border-red-200";
            case "high": return "bg-orange-100 text-orange-800 border-orange-200";
            case "medium": return "bg-blue-100 text-blue-800 border-blue-200";
            default: return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Mobile Header */}
            <div className="sticky top-0 z-50 bg-white border-b border-gray-200 px-4 py-3 md:hidden">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="p-2 bg-blue-600 rounded-lg">
                                <Bell className="text-white w-5 h-5" />
                            </div>
                            {unreadCount > 0 && (
                                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-medium">
                                    {unreadCount}
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900">Notifications</h1>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowMobileMenu(!showMobileMenu)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <MoreVertical className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {showMobileMenu && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="absolute inset-0 bg-black/20" onClick={() => setShowMobileMenu(false)} />
                    <div className="absolute top-16 right-4 bg-white rounded-lg shadow-xl border border-gray-200 py-2 min-w-48">
                        <button
                            onClick={() => {
                                setShowOnlyUnread(!showOnlyUnread);
                                setShowMobileMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 text-sm"
                        >
                            {showOnlyUnread ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            {showOnlyUnread ? 'Show All' : 'Unread Only'}
                        </button>
                        <button
                            onClick={() => {
                                markAllAsRead();
                                setShowMobileMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 text-sm"
                        >
                            <CheckCircle2 className="w-4 h-4" />
                            Mark All Read
                        </button>
                        <button
                            onClick={() => {
                                setShowFilters(!showFilters);
                                setShowMobileMenu(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-gray-50 text-sm"
                        >
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                    </div>
                </div>
            )}

            <div className="px-4 pt-4 pb-24 md:px-8 md:pt-10">
                <div className="max-w-5xl mx-auto">
                    {/* Desktop Header */}
                    <div className="hidden md:flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-200">
                                    <Bell className="text-gray-700 w-6 h-6" />
                                </div>
                                {unreadCount > 0 && (
                                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                                        {unreadCount}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                                    Notifications
                                </h1>
                                <p className="text-gray-600 mt-1">Stay updated with your college activities</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={markAllAsRead}
                                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 rounded-lg transition-all text-sm font-medium"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                Mark All Read
                            </button>
                            <button
                                onClick={() => setShowOnlyUnread(!showOnlyUnread)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${showOnlyUnread
                                    ? 'bg-blue-600 text-white shadow-sm'
                                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                                    }`}
                            >
                                {showOnlyUnread ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                {showOnlyUnread ? 'Show All' : 'Unread Only'}
                            </button>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search notifications..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>

                    {/* Categories - Mobile Scrollable */}
                    <div className="mb-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {categories.map(({ id, name, icon: Icon, count, color }) => (
                                <button
                                    key={id}
                                    onClick={() => setSelectedCategory(id)}
                                    className={`flex items-center justify-between gap-2 px-4 py-3 rounded-xl transition-all text-sm font-medium shadow-sm
                    ${selectedCategory === id
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50'}
                `}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon className="w-4 h-4" />
                                        <span>{name}</span>
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
                    ${selectedCategory === id
                                            ? 'bg-white/20 text-white'
                                            : 'bg-gray-100 text-gray-700'}
                `}>
                                        {count}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Stats Cards - Mobile Responsive */}
                    {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
                        <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <Bell className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-gray-600">Total</p>
                                    <p className="text-lg md:text-2xl font-semibold text-gray-900">{notificationList.length}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="p-2 bg-orange-100 rounded-lg">
                                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-gray-600">Unread</p>
                                    <p className="text-lg md:text-2xl font-semibold text-gray-900">{unreadCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-gray-600">Read</p>
                                    <p className="text-lg md:text-2xl font-semibold text-gray-900">{notificationList.length - unreadCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 border border-gray-200">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="p-2 bg-yellow-100 rounded-lg">
                                    <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-600" />
                                </div>
                                <div>
                                    <p className="text-xs md:text-sm text-gray-600">Starred</p>
                                    <p className="text-lg md:text-2xl font-semibold text-gray-900">{starredCount}</p>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    {/* Notifications */}
                    <div className="space-y-3 md:space-y-4">
                        {filteredNotifications.map((notification) => {
                            const isAnimating = animatingItems.has(notification.id);

                            return (
                                <div
                                    key={notification.id}
                                    className={`group transition-all duration-300 ${isAnimating ? 'scale-95 opacity-50' : ''
                                        }`}
                                >
                                    <div className={`
                                        relative bg-white rounded-xl p-4 md:p-6 border-2 shadow-sm hover:shadow-md transition-all
                                        ${notification.isRead ? 'border-gray-200' : notification.border}
                                        ${notification.priority === 'urgent' ? 'ring-2 ring-red-100' : ''}
                                        ${notification.isStarred ? 'ring-2 ring-yellow-100' : ''}
                                    `}>

                                        {/* Mobile Layout */}
                                        <div className="md:hidden">
                                            <div className="flex items-start gap-3">
                                                {/* Icon */}
                                                <div className={`p-2 rounded-lg ${notification.bg} ${notification.border} border flex-shrink-0`}>
                                                    <notification.icon className={`w-4 h-4 ${notification.color}`} />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="text-sm">{notification.emoji}</span>
                                                                <h3 className="font-medium text-gray-900 text-sm truncate">
                                                                    {notification.type}
                                                                </h3>
                                                                {!notification.isRead && (
                                                                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                                                                )}
                                                            </div>
                                                            <p className="text-gray-700 text-sm mb-1 line-clamp-2">
                                                                {notification.message}
                                                            </p>
                                                            <p className="text-gray-500 text-xs mb-2 line-clamp-1">
                                                                {notification.detail}
                                                            </p>
                                                        </div>

                                                        {/* Star button */}
                                                        <button
                                                            onClick={() => toggleStar(notification.id)}
                                                            className={`p-1 rounded transition-colors ${notification.isStarred
                                                                ? 'text-yellow-500 hover:text-yellow-600'
                                                                : 'text-gray-400 hover:text-yellow-500'
                                                                }`}
                                                        >
                                                            <Star className={`w-4 h-4 ${notification.isStarred ? 'fill-current' : ''}`} />
                                                        </button>
                                                    </div>

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between mt-3">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-gray-500 text-xs">
                                                                {notification.time}
                                                            </span>
                                                            <span className={`text-xs px-2 py-0.5 rounded-full border ${getPriorityBadge(notification.priority)}`}>
                                                                {notification.priority}
                                                            </span>
                                                        </div>

                                                        {/* Action buttons */}
                                                        <div className="flex items-center gap-1">
                                                            {!notification.isRead && (
                                                                <button
                                                                    onClick={() => markAsRead(notification.id)}
                                                                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                                    title="Mark as read"
                                                                >
                                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => deleteNotification(notification.id)}
                                                                className="p-1 hover:bg-gray-100 rounded transition-colors"
                                                                title="Delete"
                                                            >
                                                                <X className="w-4 h-4 text-red-600" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Desktop Layout */}
                                        <div className="hidden md:block">
                                            <div className="flex items-start gap-4">
                                                {/* Icon */}
                                                <div className={`p-3 rounded-lg ${notification.bg} ${notification.border} border`}>
                                                    <notification.icon className={`w-5 h-5 ${notification.color}`} />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xl">{notification.emoji}</span>
                                                            <div>
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <h3 className="font-medium text-gray-900">
                                                                        {notification.type}
                                                                    </h3>
                                                                    {!notification.isRead && (
                                                                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                                                    )}
                                                                </div>
                                                                <p className="text-gray-700 text-sm mb-2">
                                                                    {notification.message}
                                                                </p>
                                                                <p className="text-gray-500 text-sm">
                                                                    {notification.detail}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Action buttons */}
                                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                onClick={() => toggleStar(notification.id)}
                                                                className={`p-2 rounded-lg transition-colors ${notification.isStarred
                                                                    ? 'text-yellow-500 hover:bg-yellow-50'
                                                                    : 'text-gray-400 hover:bg-gray-100 hover:text-yellow-500'
                                                                    }`}
                                                                title="Star"
                                                            >
                                                                <Star className={`w-4 h-4 ${notification.isStarred ? 'fill-current' : ''}`} />
                                                            </button>
                                                            {!notification.isRead && (
                                                                <button
                                                                    onClick={() => markAsRead(notification.id)}
                                                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                    title="Mark as read"
                                                                >
                                                                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => deleteNotification(notification.id)}
                                                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                                                                title="Delete"
                                                            >
                                                                <X className="w-4 h-4 text-red-600" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                    

                                                    

                                                    {/* Footer */}
                                                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                                                        <span className="text-gray-500 text-sm">
                                                            {notification.time}
                                                        </span>
                                                        <div className="flex items-center gap-2">
                                                            <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityBadge(notification.priority)}`}>
                                                                {notification.priority}
                                                            </span>
                                                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                                                                {notification.category}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            );
                        })}
                    </div>

                    {/* Empty state */}
                    {filteredNotifications.length === 0 && (
                        <div className="text-center py-16">
                            <div className="bg-white rounded-xl p-8 md:p-12 border border-gray-200">
                                <Coffee className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-lg md:text-xl font-medium text-gray-900 mb-2">
                                    All caught up!
                                </h3>
                                <p className="text-gray-600 text-sm md:text-base">
                                    {showOnlyUnread ? "No unread notifications. Great job staying on top of things!" : "No notifications to show."}
                                </p>
                            </div>

                        </div>
                    )}
                </div>
            </div>
            <BottomNav />
        </div>
    );
};

export default Notifications;