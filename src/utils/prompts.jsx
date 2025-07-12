// Enhanced prompt generator with dynamic templates for different content types
export const generateLLMPrompt = (filters) => {
  const { type, name, difficulty, questionCount, season, character } = filters;
  
  // Base prompt structure
  let prompt = `You are an expert quiz creator specializing in ${type} trivia. `;
  
  // Dynamic prompt based on content type
  switch (type.toLowerCase()) {
      case 'movie':
          prompt += getMoviePrompt(name, difficulty, questionCount, filters);
          break;
      case 'tv show':
      case 'web series':
      case 'series':
          prompt += getTVSeriesPrompt(name, difficulty, questionCount, filters);
          break;
      case 'book':
          prompt += getBookPrompt(name, difficulty, questionCount, filters);
          break;
      case 'anime':
          prompt += getAnimePrompt(name, difficulty, questionCount, filters);
          break;
      default:
          prompt += getGenericPrompt(name, type, difficulty, questionCount, filters);
  }
  
  // Add common formatting instructions
  prompt += getFormattingInstructions(filters);
  
  return prompt;
};

// Movie-specific prompt
const getMoviePrompt = (name, difficulty, questionCount, filters) => {
  let prompt = `Generate ${questionCount} compelling multiple-choice questions about the movie "${name}". `;
  
  prompt += `Focus on creating questions that test knowledge about:
  - Plot details and story progression
  - Character development and relationships
  - Memorable dialogue and quotes
  - Behind-the-scenes trivia and production details
  - Cast and crew information
  - Awards and critical reception
  - Cultural impact and legacy
  `;
  
  prompt += getDifficultyInstructions(difficulty, 'movie');
  
  prompt += `Make questions engaging by:
  - Using specific scene references
  - Including memorable quotes as options
  - Testing knowledge of iconic moments
  - Incorporating production trivia
  - Adding context about the film's significance
  `;
  
  return prompt;
};

// TV/Web Series specific prompt
const getTVSeriesPrompt = (name, difficulty, questionCount, filters) => {
  const { season, character } = filters;
  
  let prompt = `Generate ${questionCount} engaging multiple-choice questions about the ${filters.type} "${name}". `;
  
  prompt += `Focus on creating questions that explore:
  - Character arcs and development across episodes
  - Plot twists and story revelations
  - Relationship dynamics and character interactions
  - Episode-specific events and storylines
  - Running gags and recurring themes
  - Character backstories and motivations
  - Show mythology and world-building
  `;
  
  // Season-specific instructions
  if (season && season !== 'All') {
      const seasonNum = season.substring(1);
      prompt += `\nFocus specifically on Season ${seasonNum}:
      - Key events and plot developments from this season
      - Character growth and changes during this season
      - Season-specific storylines and arcs
      - New characters introduced in this season
      - Season finale and cliffhangers
      `;
  }
  
  // Character-specific instructions
  if (character && character !== 'All') {
      prompt += `\nAll questions should center around ${character}:
      - ${character}'s personality traits and quirks
      - Their relationships with other characters
      - Their memorable quotes and catchphrases
      - Their character development throughout the show
      - Specific scenes or episodes featuring ${character}
      `;
  }
  
  prompt += getDifficultyInstructions(difficulty, 'series');
  
  prompt += `Make questions compelling by:
  - Referencing specific episodes or scenes
  - Including character-specific dialogue
  - Testing knowledge of running jokes
  - Exploring character relationships
  - Incorporating fan-favorite moments
  `;
  
  return prompt;
};

// Book-specific prompt
const getBookPrompt = (name, difficulty, questionCount, filters) => {
  let prompt = `Generate ${questionCount} thought-provoking multiple-choice questions about the book "${name}". `;
  
  prompt += `Focus on creating questions that examine:
  - Plot structure and narrative development
  - Character motivations and growth
  - Themes and symbolic elements
  - Setting and world-building
  - Writing style and literary techniques
  - Author's background and influences
  - Historical or cultural context
  `;
  
  prompt += getDifficultyInstructions(difficulty, 'book');
  
  return prompt;
};

// Anime-specific prompt
const getAnimePrompt = (name, difficulty, questionCount, filters) => {
  let prompt = `Generate ${questionCount} exciting multiple-choice questions about the anime "${name}". `;
  
  prompt += `Focus on creating questions that cover:
  - Character abilities and power systems
  - Plot arcs and story progression
  - Character relationships and rivalries
  - Anime-specific terminology and concepts
  - Animation studio and production details
  - Voice acting and soundtrack
  - Cultural references and Japanese elements
  `;
  
  prompt += getDifficultyInstructions(difficulty, 'anime');
  
  return prompt;
};

// Generic prompt for other content types
const getGenericPrompt = (name, type, difficulty, questionCount, filters) => {
  let prompt = `Generate ${questionCount} interesting multiple-choice questions about the ${type} "${name}". `;
  
  prompt += `Create questions that test knowledge about:
  - Main content and key elements
  - Important details and facts
  - Context and background information
  - Significant aspects and features
  `;
  
  prompt += getDifficultyInstructions(difficulty, type);
  
  return prompt;
};

