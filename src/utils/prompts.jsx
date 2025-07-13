// Enhanced prompt generator with improved reliability and creativity
export const generateLLMPrompt = (filters) => {
  const { type, name, difficulty, questionCount } = filters;
  
  // Enhanced base prompt with clear role definition
  let prompt = `You are QuizMaster AI, an expert quiz creator with deep knowledge across entertainment, literature, and pop culture. Your specialty is creating engaging, thought-provoking questions that challenge and educate.

MISSION: Create ${questionCount} exceptional quiz questions about the ${type} "${name}".

`;
  
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
  
  // Add robust formatting instructions
  prompt += getEnhancedFormattingInstructions(filters);
  
  return prompt;
};

// Enhanced movie-specific prompt
const getMoviePrompt = (name, difficulty, questionCount, filters) => {
  let prompt = `🎬 MOVIE QUIZ CREATION BRIEF:

TARGET CONTENT: "${name}"
QUESTION COUNT: ${questionCount}
CHALLENGE LEVEL: ${difficulty}

CREATIVE FOCUS AREAS:
• 🎭 Character Psychology & Development
  - Motivations, fears, and internal conflicts
  - Character arcs and transformation moments
  - Relationship dynamics and chemistry

• 🎬 Cinematic Storytelling
  - Plot twists and narrative structure
  - Symbolism and visual metaphors
  - Directorial choices and their impact

• 🎪 Behind-the-Scenes Magic
  - Casting stories and actor preparations
  - Production challenges and solutions
  - Easter eggs and hidden details

• 🏆 Cultural Impact & Legacy
  - Box office records and achievements
  - Critical reception and awards
  - Influence on other films or culture

QUESTION CREATIVITY TECHNIQUES:
- Use "What if" scenarios based on plot points
- Include quote completion with context
- Test knowledge of subtle visual cues
- Explore alternate endings or deleted scenes
- Connect themes to real-world parallels

`;
  
  prompt += getDifficultyInstructions(difficulty, 'movie');
  
  return prompt;
};

// Enhanced TV/Web Series specific prompt
const getTVSeriesPrompt = (name, difficulty, questionCount, filters) => {
  const { season, character } = filters;
  
  let prompt = `📺 SERIES QUIZ CREATION BRIEF:

TARGET CONTENT: "${name}"
QUESTION COUNT: ${questionCount}
CHALLENGE LEVEL: ${difficulty}

CREATIVE FOCUS DIMENSIONS:
• 🎭 Character Universe
  - Multi-layered character development
  - Hidden backstories and motivations
  - Character relationships and evolution
  - Memorable catchphrases and mannerisms

• 📖 Narrative Architecture
  - Episode-specific plot threads
  - Seasonal story arcs and themes
  - Foreshadowing and callbacks
  - Cliffhangers and resolution patterns

• 🎨 World-Building Elements
  - Setting details and atmosphere
  - Running gags and inside jokes
  - Show mythology and lore
  - Cultural references and parodies

• 🎬 Production Insights
  - Behind-the-scenes trivia
  - Actor improvisations and ad-libs
  - Writer's room decisions
  - Fan theories and creator confirmations

`;
  
  // Enhanced season-specific instructions
  if (season && season !== 'All') {
      const seasonNum = season.substring(1);
      prompt += `🎯 SEASON ${seasonNum} SPECIALIZATION:
- Key character developments unique to this season
- Major plot revelations and turning points
- New characters and their integration
- Season-specific themes and motifs
- Memorable episodes and their significance
- How this season advanced the overall narrative

`;
  }
  
  // Enhanced character-specific instructions
  if (character && character !== 'All') {
      prompt += `👤 CHARACTER SPOTLIGHT: ${character}
- Deep dive into ${character}'s personality layers
- Their most defining moments and quotes
- Relationships and interactions with other characters
- Character growth throughout the series
- Fan-favorite scenes and episodes featuring ${character}
- Hidden traits and lesser-known facts

`;
  }
  
  prompt += getDifficultyInstructions(difficulty, 'series');
  
  return prompt;
};

