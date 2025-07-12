import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(...inputs);
}

export const backend_url = 'http://localhost:8000'

export const difficultyOptions = ['All', 'Easy', 'Medium', 'Hard'];
export const contentType = ["Movie","TV Show","Web Series","Documentary","Book","General Knowledge"]


export const defaultSelection = {
  type : 'TV Show',
  name : 'Friends',
  difficulty: 'All',
  season: 'All',
  character: 'All',
  questionCount: 5
}

  // Utility functions
export const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };


  export const getContentType = (type) => {
    switch (type) {
      case 'Movie':
        return {
          label: '🎬 Movie',
          className: 'text-red-600 bg-red-50'
        };
      case 'TV Show':
        return {
          label: '📺 TV Show',
          className: 'text-purple-600 bg-purple-50'
        };
      case 'Web Series':
        return {
          label: '🌐 Web Series',
          className: 'text-blue-600 bg-blue-50'
        };
      case 'Documentary':
        return {
          label: '🎥 Documentary',
          className: 'text-green-600 bg-green-50'
        };
      case 'Book':
        return {
          label: '📖 Book',
          className: 'text-orange-600 bg-orange-50'
        };
      case 'General Knowledge':
        return {
          label: '🧠 General Knowledge',
          className: 'text-yellow-600 bg-yellow-50'
        };
      default:
        return {
          label: '❓ Unknown',
          className: 'text-gray-600 bg-gray-50'
        };
    }
  };
  


  export const getScoreMessage = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) return 'Perfect! You must be a true fan! 🎉';
    if (percentage >= 80) return 'Excellent! You know your stuff! 👏';
    if (percentage >= 60) return 'Good job! You have solid knowledge! 👍';
    if (percentage >= 40) return 'Not bad! Keep exploring to learn more! 📚';
    return 'Keep watching and learning! Practice makes perfect! 💪';
  };


export const randomTopicList = [
    { type: 'Movie', name: 'The Matrix' },
    { type: 'TV Show', name: 'Breaking Bad' },
    { type: 'Movie', name: 'Inception' },
    { type: 'TV Show', name: 'Game of Thrones' },
    { type: 'Movie', name: 'Pulp Fiction' },
    { type: 'TV Show', name: 'The Office' },
    { type: 'Movie', name: 'Forrest Gump' },
    { type: 'General Knowledge', name: 'World History' },
    { type: 'General Knowledge', name: 'Science Facts' },
    { type: 'Movie', name: 'Star Wars' },
    { type: 'TV Show', name: 'Friends' },
    { type: 'Movie', name: 'Avengers' },
    { type: 'TV Show', name: 'Stranger Things' },
    { type: 'Movie', name: 'Titanic' },
    { type: 'TV Show', name: 'The Big Bang Theory' },
    { type: 'Movie', name: 'The Dark Knight' },
    { type: 'TV Show', name: 'Sherlock' },
    { type: 'Movie', name: 'Lord of the Rings' },
    { type: 'TV Show', name: 'The Mandalorian' },
    { type: 'Movie', name: 'Spider-Man' },
    { type: 'TV Show', name: 'The Crown' },
    { type: 'Movie', name: 'Jurassic Park' },
    { type: 'TV Show', name: 'Naruto' },
    { type: 'Movie', name: 'Your Name' },
    { type: 'TV Show', name: 'Attack on Titan' },
    { type: 'Movie', name: 'Spirited Away' },
    { type: 'TV Show', name: 'One Piece' },
    { type: 'Movie', name: 'Akira' },
    { type: 'TV Show', name: 'Death Note' },
    { type: 'Movie', name: 'Princess Mononoke' }
  ]



// export const models = [
//     {
//       id: 'gemini',
//       name: 'Google Gemini',
//       icon: '🤖',
//       color: 'from-blue-500 to-blue-600',
//       description: 'Google\'s advanced AI model',
//       apiKeyRequired: true,
//       apiKeyUrl: 'https://aistudio.google.com/app/apikey'
//     },
//     {
//       id: 'claude',
//       name: 'Anthropic Claude',
//       icon: '🧠',
//       color: 'from-orange-500 to-orange-600',
//       description: 'Anthropic\'s constitutional AI',
//       apiKeyRequired: true,
//       apiKeyUrl: 'https://console.anthropic.com/account/keys'
//     },
//     {
//       id: 'cohere',
//       name: 'Cohere',
//       icon: '🚀',
//       color: 'from-purple-500 to-purple-600',
//       description: 'Cohere\'s language model',
//       apiKeyRequired: true,
//       apiKeyUrl: 'https://dashboard.cohere.ai/api-keys'
//     },
//     {
//       id: 'mistral',
//       name: 'Mistral (Offline)',
//       icon: '⚡',
//       color: 'from-green-500 to-green-600',
//       description: 'Local offline model - no API key needed',
//       apiKeyRequired: false,
//       apiKeyUrl: null
//     }
//   ];

export const models = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    icon: '🤖',
    color: 'from-blue-500 to-blue-600',
    description: 'Google\'s advanced AI model',
    apiKeyRequired: true,
    apiKeyUrl: 'https://aistudio.google.com/app/apikey'
  },
  {
    id: 'claude',
    name: 'Anthropic Claude',
    icon: '🧠',
    color: 'from-orange-500 to-orange-600',
    description: 'Anthropic\'s constitutional AI',
    apiKeyRequired: true,
    apiKeyUrl: 'https://console.anthropic.com/account/keys'
  },
  {
    id: 'cohere',
    name: 'Cohere',
    icon: '🚀',
    color: 'from-purple-500 to-purple-600',
    description: 'Cohere\'s language model',
    apiKeyRequired: true,
    apiKeyUrl: 'https://dashboard.cohere.ai/api-keys'
  },
  {
    id: 'groq',
    name: 'Groq',
    icon: '⚡',
    color: 'from-yellow-500 to-yellow-600',
    description: 'Ultra-fast AI inference engine',
    apiKeyRequired: true,
    apiKeyUrl: 'https://console.groq.com/keys'
  },
  {
    id: 'mistral',
    name: 'Mistral (Offline)',
    icon: '🔒',
    color: 'from-green-500 to-green-600',
    description: 'Local offline model - no API key needed',
    apiKeyRequired: false,
    apiKeyUrl: null,
    prerequisites: [
      'Install Ollama on your system',
      'Download Mistral model: ollama pull mistral',
      'Ensure Ollama service is running',
      'Local API endpoint: http://localhost:11434'
    ]
  }
];
