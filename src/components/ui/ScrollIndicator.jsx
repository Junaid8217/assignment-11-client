import { ChevronDown } from 'lucide-react';

const ScrollIndicator = ({ targetId, className = '' }) => {
  const scrollToTarget = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // Scroll to next section (viewport height)
      window.scrollBy({
        top: window.innerHeight * 0.7,
        behavior: 'smooth'
      });
    }
  };

  return (
    <button
      onClick={scrollToTarget}
      className={`group flex flex-col items-center gap-2 text-white/80 hover:text-white transition-all duration-300 ${className}`}
      aria-label="Scroll to next section"
    >
      <span className="text-sm font-medium">Scroll Down</span>
      <div className="flex flex-col items-center animate-bounce">
        <ChevronDown size={20} className="group-hover:scale-110 transition-transform" />
        <ChevronDown size={16} className="-mt-2 opacity-60 group-hover:opacity-80 transition-opacity" />
      </div>
    </button>
  );
};

export default ScrollIndicator;