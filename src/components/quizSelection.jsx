const QuizSelection = () => {
    return (
        <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Customize Your Quiz Experience
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-700 flex items-center space-x-2">
              <span>🎯</span>
              <span>Difficulty Level</span>
            </Label>
            <Select onValueChange={(val) => handleFilterChange('difficulty', val)} defaultValue="All">
              <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficultyOptions.map((opt) => (
                  <SelectItem key={opt} value={opt} className="py-3">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(opt)}`}>
                        {opt}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-700 flex items-center space-x-2">
              <span>{getSeasonEmoji(filters.season)}</span>
              <span>Season Focus</span>
            </Label>
            <Select onValueChange={(val) => handleFilterChange('season', val)} defaultValue="All">
              <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {seasonOptions.map((opt) => (
                  <SelectItem key={opt} value={opt} className="py-3">
                    <div className="flex items-center space-x-2">
                      <span>{getSeasonEmoji(opt)}</span>
                      <span>{opt}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium text-gray-700 flex items-center space-x-2">
              <span>{getCharacterEmoji(filters.character)}</span>
              <span>Character Focus</span>
            </Label>
            <Select onValueChange={(val) => handleFilterChange('character', val)} defaultValue="All">
              <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {characterOptions.map((opt) => (
                  <SelectItem key={opt} value={opt} className="py-3">
                    <div className="flex items-center space-x-2">
                      <span>{getCharacterEmoji(opt)}</span>
                      <span>{opt}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-base font-medium text-gray-700 flex items-center space-x-2">
            <span>📝</span>
            <span>Number of Questions</span>
          </Label>
          <div className="flex justify-center">
            <RadioGroup
              value={filters.questionCount.toString()}
              onValueChange={(val) => handleFilterChange('questionCount', parseInt(val))}
              className="flex space-x-8"
            >
              {[5, 10, 15, 20].map((count) => (
                <div key={count} className="flex items-center space-x-2">
                  <RadioGroupItem value={count.toString()} id={`q-${count}`} />
                  <Label htmlFor={`q-${count}`} className="text-base font-medium cursor-pointer">
                    {count} questions
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-800 mb-3">Current Selection:</h4>
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(filters.difficulty)}`}>
              {filters.difficulty} difficulty
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-50">
              {getSeasonEmoji(filters.season)} {filters.season}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium text-purple-600 bg-purple-50">
              {getCharacterEmoji(filters.character)} {filters.character}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium text-gray-600 bg-gray-50">
              📝 {filters.questionCount} questions
            </span>
          </div>
        </div>

        <Button 
          onClick={handleStartQuiz}
          disabled={isLoading}
          className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Generating Your Quiz...</span>
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

export default QuizSelection;