import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const DistributionChart = ({ data, title, colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe'] }) => {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">Loading chart data...</div>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" tick={{ fill: '#ccc' }} />
            <YAxis tick={{ fill: '#ccc' }} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#333', border: 'none' }}
              formatter={(value) => [`${value}%`, 'Percentage']}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="value" 
              stackId="1"
              stroke={colors[0]} 
              fill={colors[0]} 
              name="Distribution (%)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DistributionChart;