// Enhanced book-specific prompt
const getBookPrompt = (name, difficulty, questionCount, filters) => {
  let prompt = `📚 LITERARY QUIZ CREATION BRIEF:

TARGET CONTENT: "${name}"
QUESTION COUNT: ${questionCount}
CHALLENGE LEVEL: ${difficulty}

CREATIVE EXPLORATION AREAS:
• 📝 Literary Craftsmanship
  - Narrative techniques and style
  - Symbolism and metaphors
  - Foreshadowing and irony
  - Point of view and voice

• 🎭 Character Depth
  - Psychological complexity
  - Character motivations and flaws
  - Relationship dynamics
  - Growth and transformation

• 🌍 World and Context
  - Setting significance and atmosphere
  - Historical and cultural background
  - Social commentary and themes
  - Author's biographical influences

• 🎨 Literary Impact
  - Critical reception and analysis
  - Influence on other works
  - Adaptations and interpretations
  - Cultural significance

QUESTION INNOVATION TECHNIQUES:
- Compare character choices to alternatives
- Explore thematic connections
- Test understanding of literary devices
- Examine cause-and-effect relationships
- Connect to broader literary movements

`;
  
  prompt += getDifficultyInstructions(difficulty, 'book');
  
  return prompt;
};

// Enhanced anime-specific prompt
const getAnimePrompt = (name, difficulty, questionCount, filters) => {
  let prompt = `🎌 ANIME QUIZ CREATION BRIEF:

TARGET CONTENT: "${name}"
QUESTION COUNT: ${questionCount}
CHALLENGE LEVEL: ${difficulty}

CREATIVE FOCUS SPECTRUM:
• ⚡ Power Systems & Abilities
  - Unique abilities and their limitations
  - Training methods and power evolution
  - Battle strategies and techniques
  - Power scaling and rankings

• 🎭 Character Dynamics
  - Personality archetypes and development
  - Rival relationships and friendships
  - Mentor-student bonds
  - Character backstories and trauma

• 🌸 Cultural Elements
  - Japanese cultural references
  - Traditional values and modern themes
  - Language nuances and honorifics
  - Seasonal and festival elements

• 🎬 Anime Production
  - Studio history and style
  - Voice acting performances
  - Animation techniques and quality
  - Soundtrack and opening themes

ANIME-SPECIFIC QUESTION STYLES:
- Test knowledge of Japanese terminology
- Explore character power progressions
- Include visual symbolism questions
- Reference specific animation sequences
- Connect to broader anime culture

`;
  
  prompt += getDifficultyInstructions(difficulty, 'anime');
  
  return prompt;
};

// Enhanced generic prompt
const getGenericPrompt = (name, type, difficulty, questionCount, filters) => {
  let prompt = `🎯 GENERAL QUIZ CREATION BRIEF:

TARGET CONTENT: "${name}" (${type})
QUESTION COUNT: ${questionCount}
CHALLENGE LEVEL: ${difficulty}

CREATIVE EXPLORATION FRAMEWORK:
• 📊 Core Knowledge
  - Essential facts and information
  - Key features and characteristics
  - Important dates and milestones
  - Notable figures and contributors

• 🔍 Deep Analysis
  - Underlying themes and messages
  - Cause and effect relationships
  - Comparative elements
  - Historical significance

• 🌟 Engaging Angles
  - Surprising facts and trivia
  - Connections to other topics
  - Cultural impact and influence
  - Personal and emotional elements

`;
  
  prompt += getDifficultyInstructions(difficulty, type);
  
  return prompt;
};

