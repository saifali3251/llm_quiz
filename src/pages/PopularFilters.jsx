import { useState,useEffect } from 'react';
import { TrendingUp, Star, Play } from 'lucide-react';
// import { defaultSelection } from '../lib/utils';
import { fetchPopularFilters } from '../utils/api';

const PopularFiltersSection = ({startPopularChoiceHandler}) => {
  // Popular filter section
  // const [selectedModel, setSelectedModel] = useState('');
  // const [filters, setFilters] = useState(defaultSelection);
  const [currentView, setCurrentView] = useState('filters');
  const [popularFilters, setPopularFilters] = useState([]);
  const [loadingPopular, setLoadingPopular] = useState(false);

  const fetchPopularFiltersHandler = async () => {
    setLoadingPopular(true);

    const mockData = await fetchPopularFilters();
    setPopularFilters(mockData)
    setLoadingPopular(false)
  };

  useEffect(() => {
    if (currentView === 'filters') {
      fetchPopularFiltersHandler();
    }
  }, [currentView]);

  // const handleModelSelect = (modelId) => {
  //   setSelectedModel(modelId);
  //   setCurrentView('filters');
  // };

  const handlePopularFilterClick = (popularFilter) => {
    // Set filters based on popular selection
    // setFilters({
    //   type: popularFilter.type,
    //   genre: popularFilter.name,
    // });

    startPopularChoiceHandler(popularFilter)
    
    // Start quiz with popular filter
    setCurrentView('quiz');
  };

    return (
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="text-blue-600" size={20} />
          <h3 className="text-lg font-bold text-gray-800">🔥 Popular Filters</h3>
          <span className="text-xs text-gray-500">({popularFilters.length} trending)</span>
        </div>
        
        {loadingPopular ? (
          <div className="flex items-center justify-center py-6">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span className="ml-2 text-sm text-gray-600">Loading popular filters...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {popularFilters.map((filter, index) => (
              <div
                key={index}
                onClick={() => handlePopularFilterClick(filter)}
                className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-gray-200 hover:shadow-md hover:border-purple-300 cursor-pointer transition-all duration-200 group transform hover:scale-102"
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1">
                    <Star className="text-yellow-500 fill-current" size={12} />
                    <span className="text-xs font-medium text-gray-600">{filter.type}</span>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-medium">
                    {filter.hits} {filter.hits>1 ? 'uses' : 'use'}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1 text-sm truncate">{filter.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 truncate">via {filter.model_name}</span>
                  <div className="flex items-center gap-1">
                    <Play className="text-purple-600 group-hover:translate-x-0.5 transition-transform" size={12} />
                    <span className="text-xs text-purple-600 font-medium">Try</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
}

export default PopularFiltersSection;
