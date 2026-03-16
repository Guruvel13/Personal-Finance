import React, { useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const SideMenu = ({ activeMenu }) => {
  const { clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  return (
    <div className="w-20 hover:w-64 transition-all duration-300 h-[calc(100vh-93px)] bg-white border border-gray-200 p-3 sticky top-[77px] z-20 rounded-2xl shadow-sm ml-4 mt-4 overflow-hidden group">
      <div className="flex flex-col gap-2 h-full">
        {SIDE_MENU_DATA.filter(item => item.lable !== "Settings" && item.lable !== "Logout").map((item, index) => (
          <button
            key={`menu_${index}`}
            className={`w-full flex items-center justify-start gap-4 text-[15px] ${activeMenu === item.lable
              ? "text-white bg-primary"
              : "text-gray-600 hover:bg-gray-100"
              } py-3 px-3.5 rounded-xl transition-all duration-200 whitespace-nowrap`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className="text-xl shrink-0" />
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
              {item.lable}
            </span>
          </button>
        ))}

        <div className="mt-auto flex flex-col gap-2">
          {/* Add Transaction Button */}
          <button
            className="w-full flex items-center justify-center gap-2 text-[15px] bg-primary text-white hover:bg-purple-700 py-3 px-4 rounded-xl shadow-md transition-all duration-200 whitespace-nowrap active:scale-95"
            onClick={() => {
              window.dispatchEvent(new Event('openAddTransactionModal'));
            }}
          >
            <IoMdAdd className="text-xl shrink-0" />
            <span className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-[200px] group-hover:opacity-100 transition-all duration-300">
              Add Transaction
            </span>
          </button>

          {/* Divider Line */}
          <div className="h-px bg-gray-200 my-1 mx-2" />

          {SIDE_MENU_DATA.filter(item => item.lable === "Settings" || item.lable === "Logout").map((item, index) => (
            <button
              key={`menu_bottom_${index}`}
              className={`w-full flex items-center justify-start gap-4 text-[15px] ${activeMenu === item.lable
                ? "text-white bg-primary"
                : item.lable === "Logout"
                  ? "text-red-500 hover:bg-red-50"
                  : "text-gray-600 hover:bg-gray-100"
                } py-3 px-3.5 rounded-xl transition-all duration-200 whitespace-nowrap`}
              onClick={() => handleClick(item.path)}
            >
              <item.icon className="text-xl shrink-0" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {item.lable}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
