import React, { useState } from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { UserContext } from "../../context/UserContext";
import CharAvatar from "../Cards/CharAvatar";
import { RiNotification3Line } from "react-icons/ri";
import { useContext } from "react";

const Navbar = ({ activeMenu }) => {
    const { user } = useContext(UserContext);
    const [openSideMenu, setOpenSideMenu] = useState(false);
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
                    <select 
                        className="text-sm bg-gray-50 border border-gray-200 text-gray-700 rounded-md px-2 py-1 outline-none focus:border-primary-500"
                        value={localStorage.getItem('selectedBackend') || 'node'}
                        onChange={(e) => {
                            localStorage.setItem('selectedBackend', e.target.value);
                            window.location.reload();
                        }}
                    >
                        <option value="node">Node Backend</option>
                        <option value="java">Java Backend</option>
                    </select>
                    <div className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 cursor-pointer transition-colors text-gray-400 hover:text-gray-600">
                        <RiNotification3Line className="text-xl" />
                    </div>

                    <div className="flex items-center gap-3">
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