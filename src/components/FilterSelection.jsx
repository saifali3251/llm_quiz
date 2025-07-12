import { getContentType,getDifficultyColor,contentType,difficultyOptions } from "../lib/utils";
import { Label } from "./items/label";
import { SelectContent,SelectItem,SelectValue,Select,SelectTrigger } from "./items/select";

const FilterSelection = ({filters,handleFilterChange}) => {
    return (
        <div className="space-y-8">
            <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                Customize Your Quiz Experience
            </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type Selection */}
            <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700 flex items-center space-x-2">
                <span>🎯</span>
                <span>Type</span>
                </Label>
                <Select onValueChange={(val) => handleFilterChange('type', val)} defaultValue={filters.type}>
                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                    {/* <SelectValue /> */}
                    <SelectValue placeholder={getContentType(filters.type).label} />
                </SelectTrigger>
                <SelectContent>
                    {contentType?.map((opt) => (
                    <SelectItem key={opt} value={opt} className="py-3">
                        <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getContentType(opt)?.className}`}>
                            {/* {opt} */}
                            {getContentType(opt).label}
                        </span>
                        </div>
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>

            {/* Name Input */}
            <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700 flex items-center space-x-2">
                <span>🎬</span>
                <span>Name *</span>
                </Label>
                <input
                type="text"
                placeholder="e.g., Friends, Interstellar, Harry Potter"
                value={filters.name || ''}
                onChange={(e) => handleFilterChange('name', e.target.value)}
                className="h-12 w-full border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:outline-none transition-colors px-4 rounded"
                />
            </div>

            {/* Difficulty Selection */}
            <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700 flex items-center space-x-2">
                <span>🎯</span>
                <span>Difficulty Level</span>
                </Label>
                <Select onValueChange={(val) => handleFilterChange('difficulty', val)} defaultValue={filters.difficulty}>
                <SelectTrigger className="h-12 border-2 border-gray-200 hover:border-purple-300 transition-colors">
                    <SelectValue placeholder={filters.difficulty} />
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

            {/* Question Count */}
            <div className="space-y-3">
                <Label className="text-base font-medium text-gray-700 flex items-center space-x-2">
                <span>🔢</span>
                <span>Number of Questions</span>
                </Label>
                <input
                type="number"
                min={1}
                max={10}
                value={filters.questionCount || 5}
                onChange={(e) => handleFilterChange('questionCount', parseInt(e.target.value) || 5)}
                className="h-12 w-full border-2 border-gray-200 hover:border-purple-300 focus:border-purple-500 focus:outline-none transition-colors px-4 rounded"
                />
            </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-800 mb-3">Current Selection:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-sm font-medium text-blue-600 bg-blue-50">
                    {getContentType(filters.type).label} 
                    {/* {filters.type} */}
                  </span>
                  {filters.name && (
                    <span className="px-3 py-1 rounded-full text-sm font-medium text-green-600 bg-green-50">
                      🎬 {filters.name}
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(filters.difficulty)}`}>
                    🎯 {filters.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-sm font-medium text-gray-600 bg-gray-50">
                    🔢 {filters.questionCount} questions
                  </span>
                </div>
              </div>


        </div>
    )
}

export default FilterSelection;