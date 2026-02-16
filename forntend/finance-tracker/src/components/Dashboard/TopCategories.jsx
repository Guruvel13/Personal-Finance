import React, { useMemo } from 'react';
import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu';

const TopCategories = ({ transactions }) => {
    const categories = useMemo(() => {
        if (!transactions) return [];

        const catMap = {};
        transactions.forEach(txn => {
            if (txn.type === 'expense' || !txn.type) { // Assume expense if not specified or specific type
                const cat = txn.category || "Uncategorized";
                catMap[cat] = (catMap[cat] || 0) + Number(txn.amount);
            }
        });

        return Object.entries(catMap)
            .map(([name, amount]) => ({ name, amount }))
            .sort((a, b) => b.amount - a.amount)
            .slice(0, 4);
    }, [transactions]);

    const COLORS = ["bg-purple-500", "bg-green-500", "bg-orange-500", "bg-red-500"];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100/50 mt-6 h-full flex flex-col justify-between">
            <div>
                <h5 className="text-lg font-bold text-gray-900 mb-6">Top Categories</h5>
                <div className="space-y-6">
                    {categories.length > 0 ? (
                        categories.map((cat, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`w-2.5 h-2.5 rounded-full ${COLORS[index % COLORS.length]}`}></div>
                                    <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">₹{cat.amount.toLocaleString()}</span>
                            </div>
                        ))
                    ) : (
                        <p className="text-sm text-gray-400 text-center py-4">No expense data available.</p>
                    )}
                </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-xl mt-8 flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                    <LuTrendingUp size={16} />
                </div>
                <div>
                    <p className="text-xs text-purple-900 font-medium">
                        You spent 15% less on Entertainment this month. Great job!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TopCategories;
