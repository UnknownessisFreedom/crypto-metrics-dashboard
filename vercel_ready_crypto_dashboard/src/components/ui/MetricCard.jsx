import React from 'react';

const MetricCard = ({ title, value, change, description, isLoading }) => {
  // Determine if change is positive, negative, or neutral
  const getChangeColor = () => {
    if (!change) return 'text-gray-400';
    return parseFloat(change) >= 0 ? 'text-green-500' : 'text-red-500';
  };

  // Format the change value with a + or - sign
  const formatChange = () => {
    if (!change) return '0%';
    const prefix = parseFloat(change) >= 0 ? '+' : '';
    return `${prefix}${change}%`;
  };

  if (isLoading) {
    return (
      <div className="bg-gray-800 rounded-lg p-4 shadow-md animate-pulse">
        <div className="h-4 bg-gray-700 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/4"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-baseline">
        <p className="text-white text-2xl font-bold">{value}</p>
        {change !== undefined && (
          <span className={`ml-2 text-sm font-medium ${getChangeColor()}`}>
            {formatChange()}
          </span>
        )}
      </div>
      {description && (
        <p className="text-gray-400 text-xs mt-1">{description}</p>
      )}
    </div>
  );
};

export default MetricCard;
