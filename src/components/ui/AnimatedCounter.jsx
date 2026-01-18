import { useState, useEffect, useRef, useCallback } from 'react';

const AnimatedCounter = ({ 
  end, 
  start = 0, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  separator = ',',
  className = '',
  triggerOnView = true 
}) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  // Format number with separator
  const formatNumber = (num) => {
    const numStr = Math.floor(num).toString();
    if (!separator) return numStr;
    
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
  };

  // Animation function
  const animateCounter = useCallback(() => {
    if (hasAnimated) return;
    
    setHasAnimated(true);
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;
    const totalChange = endValue - startValue;

    const updateCounter = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (totalChange * easeOut);

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(updateCounter);
  }, [hasAnimated, start, end, duration]);

  // Intersection Observer for trigger on view
  useEffect(() => {
    if (!triggerOnView) {
      const timeoutId = setTimeout(() => animateCounter(), 0);
      return () => clearTimeout(timeoutId);
    }

    const currentRef = counterRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateCounter();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasAnimated, triggerOnView, animateCounter]);

  return (
    <span ref={counterRef} className={className}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
};

export default AnimatedCounter;