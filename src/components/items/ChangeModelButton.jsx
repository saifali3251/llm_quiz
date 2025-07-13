import { RotateCcw } from 'lucide-react';

const ChangeModelButton = () => {
  const handleChangeModel = () => {
    sessionStorage.clear();    
    window.location.href = '/';
  };

  return (
    <button
      onClick={handleChangeModel}
      className="group relative overflow-hidden px-3 py-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out w-fit"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <RotateCcw className="group-hover:rotate-180 transition-transform duration-500" size={14} />
            <div className="text-center">
              <div className="text-xs font-bold tracking-wide">Change LLM</div>
              <div className="text-xs opacity-80">{sessionStorage.getItem('selectedModel')}</div>
            </div>
          </div>
      </div>
      
      <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
    </button>
  );
};

export default ChangeModelButton;
