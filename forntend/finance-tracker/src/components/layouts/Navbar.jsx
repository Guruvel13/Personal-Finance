import React,{useState} from "react";
import SideMenu from "./SideMenu";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    return(
        <div className="flex gap5 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 stick top-0 z-30">
            <button className="block lg:hidden text-black" onClick={() => setOpenSideMenu(!openSideMenu)}>
                {openSideMenu ? (
                    <HiOutlineX className="text-2xl"/> 
                ):( 
                <HiOutlineMenu className="text-2xl"/>)
                }
            </button>

            <div className="flex items-center gap-2">
                <img src="/logo.png" alt="FinTrack Logo" className="w-8 h-8 rounded-full bg-cover" />
                <h2 className="text-lg font-medium text-black">FinTrack</h2>
            </div>
            {openSideMenu && (
                <div className="fixed top-[61px] -ml-4 bg-white">
                    <SideMenu activeMenu={activeMenu}/>
                </div>
            )}

        </div>
    )
}
export default Navbar;