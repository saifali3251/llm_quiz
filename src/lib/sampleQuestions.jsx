export const mockResponse = {
    questions: [
      {
        id: `mock-${Date.now()}-1`,
        question: "What was the name of Ross's monkey?",
        options: ["Marcel", "Kong", "George", "Bobo"],
        correctAnswer: "Marcel",
        explanation: "Ross had a capuchin monkey named Marcel in season 1.",
        difficulty: filters.difficulty !== 'All' ? filters.difficulty : 'Medium',
        season: filters.season !== 'All' ? filters.season : 'S1',
        character: filters.character !== 'All' ? filters.character : 'Ross'
      },
      {
        id: `mock-${Date.now()}-2`,
        question: "What is Joey's catchphrase?",
        options: ["How you doin'?", "We were on a break!", "Oh. My. God.", "Smelly cat"],
        correctAnswer: "How you doin'?",
        explanation: "Joey's signature pickup line was 'How you doin'?'",
        difficulty: filters.difficulty !== 'All' ? filters.difficulty : 'Easy',
        season: filters.season !== 'All' ? filters.season : 'S2',
        character: filters.character !== 'All' ? filters.character : 'Joey'
      }
    ]
  };