// Difficulty-specific instructions
const getDifficultyInstructions = (difficulty, contentType) => {
  if (difficulty === 'All') return '';
  
  let instructions = `\nDifficulty Level: ${difficulty}\n`;
  
  const difficultyMap = {
      'Easy': {
          'movie': 'Basic plot points, main characters, famous quotes, obvious visual elements',
          'series': 'Main character names, basic plot, famous episodes, obvious running gags',
          'book': 'Main characters, basic plot, well-known quotes, obvious themes',
          'anime': 'Main character names, basic plot, popular techniques, obvious story elements',
          'default': 'Basic facts, main elements, well-known information'
      },
      'Medium': {
          'movie': 'Specific scenes, supporting characters, detailed plot points, moderate trivia',
          'series': 'Episode-specific details, character development, moderate fan knowledge',
          'book': 'Supporting characters, detailed plot points, literary techniques, moderate analysis',
          'anime': 'Specific techniques, episode details, character development, moderate fan knowledge',
          'default': 'Detailed information, specific facts, moderate depth knowledge'
      },
      'Hard': {
          'movie': 'Obscure trivia, production details, minor characters, deep analysis, easter eggs',
          'series': 'Obscure references, minor character details, deep fan knowledge, behind-the-scenes',
          'book': 'Obscure details, deep literary analysis, minor characters, author\'s techniques',
          'anime': 'Obscure techniques, minor character details, deep lore, production trivia',
          'default': 'Obscure facts, deep knowledge, expert-level information'
      }
  };
  
  const typeKey = difficultyMap[difficulty][contentType] || difficultyMap[difficulty]['default'];
  instructions += `Focus on: ${typeKey}\n`;
  
  return instructions;
};

// Common formatting instructions
const getFormattingInstructions = (filters) => {
  const { type, difficulty, season, character } = filters;
  
  let instructions = `\nIMPORTANT FORMATTING REQUIREMENTS:
  
  1. Return ONLY a valid JSON array - no additional text before or after
  2. Each question must be unique and well-researched
  3. Options should be plausible but clearly distinguishable
  4. Explanations should be informative and add value
  5. Avoid questions that are too obvious or impossibly obscure
  6. Include context in explanations to enhance learning
  
  Required JSON structure:
  [
    {
      "question": "Clear, specific question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "Exact match from options array",
      "explanation": "Detailed explanation with context and additional information",
      "difficulty": "${difficulty}",
      "season": "${season || 'All'}",
      "character": "${character || 'All'}",
      "category": "Specific category (e.g., 'Plot', 'Characters', 'Trivia', 'Production')"
    }
  ]
  
  Question Quality Guidelines:
  - Make questions specific and engaging
  - Avoid yes/no questions
  - Include context when necessary
  - Test different types of knowledge (facts, analysis, connections)
  - Make incorrect options believable but clearly wrong
  - Ensure explanations teach something new
  
  Example of a high-quality question:
  {
    "question": "In 'The One With The Embryos,' what item does Rachel incorrectly guess is in the bag during the lightning round?",
    "options": ["A boat", "A cat", "A baby", "A sandwich"],
    "correctAnswer": "A baby",
    "explanation": "Rachel guesses 'a baby' when the correct answer was 'a boat.' This moment showcases her competitive nature and becomes one of the most memorable scenes in the trivia episode, demonstrating how the gang's knowledge of each other can sometimes be surprisingly lacking.",
    "difficulty": "${difficulty}",
    "season": "${season || 'All'}",
    "character": "${character || 'All'}",
    "category": "Plot"
  }`;
  
  return instructions;
};

// Additional utility function for prompt validation
export const validatePromptFilters = (filters) => {
  const required = ['type', 'name', 'difficulty', 'questionCount'];
  const missing = required.filter(field => !filters[field]);
  
  if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  if (filters.questionCount < 1 || filters.questionCount > 50) {
      throw new Error('Question count must be between 1 and 50');
  }
  
  return true;
};

// Helper function to get content-specific examples
export const getContentExamples = (type) => {
  const examples = {
      'movie': {
          name: 'The Dark Knight',
          sampleQuestion: 'What is the Joker\'s philosophy about chaos in Gotham City?'
      },
      'tv show': {
          name: 'Breaking Bad',
          sampleQuestion: 'What alias does Walter White use when buying methylamine?'
      },
      'web series': {
          name: 'Stranger Things',
          sampleQuestion: 'What is the name of the alternate dimension in the show?'
      },
      'book': {
          name: 'Harry Potter',
          sampleQuestion: 'What is the incantation for the Patronus charm?'
      },
      'anime': {
          name: 'Attack on Titan',
          sampleQuestion: 'What is the name of Eren\'s titan form?'
      }
  };
  
  return examples[type.toLowerCase()] || examples['movie'];
};




// Validate if provided movie/show actually exists
export const validationPrompt_1 = (contentName,contentType) => {
  const prompt = `Please validate if "${contentName}" is a real ${contentType.toLowerCase()}. 
      
  If it exists, respond with: {"exists": true, "validatedName": "Correct Name"}
  If it doesn't exist, respond with: {"exists": false, "suggestions": ["Similar Name 1", "Similar Name 2", "Similar Name 3"]}
  
  Only respond with valid JSON format.`;
  return prompt

}

export const validatePrompt = (contentName,contentType) => {
  return `Generate 1 quiz questions about "${contentName}" (${contentType}).

IMPORTANT VALIDATION RULES:
1. First verify that "${contentName}" is a real ${contentType}
2. If it doesn't exist, respond with: {"exists": false, "suggestions": ["Similar Title 1", "Similar Title 2"]}
3. Only generate questions if the content definitely exists
4. Never use "undefined" or "doesn't exist" in questions or answers
5. All questions must have factual, verifiable answers

Difficulty: All
Format: JSON with questions array containing: question, options, correctAnswer, explanation, difficulty

If content doesn't exist, stop immediately and return the suggestions format.`;
};
