import { Button } from "./items/Button";


const QuestionList = ({questions,score,currentQuestionIndex,exitQuiz}) => {
    return (
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-4 mx-4">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xl font-semibold text-gray-800">
            Score: <span className="text-purple-600">{score}</span>/{questions?.length}
          </p>
          <Button 
            onClick={exitQuiz}
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            <span className="flex items-center space-x-1">
              <span>🚪</span>
              <span>Exit Quiz</span>
            </span>
          </Button>
        </div>
        <div className="flex items-center justify-center space-x-2 mt-2">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / questions?.length) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600 whitespace-nowrap">
            {currentQuestionIndex + 1} of {questions?.length}
          </span>
        </div>
      </div>
    )
}


export default QuestionList;
