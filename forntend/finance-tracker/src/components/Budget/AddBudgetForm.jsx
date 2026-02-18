import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";

const AddBudgetForm = ({ onAddBudget, onClose }) => {
    const [formData, setFormData] = useState({
        category: "",
        amount: "",
        startDate: "",
        notify: false,
        icon: ""
    });

    const categories = [
        { name: "Food", icon: "🍕", value: "Food" },
        { name: "Transport", icon: "🚗", value: "Transport" },
        { name: "Rent", icon: "🏠", value: "Rent" },
        { name: "Entertainment", icon: "🎬", value: "Entertainment" },
        { name: "Shopping", icon: "🛍️", value: "Shopping" },
        { name: "Health", icon: "🏥", value: "Health" },
        { name: "Bills", icon: "🧾", value: "Bills" },
        { name: "Education", icon: "🎓", value: "Education" },
        { name: "Investment", icon: "📈", value: "Investment" },
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleCategorySelect = (cat) => {
        setFormData({ ...formData, category: cat.value, icon: cat.icon });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.category || !formData.amount || !formData.startDate) return;
        onAddBudget(formData);
    };

    return (
        <div className="p-2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">Select Category</label>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {categories.map((cat) => (
                            <button
                                key={cat.name}
                                type="button"
                                onClick={() => handleCategorySelect(cat)}
                                className={`flex flex-col items-center justify-center min-w-[100px] h-32 rounded-3xl border transition-all duration-200 ${formData.category === cat.value
                                    ? "border-primary bg-primary/5 text-primary scale-100 ring-1 ring-primary"
                                    : "border-gray-200 bg-white text-gray-500 hover:border-purple-200 hover:shadow-sm"
                                    }`}
                            >
                                <div className="text-3xl mb-3 drop-shadow-sm">{cat.icon}</div>
                                <span className="text-[11px] font-bold tracking-wider uppercase">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Amount & Date */}
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Amount</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg group-focus-within:text-primary transition-colors">$</span>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-300 text-gray-700 font-medium"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-gray-700 font-medium"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Smart Alerts */}
                <div className="flex items-center justify-between bg-purple-50/50 p-4 rounded-2xl border border-purple-100/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-xl text-primary shadow-sm">
                            🔔
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-gray-900">Smart Alerts</h4>
                            <p className="text-xs text-gray-500 mt-0.5">Notify me at 80% usage</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            name="notify"
                            checked={formData.notify}
                            onChange={handleChange}
                            className="sr-only peer"
                        />
                        <div className="w-12 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                    </label>
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/30 hover:bg-purple-700 hover:shadow-purple-700/40 transition-all active:scale-[0.98] mt-2"
                >
                    Create Budget
                </button>
            </form>
        </div>
    );
};

export default AddBudgetForm;
