import React from "react";
import { addThousandSeparator } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

const BudgetBreakdown = ({ budgets = [], expenses = [] }) => {
    const navigate = useNavigate();

    const getSpentAmount = (category) => {
        return expenses
            .filter((exp) => exp.category === category)
            .reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 mt-6 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h5 className="text-lg font-bold text-gray-900">Budget Breakdown</h5>
                <button
                    onClick={() => navigate("/budget")}
                    className="flex items-center gap-1 text-xs font-bold text-white bg-primary px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors shadow-sm shadow-purple-200"
                >
                    <IoMdAdd size={14} /> Add Budget
                </button>
            </div>

            <div className="flex-1 overflow-auto">
                {/* Header Row */}
                <div className="grid grid-cols-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest pb-3 border-b border-gray-50 mb-3">
                    <div className="col-span-1 pl-2">Category</div>
                    <div className="text-right">Budgeted</div>
                    <div className="text-right">Spent</div>
                    <div className="text-right">Remaining</div>
                    <div className="text-right pr-2">Status</div>
                </div>

                {budgets.length > 0 ? (
                    budgets.slice(0, 5).map((budget) => {
                        const spent = getSpentAmount(budget.category);
                        const percentage = Math.min((spent / budget.amount) * 100, 100);
                        const remaining = Math.max(budget.amount - spent, 0);
                        const isOverBudget = spent > budget.amount;

                        return (
                            <div key={budget._id} className="py-4 border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors rounded-lg group">
                                <div className="grid grid-cols-5 items-center">
                                    <div className="col-span-1 pl-2 font-bold text-gray-800 text-xs truncate">
                                        {budget.category}
                                    </div>
                                    <div className="text-right text-xs font-semibold text-gray-600">
                                        ${addThousandSeparator(budget.amount)}
                                    </div>
                                    <div className="text-right text-xs font-semibold text-gray-600">
                                        ${addThousandSeparator(spent)}
                                    </div>
                                    <div className="text-right text-xs font-semibold text-gray-600">
                                        ${addThousandSeparator(remaining)}
                                    </div>
                                    <div className="text-right pr-2 flex justify-end">
                                        {/* Progress Bar */}
                                        <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${percentage < 50 ? "bg-green-500" :
                                                    percentage < 80 ? "bg-yellow-500" :
                                                        "bg-red-500"
                                                    }`}
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center py-12 text-gray-400 text-xs">
                        No active budgets.
                    </div>
                )}
            </div>
        </div>
    );
};

export default BudgetBreakdown;
