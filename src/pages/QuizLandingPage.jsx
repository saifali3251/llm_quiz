import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, Loader2, Eye, EyeOff, Brain, Zap, Key, ChevronDown, AlertCircle, Server, ExternalLink } from 'lucide-react';
import { models } from '../lib/utils';
// import { API_BASE_URL } from '../config';
import { validateApiKey } from '../utils/api';

const QuizLandingPage = () => {
  const [selectedModel, setSelectedModel] = useState('gemini');
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationState, setValidationState] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPrerequisites, setShowPrerequisites] = useState(false);

  const selectedModelData = models.find(m => m.id === selectedModel);

  // Debounced validation
  const debounceValidation = useCallback(
    debounce((key, model) => {
      if (key.length > 10) {
        validateApiKeyHandler(key, model);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    // Load saved data if exists
    const savedModel = sessionStorage.getItem('selectedModel');
    const savedKey = sessionStorage.getItem(`${selectedModel}ApiKey`);
    
    if (savedModel && models.find(m => m.id === savedModel)) {
      setSelectedModel(savedModel);
    }
    
    if (savedKey) {
      setApiKey(savedKey);
      if (selectedModelData?.apiKeyRequired) {
        validateApiKeyHandler(savedKey, selectedModel);
      }
    }
  }, []);

  useEffect(() => {
    // Reset validation when model changes
    setValidationState('');
    setErrorMessage('');
    
    // Load saved key for the new model
    const savedKey = sessionStorage.getItem(`${selectedModel}ApiKey`);
    if (savedKey) {
      setApiKey(savedKey);
      if (selectedModelData?.apiKeyRequired) {
        debounceValidation(savedKey, selectedModel);
      }
    } else {
      setApiKey('');
    }
  }, [selectedModel]);

  useEffect(() => {
    if (selectedModelData?.apiKeyRequired && apiKey) {
      debounceValidation(apiKey, selectedModel);
    }
  }, [apiKey, selectedModel, debounceValidation]);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const validateApiKeyHandler = async (key, model) => {
    if (!key.trim()) {
      setValidationState('');
      return;
    }

    setIsValidating(true);
    setValidationState('loading');

    try {
      const result = await validateApiKey(key,model)

      if (result.valid) {
        setValidationState('success');
        setErrorMessage('');
        return true;
      } else {
        setValidationState('error');
        setErrorMessage(result.message || 'Invalid API key');
        return false;
      }
    } catch (error) {
      setValidationState('error');
      setErrorMessage('Unable to validate API key. Please check your connection.');
      return false;
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubmit = async () => {
    // For mistral (offline model), show prerequisites first
    if (!selectedModelData?.apiKeyRequired && selectedModel === 'mistral') {
      setShowPrerequisites(true);
      return;
    }

    // For other offline models, proceed directly
    if (!selectedModelData?.apiKeyRequired) {
      setIsSubmitting(true);
      
      // Store selected model
      sessionStorage.setItem('selectedModel', selectedModel);
      sessionStorage.setItem(`${selectedModel}ApiKey`, 'sdvsdvsdSFVsfv');

      setTimeout(() => {
        window.location.href = '/quiz';
      }, 300);
      return;
    }

    // For other models, validate API key
    if (!apiKey.trim()) {
      setErrorMessage('Please enter your API key');
      setValidationState('error');
      return;
    }

    setIsSubmitting(true);

    try {
      const isValid = await validateApiKeyHandler(apiKey, selectedModel);

      if (isValid) {
        // Store both model and API key
        sessionStorage.setItem('selectedModel', selectedModel);
        sessionStorage.setItem('ApiKey', apiKey);
        // sessionStorage.setItem(`${selectedModel}ApiKey`, apiKey);
        
        setTimeout(() => {
          window.location.href = '/quiz';
        }, 2000);
      }
    } catch (error) {
      setErrorMessage('Failed to validate API key. Please try again.');
      setValidationState('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleProceedWithMistral = () => {
    setShowPrerequisites(false);
    setIsSubmitting(true);
    
    // Store selected model
    sessionStorage.setItem('selectedModel', selectedModel);
    sessionStorage.setItem(`${selectedModel}ApiKey`, 'sdvsdvsdSFVsfv');

    setTimeout(() => {
      window.location.href = '/quiz';
    }, 300);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setApiKey(value);
    setValidationState('');
    setErrorMessage('');
  };

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId);
    setIsDropdownOpen(false);
  };

  const getValidationIcon = () => {
    switch (validationState) {
      case 'loading':
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getInputClassName = () => {
    let baseClass = "w-full px-5 py-4 border-2 rounded-xl text-base transition-all duration-300 bg-white outline-none pr-12";
    
    switch (validationState) {
      case 'success':
        return `${baseClass} border-green-500 bg-green-50`;
      case 'error':
        return `${baseClass} border-red-500 bg-red-50`;
      default:
        return `${baseClass} border-gray-200 focus:border-blue-500 focus:shadow-lg focus:shadow-blue-500/10`;
    }
  };

  const getButtonText = () => {
    if (isSubmitting) {
      if (validationState === 'success') {
        return 'Success! Redirecting...';
      }
      return selectedModelData?.apiKeyRequired ? 'Validating...' : 'Starting Quiz...';
    }
    if (selectedModel === 'mistral') {
      return 'Setup Mistral & Start Quiz';
    }
    return selectedModelData?.apiKeyRequired ? 'Start Quiz Journey' : 'Start Quiz';
  };

  const getButtonClassName = () => {
    const baseClass = "w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300";
    const gradientClass = `bg-gradient-to-r ${selectedModelData?.color || 'from-blue-600 to-purple-600'}`;
    const hoverClass = selectedModelData?.apiKeyRequired 
      ? 'hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5'
      : 'hover:shadow-lg hover:shadow-green-500/25 hover:-translate-y-0.5';
    
    if (isSubmitting && validationState === 'success') {
      return `${baseClass} bg-gradient-to-r from-green-500 to-green-600`;
    }
    
    if (isSubmitting || isValidating) {
      return `${baseClass} ${gradientClass} opacity-70 cursor-not-allowed`;
    }
    
    return `${baseClass} ${gradientClass} ${hoverClass}`;
  };

  const shapes = [
    { size: 80, top: '10%', left: '10%', delay: 0 },
    { size: 120, top: '20%', right: '10%', delay: 2 },
    { size: 60, bottom: '20%', left: '20%', delay: 4 },
    { size: 100, bottom: '10%', right: '20%', delay: 1 }
  ];

  // Prerequisites Modal Component
  const PrerequisitesModal = () => {
    if (!showPrerequisites || !selectedModelData?.prerequisites) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-lg w-full p-8 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{selectedModelData.icon}</span>
              <h3 className="text-xl font-bold text-gray-900">
                {selectedModelData.name} Setup Required
              </h3>
            </div>
            <button
              onClick={() => setShowPrerequisites(false)}
              className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-sm text-gray-600">
                Please ensure you have completed the following steps:
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {selectedModelData.prerequisites.map((prerequisite, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-sm font-semibold text-green-600">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-gray-700 leading-relaxed">
                    {prerequisite}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Server className="w-5 h-5 text-blue-600" />
              <p className="text-blue-800 font-semibold">Need Help?</p>
            </div>
            <p className="text-blue-700 text-sm mb-2">
              Visit the official Ollama documentation for detailed setup instructions.
            </p>
            <a 
              href="https://ollama.ai/download"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              Download Ollama
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setShowPrerequisites(false)}
              className="px-6 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleProceedWithMistral}
              className="px-6 py-3 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 flex items-center space-x-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>I'm Ready - Start Quiz</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 flex items-center justify-center p-5 relative overflow-hidden">
      {/* Floating Shapes */}
      <div className="fixed inset-0 pointer-events-none">
        {shapes.map((shape, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white/10 animate-pulse"
            style={{
              width: shape.size,
              height: shape.size,
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom,
              transform: `translate(${(mousePosition.x - 0.5) * (index + 1) * 0.5}px, ${(mousePosition.y - 0.5) * (index + 1) * 0.5}px)`,
              animationDelay: `${shape.delay}s`,
              transition: 'transform 0.3s ease-out'
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-md relative">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/20 relative overflow-hidden animate-slideUp">
          {/* Top gradient border */}
          <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${selectedModelData?.color || 'from-blue-500 to-purple-500'} animate-shimmer bg-[length:200%_100%]`} />

          {/* Logo Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              🧠 QuizMaster
            </h1>
            <p className="text-slate-600 text-lg font-medium">
              Multi-LLM Quiz Platform
            </p>
          </div>

          {/* Model Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Choose AI Model
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl text-left flex items-center justify-between hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{selectedModelData?.icon}</span>
                  <div>
                    <div className="font-semibold text-slate-800">{selectedModelData?.name}</div>
                    <div className="text-sm text-slate-500 flex items-center space-x-2">
                      <span>{selectedModelData?.description}</span>
                      {selectedModelData?.prerequisites && (
                        <span className="inline-flex items-center text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                          <Server className="w-3 h-3 mr-1" />
                          Setup Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => handleModelChange(model.id)}
                      className={`w-full p-4 text-left flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                        selectedModel === model.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                    >
                      <span className="text-2xl">{model.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">{model.name}</div>
                        <div className="text-sm text-slate-500 flex items-center space-x-2">
                          <span>{model.description}</span>
                          {model.prerequisites && (
                            <span className="inline-flex items-center text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                              <Server className="w-3 h-3 mr-1" />
                              Setup Required
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* API Key Input - Only show if required */}
          {selectedModelData?.apiKeyRequired && (
            <>
              {/* Info Box */}
              <div className={`bg-gradient-to-r ${selectedModelData.color} bg-opacity-10 border border-opacity-20 rounded-xl p-4 mb-6`}>
                <p className="text-slate-700 text-sm leading-relaxed">
                  <strong>API Key Required:</strong> Enter your {selectedModelData.name} API key to continue.{' '}
                  <a 
                    href={selectedModelData.apiKeyUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Get your API key here
                  </a>
                </p>
              </div>

              <div className="mb-6">
                <label htmlFor="apiKey" className="block text-sm font-semibold text-slate-700 mb-2">
                  {selectedModelData.name} API Key
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="apiKey"
                    value={apiKey}
                    onChange={handleInputChange}
                    placeholder={`Enter your ${selectedModelData.name} API key...`}
                    className={getInputClassName()}
                    required
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                    {getValidationIcon()}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                {errorMessage && (
                  <div className="mt-2 text-red-500 text-sm animate-fadeIn">
                    {errorMessage}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Local Model Info Box */}
          {!selectedModelData?.apiKeyRequired && (
            <div className={`${selectedModel === 'mistral' ? 'bg-orange-50 border-orange-200' : 'bg-green-50 border-green-200'} border rounded-xl p-4 mb-6`}>
              <div className="flex items-center space-x-2 mb-2">
                {selectedModel === 'mistral' ? (
                  <>
                    <Server className="w-5 h-5 text-orange-600" />
                    <p className="text-orange-800 font-semibold">Setup Required</p>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-semibold">Ready to Go!</p>
                  </>
                )}
              </div>
              <p className={`${selectedModel === 'mistral' ? 'text-orange-700' : 'text-green-700'} text-sm`}>
                {selectedModel === 'mistral' 
                  ? 'Mistral requires local setup with Ollama. Click the button below to review prerequisites and start your quiz.'
                  : 'This model is ready to use immediately. No API key needed - click the button below to start your quiz!'
                }
              </p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isValidating}
            className={getButtonClassName()}
          >
            <div className="flex items-center justify-center space-x-2">
              {isSubmitting && (
                <Loader2 className="w-5 h-5 animate-spin" />
              )}
              {!selectedModelData?.apiKeyRequired && !isSubmitting && selectedModel === 'mistral' && (
                <Server className="w-5 h-5" />
              )}
              {!selectedModelData?.apiKeyRequired && !isSubmitting && selectedModel !== 'mistral' && (
                <Brain className="w-5 h-5" />
              )}
              {selectedModelData?.apiKeyRequired && !isSubmitting && (
                <Key className="w-5 h-5" />
              )}
              <span>{getButtonText()}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Prerequisites Modal */}
      <PrerequisitesModal />

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.8s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default QuizLandingPage;

