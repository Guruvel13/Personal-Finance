import React from "react";
import { addThousandSeparator } from "../../utils/helper";

const BudgetList = ({ budgets, expenses }) => {
    // Helper to get spent amount for a category
    const getSpentAmount = (category) => {
        return expenses
            .filter((exp) => exp.category === category)
            .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
    };

    const getProgressColor = (percentage) => {
        if (percentage >= 100) return "bg-red-500";
        if (percentage >= 80) return "bg-orange-500";
        return "bg-primary";
    };

    const getBackgroundColor = (percentage) => {
        if (percentage >= 100) return "bg-red-50";
        if (percentage >= 80) return "bg-orange-50";
        return "bg-purple-50";
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {budgets.map((budget) => {
                const spent = getSpentAmount(budget.category);
                const percentage = Math.min((spent / budget.amount) * 100, 100);
                const remaining = Math.max(budget.amount - spent, 0);
                const isOverBudget = spent > budget.amount;

                return (
                    <div key={budget._id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-colors ${getBackgroundColor(percentage)}`}>
                                    {budget.icon || "💰"}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary transition-colors">{budget.category}</h3>
                                    <p className="text-xs text-gray-400 font-medium">Monthly Budget</p>
                                </div>
                            </div>
                            <button className="text-gray-300 hover:text-gray-600 transition-colors text-xl">
                                ⋮
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-baseline">
                                <div className="text-sm font-semibold text-gray-900">
                                    ₹{addThousandSeparator(spent)}
                                    <span className="text-gray-400 font-normal ml-1">/ ₹{addThousandSeparator(budget.amount)}</span>
                                </div>
                                <span className={`text-sm font-bold ${percentage >= 100 ? "text-red-500" : "text-primary transition-colors"}`}>
                                    {percentage.toFixed(0)}%
                                </span>
                            </div>

                            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ease-out ${getProgressColor(percentage)}`}
                                    style={{ width: `${percentage}%` }}
                                ></div>
                            </div>

                            <div className="flex justify-between items-center pt-2">
                                <div className={`px-3 py-1.5 rounded-lg text-xs font-bold ${isOverBudget
                                    ? "bg-red-50 text-red-600"
                                    : "bg-green-50 text-green-600"
                                    }`}>
                                    {isOverBudget ? "Over Limit" : `₹${addThousandSeparator(remaining)} remaining`}
                                </div>
                                <span className={`text-xs font-semibold ${isOverBudget ? "text-red-500" : "text-gray-400"}`}>
                                    {isOverBudget ? "Action Needed" : "On Track"}
                                </span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default BudgetList;