// Enhanced difficulty-specific instructions
const getDifficultyInstructions = (difficulty, contentType) => {
  if (difficulty === 'All') {
    return `📊 DIFFICULTY SPECTRUM: Mix of Easy, Medium, and Hard questions to create a balanced challenge progression.\n\n`;
  }
  
  let instructions = `🎯 DIFFICULTY CALIBRATION: ${difficulty}\n\n`;
  
  const difficultyMap = {
      'Easy': {
          'movie': '🟢 ACCESSIBLE LEVEL: Famous scenes, main characters, iconic quotes, obvious plot points that casual viewers would know',
          'series': '🟢 ACCESSIBLE LEVEL: Main character names, popular episodes, well-known catchphrases, basic plot elements',
          'book': '🟢 ACCESSIBLE LEVEL: Major characters, central plot, famous quotes, obvious themes that most readers remember',
          'anime': '🟢 ACCESSIBLE LEVEL: Main character names, basic abilities, popular arcs, well-known techniques',
          'default': '🟢 ACCESSIBLE LEVEL: Basic facts, main elements, widely known information'
      },
      'Medium': {
          'movie': '🟡 INTERMEDIATE LEVEL: Specific scenes, supporting characters, detailed plot analysis, moderate behind-the-scenes knowledge',
          'series': '🟡 INTERMEDIATE LEVEL: Episode-specific details, character development arcs, recurring themes, moderate fan knowledge',
          'book': '🟡 INTERMEDIATE LEVEL: Supporting characters, literary techniques, detailed plot analysis, thematic understanding',
          'anime': '🟡 INTERMEDIATE LEVEL: Specific techniques, character backgrounds, detailed world-building, moderate otaku knowledge',
          'default': '🟡 INTERMEDIATE LEVEL: Detailed information, specific facts, moderate depth knowledge'
      },
      'Hard': {
          'movie': '🔴 EXPERT LEVEL: Obscure trivia, production secrets, minor character details, deep analysis, easter eggs, deleted scenes',
          'series': '🔴 EXPERT LEVEL: Obscure references, writer insights, minor character details, deep lore, behind-the-scenes secrets',
          'book': '🔴 EXPERT LEVEL: Literary analysis, minor details, author techniques, critical interpretations, scholarly insights',
          'anime': '🔴 EXPERT LEVEL: Deep lore, production trivia, voice actor details, manga differences, cultural references',
          'default': '🔴 EXPERT LEVEL: Obscure facts, expert knowledge, specialized information'
      }
  };
  
  const typeKey = difficultyMap[difficulty][contentType] || difficultyMap[difficulty]['default'];
  instructions += `${typeKey}\n\n`;
  
  return instructions;
};

// Enhanced formatting instructions with better error handling
const getEnhancedFormattingInstructions = (filters) => {
  const { difficulty, season, character } = filters;
  
  let instructions = `🎨 QUESTION CRAFTING EXCELLENCE:

CREATIVITY GUIDELINES:
• Make each question tell a mini-story
• Use vivid, descriptive language
• Include emotional hooks and intrigue
• Balance factual accuracy with entertainment value
• Create "aha!" moments in explanations

ENGAGEMENT TECHNIQUES:
• Start questions with compelling setups
• Use specific examples and scenarios
• Include context that adds depth
• Make wrong answers believable but clearly incorrect
• Add interesting trivia in explanations

🔧 TECHNICAL SPECIFICATIONS:

CRITICAL: You MUST respond with valid JSON only. No additional text, no markdown, no explanations outside the JSON structure.

REQUIRED JSON FORMAT:
[
  {
    "question": "Engaging question with specific context and clear focus",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Exact match from options array",
    "explanation": "Detailed explanation with additional context, fun facts, and educational value",
    "difficulty": "${difficulty}",
    "season": "${season || 'All'}",
    "character": "${character || 'All'}",
    "category": "Specific category (Plot, Characters, Production, Themes, etc.)"
  }
]

QUALITY ASSURANCE CHECKLIST:
✅ Question is specific and well-researched
✅ All 4 options are plausible but only one is correct
✅ Explanation provides value beyond just the answer
✅ Language is engaging and descriptive
✅ No typos or grammatical errors
✅ Difficulty matches the specified level
✅ Question avoids overly obvious or impossible answers

EXAMPLE OF EXCELLENCE:
{
  "question": "During the intense hospital scene in 'The Dark Knight,' what seemingly innocent object does the Joker use to create chaos while visiting Harvey Dent?",
  "options": ["A flower bouquet", "A nurse's uniform", "A remote control", "A get-well card"],
  "correctAnswer": "A remote control",
  "explanation": "The Joker uses a remote control to threaten to blow up the hospital, creating one of the film's most tension-filled scenes. This moment perfectly demonstrates his chaotic nature and psychological manipulation, as he uses Harvey's vulnerability to turn him into Two-Face. The scene was actually filmed at a real hospital scheduled for demolition.",
  "difficulty": "${difficulty}",
  "season": "${season || 'All'}",
  "character": "${character || 'All'}",
  "category": "Plot"
}

ERROR PREVENTION RULES:
- Never use placeholder text like "undefined" or "N/A"
- Ensure all questions have verifiable answers
- Double-check JSON syntax for validity
- Make sure correctAnswer exactly matches one option
- Avoid questions that are too subjective or opinion-based

FINAL REMINDER: Return ONLY the JSON array. No additional text before or after.`;
  
  return instructions;
};

