import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import CustomTooltip from "../Charts/CustomTooltip";
import CustomLegend from "../Charts/CustomLegend";

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  return (
    <div style={{ position: "relative", width: "100%", height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      {showTextAnchor && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            pointerEvents: "none", // so clicks pass through
            userSelect: "none",
          }}
        >
          <div
            style={{
              fontSize: 14,
              color: "#666",
              marginBottom: 4,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#333",
            }}
          >
            {totalAmount}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomPieChart;
