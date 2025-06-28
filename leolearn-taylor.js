// leolearn-taylor.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Store all content and references as data ---
    const referencesData = [
        { id: 'taylor1715', author: 'Taylor, B.', tooltipText: `Taylor, B. (1715). Methodus Incrementorum Directa & Inversa. London.`, fullHtml: `Taylor, B. (1715). <em>Methodus Incrementorum Directa & Inversa</em>. London.` },
        { id: 'spivak2008', author: 'Spivak, M.', tooltipText: `Spivak, M. (2008). Calculus (4th ed.). Publish or Perish, Inc.`, fullHtml: `Spivak, M. (2008). <em>Calculus</em> (4th ed.). Publish or Perish, Inc.` }
    ];

    const contentData = {
        beginner: `
<div class="container">
    <div class="content-header"><h2>Beginner: The Local Imitator</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>Many functions in the world, like the trajectory of a thrown ball or the growth of a population, are complex and "curvy." A **Taylor Series** is a brilliant idea, formally introduced by the English mathematician Brook Taylor in 1715, for approximating these complex curves using simple building blocks.{{CITE:taylor1715}}</p>
    <p>The core idea is to "imitate" a complex function around a specific point. Imagine you're standing on a curvy mountain road and want to describe the road ahead to a friend. You can give them increasingly accurate descriptions:</p>
    <ul>
        <li>**A Good Guess (0th Order):** "The road is at an elevation of 100 meters." This is just a flat line. It's correct right where you are, but wrong everywhere else.</li>
        <li>**A Better Guess (1st Order):** "The road is at 100 meters, and it's currently sloping uphill at 10 degrees." This is a straight, slanted line (the tangent line). It's a much better imitation for the road immediately ahead.</li>
        <li>**An Even Better Guess (2nd Order):** "The road is at 100 meters, sloping uphill at 10 degrees, and it's starting to curve downwards." This describes a parabola that more closely "hugs" the real road's curve.</li>
    </ul>
    <p>A Taylor Series is the ultimate version of this, using an infinite number of these corrections to perfectly replicate the function.</p>
    <h3>Check Your Understanding</h3>
    <p>The first-order approximation (the tangent line) is the most common approximation used in science and engineering for quick calculations. Why do you think that is?</p>
    <details class="interactive-toggle"><summary>Reveal the reason</summary><p><strong>A:</strong> Because it provides the best **linear** approximation of the function near a point. It's simple to calculate (just requiring the function's value and its slope) but is often "good enough" for small changes, capturing the most important part of the function's local behavior.</p></details>
</div>`,
        intermediate: `
<div class="container">
    <div class="content-header"><h2>Intermediate: Building the Polynomial</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>The "guesses" from the beginner level are actually terms in a special type of function called a **polynomial**. A Taylor Series represents a function \`f(x)\` as an infinite polynomial, constructed using the function's derivatives at a single point, \`a\`. The goal is to create a polynomial whose value, slope, curvature, and all higher derivatives *perfectly match* the original function at that specific point.{{CITE:spivak2008}}</p>
    <p>The formula for the Taylor Series of \`f(x)\` centered at \`a\` is:</p>
    <p style="text-align:center;">\`f(x) \\approx f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\frac{f'''(a)}{3!}(x-a)^3 + \\dots\`</p>
    <p>Each term in this sum is designed to match a specific property of \`f(x)\` at the point \`a\`. The more terms we add, the more properties our polynomial shares with the function, and the better it "hugs" the function's curve over a wider range.</p>
    <h3>Interactive Taylor Series Demo</h3>
    <p>This demo shows how a Taylor Series builds up an approximation for the function \`sin(x)\` centered at \`a=0\`. Use the slider to add more terms to the polynomial. Watch how the simple polynomial (in blue) starts to wrap itself more and more tightly around the true \`sin(x)\` curve (in gray), especially near the center point.</p>
    <div class="taylor-demo">
        <div class="taylor-plot-container"><svg id="taylor-plot" viewBox="0 0 600 400"></svg></div>
        <div class="taylor-controls"><div class="input-group"><label>Number of Terms (n): <span id="terms-value">1</span></label><input type="range" id="terms-slider" min="0" max="7" step="1" value="1"></div></div>
    </div>
</div>`,
        advanced: `
<div class="container">
    <div class="content-header"><h2>Advanced: Convergence and Error</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>The full Taylor Series is an infinite sum, which can be written compactly using sigma notation:</p>
    <p style="text-align:center;">\`f(x) = \\sum_{n=0}^{\\infty} \\frac{f^{(n)}(a)}{n!}(x-a)^n\`</p>
    <p>Here, \`f^{(n)}(a)\` denotes the n-th derivative of \`f\` evaluated at \`a\`. A crucial question for mathematicians is: for what values of \`x\` does this infinite sum actually converge to the true value of \`f(x)\`?</p>
    <p>In practice, we use a finite number of terms, a **Taylor Polynomial**, \`T_n(x)\`. This introduces an error, or **remainder term**, \`R_n(x)\`, such that \`f(x) = T_n(x) + R_n(x)\`. Taylor's theorem with the Lagrange form of the remainder provides a way to find an upper bound for this error.{{CITE:spivak2008}} It states that for some number \`c\` between \`x\` and \`a\`:</p>
    <p style="text-align:center;">\`R_n(x) = \\frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}\`</p>
    <h3>Interactive Error Visualization</h3>
    <p>This demo visualizes the error, \`|f(x) - T_n(x)|\`. The top graph shows \`cos(x)\` (gray) and its Taylor polynomial \`T_n(x)\` (blue). The bottom graph shows the absolute error. Use the sliders to change the number of terms and the evaluation point \`x\`. Notice how the error is always zero at the center point (\`a=0\`) and grows as you move further away or use fewer terms.</p>
    <div class="taylor-error-demo">
        <div class="taylor-plot-container"><p class="plot-title">Approximation Plot</p><svg id="taylor-error-plot-main" viewBox="0 0 600 400"></svg></div>
        <div class="taylor-plot-container"><p class="plot-title">Error Plot</p><svg id="taylor-error-plot-error" viewBox="0 0 600 100"></svg></div>
        <div class="taylor-controls">
            <div class="input-group"><label>Number of Terms (n): <span id="error-terms-value">2</span></label><input type="range" id="error-terms-slider" min="0" max="6" step="1" value="2"></div>
            <div class="input-group"><label>Evaluation Point (x): <span id="error-x-value">1.0</span></label><input type="range" id="error-x-slider" min="-6" max="6" step="0.1" value="1.0"></div>
            <div class="lr-cost"><h4>Error at x:</h4><div id="error-value">0</div></div>
        </div>
    </div>
</div>`
    };

    // --- Element Selectors & State ---
    const modalOverlay = document.getElementById('difficulty-modal-overlay');
    const contentContainers = { beginner: document.getElementById('content-beginner'), intermediate: document.getElementById('content-intermediate'), advanced: document.getElementById('content-advanced') };
    const referencesList = document.getElementById('references-list');
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
        container.querySelector('.change-difficulty-btn').addEventListener('click', () => { modalOverlay.style.display = 'flex'; });

        setTimeout(() => {
            if (typeof renderMathInElement === 'function') {
                renderMathInElement(container, { delimiters: [{ left: '`', right: '`', display: false }], throwOnError: false });
            }
            
            // --- THE DEFINITIVE FIX ---
            // Initialize the correct demo every time the content is shown,
            // removing the faulty one-time-only logic.
            if (difficulty === 'intermediate') {
                initializeTermDemo();
            }
            if (difficulty === 'advanced') {
                initializeErrorDemo();
            }
        }, 50);
    }

    // --- Demo Initializers with ROBUST PLOTTING ---
    const svgNS = "http://www.w3.org/2000/svg";
    const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));
    
    function createPlottingSystem(svg, xDomain, yDomain) {
        if (!svg) return null;
        const width = svg.viewBox.baseVal.width;
        const height = svg.viewBox.baseVal.height;
        const mapX = (x) => (x - xDomain[0]) / (xDomain[1] - xDomain[0]) * width;
        const mapY = (y) => height - ((y - yDomain[0]) / (yDomain[1] - yDomain[0]) * height);
        
        const origin = { x: mapX(0), y: mapY(0) };
        const xAxis = document.createElementNS(svgNS, 'line');
        xAxis.setAttribute('x1', 0); xAxis.setAttribute('y1', origin.y);
        xAxis.setAttribute('x2', width); xAxis.setAttribute('y2', origin.y);
        xAxis.setAttribute('class', 'plot-axis');
        svg.appendChild(xAxis);

        const yAxis = document.createElementNS(svgNS, 'line');
        yAxis.setAttribute('x1', origin.x); yAxis.setAttribute('y1', 0);
        yAxis.setAttribute('x2', origin.x); yAxis.setAttribute('y2', height);
        yAxis.setAttribute('class', 'plot-axis');
        svg.appendChild(yAxis);

        return { mapX, mapY, xDomain };
    }

    function drawFunction(svg, plotSys, func, cssClass) {
        if (!svg || !plotSys) return;
        let pathData = '';
        const step = (plotSys.xDomain[1] - plotSys.xDomain[0]) / 200;
        for (let x = plotSys.xDomain[0]; x <= plotSys.xDomain[1]; x += step) {
            const y = func(x);
            const cmd = (pathData === '') ? 'M' : 'L';
            pathData += `${cmd} ${plotSys.mapX(x)},${plotSys.mapY(y)}`;
        }
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('class', cssClass);
        svg.appendChild(path);
    }
    
    function initializeTermDemo() {
        const svg = document.getElementById('taylor-plot');
        const termsSlider = document.getElementById('terms-slider');
        const termsValue = document.getElementById('terms-value');
        if (!svg || !termsSlider) return;

        const plotSys = createPlottingSystem(svg, [-6, 6], [-2, 2]);
        const sinDerivativesAtZero = [0, 1, 0, -1]; 
        
        function drawTermPlot() {
            svg.innerHTML = ''; 
            createPlottingSystem(svg, [-6, 6], [-2, 2]);
            const numTerms = parseInt(termsSlider.value);
            termsValue.textContent = numTerms;

            drawFunction(svg, plotSys, Math.sin, 'taylor-true-func');

            const taylorSin = (x) => {
                let y = 0;
                for (let n = 0; n <= numTerms; n++) {
                    y += (sinDerivativesAtZero[n % 4] / factorial(n)) * Math.pow(x, n);
                }
                return y;
            };
            drawFunction(svg, plotSys, taylorSin, 'taylor-approx-func');
        }
        termsSlider.addEventListener('input', drawTermPlot);
        drawTermPlot();
    }

    function initializeErrorDemo() {
        const mainSvg = document.getElementById('taylor-error-plot-main');
        const errorSvg = document.getElementById('taylor-error-plot-error');
        const termsSlider = document.getElementById('error-terms-slider');
        const xSlider = document.getElementById('error-x-slider');
        const termsValue = document.getElementById('error-terms-value');
        const xValue = document.getElementById('error-x-value');
        const errorValue = document.getElementById('error-value');
        if (!mainSvg || !errorSvg || !termsSlider || !xSlider) return;

        const mainPlotSys = createPlottingSystem(mainSvg, [-6, 6], [-1.5, 1.5]);
        const errorPlotSys = createPlottingSystem(errorSvg, [-6, 6], [-0.01, 0.5]);
        const cosDerivativesAtZero = [1, 0, -1, 0];
        
        function drawErrorPlot() {
            mainSvg.innerHTML = ''; errorSvg.innerHTML = '';
            createPlottingSystem(mainSvg, [-6, 6], [-1.5, 1.5]);
            createPlottingSystem(errorSvg, [-6, 6], [-0.01, 0.5]);
            const numTerms = parseInt(termsSlider.value);
            const evalX = parseFloat(xSlider.value);
            termsValue.textContent = numTerms;
            xValue.textContent = evalX.toFixed(2);

            const taylorCos = (x) => {
                let y = 0;
                for (let n = 0; n <= numTerms; n++) {
                    y += (cosDerivativesAtZero[n % 4] / factorial(n)) * Math.pow(x, n);
                }
                return y;
            };

            drawFunction(mainSvg, mainPlotSys, Math.cos, 'taylor-true-func');
            drawFunction(mainSvg, mainPlotSys, taylorCos, 'taylor-approx-func');
            
            const errorFunc = (x) => Math.abs(Math.cos(x) - taylorCos(x));
            drawFunction(errorSvg, errorPlotSys, errorFunc, 'taylor-error-func');

            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', mainPlotSys.mapX(evalX)); line.setAttribute('y1', 0);
            line.setAttribute('x2', mainPlotSys.mapX(evalX)); line.setAttribute('y2', mainSvg.viewBox.baseVal.height);
            line.setAttribute('class', 'taylor-eval-line');
            mainSvg.appendChild(line);
            
            errorValue.textContent = errorFunc(evalX).toExponential(2);
        }

        termsSlider.addEventListener('input', drawErrorPlot);
        xSlider.addEventListener('input', drawErrorPlot);
        drawErrorPlot();
    }

    // --- Initial Page Setup ---
    document.getElementById('select-beginner').addEventListener('click', () => handleSelection('beginner'));
    document.getElementById('select-intermediate').addEventListener('click', () => handleSelection('intermediate'));
    document.getElementById('select-advanced').addEventListener('click', () => handleSelection('advanced'));
    
    renderReferences();
});