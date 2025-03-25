import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

const PriceChart = ({ data, title, color = '#8884d8' }) => {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">Loading chart data...</div>;
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <h3 className="text-lg font-medium text-white mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis 
              dataKey="date" 
              tick={{ fill: '#ccc' }}
              tickFormatter={(value) => {
                const date = new Date(value);
                return `${date.getDate()}/${date.getMonth() + 1}`;
              }}
            />
            <YAxis 
              tick={{ fill: '#ccc' }}
              tickFormatter={(value) => {
                return `$${value.toLocaleString()}`;
              }}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#333', border: 'none' }}
              formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
              labelFormatter={(label) => new Date(label).toLocaleDateString()}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={color} 
              activeDot={{ r: 8 }} 
              name="Price (USD)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
