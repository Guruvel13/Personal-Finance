import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);
    }, [transactions]);

    return (
        <div className="card p-5 shadow-lg rounded-xl">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h5 className="text-xl font-semibold">Income Overview</h5>
                    <p className="text-xs text-gray-400">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                <button
                    className="add-btn"
                    onClick={onAddIncome}
                >
                    <LuPlus className="text-lg" />
                    Add Income
                </button>
            </div>
            <div className="mt-6">
                <CustomBarChart data={chartData} />
            </div>
        </div>
    );
};

export default IncomeOverview;