// Enhanced validation function
export const validatePromptFilters = (filters) => {
  const required = ['type', 'name', 'difficulty', 'questionCount'];
  const missing = required.filter(field => !filters[field]);
  
  if (missing.length > 0) {
      throw new Error(`Missing required fields: ${missing.join(', ')}`);
  }
  
  if (filters.questionCount < 1 || filters.questionCount > 50) {
      throw new Error('Question count must be between 1 and 50');
  }
  
  // Additional validation for content name
  if (filters.name.trim().length < 2) {
      throw new Error('Content name must be at least 2 characters long');
  }
  
  return true;
};

// Enhanced validation prompt with better error handling
export const validatePrompt_new = (contentName, contentType) => {
  return `You are a content validation specialist. Your task is to verify if "${contentName}" is a real ${contentType}.

VALIDATION PROCESS:
1. Check if "${contentName}" exists as a legitimate ${contentType}
2. Consider variations in spelling, alternate titles, or regional names
3. Verify it's not a made-up or fictional title

RESPONSE FORMAT (JSON only):

If content EXISTS:
{
  "exists": true,
  "validatedName": "Correct Official Title",
  "alternateNames": ["Alternate Title 1", "Alternate Title 2"],
  "additionalInfo": "Brief context about the content"
}

If content DOESN'T EXIST:
{
  "exists": false,
  "suggestions": ["Similar Real Title 1", "Similar Real Title 2", "Similar Real Title 3"],
  "searchTips": "Try searching for similar titles or check spelling"
}

CRITICAL: Respond with valid JSON only. No additional text or explanations.

Content to validate: "${contentName}" (${contentType})`;
};

// Enhanced content examples with more variety
export const getContentExamples = (type) => {
  const examples = {
      'movie': [
          { name: 'The Dark Knight', genre: 'Superhero/Crime' },
          { name: 'Inception', genre: 'Sci-Fi/Thriller' },
          { name: 'Parasite', genre: 'Drama/Thriller' }
      ],
      'tv show': [
          { name: 'Breaking Bad', genre: 'Crime Drama' },
          { name: 'The Office', genre: 'Comedy' },
          { name: 'Game of Thrones', genre: 'Fantasy' }
      ],
      'web series': [
          { name: 'Stranger Things', genre: 'Sci-Fi/Horror' },
          { name: 'The Boys', genre: 'Superhero/Dark Comedy' },
          { name: 'Wednesday', genre: 'Mystery/Comedy' }
      ],
      'book': [
          { name: 'Harry Potter', genre: 'Fantasy' },
          { name: 'The Great Gatsby', genre: 'Classic Literature' },
          { name: 'Dune', genre: 'Science Fiction' }
      ],
      'anime': [
          { name: 'Attack on Titan', genre: 'Action/Drama' },
          { name: 'Death Note', genre: 'Psychological Thriller' },
          { name: 'My Hero Academia', genre: 'Superhero/School' }
      ]
  };
  
  return examples[type.toLowerCase()] || examples['movie'];
};

