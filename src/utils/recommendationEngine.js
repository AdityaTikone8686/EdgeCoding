/**
 * CodeQuest Course Recommendation Engine
 * Generates a personalized learning path based on user's skill assessment.
 */

const languageRecommendations = {
    beginner: {
        'Web Development': { lang: 'JavaScript', reason: 'JavaScript powers the web — perfect entry point for web dev beginners.' },
        'App Development': { lang: 'JavaScript', reason: 'React Native / Expo lets you build mobile apps with JavaScript.' },
        'Competitive Programming': { lang: 'C++', reason: 'C++ is the gold standard for competitive programming speed.' },
        'Data Science': { lang: 'Python', reason: 'Python has the richest data science ecosystem (NumPy, Pandas, etc.).' },
        'AI/ML': { lang: 'Python', reason: 'Python is the de-facto language for AI/ML with TensorFlow and PyTorch.' },
        'default': { lang: 'Python', reason: 'Python is the most beginner-friendly language with clean syntax.' },
    },
    intermediate: {
        'Web Development': { lang: 'JavaScript', reason: 'Deepen your frontend & backend skills with Node.js and React.' },
        'App Development': { lang: 'Java', reason: 'Java is essential for Android development and enterprise apps.' },
        'Competitive Programming': { lang: 'C++', reason: 'Strengthen your CP skills with advanced C++ STL mastery.' },
        'Data Science': { lang: 'Python', reason: 'Advance to ML pipelines and data visualization with Python.' },
        'AI/ML': { lang: 'Python', reason: 'Master deep learning frameworks available in Python.' },
        'default': { lang: 'Java', reason: 'Java will solidify your OOP and system design foundations.' },
    },
    advanced: {
        'Web Development': { lang: 'JavaScript', reason: 'Master full-stack architecture, performance, and scalability.' },
        'App Development': { lang: 'Java', reason: 'Build production-grade Android apps with Java.' },
        'Competitive Programming': { lang: 'C++', reason: 'Dominate competitive programming with advanced C++ techniques.' },
        'Data Science': { lang: 'Python', reason: 'Research-level ML and big data engineering with Python.' },
        'AI/ML': { lang: 'Python', reason: 'Build and deploy AI systems using Python frameworks.' },
        'default': { lang: 'C++', reason: 'C++ will push your systems programming and performance optimization.' },
    },
};

const dsaModulesByGoal = {
    'Crack coding interviews': [
        'Arrays & Strings', 'Hash Maps & Sets', 'Two Pointers', 'Sliding Window',
        'Trees & Graphs', 'Dynamic Programming', 'System Design Basics'
    ],
    'Placement preparation': [
        'Arrays & Sorting', 'Recursion & Backtracking', 'Linked Lists', 'Stacks & Queues',
        'Trees', 'Graphs (BFS/DFS)', 'Greedy Algorithms', 'DP Patterns'
    ],
    'Improve problem solving': [
        'Brute Force → Optimization', 'Divide & Conquer', 'Greedy Techniques',
        'Pattern Recognition', 'Time Complexity Analysis', 'Space Optimization'
    ],
    'Build real-world projects': [
        'Data Structures Fundamentals', 'Algorithm Design', 'Caching & Hashing',
        'Graph Applications', 'Sorting in Practice'
    ],
    'College exams': [
        'Arrays & Strings', 'Searching & Sorting', 'Stack, Queue, Linked List',
        'Trees & Binary Search Tree', 'Graph Traversals', 'Recursion'
    ],
};

const learningPaths = {
    Python: [
        { week: '1-2', topic: 'Python Basics', desc: 'Variables, data types, control flow, functions' },
        { week: '3-4', topic: 'OOP in Python', desc: 'Classes, inheritance, polymorphism, modules' },
        { week: '5-6', topic: 'Data Structures', desc: 'Lists, dicts, sets, tuples, comprehensions' },
        { week: '7-8', topic: 'Advanced Python', desc: 'Decorators, generators, async, libraries' },
        { week: '9-12', topic: 'DSA with Python', desc: 'Algorithms and problem-solving using Python' },
    ],
    JavaScript: [
        { week: '1-2', topic: 'JS Fundamentals', desc: 'Variables, functions, DOM, ES6+ features' },
        { week: '3-4', topic: 'Async JavaScript', desc: 'Promises, async/await, Fetch API, closures' },
        { week: '5-6', topic: 'React Basics', desc: 'Components, state, props, hooks, routing' },
        { week: '7-8', topic: 'Node.js & Backend', desc: 'Express, REST APIs, authentication, databases' },
        { week: '9-12', topic: 'DSA with JavaScript', desc: 'Data structures and algorithms in JS' },
    ],
    'C++': [
        { week: '1-2', topic: 'C++ Fundamentals', desc: 'Syntax, pointers, memory, OOPS basics' },
        { week: '3-4', topic: 'STL Mastery', desc: 'Vectors, maps, sets, pairs, iterators' },
        { week: '5-6', topic: 'Competitive Basics', desc: 'Time complexity, brute force, greedy' },
        { week: '7-8', topic: 'Advanced DSA', desc: 'Graphs, DP, segment trees, advanced algos' },
        { week: '9-12', topic: 'CP Grind', desc: 'Codeforces, LeetCode, AtCoder problems' },
    ],
    Java: [
        { week: '1-2', topic: 'Java Fundamentals', desc: 'OOP, JVM, classes, interfaces, generics' },
        { week: '3-4', topic: 'Collections Framework', desc: 'ArrayList, HashMap, TreeMap, LinkedList' },
        { week: '5-6', topic: 'Advanced Java', desc: 'Streams, lambdas, multithreading, exceptions' },
        { week: '7-8', topic: 'Spring Boot Basics', desc: 'REST APIs, dependency injection, JPA' },
        { week: '9-12', topic: 'DSA with Java', desc: 'Core algorithms and interview problems' },
    ],
};

export function generateRecommendation({ skillLevel, interests, goals, knownLanguages }) {
    const level = skillLevel?.toLowerCase() || 'beginner';
    const primaryInterest = interests?.[0] || 'default';

    const langMap = languageRecommendations[level] || languageRecommendations.beginner;
    const recommendation = langMap[primaryInterest] || langMap['default'];

    // If user already knows the recommended language, suggest next best
    let recommendedLang = recommendation.lang;
    if (knownLanguages?.includes(recommendedLang) && knownLanguages.length > 0) {
        const alternatives = ['Python', 'JavaScript', 'C++', 'Java']
            .filter(l => !knownLanguages.includes(l));
        if (alternatives.length > 0) recommendedLang = alternatives[0];
    }

    // Collect DSA modules based on all goals
    const dsaModules = [...new Set(
        goals?.flatMap(g => dsaModulesByGoal[g] || []) || dsaModulesByGoal['Improve problem solving']
    )].slice(0, 8);

    const path = learningPaths[recommendedLang] || learningPaths['Python'];

    // XP estimate
    const baseXP = level === 'beginner' ? 0 : level === 'intermediate' ? 1200 : 3500;
    const estimatedWeeks = level === 'beginner' ? 12 : level === 'intermediate' ? 8 : 5;

    return {
        recommendedLanguage: recommendedLang,
        reason: recommendation.reason,
        learningPath: path,
        dsaModules,
        startingXP: baseXP,
        estimatedWeeks,
        level: level === 'beginner' ? 1 : level === 'intermediate' ? 5 : 10,
        badge: level === 'beginner' ? '🌱 Seedling' : level === 'intermediate' ? '⚡ Coder' : '🔥 Pro',
    };
}
