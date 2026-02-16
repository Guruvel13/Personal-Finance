import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100/50 mt-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-bold text-gray-900">Recent Transactions</h5>
        <button
          className="text-sm font-medium text-primary hover:text-purple-700 transition-colors flex items-center gap-1"
          onClick={onSeeMore}
        >
          View All <LuArrowRight />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <th className="pb-3 pl-4">Category</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right pr-4">Amount</th>
            </tr>
          </thead>
          <tbody className="">
            {transactions?.length > 0 ? (
              transactions.slice(0, 5).map((item) => (
                <tr key={item._id} className="group hover:bg-gray-50/60 transition-colors border-b border-gray-50 last:border-none">
                  <td className="py-4 pl-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl shrink-0">
                        {item.icon ? (
                          (typeof item.icon === "string" && (item.icon.startsWith("http") || item.icon.startsWith("/") || item.icon.startsWith("data:"))) ? (
                            <img src={item.icon} alt="" className="w-6 h-6 object-cover" />
                          ) : (
                            <span>{item.icon}</span>
                          )
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {item.type === "expense" ? item.category : item.source}
                        </p>
                        {/* Subtitle logic */}
                        <p className="text-xs text-gray-500 font-medium mt-0.5">
                          {item.description || (item.type === "expense" ? "Expense" : "Income")}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 text-sm font-medium text-gray-500">
                    {moment(item.date).format("MMM DD, YYYY")}
                  </td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide 
                        ${item.date && moment(item.date).isAfter(moment()) ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'}`}>
                      {item.date && moment(item.date).isAfter(moment()) ? 'Pending' : 'Completed'}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-4">
                    <span className={`text-sm font-bold ${item.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                      {item.type === 'income' ? '+' : '-'}₹{Number(item.amount).toLocaleString()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-400 text-sm">
                  No recent transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
