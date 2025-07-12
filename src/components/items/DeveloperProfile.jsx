import { useState } from 'react';
import { Coffee, User, Heart, Github, Linkedin, Twitter, X,Code2,TerminalSquare,LampDesk } from 'lucide-react';

const UtilityButtons = () => {
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);

  const handleBuyMeCoffee = () => {
    window.open('https://buymeacoffee.com/saifali309z', '_blank');
  };

  const handleShowDeveloper = () => {
    setShowDeveloperModal(true);
  };

  const closeDeveloperModal = () => {
    setShowDeveloperModal(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Simple Developer Icon Button */}
        <button
          onClick={handleShowDeveloper}
          className="group relative overflow-hidden p-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out w-fit"
          title="Meet the Developer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative">
            <User className="group-hover:animate-pulse" size={16} />
          </div>
          
          <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
        </button>

        {/* Buy Me a Coffee Button */}
        {/* <button
          onClick={handleBuyMeCoffee}
          className="group relative overflow-hidden px-4 py-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-out w-fit"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative flex items-center gap-2">
            <Coffee className="group-hover:animate-bounce" size={16} />
            <span className="text-xs font-bold tracking-wide">Buy Coffee</span>
          </div>
          
          <div className="absolute inset-0 rounded-lg bg-white/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300"></div>
        </button> */}
      </div>

      {/* Developer Modal */}
      {showDeveloperModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl transform animate-in fade-in-0 zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Meet the Developer</h2>
              <button
                onClick={closeDeveloperModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User size={40} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Saif Ali</h3>
              <p className="text-gray-600 mb-4">Full Stack Developer & AI Enthusiast</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                Passionate about creating intelligent applications that make life easier. 
                This quiz app combines AI recommendations with user preferences to deliver 
                personalized entertainment suggestions.
              </p>
            </div>

            <div className="flex justify-center gap-4 mb-6">
              <a
                href="https://github.com/saifali3251"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-900 text-white rounded-full transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/saif-ali-532388169/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://leetcode.com/u/ali3251/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-colors"
              >
                <TerminalSquare size={20} />
              </a>
            </div>

            <div className="text-center">
              <button
                onClick={handleBuyMeCoffee}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Heart size={16} className="text-red-200" />
                <span>Support My Work</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UtilityButtons;
