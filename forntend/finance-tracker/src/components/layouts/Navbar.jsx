import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";
import { RiNotification3Line } from "react-icons/ri";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
const Navbar = ({ activeMenu }) => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        // Request native browser notifications permission
        if ("Notification" in window && Notification.permission !== "granted" && Notification.permission !== "denied") {
            Notification.requestPermission();
        }

        if (user) {
            axiosInstance.get(API_PATHS.DASHBOARD.GET_NOTIFICATIONS)
                .then(res => {
                    let newNotifs = res.data?.notifications || [];
                    
                    // Add dummy notification for testing if none exist
                    if (newNotifs.length === 0) {
                        newNotifs = [{
                            _id: "test_sample_notification_" + Date.now(),
                            type: "warning",
                            category: "Testing",
                            message: "This is a sample overspending notification pushed from the web browser!",
                            timestamp: new Date(),
                            icon: "🔔",
                            read: false
                        }];
                    }

                    setNotifications(newNotifs);

                    if (newNotifs.length > 0 && "Notification" in window && Notification.permission === "granted") {
                        const lastNotified = localStorage.getItem('lastNotifTimestamp') || 0;
                        const latestNotifTime = new Date(newNotifs[0].timestamp).getTime();

                        if (latestNotifTime > lastNotified) {
                            new Notification("FinTrack Alert", {
                                body: newNotifs[0].message,
                                icon: "/logo.png",
                            });
                            localStorage.setItem('lastNotifTimestamp', latestNotifTime.toString());
                        }
                    }
                })
                .catch(err => console.error("Failed to load notifications:", err));
        }
    }, [user]);

    return (
        <div className="flex justify-between items-center bg-white border-b border-gray-200/50 backdrop-blur-md py-4 px-7 sticky top-0 z-50 w-full shadow-sm">
            <div className="flex items-center gap-5">
                <button className="block lg:hidden text-black" onClick={() => setOpenSideMenu(!openSideMenu)}>
                    {openSideMenu ? (
                        <HiOutlineX className="text-2xl" />
                    ) : (
                        <HiOutlineMenu className="text-2xl" />)
                    }
                </button>

                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="FinTrack Logo" className="w-8 h-8 rounded-full bg-cover" />
                    <h2 className="text-lg font-medium text-black">FinTrack</h2>
                </div>
            </div>

            {user && (
                <div className="flex items-center gap-5">
                    {/* <select 
                        className="text-sm bg-gray-50 border border-gray-200 text-gray-700 rounded-md px-2 py-1 outline-none focus:border-primary-500"
                        value={localStorage.getItem('selectedBackend') || 'node'}
                        onChange={(e) => {
                            localStorage.setItem('selectedBackend', e.target.value);
                            window.location.reload();
                        }}
                    >
                        <option value="node">Node Backend</option>
                        <option value="java">Java Backend</option>
                    </select> */}
                    <div className="relative">
                        <div 
                            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-gray-800 hover:text-primary relative"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <RiNotification3Line className="text-xl" />
                            {notifications.length > 0 && (
                                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                    {notifications.length}
                                </span>
                            )}
                        </div>
                        
                        {showNotifications && (
                            <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50">
                                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                                    {notifications.length > 0 && (
                                        <button 
                                            className="text-xs text-primary font-medium hover:underline"
                                            onClick={() => setNotifications([])}
                                        >
                                            Mark all as read
                                        </button>
                                    )}
                                </div>
                                <div className="max-h-[300px] overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="p-4 text-center text-gray-500 text-sm">No new notifications</div>
                                    ) : (
                                        notifications.map((notif, index) => (
                                            <div 
                                                key={index} 
                                                className={`p-4 border-b border-gray-50 flex gap-3 cursor-pointer ${notif.type === 'overspending' ? 'bg-red-50/30 hover:bg-red-50' : 'hover:bg-gray-50'}`}
                                                onClick={() => {
                                                    // Mark as read (remove from state locally)
                                                    setNotifications(prev => prev.filter(n => n._id !== notif._id));
                                                    
                                                    // Navigate to expense route to view transactions
                                                    navigate("/expense");
                                                    setShowNotifications(false);
                                                }}
                                            >
                                                <div className="flex flex-col flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${notif.type === 'overspending' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                                                            {notif.type === 'overspending' ? 'Overspent' : 'Warning'}
                                                        </span>
                                                        <p className="text-xs text-gray-400">{new Date(notif.timestamp).toLocaleString()}</p>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-800">{notif.message}</p>
                                                    <p className="text-xs text-primary mt-2 font-medium">Click to view expenses</p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/50 text-center">
                                    <button 
                                        className="text-xs text-primary hover:text-purple-700 font-medium"
                                        onClick={() => {
                                            navigate("/expense");
                                            setShowNotifications(false);
                                        }}
                                    >
                                        See all expenses & history
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div 
                        className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 -mr-1.5 rounded-xl transition-colors"
                        onClick={() => navigate("/settings")}
                    >
                        {user?.profileImageUrl ? (
                            <img
                                src={user.profileImageUrl}
                                alt="profile"
                                className="w-10 h-10 rounded-full object-cover border border-gray-100"
                            />
                        ) : (
                            <CharAvatar
                                fullName={user?.fullName}
                                width="w-10"
                                height="h-10"
                                style="text-sm"
                            />
                        )}
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-gray-800 leading-none">{user?.fullName || ""}</p>
                            <p className="text-xs text-gray-500 mt-1">user</p>
                        </div>
                    </div>
                </div>
            )}
            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white">
                    <SideMenu activeMenu={activeMenu} />
                </div>
            )}

        </div>
    )
}
export default Navbar;