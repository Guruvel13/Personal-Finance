import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const SpendingTrends = ({ data }) => {
    const [chartData, setChartData] = useState([]);
    const [activeTab, setActiveTab] = useState("Monthly");

    useEffect(() => {
        // Generate data for the last 30 days with 0s for missing days
        const processedData = [];
        const endDate = moment();

        let daysToShow = 30;
        if (activeTab === "Weekly") {
            daysToShow = 7;
        }

        const startDate = moment().subtract(daysToShow, 'days');

        // Create a map of date -> total amount
        const expensesByDate = {};
        if (data && data.length > 0) {
            data.forEach(item => {
                const dateStr = moment(item.date).format('YYYY-MM-DD');
                // Ensure amount is treated as a number
                const amount = Number(item.amount) || 0;
                expensesByDate[dateStr] = (expensesByDate[dateStr] || 0) + amount;
            });
        }

        // Iterate including today
        for (let m = moment(startDate); m.isSameOrBefore(endDate, 'day'); m.add(1, 'days')) {
            const dateStr = m.format('YYYY-MM-DD');
            processedData.push({
                day: m.format('DD MMM'), // Display format
                fullDate: dateStr,
                amount: expensesByDate[dateStr] || 0,
            });
        }

        setChartData(processedData);
    }, [data, activeTab]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-lg shadow-purple-500/10">
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-gray-800">
                        ₹{payload[0].value.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50 mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h5 className="text-lg font-semibold text-black">Spending Trends</h5>
                    <p className="text-xs text-slate-400 mt-1">
                        {activeTab === "Weekly" ? "Daily insights for the last 7 days" : "Daily insights for the last 30 days"}
                    </p>
                </div>
                <div className="flex gap-2 bg-gray-50 p-1 rounded-full w-fit">
                    {["Monthly", "Weekly"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${activeTab === tab
                                ? "text-white bg-primary shadow-sm"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            <div className="w-full h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#875cf5" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="#875cf5" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#875cf5', strokeWidth: 1, strokeDasharray: '4 4' }} />
                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#875cf5"
                            strokeWidth={3}
                            fill="url(#colorIncome)"
                            activeDot={{ r: 6, strokeWidth: 3, stroke: '#fff', fill: '#875cf5' }}
                            animationDuration={1500}
                        />
                        <XAxis
                            dataKey="day"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#9ca3af', fontWeight: 500 }}
                            interval={activeTab === "Weekly" ? 0 : "preserveStartEnd"}
                            minTickGap={30}
                            padding={{ left: 10, right: 10 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default SpendingTrends;
