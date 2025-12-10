import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import Input from "../../components/inputs/Input";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import { useUserAuth } from "../../hooks/useUserAuth";

const Settings = () => {
    useUserAuth();
    const { user } = useContext(UserContext);

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
                
                <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                    <h4 className="text-lg font-medium text-gray-700 mb-4">Profile Information</h4>
                    <div className="flex items-center gap-6 mb-6">
                        <img 
                            src={user?.profileImageUrl || "https://via.placeholder.com/150"} 
                            alt="Profile" 
                            className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                        />
                        <div>
                            <p className="text-sm text-gray-500">Full Name</p>
                            <p className="text-lg font-semibold text-gray-900">{user?.fullName}</p>
                            <p className="text-sm text-gray-500 mt-2">Email</p>
                            <p className="text-lg font-semibold text-gray-900">{user?.email}</p>
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
                                className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