// Fallback prompt for error situations
export const generateFallbackPrompt = (contentName, contentType, questionCount) => {
  return `EMERGENCY QUIZ GENERATION MODE

You are an expert quiz creator. Create ${questionCount} high-quality questions about "${contentName}" (${contentType}).

STRICT REQUIREMENTS:
- Return valid JSON array only
- No additional text or explanations
- Use the exact format specified below
- Make questions engaging and accurate

JSON FORMAT:
[
  {
    "question": "Clear, specific question about ${contentName}",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "One of the options above",
    "explanation": "Informative explanation with context",
    "difficulty": "Medium",
    "season": "All",
    "character": "All",
    "category": "General"
  }
]

Focus on creating factual, verifiable questions that test knowledge about ${contentName}. Ensure all answers are accurate and well-researched.

IMPORTANT: Return ONLY the JSON array. No other text.`;
};


// // Enhanced prompt generator with dynamic templates for different content types
// export const generateLLMPrompt = (filters) => {
//   const { type, name, difficulty, questionCount } = filters;
  
//   // Base prompt structure
//   let prompt = `You are an expert quiz creator specializing in ${type} trivia. `;
  
//   // Dynamic prompt based on content type
//   switch (type.toLowerCase()) {
//       case 'movie':
//           prompt += getMoviePrompt(name, difficulty, questionCount, filters);
//           break;
//       case 'tv show':
//       case 'web series':
//       case 'series':
//           prompt += getTVSeriesPrompt(name, difficulty, questionCount, filters);
//           break;
//       case 'book':
//           prompt += getBookPrompt(name, difficulty, questionCount, filters);
//           break;
//       case 'anime':
//           prompt += getAnimePrompt(name, difficulty, questionCount, filters);
//           break;
//       default:
//           prompt += getGenericPrompt(name, type, difficulty, questionCount, filters);
//   }
  
//   // Add common formatting instructions
//   prompt += getFormattingInstructions(filters);
  
//   return prompt;
// };

// // Movie-specific prompt
// const getMoviePrompt = (name, difficulty, questionCount, filters) => {
//   let prompt = `Generate ${questionCount} compelling multiple-choice questions about the movie "${name}". `;
  
//   prompt += `Focus on creating questions that test knowledge about:
//   - Plot details and story progression
//   - Character development and relationships
//   - Memorable dialogue and quotes
//   - Behind-the-scenes trivia and production details
//   - Cast and crew information
//   - Awards and critical reception
//   - Cultural impact and legacy
//   `;
  
//   prompt += getDifficultyInstructions(difficulty, 'movie');
  
//   prompt += `Make questions engaging by:
//   - Using specific scene references
//   - Including memorable quotes as options
//   - Testing knowledge of iconic moments
//   - Incorporating production trivia
//   - Adding context about the film's significance
//   `;
  
//   return prompt;
// };

// // TV/Web Series specific prompt
// const getTVSeriesPrompt = (name, difficulty, questionCount, filters) => {
//   const { season, character } = filters;
  
//   let prompt = `Generate ${questionCount} engaging multiple-choice questions about the ${filters.type} "${name}". `;
  
//   prompt += `Focus on creating questions that explore:
//   - Character arcs and development across episodes
//   - Plot twists and story revelations
//   - Relationship dynamics and character interactions
//   - Episode-specific events and storylines
//   - Running gags and recurring themes
//   - Character backstories and motivations
//   - Show mythology and world-building
//   `;
  
//   // Season-specific instructions
//   if (season && season !== 'All') {
//       const seasonNum = season.substring(1);
//       prompt += `\nFocus specifically on Season ${seasonNum}:
//       - Key events and plot developments from this season
//       - Character growth and changes during this season
//       - Season-specific storylines and arcs
//       - New characters introduced in this season
//       - Season finale and cliffhangers
//       `;
//   }
  
//   // Character-specific instructions
//   if (character && character !== 'All') {
//       prompt += `\nAll questions should center around ${character}:
//       - ${character}'s personality traits and quirks
//       - Their relationships with other characters
//       - Their memorable quotes and catchphrases
//       - Their character development throughout the show
//       - Specific scenes or episodes featuring ${character}
//       `;
//   }
  
