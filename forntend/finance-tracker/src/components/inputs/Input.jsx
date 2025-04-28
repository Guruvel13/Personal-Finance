import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"; // ✅ Correct import

const Input = ({ value, onChange, placeholder, label, type }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label className="text-sm text-slate-800 block mb-1">{label}</label>

      <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye size={20} className="text-primary cursor-pointer" onClick={toggleShowPassword} />
            ) : (
              <FaRegEyeSlash size={20} className="text-slate-400 cursor-pointer" onClick={toggleShowPassword} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
