import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/inputs/Input";
import { LuPencil, LuCheck, LuX, LuCamera, LuUser } from "react-icons/lu";
import { useRef } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import { useUserAuth } from "../../hooks/useUserAuth";

const Settings = () => {
    useUserAuth();
    const { user, updateUser } = useContext(UserContext);

    // Profile Edit State
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [profileData, setProfileData] = useState({
        fullName: "",
        profileImageUrl: ""
    });
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    // Notification Prefs State
    const [notifyPrefs, setNotifyPrefs] = useState(() => {
        const saved = localStorage.getItem('notifyPrefs');
        return saved ? JSON.parse(saved) : {
            browserPush: Notification.permission === 'granted',
            budgetWarning: true,
            emailUpdates: false
        };
    });

    const updatePref = async (key, value) => {
        const newPrefs = { ...notifyPrefs, [key]: value };
        setNotifyPrefs(newPrefs);
        localStorage.setItem('notifyPrefs', JSON.stringify(newPrefs));
        toast.success("Preferences updated");

        try {
            await axiosInstance.post(API_PATHS.AUTH.UPDATE_PREFERENCES, newPrefs);
        } catch (e) {
            console.error("Failed to sync preferences to backend", e);
        }
    };

    // Initialize profile data
    React.useEffect(() => {
        if (user) {
            setProfileData({
                fullName: user.fullName || "",
                profileImageUrl: user.profileImageUrl || ""
            });
        }
    }, [user]);

    const handleImagePick = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleProfileUpdate = async () => {
        if (!profileData.fullName.trim()) {
            toast.error("Full Name is required");
            return;
        }

        try {
            let imageUrl = profileData.profileImageUrl;

            // 1. Upload new image if exists
            if (imageFile) {
                const formData = new FormData();
                formData.append("image", imageFile);
                const uploadRes = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                imageUrl = uploadRes.data.imageUrl;
            }

            // 2. Update Profile
            const response = await axiosInstance.post(API_PATHS.AUTH.UPDATE_USER, {
                fullName: profileData.fullName,
                profileImageUrl: imageUrl,
            });

            if (response.data && response.data.user) {
                updateUser(response.data.user);
                toast.success("Profile updated successfully");
                setIsEditingProfile(false);
                setPreviewUrl(null);
                setImageFile(null);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile");
        }
    };

    const cancelEdit = () => {
        setIsEditingProfile(false);
        setPreviewUrl(null);
        setImageFile(null);
        setProfileData({
            fullName: user?.fullName || "",
            profileImageUrl: user?.profileImageUrl || ""
        });
    };

    // Password Change State & Logic
    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (password.newPassword !== password.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (!password.currentPassword || !password.newPassword) {
            toast.error("All fields are required");
            return;
        }

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.CHANGE_PASSWORD, {
                currentPassword: password.currentPassword,
                newPassword: password.newPassword,
            });

            if (response.data && response.data.message) {
                toast.success(response.data.message);
                setPassword({ currentPassword: "", newPassword: "", confirmPassword: "" });
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <DashboardLayout activeMenu="Settings">
            <div className="my-5 mx-auto">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Settings</h3>

                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-lg font-medium text-gray-700">Profile Information</h4>
                        {!isEditingProfile ? (
                            <button
                                onClick={() => setIsEditingProfile(true)}
                                className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
                            >
                                <LuPencil /> Edit
                            </button>
                        ) : (
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={cancelEdit}
                                    className="flex items-center gap-1 text-red-500 hover:text-red-600 font-medium transition-colors"
                                >
                                    <LuX /> Cancel
                                </button>
                                <button
                                    onClick={handleProfileUpdate}
                                    className="flex items-center gap-1 text-green-600 hover:text-green-700 font-medium transition-colors"
                                >
                                    <LuCheck /> Save
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative group">
                            <img
                                src={previewUrl || profileData.profileImageUrl || "https://via.placeholder.com/150"}
                                alt="Profile"
                                className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                            />
                            {isEditingProfile && (
                                <>
                                    <div
                                        className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                                        onClick={() => fileInputRef.current.click()}
                                    >
                                        <LuCamera className="text-white text-2xl" />
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImagePick}
                                    />
                                </>
                            )}
                        </div>

                        <div className="flex-1 w-full">
                            {isEditingProfile ? (
                                <div className="space-y-4">
                                    <Input
                                        label="Full Name"
                                        value={profileData.fullName}
                                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                                        type="text"
                                        placeholder="Enter your full name"
                                    />
                                    <div className="mb-4">
                                        <label className="text-sm text-slate-800 block mb-1">Email</label>
                                        <div className="w-full border rounded-md px-3 py-2 bg-gray-100 text-gray-500">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="text-lg font-semibold text-gray-900">{user?.fullName}</p>
                                    <p className="text-sm text-gray-500 mt-2">Email</p>
                                    <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                            <h4 className="text-lg font-medium text-gray-700 mb-4">Security</h4>
                            <form onSubmit={handlePasswordChange}>
                                <Input
                                    label="Current Password"
                                    value={password.currentPassword}
                                    onChange={({ target }) => setPassword({ ...password, currentPassword: target.value })}
                                    type="password"
                                    placeholder="Enter current password"
                                />
                                <Input
                                    label="New Password"
                                    value={password.newPassword}
                                    onChange={({ target }) => setPassword({ ...password, newPassword: target.value })}
                                    type="password"
                                    placeholder="Enter new password"
                                />
                                <Input
                                    label="Confirm New Password"
                                    value={password.confirmPassword}
                                    onChange={({ target }) => setPassword({ ...password, confirmPassword: target.value })}
                                    type="password"
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mt-2"
                                >
                                    Update Password
                                </button>
                            </form>
                        </div>
                        
                        {/* Notifications Settings Block */}
                        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                            <h4 className="text-lg font-medium text-gray-700 mb-4">Notification Preferences</h4>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                                    <div>
                                        <p className="font-medium text-gray-800">Browser Push Notifications</p>
                                        <p className="text-xs text-gray-500 mt-1">Receive desktop alerts for overspending</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={notifyPrefs.browserPush} 
                                            onChange={(e) => {
                                                const isChecked = e.target.checked;
                                                if (isChecked && "Notification" in window && Notification.permission !== 'granted') {
                                                    Notification.requestPermission().then(permission => {
                                                        updatePref('browserPush', permission === 'granted');
                                                    });
                                                } else {
                                                    updatePref('browserPush', isChecked);
                                                }
                                            }} 
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                                    <div>
                                        <p className="font-medium text-gray-800">Budget Warning Alerts</p>
                                        <p className="text-xs text-gray-500 mt-1">Notify me when nearing my budget limit (90%)</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={notifyPrefs.budgetWarning} 
                                            onChange={(e) => updatePref('budgetWarning', e.target.checked)} 
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                
                                <div className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/50">
                                    <div>
                                        <p className="font-medium text-gray-800">Email Updates</p>
                                        <p className="text-xs text-gray-500 mt-1">Receive a weekly summary of spending</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            className="sr-only peer" 
                                            checked={notifyPrefs.emailUpdates} 
                                            onChange={(e) => updatePref('emailUpdates', e.target.checked)} 
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
