import { useState, useEffect, useCallback } from 'react';

const LineChart = ({ data, title, className = '', height = 300 }) => {
  const [animatedPath, setAnimatedPath] = useState('');
  const [showPoints, setShowPoints] = useState(false);

  const generatePath = useCallback((points) => {
    if (points.length === 0) return '';

    const maxValue = Math.max(...points.map(p => p.value));
    const minValue = Math.min(...points.map(p => p.value));
    const range = maxValue - minValue || 1;
    
    const width = 400;
    const chartHeight = height - 80;
    
    const pathData = points.map((point, index) => {
      const x = (index / (points.length - 1)) * width;
      const y = chartHeight - ((point.value - minValue) / range) * chartHeight;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');

    return pathData;
  }, [height]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    // Animate line drawing
    const timer1 = setTimeout(() => {
      setAnimatedPath(generatePath(data));
    }, 100);

    const timer2 = setTimeout(() => {
      setShowPoints(true);
    }, 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [data, generatePath]);

  const getPoints = (points) => {
    if (points.length === 0) return [];

    const maxValue = Math.max(...points.map(p => p.value));
    const minValue = Math.min(...points.map(p => p.value));
    const range = maxValue - minValue || 1;
    
    const width = 400;
    const chartHeight = height - 80;
    
    return points.map((point, index) => ({
      x: (index / (points.length - 1)) * width,
      y: chartHeight - ((point.value - minValue) / range) * chartHeight,
      value: point.value,
      label: point.label
    }));
  };

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

  const points = getPoints(data);
  const maxValue = Math.max(...data.map(p => p.value));
  const minValue = Math.min(...data.map(p => p.value));

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg ${className}`}>
      <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">{title}</h3>
      
      <div className="relative">
        <svg width="100%" height={height} viewBox={`0 0 400 ${height}`} className="overflow-visible">
          {/* Grid lines */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-gray-200 dark:text-gray-600" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="400" height={height - 40} fill="url(#grid)" />
          
          {/* Line */}
          <path
            d={animatedPath}
            fill="none"
            stroke="#dc2626"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-1000 ease-out"
            style={{
              strokeDasharray: animatedPath ? '1000' : '0',
              strokeDashoffset: animatedPath ? '0' : '1000',
              animation: animatedPath ? 'drawLine 1s ease-out' : 'none'
            }}
          />
          
          {/* Data points */}
          {showPoints && points.map((point, index) => (
            <g key={index}>
              <circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#dc2626"
                stroke="white"
                strokeWidth="2"
                className="hover:r-8 transition-all cursor-pointer animate-pulse"
                style={{ animationDelay: `${index * 100}ms` }}
              />
              
              {/* Tooltip on hover */}
              <g className="opacity-0 hover:opacity-100 transition-opacity">
                <rect
                  x={point.x - 25}
                  y={point.y - 35}
                  width="50"
                  height="25"
                  fill="rgba(0,0,0,0.8)"
                  rx="4"
                />
                <text
                  x={point.x}
                  y={point.y - 20}
                  textAnchor="middle"
                  fill="white"
                  fontSize="12"
                  fontWeight="bold"
                >
                  {point.value}
                </text>
              </g>
            </g>
          ))}
          
          {/* X-axis labels */}
          {data.map((item, index) => {
            const point = points[index];
            return (
              <text
                key={index}
                x={point.x}
                y={height - 10}
                textAnchor="middle"
                fontSize="12"
                fill="currentColor"
                className="text-gray-600 dark:text-gray-400"
              >
                {item.label}
              </text>
            );
          })}
          
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
            const value = Math.round(minValue + (maxValue - minValue) * ratio);
            const y = (height - 80) - (ratio * (height - 80));
            return (
              <text
                key={index}
                x="-10"
                y={y + 5}
                textAnchor="end"
                fontSize="12"
                fill="currentColor"
                className="text-gray-600 dark:text-gray-400"
              >
                {value}
              </text>
            );
          })}
        </svg>
      </div>
      
      <style jsx>{`
        @keyframes drawLine {
          from {
            stroke-dashoffset: 1000;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default LineChart;