import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuArrowDown, LuArrowUp, LuCalendar, LuTag, LuWallet, LuImagePlus } from "react-icons/lu";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup";

const AddTransactionForm = ({ onAddIncome, onAddExpense, onClose, initialType = "expense" }) => {
    const [type, setType] = useState(initialType); // 'income' or 'expense'
    const [formData, setFormData] = useState({
        amount: "",
        title: "", // Description
        category: "", // Source (for income) or Category (for expense)
        date: new Date().toISOString().split("T")[0],
        icon: "",
    });
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                const path = type === 'expense' ? API_PATHS.EXPENSE.GET_CATEGORIES : API_PATHS.INCOME.GET_SOURCES;
                const response = await axiosInstance.get(path);
                setSuggestions(response.data);
            } catch (error) {
                console.error("Failed to fetch suggestions", error);
            }
        };
        fetchSuggestions();
    }, [type]);

    const handleChange = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const predictCategory = (title) => {
        if (!title) return null;
        const text = title.toLowerCase();

        if (type === "expense") {
            // Food & Drink
            if (text.match(/coffee|cafe|starbucks|tea/)) return { category: "Food & Drink", icon: "☕" };
            if (text.match(/pizza/)) return { category: "Food & Drink", icon: "🍕" };
            if (text.match(/burger|mcd/)) return { category: "Food & Drink", icon: "🍔" };
            if (text.match(/restaurant|dining|lunch|dinner|breakfast|food|swiggy|zomato/)) return { category: "Food & Drink", icon: "🍽️" };

            // Transportation
            if (text.match(/uber|ola|taxi|cab/)) return { category: "Transportation", icon: "🚕" };
            if (text.match(/bus/)) return { category: "Transportation", icon: "🚌" };
            if (text.match(/metro|train/)) return { category: "Transportation", icon: "🚇" };
            if (text.match(/flight|air/)) return { category: "Transportation", icon: "✈️" };
            if (text.match(/fuel|petrol|diesel/)) return { category: "Transportation", icon: "⛽" };

            // Shopping
            if (text.match(/amazon|flipkart|delivery/)) return { category: "Shopping", icon: "📦" };
            if (text.match(/clothes|shirt|jeans|shoes/)) return { category: "Shopping", icon: "👔" };
            if (text.match(/mall|store|shop|purchase/)) return { category: "Shopping", icon: "🛍️" };

            // Bills & Utilities
            if (text.match(/electricity|power/)) return { category: "Bills", icon: "⚡" };
            if (text.match(/net|wifi|broadband/)) return { category: "Bills", icon: "🌐" };
            if (text.match(/rent/)) return { category: "Bills", icon: "🏠" };
            if (text.match(/recharge|mobile|bill|subscription/)) return { category: "Bills", icon: "🧾" };

            // Entertainment
            if (text.match(/movie|cinema|film|netflix|prime/)) return { category: "Entertainment", icon: "🎬" };
            if (text.match(/spotify|music/)) return { category: "Entertainment", icon: "🎵" };
            if (text.match(/game|entertainment/)) return { category: "Entertainment", icon: "🎮" };

            // Health
            if (text.match(/doctor|med|pharmacy|health|hospital/)) return { category: "Health", icon: "🏥" };
            if (text.match(/gym|fitness/)) return { category: "Health", icon: "💪" };

            // Groceries (kept generic catch-all for grocery/market if not matched above)
            if (text.match(/grocery|market/)) return { category: "Groceries", icon: "🛒" };

        } else {
            // Income
            if (text.match(/salary|wage|paycheck|bonus|commission/)) return { category: "Salary", icon: "💰" };
            if (text.match(/freelance|contract|gig|upwork|fiverr/)) return { category: "Freelance", icon: "👨‍💻" };
            if (text.match(/dividend|interest|stock|crypto|investment|trade/)) return { category: "Investment", icon: "📈" };
            if (text.match(/business|revenue|sales|profit|shop/)) return { category: "Business", icon: "💼" };
            if (text.match(/gift|donation|received/)) return { category: "Gift", icon: "🎁" };
            if (text.match(/refund|cashback|reimbursement/)) return { category: "Refund", icon: "💸" };
            if (text.match(/rent|property|tenant/)) return { category: "Rental Income", icon: "🏠" };
        }
        return null;
    };

    const handleTitleChange = (e) => {
        const title = e.target.value;
        handleChange("title", title);

        const prediction = predictCategory(title);
        if (prediction) {
            handleChange("category", prediction.category);
            handleChange("icon", prediction.icon);
        }
    };

    const handleSubmit = () => {
        if (!formData.amount || !formData.title || !formData.date || !formData.category) {
            alert("Please fill in all required fields.");
            return;
        }

        const transactionData = {
            amount: formData.amount,
            date: formData.date,
            icon: formData.icon || (type === 'income' ? '💰' : '💸'), // Default icons
            description: formData.title, // Title maps to description
            // Map category/source based on type
            ...(type === 'expense' ? { category: formData.category } : { source: formData.category })
        };

        if (type === 'expense') {
            onAddExpense(transactionData);
        } else {
            onAddIncome(transactionData);
        }
        onClose?.();
    };

    return (
        <div className="flex flex-col gap-5">

            {/* Type Toggle */}
            {/* Type Toggle */}
            <div className="flex relative bg-gray-100 p-1.5 rounded-full mb-2 isolate">
                <div
                    className={`absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-in-out z-0 ${type === 'expense' ? 'translate-x-[calc(100%+6px)]' : 'translate-x-0'
                        }`}
                />
                <button
                    onClick={() => setType("income")}
                    className={`flex-1 relative z-10 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${type === "income"
                        ? "text-green-600"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <LuArrowDown size={18} className={type === "income" ? "text-green-600" : ""} /> Income
                </button>
                <button
                    onClick={() => setType("expense")}
                    className={`flex-1 relative z-10 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 ${type === "expense"
                        ? "text-red-500"
                        : "text-gray-500 hover:text-gray-700"
                        }`}
                >
                    <LuArrowUp size={18} className={type === "expense" ? "text-red-500" : ""} /> Expense
                </button>
            </div>

            {/* Amount Input */}
            <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Amount</label>
                <div className="relative flex items-center bg-gray-100/80 rounded-3xl px-6 py-4 transition-colors group focus-within:bg-white focus-within:ring-2 focus-within:ring-offset-1 focus-within:ring-gray-100">
                    <span className={`text-2xl font-bold mr-2 transition-colors ${type === 'income' ? 'text-green-500' : 'text-red-500'}`}>$</span>
                    <input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => handleChange("amount", e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent text-3xl font-bold text-gray-700 outline-none placeholder-gray-300"
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Description</label>
                <div className="flex items-center bg-gray-100/80 rounded-2xl px-5 py-3.5 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-gray-100">
                    <LuWallet className="text-gray-400 mr-3 text-lg" />
                    <input
                        type="text"
                        value={formData.title}
                        onChange={handleTitleChange}
                        placeholder={type === 'expense' ? 'What was this for?' : 'e.g. January Salary'}
                        className="w-full bg-transparent outline-none text-gray-600 font-medium placeholder-gray-400 text-sm"
                    />
                </div>
            </div>

            {/* Date & Category Row */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Date</label>
                    <div className="flex items-center bg-gray-100/80 rounded-2xl px-4 py-3.5 transition-colors focus-within:bg-white focus-within:ring-2 focus-within:ring-gray-100">
                        <LuCalendar className="text-gray-400 mr-2 text-lg" />
                        <input
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleChange("date", e.target.value)}
                            className="w-full bg-transparent outline-none text-gray-600 font-medium text-sm"
                        />
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">
                        {type === 'expense' ? 'Category' : 'Source'}
                    </label>
                    <div className="flex items-center bg-gray-100/80 rounded-2xl px-3 py-2 transition-colors h-[48px] focus-within:bg-white focus-within:ring-2 focus-within:ring-gray-100">
                        {/* Emoji Picker integrated visually */}
                        <div className="shrink-0 mr-1">
                            <EmojiPickerPopup
                                icon={formData.icon}
                                onSelect={(icon) => handleChange("icon", icon)}
                            />
                        </div>

                        <input
                            type="text"
                            value={formData.category}
                            onChange={(e) => handleChange("category", e.target.value)}
                            placeholder={type === 'expense' ? 'Food & Dining' : 'Salary, Freelance, etc.'}
                            className="w-full bg-transparent outline-none text-gray-600 font-medium placeholder-gray-400 text-sm min-w-0"
                            list="category-suggestions"
                        />
                        <datalist id="category-suggestions">
                            {suggestions.map((s, index) => (
                                <option key={index} value={s} />
                            ))}
                        </datalist>
                        <LuTag className="text-gray-400 ml-2 text-lg shrink-0" />
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex flex-col gap-3">
                <button
                    onClick={handleSubmit}
                    className={`w-full text-white font-bold py-3.5 rounded-full shadow-lg transition-all active:scale-[0.98] ${type === 'income'
                        ? 'bg-green-600 hover:bg-green-700 shadow-green-500/30'
                        : 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
                        }`}
                >
                    {type === 'expense' ? 'Add Expense' : 'Add Income'}
                </button>
                <button
                    onClick={onClose}
                    className="w-full bg-gray-100 text-gray-700 font-bold py-3.5 rounded-full hover:bg-gray-200 transition-all active:scale-[0.98]"
                >
                    Cancel
                </button>
            </div>

        </div>
    );
};

export default AddTransactionForm;
