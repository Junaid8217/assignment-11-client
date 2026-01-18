import { useState, useEffect } from 'react';

const DonutChart = ({ data, title, className = '', size = 180 }) => {
  const [animatedData, setAnimatedData] = useState([]);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 ${className}`}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
        <div className="flex items-center justify-center h-48 text-gray-500 dark:text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = [
    '#dc2626', '#2563eb', '#16a34a', '#ca8a04', 
    '#9333ea', '#c2410c', '#0891b2', '#be123c'
  ];

  const radius = size / 2 - 10;
  const centerX = size / 2;
  const centerY = size / 2;
  const circumference = 2 * Math.PI * radius;

  const segments = animatedData.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const cumulativePercentage = animatedData.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.value / total) * 100, 0);
    const strokeDasharray = (percentage / 100) * circumference;
    const strokeDashoffset = -((cumulativePercentage / 100) * circumference);
    
    return {
      ...item,
      percentage: percentage.toFixed(1),
      color: colors[index % colors.length],
      strokeDasharray,
      strokeDashoffset,
      index
    };
  });

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">{title}</h3>
      
      <div className="flex flex-col items-center">
        {/* Donut Chart */}
        <div className="relative mb-6">
          <svg width={size} height={size} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="20"
              className="text-gray-200 dark:text-gray-600"
            />
            
            {/* Data segments */}
            {segments.map((segment, index) => (
              <circle
                key={index}
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke={segment.color}
                strokeWidth="20"
                strokeLinecap="round"
                strokeDasharray={`${segment.strokeDasharray} ${circumference}`}
                strokeDashoffset={segment.strokeDashoffset}
                className={`transition-all duration-1000 ease-out cursor-pointer ${
                  hoveredSegment === index ? 'opacity-80' : 'opacity-100'
                }`}
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
              />
            ))}
          </svg>
          
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {total}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total
            </div>
          </div>
          
          {/* Hover tooltip */}
          {hoveredSegment !== null && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap z-10">
              {segments[hoveredSegment].label}: {segments[hoveredSegment].value} ({segments[hoveredSegment].percentage}%)
            </div>
          )}
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-3 w-full">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={`flex items-center space-x-2 cursor-pointer transition-all p-2 rounded ${
                hoveredSegment === index ? 'bg-gray-50 dark:bg-gray-700 scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white wrap-break-word">
                  {segment.label}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {segment.value} ({segment.percentage}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;