//   prompt += getDifficultyInstructions(difficulty, 'series');
  
//   prompt += `Make questions compelling by:
//   - Referencing specific episodes or scenes
//   - Including character-specific dialogue
//   - Testing knowledge of running jokes
//   - Exploring character relationships
//   - Incorporating fan-favorite moments
//   `;
  
//   return prompt;
// };

// // Book-specific prompt
// const getBookPrompt = (name, difficulty, questionCount, filters) => {
//   let prompt = `Generate ${questionCount} thought-provoking multiple-choice questions about the book "${name}". `;
  
//   prompt += `Focus on creating questions that examine:
//   - Plot structure and narrative development
//   - Character motivations and growth
//   - Themes and symbolic elements
//   - Setting and world-building
//   - Writing style and literary techniques
//   - Author's background and influences
//   - Historical or cultural context
//   `;
  
//   prompt += getDifficultyInstructions(difficulty, 'book');
  
//   return prompt;
// };

// // Anime-specific prompt
// const getAnimePrompt = (name, difficulty, questionCount, filters) => {
//   let prompt = `Generate ${questionCount} exciting multiple-choice questions about the anime "${name}". `;
  
//   prompt += `Focus on creating questions that cover:
//   - Character abilities and power systems
//   - Plot arcs and story progression
//   - Character relationships and rivalries
//   - Anime-specific terminology and concepts
//   - Animation studio and production details
//   - Voice acting and soundtrack
//   - Cultural references and Japanese elements
//   `;
  
//   prompt += getDifficultyInstructions(difficulty, 'anime');
  
//   return prompt;
// };

// // Generic prompt for other content types
// const getGenericPrompt = (name, type, difficulty, questionCount, filters) => {
//   let prompt = `Generate ${questionCount} interesting multiple-choice questions about the ${type} "${name}". `;
  
//   prompt += `Create questions that test knowledge about:
//   - Main content and key elements
//   - Important details and facts
//   - Context and background information
//   - Significant aspects and features
//   `;
  
//   prompt += getDifficultyInstructions(difficulty, type);
  
//   return prompt;
// };

// // Difficulty-specific instructions
// const getDifficultyInstructions = (difficulty, contentType) => {
//   if (difficulty === 'All') return '';
  
//   let instructions = `\nDifficulty Level: ${difficulty}\n`;
  
//   const difficultyMap = {
//       'Easy': {
//           'movie': 'Basic plot points, main characters, famous quotes, obvious visual elements',
//           'series': 'Main character names, basic plot, famous episodes, obvious running gags',
//           'book': 'Main characters, basic plot, well-known quotes, obvious themes',
//           'anime': 'Main character names, basic plot, popular techniques, obvious story elements',
//           'default': 'Basic facts, main elements, well-known information'
//       },
//       'Medium': {
//           'movie': 'Specific scenes, supporting characters, detailed plot points, moderate trivia',
//           'series': 'Episode-specific details, character development, moderate fan knowledge',
//           'book': 'Supporting characters, detailed plot points, literary techniques, moderate analysis',
//           'anime': 'Specific techniques, episode details, character development, moderate fan knowledge',
//           'default': 'Detailed information, specific facts, moderate depth knowledge'
//       },
//       'Hard': {
//           'movie': 'Obscure trivia, production details, minor characters, deep analysis, easter eggs',
//           'series': 'Obscure references, minor character details, deep fan knowledge, behind-the-scenes',
//           'book': 'Obscure details, deep literary analysis, minor characters, author\'s techniques',
//           'anime': 'Obscure techniques, minor character details, deep lore, production trivia',
//           'default': 'Obscure facts, deep knowledge, expert-level information'
//       }
//   };
  
//   const typeKey = difficultyMap[difficulty][contentType] || difficultyMap[difficulty]['default'];
//   instructions += `Focus on: ${typeKey}\n`;
  
//   return instructions;
// };

