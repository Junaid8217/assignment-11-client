import { useState, useEffect } from 'react';

const PieChart = ({ data, title, className = '', size = 200 }) => {
  const [animatedData, setAnimatedData] = useState([]);
  const [hoveredSegment, setHoveredSegment] = useState(null);

  useEffect(() => {
    // Animate pie chart segments
    const timer = setTimeout(() => {
      setAnimatedData(data);
    }, 100);
    return () => clearTimeout(timer);
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 ${className}`}>
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">{title}</h3>
        <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
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

  const segments = animatedData.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const cumulativePercentage = animatedData.slice(0, index).reduce((sum, prevItem) => sum + (prevItem.value / total) * 100, 0);
    const startAngle = (cumulativePercentage / 100) * 360;
    const endAngle = ((cumulativePercentage + percentage) / 100) * 360;
    
    const largeArcFlag = percentage > 50 ? 1 : 0;
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const radius = size / 2 - 20;
    const centerX = size / 2;
    const centerY = size / 2;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    const pathData = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
    
    return {
      ...item,
      pathData,
      percentage: percentage.toFixed(1),
      color: colors[index % colors.length],
      startAngle,
      endAngle,
      index
    };
  });

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">{title}</h3>
      
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Pie Chart */}
        <div className="relative">
          <svg width={size} height={size} className="transform -rotate-90">
            {segments.map((segment, index) => (
              <path
                key={index}
                d={segment.pathData}
                fill={segment.color}
                stroke="white"
                strokeWidth="2"
                className={`transition-all duration-300 cursor-pointer ${
                  hoveredSegment === index ? 'opacity-80 scale-105' : 'opacity-100'
                }`}
                onMouseEnter={() => setHoveredSegment(index)}
                onMouseLeave={() => setHoveredSegment(null)}
                style={{
                  transformOrigin: `${size/2}px ${size/2}px`,
                  animation: `fadeInSegment 0.8s ease-out ${index * 0.1}s both`
                }}
              />
            ))}
            
            {/* Center circle for donut effect */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={size / 6}
              fill="white"
              className="dark:fill-gray-800"
            />
            
            {/* Total in center */}
            <text
              x={size / 2}
              y={size / 2 - 5}
              textAnchor="middle"
              className="text-lg font-bold fill-gray-900 dark:fill-white transform rotate-90"
              style={{ transformOrigin: `${size/2}px ${size/2}px` }}
            >
              {total}
            </text>
            <text
              x={size / 2}
              y={size / 2 + 15}
              textAnchor="middle"
              className="text-xs fill-gray-500 dark:fill-gray-400 transform rotate-90"
              style={{ transformOrigin: `${size/2}px ${size/2}px` }}
            >
              Total
            </text>
          </svg>
          
          {/* Hover tooltip */}
          {hoveredSegment !== null && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
              <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium">
                {segments[hoveredSegment].label}: {segments[hoveredSegment].value} ({segments[hoveredSegment].percentage}%)
              </div>
            </div>
          )}
        </div>
        
        {/* Legend */}
        <div className="flex flex-col space-y-3">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 cursor-pointer transition-all ${
                hoveredSegment === index ? 'scale-105' : ''
              }`}
              onMouseEnter={() => setHoveredSegment(index)}
              onMouseLeave={() => setHoveredSegment(null)}
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
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
      
      <style jsx>{`
        @keyframes fadeInSegment {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default PieChart;