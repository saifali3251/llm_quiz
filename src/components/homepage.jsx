import { useEffect, useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './items/select';
import { RadioGroup, RadioGroupItem } from './items/radio-group';
import { Label } from './items/label';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './items/card';
import { Button } from './items/Button';
import { fetchQuestions } from '../utils/api';
import { generateLLMPrompt, validatePrompt } from '../utils/prompts';
import { defaultSelection,getContentType,getDifficultyColor,getScoreMessage,randomTopicList,difficultyOptions,contentType } from '../lib/utils';
import PopularFiltersSection from '../pages/PopularFilters';
import ChangeModelButton from './items/ChangeModelButton';
import UtilityButtons from './items/DeveloperProfile';
import QuestionList from './QuestionList';
import FilterSelection from './FilterSelection';
import ActionButtons from './ActionButtons';

// const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'];
// const contentType = ["Movie","TV Show","Web Series","Documentary","Book","General Knowledge"]
const modelName = sessionStorage.getItem("selectedModel")
export default function FriendsQuizLLM() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filters, setFilters] = useState(defaultSelection);
  const [similarNamesQuiz, setSimilarNamesQuiz] = useState(false);

  // // Popular filter section
  // const [selectedModel, setSelectedModel] = useState('');
  // const [currentView, setCurrentView] = useState('landing');
  // const [popularFilters, setPopularFilters] = useState([]);
  // const [loadingPopular, setLoadingPopular] = useState(false);

  // const fetchPopularFilters = async () => {
  //   setLoadingPopular(true);
  //   // Simulate API call
  //   setTimeout(() => {
  //     const mockData = [
  //       { type: "TV Show", name: "Friends", model_name: "mistral", hits: 5 },
  //       { type: "TV Show", name: "Friends", model_name: "gemini", hits: 3 },
  //       { type: "Movie", name: "The Matrix", model_name: "openai", hits: 7 },
  //       { type: "Movie", name: "Inception", model_name: "claude", hits: 4 },
  //       { type: "TV Show", name: "Breaking Bad", model_name: "mistral", hits: 6 }
  //     ];
  //     setPopularFilters(mockData);
  //     setLoadingPopular(false);
  //   }, 1000);
  // };

  // useEffect(() => {
  //   if (currentView === 'filters') {
  //     fetchPopularFilters();
  //   }
  // }, [currentView]);

  // const handleModelSelect = (modelId) => {
  //   setSelectedModel(modelId);
  //   setCurrentView('filters');
  // };

  // const handlePopularFilterClick = (popularFilter) => {
  //   // Set filters based on popular selection
  //   setFilters({
  //     type: popularFilter.type,
  //     genre: popularFilter.name,
  //     year: '',
  //     rating: ''
  //   });
    
  //   // Start quiz with popular filter
  //   setCurrentView('quiz');
  // };





  // // ppular filter section ends here




  // Event handlers
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const validateContent = async (contentName, contentType) => {
    try {
      const validationPrompt = validatePrompt(contentName,contentType)
      const is_test = true;
      const response = await fetchQuestions(validationPrompt,modelName,contentName,contentType,is_test);
      return response;
    } catch (error) {
      console.error('Content validation error:', error);
      return { exists: true }; // Fallback to allow quiz generation
    }
  };

  const generateQuestions = async () => {
    try {
      // First validate if the content exists
      const validation = await validateContent(filters.name, filters.type);
      if (validation?.questions?.exists === false) {
        return validation?.questions;
        // throw new Error('CONTENT_NOT_FOUND', { suggestions: validation.suggestions });
      }
      
      const prompt = generateLLMPrompt(filters);
      let contentName = filters.name;
      let contentType = filters.type
      const is_test = false;
      const response = await fetchQuestions(prompt,modelName,contentName,contentType,is_test);
      
      if (!response?.questions || !Array.isArray(response.questions)) {
        throw new Error('Invalid response format from API');
      }
      
      // Check if questions contain "undefined" or "doesn't exist" patterns
      const validQuestions = response.questions.filter(q => {
        const hasValidContent = q.question && 
          !q.question.toLowerCase().includes('undefined') &&
          !q.question.toLowerCase().includes("doesn't exist") &&
          !q.question.toLowerCase().includes("does not exist") &&
          q.options && q.options.length > 0 &&
          q.correctAnswer && q.correctAnswer !== 'undefined';
        return hasValidContent;
      });
      
      if (validQuestions.length === 0) {
        throw new Error('Unable to generate valid questions for this content. Please try a different title.');
      }
      
      return validQuestions;
    } catch (error) {
      if (error.message === 'CONTENT_NOT_FOUND') {
        throw error;
      }
      throw new Error('Failed to generate questions. Please try again.');
    }
  };


  const handleStartQuiz = async () => {
    // Validate inputs
    if (!filters.name?.trim()) {
      setError('Please enter a name for your quiz topic');
      return;
    }

    if (!filters.questionCount || filters.questionCount < 1 || filters.questionCount > 20) {
      setError('Please enter a valid number of questions (1-20)');
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowSuggestions(false);
    setSimilarNamesQuiz(false);
    
    try {
      const generatedQuestions = await generateQuestions();
      
      if (!generatedQuestions?.length) {
        setSuggestions(generatedQuestions?.suggestions);
        setShowSuggestions(true);
        setSimilarNamesQuiz(true);
        throw new Error('No questions match your filters. Please try different settings.');
      }

      // handling suggestion when movie doesn't exists
      if(generatedQuestions?.exists===false){
        setSuggestions(generatedQuestions?.suggestions);
        setShowSuggestions(true);
        setSimilarNamesQuiz(true);
      }
      else{
        // Reset quiz state
        setQuestions(generatedQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuizStarted(true);
        setQuizCompleted(false);
        setSelectedAnswer(null);
        setShowFeedback(false);
      }
    } catch (err) {
      console.error('Quiz error:', err);
      
      // Check if it's a content not found error with suggestions
      if (err.suggestions && err.suggestions.length > 0) {
        setSuggestions(err.suggestions);
        setShowSuggestions(true);
        setSimilarNamesQuiz(true);
        setError(`"${filters.name}" not found. Select from similar options to start the quiz:`);
      } else {
        setError(err instanceof Error ? err.message : 'Failed to start quiz');
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleAnswerSelect = (value) => {
    if (!showFeedback) {
      setSelectedAnswer(value);
    }
  };

  const checkAnswer = () => {
    if (!selectedAnswer || !currentQuestion) return;
    
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
    
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setError(null);
  };

  const exitQuiz = () => {
    setQuizCompleted(true);
  };

  const handleSurpriseMe = async () => {
    const surpriseTopics = randomTopicList;
    
    const randomTopic = surpriseTopics[Math.floor(Math.random() * surpriseTopics.length)];
    
    setFilters({
      ...filters,
      type: randomTopic.type,
      name: randomTopic.name,
      difficulty: 'All',
      questionCount: 5
    });
    
    setError(null);
    setShowSuggestions(false);
  };

  const resetFilters = () => {
    setFilters(defaultSelection);
    setError(null);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Current question
  const currentQuestion = questions?.[currentQuestionIndex];

  const startQuizWithSuggestion = async (suggestionName) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedFilters = {
        ...filters,
        name: suggestionName
      };
      
      const prompt = generateLLMPrompt(updatedFilters);
      // const response = await fetchQuestions(prompt);
      // CHECK CONTENT NAME AND TYPE
      let contentName = filters.name;
      let contentType = filters.type;
      const is_test = false;
      const response = await fetchQuestions(prompt,modelName,contentName,contentType,is_test);

      
      if (!response?.questions || !Array.isArray(response.questions)) {
        throw new Error('Invalid response format from API');
      }
      
      const validQuestions = response.questions.filter(q => {
        const hasValidContent = q.question && 
          !q.question.toLowerCase().includes('undefined') &&
          !q.question.toLowerCase().includes("doesn't exist") &&
          !q.question.toLowerCase().includes("does not exist") &&
          q.options && q.options.length > 0 &&
          q.correctAnswer && q.correctAnswer !== 'undefined';
        return hasValidContent;
      });
      
      if (validQuestions.length === 0) {
        throw new Error('Unable to generate valid questions for this content. Please try a different title.');
      }
      
      // Reset quiz state
      setQuestions(validQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizStarted(true);
      setQuizCompleted(false);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setSimilarNamesQuiz(false);
      
    } catch (err) {
      console.error('Quiz error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start quiz');
      setSimilarNamesQuiz(false);
    } finally {
      setIsLoading(false);
    }
  };

  const startQuizWithPopularFilter = async (popularFilter) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const updatedFilters = {
        ...filters,
        name: popularFilter.name,
        type : popularFilter.type,
      };
      const prompt = generateLLMPrompt(updatedFilters);
      const modelName = popularFilter.model_name;
      const contentType = popularFilter.type;
      const contentName = popularFilter.name;
      // const prompt = "dummy"
      const is_test = false;
      const response = await fetchQuestions(prompt,modelName,contentName,contentType,is_test);

      
      if (!response?.questions || !Array.isArray(response.questions)) {
        throw new Error('Invalid response format from API');
      }
      
      const validQuestions = response.questions.filter(q => {
        const hasValidContent = q.question && 
          !q.question.toLowerCase().includes('undefined') &&
          !q.question.toLowerCase().includes("doesn't exist") &&
          !q.question.toLowerCase().includes("does not exist") &&
          q.options && q.options.length > 0 &&
          q.correctAnswer && q.correctAnswer !== 'undefined';
        return hasValidContent;
      });
      
      if (validQuestions.length === 0) {
        throw new Error('Unable to generate valid questions for this content. Please try a different title.');
      }
      
      // Reset quiz state
      setQuestions(validQuestions);
      setCurrentQuestionIndex(0);
      setScore(0);
      setQuizStarted(true);
      setQuizCompleted(false);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setSimilarNamesQuiz(false);
      
    } catch (err) {
      console.error('Quiz error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start quiz');
      setSimilarNamesQuiz(false);
    } finally {
      setIsLoading(false);
    }
  };



  // Handle suggestion selection - automatically start quiz with selected suggestion
  const handleSuggestionSelect = (suggestion) => {
    setFilters(prev => ({
      ...prev,
      name: suggestion
    }));
    setError(null);
    setShowSuggestions(false);
    setSuggestions([]);
    setSimilarNamesQuiz(true);
    
    // Automatically start quiz with the selected suggestion
    setTimeout(() => {
      startQuizWithSuggestion(suggestion);
    }, 100);
  };


  // // Popular filter Section
  // const PopularFiltersSection = () => (
  //   <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
  //     <div className="flex items-center gap-2 mb-4">
  //       <TrendingUp className="text-blue-600" size={24} />
  //       <h3 className="text-xl font-bold text-gray-800">🔥 Popular Filters</h3>
  //       <span className="text-sm text-gray-500">({popularFilters.length} trending)</span>
  //     </div>
      
  //     {loadingPopular ? (
  //       <div className="flex items-center justify-center py-8">
  //         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
  //         <span className="ml-2 text-gray-600">Loading popular filters...</span>
  //       </div>
  //     ) : (
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  //         {popularFilters.map((filter, index) => (
  //           <div
  //             key={index}
  //             onClick={() => handlePopularFilterClick(filter)}
  //             className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-sm border-2 border-gray-200 hover:shadow-lg hover:border-purple-300 cursor-pointer transition-all duration-200 group transform hover:scale-105"
  //           >
  //             <div className="flex items-center justify-between mb-2">
  //               <div className="flex items-center gap-2">
  //                 <Star className="text-yellow-500 fill-current" size={16} />
  //                 <span className="text-sm font-medium text-gray-700">{filter.type}</span>
  //               </div>
  //               <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
  //                 {filter.hits} uses
  //               </span>
  //             </div>
  //             <h4 className="font-semibold text-gray-800 mb-1">{filter.name}</h4>
  //             <div className="flex items-center justify-between">
  //               <span className="text-sm text-gray-500">via {filter.model_name}</span>
  //               <div className="flex items-center gap-1">
  //                 <Play className="text-purple-600 group-hover:translate-x-1 transition-transform" size={16} />
  //                 <span className="text-xs text-purple-600 font-medium">Try Now</span>
  //               </div>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // );



  // Custom RadioGroup component for answers
  const QuestionRadioGroup = ({ options, selectedValue, onChange, disabled, correctAnswer, showFeedback }) => (
    <div className="space-y-3">
      {options?.map((option, index) => {
        const isSelected = selectedValue === option;
        const isCorrect = option === correctAnswer;
        
        let bgColor = 'bg-white border-gray-200';
        let textColor = 'text-gray-800';
        
        if (showFeedback) {
          if (isCorrect) {
            bgColor = 'bg-green-50 border-green-300';
            textColor = 'text-green-800';
          } else if (isSelected && !isCorrect) {
            bgColor = 'bg-red-50 border-red-300';
            textColor = 'text-red-800';
          }
        } else if (isSelected) {
          bgColor = 'bg-purple-50 border-purple-300';
          textColor = 'text-purple-800';
        }

        return (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${bgColor} ${textColor} ${
              disabled ? 'cursor-not-allowed' : 'hover:border-purple-300'
            }`}
            onClick={() => !disabled && onChange(option)}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                isSelected ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
              }`}>
                {isSelected && (
                  <div className="w-2 h-2 bg-white rounded-full m-0.5"></div>
                )}
              </div>
              <span className="text-base font-medium">{option}</span>
              {showFeedback && isCorrect && (
                <span className="text-green-600 text-xl">✓</span>
              )}
              {showFeedback && isSelected && !isCorrect && (
                <span className="text-red-600 text-xl">✗</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl rounded-3xl border-0 bg-white/80 backdrop-blur-sm">
        {!quizStarted &&
        <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
          <ChangeModelButton currentModel={"GPT-4"} />
          <UtilityButtons />
        </div>
        }
        <CardHeader className="text-center space-y-4 pb-8">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl">🎯</span>
            <CardTitle className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Universal Quiz Generator
            </CardTitle>
            <span className="text-4xl">🧠</span>
          </div>
          <p className="text-gray-600 text-lg">
            Create and take quizzes on any topic you love!
          </p>
          
          {/* Progress and Score Display */}
          {quizStarted && !quizCompleted && (
            <QuestionList 
            questions={questions} 
            score={score} 
            currentQuestionIndex={currentQuestionIndex}
            exitQuiz={exitQuiz}
            />
          )}
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Quiz Setup Form */}
          {!quizStarted && !quizCompleted && (
            <div className="space-y-8">
            <FilterSelection
            filters={filters}
            handleFilterChange={handleFilterChange}
            />
            <PopularFiltersSection startPopularChoiceHandler={startQuizWithPopularFilter}/>
            <ActionButtons
            handleSurpriseMe={handleSurpriseMe}
            resetFilters={resetFilters}
            handleStartQuiz={handleStartQuiz}
            filters={filters}
            isLoading={isLoading}
            />
            </div>
          )}

          {/* Quiz Questions */}
          {quizStarted && !quizCompleted && currentQuestion && (
            <div className="space-y-6">
              {/* Question Header */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4">
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className={`px-2 py-1 rounded-full font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                    {currentQuestion.difficulty}
                  </span>
                  {currentQuestion.season && (
                    <span className="px-2 py-1 rounded-full font-medium text-blue-600 bg-blue-50">
                      Season {currentQuestion.season}
                    </span>
                  )}
                  {/* {currentQuestion.character && (
                    <span className="px-2 py-1 rounded-full font-medium text-purple-600 bg-purple-50">
                      {currentQuestion.character}
                    </span>
                  )} */}
                </div>
              </div>
              
              {/* Question */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {currentQuestion.question}
                </h3>
                
                {/* Answer Options */}
                <QuestionRadioGroup
                  options={currentQuestion.options}
                  selectedValue={selectedAnswer}
                  onChange={handleAnswerSelect}
                  disabled={showFeedback}
                  correctAnswer={currentQuestion.correctAnswer}
                  showFeedback={showFeedback}
                />
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={`p-6 rounded-xl border-2 ${
                  isCorrect 
                    ? 'bg-green-50 border-green-200 text-green-800' 
                    : 'bg-red-50 border-red-200 text-red-800'
                }`}>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">
                      {isCorrect ? '✅' : '❌'}
                    </span>
                    <h4 className="font-semibold text-lg">
                      {isCorrect ? 'Correct!' : 'Incorrect!'}
                    </h4>
                  </div>
                  {currentQuestion.explanation && (
                    <p className="text-base leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  )}
                </div>
              )}
              
              {/* Action Buttons */}
              <div className="flex justify-center">
                {!showFeedback ? (
                  <Button 
                    onClick={checkAnswer} 
                    disabled={!selectedAnswer}
                    className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={nextQuestion}
                    className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Quiz Completion */}
          {quizCompleted && (
            <div className="text-center space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Quiz Completed!
                </h2>
                <div className="text-2xl font-semibold text-purple-600 mb-4">
                  Your Score: {score} / {questions.length}
                </div>
                <div className="text-lg text-gray-600 mb-6">
                  {getScoreMessage(score, questions.length)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${(score / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={restartQuiz} 
                  variant="outline"
                  className="h-12 font-semibold"
                >
                  <span className="flex items-center space-x-2">
                    <span>⚙️</span>
                    <span>Change Settings</span>
                  </span>
                </Button>
                <Button 
                  onClick={handleStartQuiz}
                  className="h-12 font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <span className="flex items-center space-x-2">
                    <span>🔄</span>
                    <span>Take Quiz Again</span>
                  </span>
                </Button>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <span className="text-red-500 text-xl">⚠️</span>
                <div className="flex-1">
                  <p className="text-red-700 font-medium">{error}</p>
                  
                  {/* Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm text-gray-600 mb-2">Did you mean:</p>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.map((suggestion, index) => (
                          <Button
                            key={index}
                            onClick={() => handleSuggestionSelect(suggestion)}
                            variant="outline"
                            size="sm"
                            className="text-sm bg-white hover:bg-blue-50 border-blue-200"
                          >
                            {suggestion}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    onClick={() => {
                      setError(null);
                      setShowSuggestions(false);
                    }} 
                    variant="outline"
                    size="sm"
                    className="mt-3"
                  >
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}