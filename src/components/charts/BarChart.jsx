import { useState, useEffect } from 'react';

const BarChart = ({ data, title, className = '', height = 300 }) => {
  const [animatedData, setAnimatedData] = useState([]);

  useEffect(() => {
    // Animate bars on mount
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

  const maxValue = Math.max(...data.map(item => item.value));
  const colors = [
    'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
    'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">{title}</h3>
      
      <div className="relative" style={{ height: `${height}px` }}>
        <div className="flex items-end justify-between h-full space-x-2">
          {animatedData.map((item, index) => {
            const barHeight = (item.value / maxValue) * (height - 60);
            return (
              <div key={index} className="flex flex-col items-center flex-1 max-w-20">
                <div className="relative group">
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.label}: {item.value}
                  </div>
                  
                  {/* Bar */}
                  <div
                    className={`${colors[index % colors.length]} rounded-t transition-all duration-1000 ease-out hover:opacity-80 cursor-pointer w-full min-w-8`}
                    style={{ 
                      height: `${barHeight}px`,
                      minHeight: '4px'
                    }}
                  />
                </div>
                
                {/* Label */}
                <div className="text-center wrap-break-word">
                  {item.label}
                </div>
                
                {/* Value */}
                <div className="text-xs font-semibold text-gray-900 dark:text-white">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 -ml-8">
          <span>{maxValue}</span>
          <span>{Math.round(maxValue * 0.75)}</span>
          <span>{Math.round(maxValue * 0.5)}</span>
          <span>{Math.round(maxValue * 0.25)}</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default BarChart;