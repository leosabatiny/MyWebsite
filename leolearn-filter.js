// leolearn-filter.js
document.addEventListener('DOMContentLoaded', () => {
    // The NEW, MASSIVELY EXPANDED structure of all our filter options
    const filterData = {
        'all': { name: 'All Domains', subtopics: {} },
        'technology': {
            name: 'Technology',
            subtopics: {
                'all': { name: 'All Technology', subsubtopics: {} },
                'ai': {
                    name: 'Artificial Intelligence',
                    subsubtopics: { 'all': 'All AI', 'foundations': 'Foundations of AI', 'machine-learning': 'Machine Learning', 'neural-networks': 'Neural Networks', 'computer-vision': 'Computer Vision', 'nlp': 'NLP', 'robotics': 'Robotics' }
                },
                'web-development': {
                    name: 'Web Development',
                    subsubtopics: { 'all': 'All Web Dev', 'html-css': 'HTML & CSS', 'javascript': 'JavaScript (DOM, Async)', 'frontend-frameworks': 'Frontend Frameworks (React)', 'backend': 'Backend (Node.js, APIs)', 'responsive-design': 'Responsive Design' }
                },
                'software-engineering': {
                    name: 'Software Engineering',
                    subsubtopics: { 'all': 'All Software Eng.', 'data-structures': 'Data Structures', 'algorithms': 'Algorithms', 'design-patterns': 'Design Patterns', 'version-control': 'Version Control (Git)' }
                },
                'data-science': {
                    name: 'Data Science',
                    subsubtopics: { 'all': 'All Data Science', 'data-analysis': 'Data Analysis (Pandas)', 'visualization': 'Data Visualization', 'databases': 'Databases (SQL)', 'big-data': 'Big Data Technologies' }
                },
                'cybersecurity': {
                    name: 'Cybersecurity',
                    subsubtopics: { 'all': 'All Cybersecurity', 'networking-security': 'Network Security', 'cryptography': 'Cryptography', 'ethical-hacking': 'Ethical Hacking' }
                },
                'cloud-computing': {
                    name: 'Cloud Computing',
                    subsubtopics: { 'all': 'All Cloud', 'iaas-paas-saas': 'IaaS, PaaS, SaaS', 'aws': 'Amazon Web Services (AWS)', 'serverless': 'Serverless Architecture' }
                },
            }
        },
        'science-mathematics': {
            name: 'Science & Mathematics',
            subtopics: {
                'all': { name: 'All Science & Math', subsubtopics: {} },
                'physics': {
                    name: 'Physics',
                    subsubtopics: { 'all': 'All Physics', 'classical-mechanics': 'Classical Mechanics', 'electromagnetism': 'Electromagnetism', 'thermodynamics': 'Thermodynamics', 'relativity': 'Relativity', 'quantum-mechanics': 'Quantum Mechanics' }
                },
                'mathematics': {
                    name: 'Mathematics',
                    subsubtopics: { 'all': 'All Math', 'calculus': 'Calculus', 'linear-algebra': 'Linear Algebra', 'probability-stats': 'Probability & Statistics', 'abstract-algebra': 'Abstract Algebra', 'number-theory': 'Number Theory' }
                },
                'chemistry': {
                    name: 'Chemistry',
                    subsubtopics: { 'all': 'All Chemistry', 'periodic-table': 'The Periodic Table', 'atomic-structure': 'Atomic Structure', 'chemical-bonds': 'Chemical Bonds', 'organic': 'Organic Chemistry', 'inorganic': 'Inorganic Chemistry' }
                },
                'biology': {
                    name: 'Biology',
                    subsubtopics: { 'all': 'All Biology', 'cell-biology': 'Cell Biology', 'genetics': 'Genetics & DNA', 'evolution': 'Evolution by Natural Selection', 'ecology': 'Ecology', 'human-anatomy': 'Human Anatomy' }
                },
                'astronomy': {
                    name: 'Astronomy',
                    subsubtopics: { 'all': 'All Astronomy', 'solar-system': 'The Solar System', 'stars-galaxies': 'Stars & Galaxies', 'cosmology': 'Cosmology (The Big Bang)', 'exoplanets': 'Exoplanets' }
                },
            }
        },
        'social-sciences-humanities': {
            name: 'Social Sciences & Humanities',
            subtopics: {
                'all': { name: 'All Social Sci & Humanities', subsubtopics: {} },
                'psychology': {
                    name: 'Psychology',
                    subsubtopics: { 'all': 'All Psychology', 'behavioral': 'Behavioral Psychology (Conditioning)', 'cognitive': 'Cognitive Psychology (Memory)', 'developmental': "Developmental (Piaget's Stages)", 'social': 'Social Psychology' }
                },
                'economics': {
                    name: 'Economics',
                    subsubtopics: { 'all': 'All Economics', 'microeconomics': 'Microeconomics (Supply & Demand)', 'macroeconomics': 'Macroeconomics (GDP, Inflation)', 'behavioral-economics': 'Behavioral Economics' }
                },
                'philosophy': {
                    name: 'Philosophy',
                    subsubtopics: { 'all': 'All Philosophy', 'epistemology': 'Epistemology (Theory of Knowledge)', 'metaphysics': 'Metaphysics', 'ethics': 'Ethics (Utilitarianism)', 'logic': 'Logic & Reason' }
                },
                'history': {
                    name: 'History',
                    subsubtopics: { 'all': 'All History', 'ancient-civ': 'Ancient Civilizations', 'renaissance': 'The Renaissance', 'industrial-revolution': 'The Industrial Revolution', 'world-wars': 'The World Wars' }
                },
                'sociology': {
                    name: 'Sociology',
                    subsubtopics: { 'all': 'All Sociology', 'social-structures': 'Social Structures', 'culture-society': 'Culture & Society', 'social-stratification': 'Social Stratification' }
                }
            }
        },
        'arts-culture': {
            name: 'Arts & Culture',
            subtopics: {
                'all': { name: 'All Arts & Culture', subsubtopics: {} },
                'visual-arts': {
                    name: 'Visual Arts',
                    subsubtopics: { 'all': 'All Visual Arts', 'art-history': 'Art History Movements', 'color-theory': 'Color Theory', 'composition': 'Composition & Design' }
                },
                'music': {
                    name: 'Music',
                    subsubtopics: { 'all': 'All Music', 'music-theory': 'Music Theory', 'music-history': 'History of Western Music', 'sound-engineering': 'Sound Engineering Basics' }
                },
            }
        }
    };

    const topicFilter = document.getElementById('topic-filter');
    const subtopicFilter = document.getElementById('subtopic-filter');
    const subsubtopicFilter = document.getElementById('subsubtopic-filter');
    const cards = document.querySelectorAll('.leolearn-card');

    function populateSelect(selectElement, options, defaultKey) {
        selectElement.innerHTML = '';
        for (const key in options) {
            const option = document.createElement('option');
            option.value = key;
            option.textContent = options[key].name || options[key];
            selectElement.appendChild(option);
        }
        selectElement.value = defaultKey;
    }

    function updateFilters() {
        const selectedTopic = topicFilter.value;

        if (selectedTopic === 'all') {
            populateSelect(subtopicFilter, { 'all': { name: 'All Fields' } }, 'all');
            subtopicFilter.disabled = true;
        } else {
            const subtopicOptions = filterData[selectedTopic]?.subtopics || {};
            populateSelect(subtopicFilter, subtopicOptions, 'all');
            subtopicFilter.disabled = false;
        }
        updateSubSubFilters();
    }

    function updateSubSubFilters() {
        const selectedTopic = topicFilter.value;
        const selectedSubtopic = subtopicFilter.value;

        if (selectedTopic === 'all' || selectedSubtopic === 'all') {
            populateSelect(subsubtopicFilter, { 'all': { name: 'All Concepts' } }, 'all');
            subsubtopicFilter.disabled = true;
        } else {
            const subsubtopicOptions = filterData[selectedTopic]?.subtopics[selectedSubtopic]?.subsubtopics || {};
            populateSelect(subsubtopicFilter, subsubtopicOptions, 'all');
            subsubtopicFilter.disabled = Object.keys(subsubtopicOptions).length <= 1;
        }
        applyFilters();
    }
    
    function applyFilters() {
        const topic = topicFilter.value;
        const subtopic = subtopicFilter.value;
        const subsubtopic = subsubtopicFilter.value;

        cards.forEach(card => {
            const cardTopic = card.dataset.topic;
            const cardSubtopic = card.dataset.subtopic;
            const cardSubsubtopic = card.dataset.subsubtopic;

            const topicMatch = (topic === 'all' || cardTopic === topic);
            const subtopicMatch = (subtopic === 'all' || cardSubtopic === subtopic);
            const subsubtopicMatch = (subsubtopic === 'all' || cardSubsubtopic === subsubtopic);

            if (topicMatch && subtopicMatch && subsubtopicMatch) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // --- INITIALIZATION ---
    populateSelect(topicFilter, filterData, 'all');
    topicFilter.addEventListener('change', updateFilters);
    subtopicFilter.addEventListener('change', updateSubSubFilters);
    subsubtopicFilter.addEventListener('change', applyFilters);
    
    updateFilters();
});