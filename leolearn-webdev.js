// leolearn-webdev.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Store all content and references as data ---
    const referencesData = [
        {
            id: 'mdnHTML',
            author: 'MDN Web Docs',
            tooltipText: `MDN Web Docs. (2023). HTML: HyperText Markup Language. Mozilla.`,
            fullHtml: `MDN Web Docs. (2023). <em>HTML: HyperText Markup Language</em>. Mozilla. <a href="https://developer.mozilla.org/en-US/docs/Web/HTML" target="_blank" rel="noopener noreferrer">https://developer.mozilla.org/en-US/docs/Web/HTML</a>`
        },
        {
            id: 'w3cCSS',
            author: 'W3C',
            tooltipText: `W3C. (2023). Cascading Style Sheets. World Wide Web Consortium.`,
            fullHtml: `W3C. (2023). <em>Cascading Style Sheets</em>. World Wide Web Consortium. <a href="https://www.w3.org/Style/CSS/Overview.en.html" target="_blank" rel="noopener noreferrer">https://www.w3.org/Style/CSS/Overview.en.html</a>`
        },
        {
            id: 'ecmaJS',
            author: 'Ecma International',
            tooltipText: `Ecma International. (2023). ECMA-262: ECMAScript® Language Specification.`,
            fullHtml: `Ecma International. (2023). <em>ECMA-262: ECMAScript® Language Specification</em>. <a href="https://www.ecma-international.org/publications-and-standards/standards/ecma-262/" target="_blank" rel="noopener noreferrer">https://www.ecma-international.org/publications-and-standards/standards/ecma-262/</a>`
        }
    ];

    const contentData = {
        beginner: `
<div class="container">
    <div class="content-header"><h2>Beginner: The Three Pillars of the Web</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>Every website you've ever visited, from the simplest blog to the most complex application, is built upon three core technologies. The best way to understand their roles is with a simple analogy: building a house.</p>
    <ul>
        <li>**HTML (HyperText Markup Language): The Skeleton.** HTML provides the fundamental structure and content of a webpage. It's like the foundation, walls, rooms, windows, and doors of a house. It defines the elements, such as "this is a heading," "this is a paragraph," and "this is an image."{{CITE:mdnHTML}}</li>
        <li>**CSS (Cascading Style Sheets): The Decoration & Layout.** CSS is the language of style. It takes the raw structure from HTML and makes it visually appealing. It's the paint color, the furniture, the type of flooring, and the arrangement of the rooms. It controls colors, fonts, spacing, and layout.{{CITE:w3cCSS}}</li>
        <li>**JavaScript: The Electricity & Plumbing.** JavaScript brings a static webpage to life, making it interactive. It's the light switches, the running water, and the doorbell. It handles user actions like clicks and keyboard input, fetches new data from servers, and can change the structure and style of the page dynamically.{{CITE:ecmaJS}}</li>
    </ul>
    <h3>Check Your Understanding</h3>
    <p>Click on the question to reveal the answer.</p>
    <details class="interactive-toggle"><summary>If you see a button on a webpage change color when you hover over it, which technology is most likely responsible?</summary><p><strong>A: CSS.</strong> While JavaScript *can* do this, changing styles based on user states like hovering, clicking, or focusing is a primary strength of CSS and is usually the most efficient way to handle simple style changes.</p></details>
</div>`,
        intermediate: `
<div class="container">
    <div class="content-header"><h2>Intermediate: The CSS Box Model</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>To effectively style a webpage, you must understand the most fundamental concept in CSS layout: the **Box Model**. CSS renders every single HTML element as a rectangular box on the page. This box is composed of four distinct layers stacked from the inside out:</p>
    <ol>
        <li>**Content:** The actual content of the box, such as text or an image. Its dimensions are width and height.</li>
        <li>**Padding:** The transparent space directly around the content, inside the border. It pushes the content away from the border.</li>
        <li>**Border:** A line that is drawn around the padding and content. It can have a size, style (solid, dashed), and color.</li>
        <li>**Margin:** The transparent space on the very outside of the box. It pushes the entire element away from other elements around it.</li>
    </ol>
    <p>Understanding how to manipulate these four properties is the key to creating clean, well-spaced, and predictable layouts on the web.{{CITE:w3cCSS}}</p>
    <h3>Interactive Box Model Demo</h3>
    <p>This demo lets you directly control the CSS properties of the box below. Adjust the sliders and color picker to see how each property affects the box's appearance and its relationship with the surrounding text. This visual feedback is crucial for building an intuition for CSS layout.</p>
    <div class="css-demo">
        <div class="css-box-container">
            <div id="css-box">Box</div>
        </div>
        <div class="css-controls">
            <div class="input-group"><label>Padding (px):</label><input type="range" id="padding-slider" min="0" max="50" step="1" value="20"></div>
            <div class="input-group"><label>Border Radius (%):</label><input type="range" id="radius-slider" min="0" max="50" step="1" value="10"></div>
            <div class="input-group"><label>Background Color:</label><input type="color" id="color-picker" value="#2563eb"></div>
        </div>
    </div>
</div>`,
        advanced: `
<div class="container">
    <div class="content-header"><h2>Advanced: The DOM and Interactivity</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>A static webpage built with only HTML and CSS is just a document. It becomes a dynamic *application* through **JavaScript** and its interaction with the **Document Object Model (DOM)**. When a browser loads an HTML file, it creates a live, tree-like data structure in memory that represents all the elements on the page. This structure is the DOM.</p>
    <p>JavaScript has a special ability to access and manipulate this DOM. It can:</p>
    <ul>
        <li>**Find any element** on the page (e.g., by its ID, class, or tag name).</li>
        <li>**Change the content** of an element (e.g., update a block of text).</li>
        <li>**Modify the style** of an element (e.g., change its color, hide it, or show it).</li>
        <li>**Create new elements** and add them to the page.</li>
        <li>**Remove existing elements**.</li>
        <li>**Listen for user events**, like clicks or keyboard presses, and run a function in response.</li>
    </ul>
    <p>This ability to dynamically alter the page's structure and style in response to events is the foundation of all modern web interactivity, from simple dropdown menus to complex single-page applications like Gmail or Google Maps.{{CITE:ecmaJS}}</p>
    <h3>Interactive DOM Manipulation Demo</h3>
    <p>This demo provides a simple but powerful example of DOM manipulation. When you click the button, a JavaScript function will execute. This function will find the paragraph element below by its ID, change its text content, and alter its CSS styles directly. This demonstrates the core loop of web interactivity: an event happens, and JavaScript responds by changing the DOM.</p>
    <div class="js-demo">
        <p id="js-target">This is the original text. Click the button to change me.</p>
        <button class="btn" id="js-trigger-btn">Run JavaScript</button>
    </div>
</div>`
    };

    // --- Element Selectors ---
    const modalOverlay = document.getElementById('difficulty-modal-overlay');
    const contentContainers = {
        beginner: document.getElementById('content-beginner'),
        intermediate: document.getElementById('content-intermediate'),
        advanced: document.getElementById('content-advanced')
    };
    const referencesList = document.getElementById('references-list');

    // --- State flags ---
    let isCssDemoInitialized = false;
    let isJsDemoInitialized = false;
    let citationMap = {};

    // --- Renders references and creates the citation map ---
    function renderReferences() {
        referencesData.sort((a, b) => a.author.localeCompare(b.author));
        
        referencesList.innerHTML = '';
        referencesData.forEach((ref, index) => {
            const num = index + 1;
            citationMap[ref.id] = num;
            const li = document.createElement('li');
            li.id = `ref-${num}`;
            li.innerHTML = ref.fullHtml;
            referencesList.appendChild(li);
        });
    }

    // --- Core Selection Logic ---
    function handleSelection(difficulty) {
        modalOverlay.style.display = 'none';
        Object.values(contentContainers).forEach(c => c.classList.add('is-hidden'));
        
        const container = contentContainers[difficulty];
        let rawContent = contentData[difficulty];
        let processedHtml = typeof marked === 'function' ? marked.parse(rawContent) : rawContent;

        processedHtml = processedHtml.replace(/{{CITE:(\w+)}}/g, (match, id) => {
            const num = citationMap[id];
            if (!num) return '';
            const ref = referencesData.find(r => r.id === id);
            return `<sup class="citation"><a href="#ref-${num}">${num}<span class="citation-tooltip">${ref.tooltipText}</span></a></sup>`;
        });
        
        container.innerHTML = processedHtml;
        container.classList.remove('is-hidden');

        container.querySelector('.change-difficulty-btn').addEventListener('click', () => {
            modalOverlay.style.display = 'flex';
        });

        setTimeout(() => {
            if (difficulty === 'intermediate' && !isCssDemoInitialized) {
                initializeCssDemo();
                isCssDemoInitialized = true;
            }
            if (difficulty === 'advanced' && !isJsDemoInitialized) {
                initializeJsDemo();
                isJsDemoInitialized = true;
            }
        }, 50);
    }

    // --- Demo Initializers ---
    function initializeCssDemo() {
        const paddingSlider = document.getElementById('padding-slider');
        const radiusSlider = document.getElementById('radius-slider');
        const colorPicker = document.getElementById('color-picker');
        const box = document.getElementById('css-box');
        if (!paddingSlider || !radiusSlider || !colorPicker || !box) return;

        function updateCssBox() {
            box.style.padding = `${paddingSlider.value}px`;
            box.style.borderRadius = `${radiusSlider.value}%`;
            box.style.backgroundColor = colorPicker.value;
        }

        [paddingSlider, radiusSlider, colorPicker].forEach(el => el.addEventListener('input', updateCssBox));
        updateCssBox();
    }

    function initializeJsDemo() {
        const target = document.getElementById('js-target');
        const trigger = document.getElementById('js-trigger-btn');
        if (!target || !trigger) return;

        trigger.addEventListener('click', () => {
            target.textContent = "The DOM has been successfully manipulated by JavaScript!";
            target.style.color = 'var(--accent-hover)';
            target.style.fontWeight = '700';
            target.style.transform = 'scale(1.05)';
        });
    }

    // --- Initial Page Setup ---
    document.getElementById('select-beginner').addEventListener('click', () => handleSelection('beginner'));
    document.getElementById('select-intermediate').addEventListener('click', () => handleSelection('intermediate'));
    document.getElementById('select-advanced').addEventListener('click', () => handleSelection('advanced'));
    
    renderReferences();
});