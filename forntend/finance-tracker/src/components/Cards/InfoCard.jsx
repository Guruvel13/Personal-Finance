import React from "react";

const InfoCard = ({ icon, label, value, color, percentage }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-none hover:shadow-md transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-12 h-12 flex items-center justify-center text-[22px] ${color} bg-opacity-10 rounded-xl`}
        >
          {/* Clone element to add color class if it accepts className, otherwise wrap */}
          {React.cloneElement(icon, { className: 'text-current' })}
        </div>
        {percentage && (
          <div className={`px-2 py-1 rounded-md text-xs font-medium ${percentage > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {percentage > 0 ? "+" : ""}{percentage}%
          </div>
        )}
      </div>
      <div>
        <h6 className="text-gray-500 text-sm font-medium mb-1">{label}</h6>
        <span className="text-2xl font-bold text-gray-900">₹{value}</span>
      </div>
    </div>
  );
};

export default InfoCard;