// // Common formatting instructions
// const getFormattingInstructions = (filters) => {
//   const { difficulty, season, character } = filters;
  
//   let instructions = `\nIMPORTANT FORMATTING REQUIREMENTS:
  
//   1. Return ONLY a valid JSON array - no additional text before or after
//   2. Each question must be unique and well-researched
//   3. Options should be plausible but clearly distinguishable
//   4. Explanations should be informative and add value
//   5. Avoid questions that are too obvious or impossibly obscure
//   6. Include context in explanations to enhance learning
  
//   Required JSON structure:
//   [
//     {
//       "question": "Clear, specific question text",
//       "options": ["Option A", "Option B", "Option C", "Option D"],
//       "correctAnswer": "Exact match from options array",
//       "explanation": "Detailed explanation with context and additional information",
//       "difficulty": "${difficulty}",
//       "season": "${season || 'All'}",
//       "character": "${character || 'All'}",
//       "category": "Specific category (e.g., 'Plot', 'Characters', 'Trivia', 'Production')"
//     }
//   ]
  
//   Question Quality Guidelines:
//   - Make questions specific and engaging
//   - Avoid yes/no questions
//   - Include context when necessary
//   - Test different types of knowledge (facts, analysis, connections)
//   - Make incorrect options believable but clearly wrong
//   - Ensure explanations teach something new
  
//   Example of a high-quality question:
//   {
//     "question": "In 'The One With The Embryos,' what item does Rachel incorrectly guess is in the bag during the lightning round?",
//     "options": ["A boat", "A cat", "A baby", "A sandwich"],
//     "correctAnswer": "A baby",
//     "explanation": "Rachel guesses 'a baby' when the correct answer was 'a boat.' This moment showcases her competitive nature and becomes one of the most memorable scenes in the trivia episode, demonstrating how the gang's knowledge of each other can sometimes be surprisingly lacking.",
//     "difficulty": "${difficulty}",
//     "season": "${season || 'All'}",
//     "character": "${character || 'All'}",
//     "category": "Plot"
//   }`;
  
//   return instructions;
// };

// // Additional utility function for prompt validation
// export const validatePromptFilters = (filters) => {
//   const required = ['type', 'name', 'difficulty', 'questionCount'];
//   const missing = required.filter(field => !filters[field]);
  
//   if (missing.length > 0) {
//       throw new Error(`Missing required fields: ${missing.join(', ')}`);
//   }
  
//   if (filters.questionCount < 1 || filters.questionCount > 50) {
//       throw new Error('Question count must be between 1 and 50');
//   }
  
//   return true;
// };

// // Helper function to get content-specific examples
// export const getContentExamples = (type) => {
//   const examples = {
//       'movie': {
//           name: 'The Dark Knight',
//           sampleQuestion: 'What is the Joker\'s philosophy about chaos in Gotham City?'
//       },
//       'tv show': {
//           name: 'Breaking Bad',
//           sampleQuestion: 'What alias does Walter White use when buying methylamine?'
//       },
//       'web series': {
//           name: 'Stranger Things',
//           sampleQuestion: 'What is the name of the alternate dimension in the show?'
//       },
//       'book': {
//           name: 'Harry Potter',
//           sampleQuestion: 'What is the incantation for the Patronus charm?'
//       },
//       'anime': {
//           name: 'Attack on Titan',
//           sampleQuestion: 'What is the name of Eren\'s titan form?'
//       }
//   };
  
//   return examples[type.toLowerCase()] || examples['movie'];
// };




// // Validate if provided movie/show actually exists
// export const validationPrompt_1 = (contentName,contentType) => {
//   const prompt = `Please validate if "${contentName}" is a real ${contentType.toLowerCase()}. 
      
//   If it exists, respond with: {"exists": true, "validatedName": "Correct Name"}
//   If it doesn't exist, respond with: {"exists": false, "suggestions": ["Similar Name 1", "Similar Name 2", "Similar Name 3"]}
  
//   Only respond with valid JSON format.`;
//   return prompt

// }

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
