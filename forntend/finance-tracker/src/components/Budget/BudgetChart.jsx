import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell, YAxis, CartesianGrid, Legend } from 'recharts';

const BudgetChart = ({ budgets, expenses }) => {
    // Transform data
    const data = budgets.map(b => {
        const spent = expenses
            .filter(e => e.category === b.category)
            .reduce((acc, curr) => acc + parseInt(curr.amount || 0), 0);
        return {
            name: b.category,
            Budget: b.amount,
            Spent: spent,
        };
    });

    return (
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm h-full flex flex-col">
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900">Budget vs Spending</h3>
            </div>
            <div className="h-[420px] w-full mt-auto relative">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barGap={4} margin={{ top: 10, right: 30, left: -20, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F8FAFC" />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
                            dy={20}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#CBD5E1', fontSize: 11 }}
                        />
                        <Tooltip
                            cursor={{ fill: '#F1F5F9', opacity: 0.5 }}
                            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                            itemStyle={{ fontWeight: 600, fontSize: '13px' }}
                            labelStyle={{ marginBottom: '8px', fontWeight: 700, color: '#1E293B' }}
                        />
                        <Legend 
                            verticalAlign="top" 
                            align="right" 
                            iconType="circle"
                            iconSize={10}
                            wrapperStyle={{ top: -45, right: 0, fontSize: '13px', fontWeight: 700 }}
                            formatter={(value) => (
                                <span style={{ color: value === "Budgeted" ? "#94A3B8" : "#6366F1", marginRight: '8px' }}>
                                    {value}
                                </span>
                            )}
                        />
                        <Bar 
                            name="Budgeted"
                            dataKey="Budget" 
                            fill="#F1F5F9" 
                            radius={[6, 6, 0, 0]} 
                            barSize={32} 
                        />
                        <Bar 
                            name="Spent"
                            dataKey="Spent" 
                            radius={[6, 6, 0, 0]} 
                            barSize={32}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.Spent > entry.Budget ? '#EF4444' : '#6366F1'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default BudgetChart;
