import { Button } from "./items/Button";

const ActionButtons = ({handleStartQuiz,handleSurpriseMe,resetFilters,filters,isLoading}) => {
    return (
            <div className="flex gap-4">
            <Button 
            onClick={resetFilters}
            variant="outline"
            className="flex-1 h-12 font-medium"
            >
            Reset Filters
            </Button>
            <Button 
            onClick={handleSurpriseMe}
            variant="outline"
            className="flex-1 h-12 font-medium bg-gradient-to-r from-orange-50 to-pink-50 hover:from-orange-100 hover:to-pink-100 border-orange-200"
            >
            <span className="flex items-center space-x-2">
                <span>🎲</span>
                <span>Surprise Me!</span>
            </span>
            </Button>
            <Button 
            onClick={handleStartQuiz}
            disabled={isLoading || !filters.name?.trim() || filters.questionCount>10}
            className="flex-1 h-12 font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
            {isLoading ? (
                <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating Quiz...</span>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                <span>🚀</span>
                <span>Start Quiz</span>
                </div>
            )}
            </Button>
        </div>
    )
}


export default ActionButtons;