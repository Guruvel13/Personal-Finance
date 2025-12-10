import React, { useContext } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { UserContext } from "../../context/UserContext";
import { useUserAuth } from "../../hooks/useUserAuth";

const Settings = () => {
    useUserAuth();
    const { user } = useContext(UserContext);

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
                         <p className="text-gray-500 text-sm">Password update feature coming soon!</p>
                     </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
