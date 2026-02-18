import React, { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import moment from 'moment';

const SpendingTrends = ({ data }) => {
    const [chartData, setChartData] = useState([]);
    const [activeTab, setActiveTab] = useState("Monthly"); // Default tab

    useEffect(() => {
        if (!data) return;

        const endDate = moment();
        const startDate = moment().subtract(30, 'days'); // Always consider last 30 days of data
        const processedData = [];

        if (activeTab === "Weekly") {
            // Aggregate by Week (Last 4 weeks)
            for (let i = 0; i < 4; i++) {
                const weekStart = moment().subtract((3 - i) * 7 + 6, 'days');
                const weekEnd = moment().subtract((3 - i) * 7, 'days');

                let rangeTotal = 0;

                // Sum transactions falling in this week
                data.forEach(item => {
                    const itemDate = moment(item.date);
                    if (itemDate.isBetween(weekStart, weekEnd, 'day', '[]')) {
                        rangeTotal += Number(item.amount) || 0;
                    }
                });

                processedData.push({
                    day: `Week ${i + 1}`,
                    fullRange: `${weekStart.format('DD MMM')} - ${weekEnd.format('DD MMM')}`,
                    amount: rangeTotal
                });
            }
        } else {
            // Monthly view: Show Daily breakdown for last 30 days
            // Create a map of date -> total amount
            const expensesByDate = {};
            data.forEach(item => {
                const dateStr = moment(item.date).format('YYYY-MM-DD');
                expensesByDate[dateStr] = (expensesByDate[dateStr] || 0) + (Number(item.amount) || 0);
            });

            for (let m = moment(startDate); m.isSameOrBefore(endDate, 'day'); m.add(1, 'days')) {
                const dateStr = m.format('YYYY-MM-DD');
                processedData.push({
                    day: m.format('DD MMM'),
                    fullDate: dateStr,
                    amount: expensesByDate[dateStr] || 0,
                });
            }
        }

        setChartData(processedData);
    }, [data, activeTab]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-lg shadow-purple-500/10">
                    <p className="text-xs text-gray-500 mb-1">{payload[0].payload.fullRange || label}</p>
                    <p className="text-sm font-semibold text-gray-800">
                        ₹{payload[0].value.toLocaleString()}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200 mt-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <h5 className="text-lg font-semibold text-black">SpendingTrends</h5>
                    <p className="text-xs text-slate-400 mt-1">
                        {activeTab === "Weekly" ? "Weekly insights for the last 4 weeks" : "Daily insights for the last 30 days"}
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
