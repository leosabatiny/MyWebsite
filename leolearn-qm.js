// leolearn-qm.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Store all content and references as data ---
    const referencesData = [
        { id: 'feynman1965', author: 'Feynman, R. P., Leighton, R. B., & Sands, M.', tooltipText: `Feynman, R. P., Leighton, R. B., & Sands, M. (1965). The Feynman Lectures on Physics, Vol. 3. Addison-Wesley.`, fullHtml: `Feynman, R. P., Leighton, R. B., & Sands, M. (1965). <em>The Feynman Lectures on Physics, Vol. 3</em>. Addison-Wesley.` },
        { id: 'griffiths2018', author: 'Griffiths, D. J., & Schroeter, D. F.', tooltipText: `Griffiths, D. J., & Schroeter, D. F. (2018). Introduction to Quantum Mechanics (3rd ed.). Cambridge University Press.`, fullHtml: `Griffiths, D. J., & Schroeter, D. F. (2018). <em>Introduction to Quantum Mechanics</em> (3rd ed.). Cambridge University Press.` },
        { id: 'heisenberg1927', author: 'Heisenberg, W.', tooltipText: `Heisenberg, W. (1927). Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik. Zeitschrift für Physik, 43(3-4), 172-198.`, fullHtml: `Heisenberg, W. (1927). Über den anschaulichen Inhalt der quantentheoretischen Kinematik und Mechanik. <em>Zeitschrift für Physik, 43</em>(3-4), 172-198. <a href="https://doi.org/10.1007/BF01397280" target="_blank" rel="noopener noreferrer">https://doi.org/10.1007/BF01397280</a>` }
    ];

    const contentData = {
        beginner: `
<div class="container">
    <div class="content-header"><h2>Beginner: The Rules of a Different World</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>Quantum Mechanics is the science of the very small: the world of atoms, electrons, and photons. At the start of the 20th century, physicists realized that the classical rules of physics—which perfectly describe planets, baseballs, and cars—completely break down at this tiny scale. It's not just a little different; it's profoundly, fundamentally weird. As the physicist Richard Feynman famously said, "I think I can safely say that nobody understands quantum mechanics."{{CITE:feynman1965}}</p>
    <p>The core of this weirdness comes from a few key ideas that defy our everyday intuition:</p>
    <ul>
        <li>**Quantization:** In our world, a car can have any speed. In the quantum world, certain properties can only have specific, discrete values. An electron in an atom can't orbit at just any energy level; it must exist on specific "rungs" of an energy ladder, and it can only jump between these rungs, never resting in between.</li>
        <li>**Wave-Particle Duality:** In our world, something is either a solid object (a particle) or a ripple in a medium (a wave). In the quantum world, everything—an electron, a photon of light—is *both* at the same time. It behaves like a particle when you look for it in one place, but it travels and interferes like a wave.</li>
        <li>**Superposition:** Because quantum objects are waves, they can be in multiple states at once. An electron can be "spinning" both up and down simultaneously. It only "chooses" a single state at the very moment it is measured.</li>
    </ul>
    <h3>Check Your Intuition</h3>
    <p>The best way to grasp quantum mechanics is to see how it clashes with our classical expectations. Click on a question to reveal the quantum answer.</p>
    <details class="interactive-toggle"><summary>If you fire a single electron at a screen with two slits, which slit does it go through?</summary><p><strong>A: It goes through both!</strong> This is the most famous quantum experiment. Even though it's a single "particle," its wave-like nature allows it to pass through both slits simultaneously and interfere with itself, creating a pattern on the other side that would be impossible if it only went through one.</p></details>
</div>`,
        intermediate: `
<div class="container">
    <div class="content-header"><h2>Intermediate: The Wave Function</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>To mathematically describe the strange behavior of quantum objects, physicists use a central tool called the **wave function**, typically denoted by the Greek letter Psi, \`\\Psi(x, t)\`. This function is the solution to the most important equation in quantum mechanics: the **Schrödinger Equation**.{{CITE:griffiths2018}}</p>
    <p>However, the wave function itself is not directly observable. So what does it represent? It is a "wave of probability." More precisely, the square of its magnitude, \`|\\Psi(x, t)|^2\`, gives the **probability density** of finding the particle at position \`x\` at time \`t\`. This is a radical departure from classical mechanics:</p>
    <ul>
        <li>**Classical Mechanics:** Tells you with certainty where an object *is*.</li>
        <li>**Quantum Mechanics:** Tells you the *probability* of finding an object in various places.</li>
    </ul>
    <p>This probabilistic nature is fundamental. Before a measurement, a particle does not have a definite position. It exists as a cloud of probabilities described by its wave function. The act of measurement "collapses" this wave function, forcing the particle to "choose" a single location.</p>
    <h3>Interactive Demo: Particle in a Box</h3>
    <p>This demo shows the allowed wave functions for a particle trapped inside a one-dimensional box. Due to the boundary conditions, only specific standing waves (energy levels, or "harmonics") are possible. Use the slider to change the energy level \`n\`. The top plot shows the wave function \`\\Psi\`, and the bottom plot shows the probability density \`|\\Psi|^2\`, which tells you where you are most likely to find the particle.</p>
    <div class="taylor-demo">
        <div class="taylor-plot-container"><p class="plot-title">Wave Function (Ψ)</p><svg id="qm-plot-wave" viewBox="0 0 600 200"></svg></div>
        <div class="taylor-plot-container"><p class="plot-title">Probability Density (|Ψ|²)</p><svg id="qm-plot-prob" viewBox="0 0 600 100"></svg></div>
        <div class="taylor-controls"><div class="input-group"><label>Energy Level (n): <span id="qm-n-value">1</span></label><input type="range" id="qm-n-slider" min="1" max="5" step="1" value="1"></div></div>
    </div>
</div>`,
        advanced: `
<div class="container">
    <div class="content-header"><h2>Advanced: The Schrödinger Equation & Uncertainty</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>The dynamics of the wave function \`\\Psi\` are governed by the **Schrödinger Equation**. For a single non-relativistic particle, the time-independent form of the equation is:</p>
    <p style="text-align:center;">\`-\\frac{\\hbar^2}{2m} \\frac{d^2\\Psi}{dx^2} + V(x)\\Psi(x) = E\\Psi(x)\`</p>
    <p>Here, \`\\hbar\` is the reduced Planck constant, \`m\` is the particle's mass, \`V(x)\` is the potential energy, and \`E\` is the total energy, which is an eigenvalue of the system. This equation is a cornerstone of modern physics, and its solutions for different potentials \`V(x)\` describe everything from the energy levels of atoms to the behavior of electrons in a semiconductor.</p>
    <p>One of the most profound consequences of the wave-like nature of matter is the **Heisenberg Uncertainty Principle**. In his 1927 paper, Werner Heisenberg established that it is fundamentally impossible to simultaneously know with perfect accuracy certain pairs of a particle's properties.{{CITE:heisenberg1927}} The most famous pair is position (\`x\`) and momentum (\`p\`). The principle states:</p>
    <p style="text-align:center;">\`\\sigma_x \\sigma_p \\ge \\frac{\\hbar}{2}\`</p>
    <p>Where \`\\sigma_x\` is the uncertainty (standard deviation) in position and \`\\sigma_p\` is the uncertainty in momentum. This is not a limitation of our measuring instruments; it is a fundamental property of the universe. The more precisely you "pin down" a particle's position, the less you know about its momentum, and vice-versa.</p>
    <h3>Interactive Uncertainty Demo</h3>
    <p>This demo visualizes a "wave packet," which represents a quantum particle. Use the slider to control the **Certainty in Position**. A higher certainty means a narrower wave packet. Observe how this affects the **Certainty in Momentum**. As you squeeze the wave packet in position space, it must be constructed from a wider range of momentum waves, increasing momentum uncertainty. This visually demonstrates the trade-off at the heart of the Uncertainty Principle.</p>
    <div class="taylor-demo">
        <div class="taylor-plot-container"><p class="plot-title">Wave Packet in Position Space</p><svg id="uncertainty-plot" viewBox="0 0 600 200"></svg></div>
        <div class="taylor-controls">
            <div class="input-group"><label>Certainty in Position (1/σₓ): <span id="uncertainty-pos-value">1</span></label><input type="range" id="uncertainty-pos-slider" min="0.5" max="5" step="0.05" value="1.5"></div>
            <div class="lr-cost"><h4>Certainty in Momentum (1/σₚ):</h4><div id="uncertainty-mom-value">0</div></div>
        </div>
    </div>
</div>`
    };

    // --- Element Selectors & State ---
    const modalOverlay = document.getElementById('difficulty-modal-overlay');
    const contentContainers = { beginner: document.getElementById('content-beginner'), intermediate: document.getElementById('content-intermediate'), advanced: document.getElementById('content-advanced') };
    const referencesList = document.getElementById('references-list');
    let isProbDemoInitialized = false;
    let isUncertaintyDemoInitialized = false;
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
            if (difficulty === 'intermediate' && !isProbDemoInitialized) {
                initializeProbabilityDemo();
                isProbDemoInitialized = true;
            }
            if (difficulty === 'advanced' && !isUncertaintyDemoInitialized) {
                initializeUncertaintyDemo();
                isUncertaintyDemoInitialized = true;
            }
        }, 50);
    }

    // --- Demo Initializers with ROBUST PLOTTING ---
    const svgNS = "http://www.w3.org/2000/svg";
    function createPlottingSystem(svg, xDomain, yDomain) { /* ... same as before ... */ }
    function drawFunction(svg, plotSys, func, cssClass) { /* ... same as before ... */ }
    // Re-pasting helper functions to ensure they are self-contained
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
        
        return { mapX, mapY, xDomain };
    }
    function drawFunction(svg, plotSys, func, cssClass) {
        if (!svg || !plotSys) return;
        let pathData = '';
        const step = (plotSys.xDomain[1] - plotSys.xDomain[0]) / 400; // Increased resolution
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

    function initializeProbabilityDemo() {
        const waveSvg = document.getElementById('qm-plot-wave');
        const probSvg = document.getElementById('qm-plot-prob');
        const nSlider = document.getElementById('qm-n-slider');
        const nValue = document.getElementById('qm-n-value');
        if (!waveSvg || !probSvg || !nSlider) return;

        const wavePlotSys = createPlottingSystem(waveSvg, [0, 1], [-1.5, 1.5]);
        const probPlotSys = createPlottingSystem(probSvg, [0, 1], [-0.1, 2.1]);

        function drawProbPlot() {
            waveSvg.innerHTML = ''; probSvg.innerHTML = '';
            createPlottingSystem(waveSvg, [0, 1], [-1.5, 1.5]);
            createPlottingSystem(probSvg, [0, 1], [-0.1, 2.1]);
            const n = parseInt(nSlider.value);
            nValue.textContent = n;

            const waveFunc = (x) => Math.sqrt(2) * Math.sin(n * Math.PI * x);
            drawFunction(waveSvg, wavePlotSys, waveFunc, 'taylor-approx-func');
            
            const probFunc = (x) => Math.pow(waveFunc(x), 2);
            drawFunction(probSvg, probPlotSys, probFunc, 'qm-prob-density');
        }
        nSlider.addEventListener('input', drawProbPlot);
        drawProbPlot();
    }

    function initializeUncertaintyDemo() {
        const svg = document.getElementById('uncertainty-plot');
        const posSlider = document.getElementById('uncertainty-pos-slider');
        const posValue = document.getElementById('uncertainty-pos-value');
        const momValue = document.getElementById('uncertainty-mom-value');
        if (!svg || !posSlider) return;

        const plotSys = createPlottingSystem(svg, [-5, 5], [-1.1, 1.1]);
        
        function drawUncertaintyPlot() {
            svg.innerHTML = '';
            createPlottingSystem(svg, [-5, 5], [-1.1, 1.1]);
            const posCert = parseFloat(posSlider.value);
            const sigma = 1 / posCert;
            
            posValue.textContent = posCert.toFixed(2);
            momValue.textContent = (1 / sigma).toFixed(2);

            // A simplified wave packet representation (Gaussian envelope * cosine wave)
            const packetFunc = (x) => Math.exp(-Math.pow(x, 2) / (2 * sigma*sigma)) * Math.cos(5 * x);
            drawFunction(svg, plotSys, packetFunc, 'taylor-approx-func');
        }
        posSlider.addEventListener('input', drawUncertaintyPlot);
        drawUncertaintyPlot();
    }

    // --- Initial Page Setup ---
    document.getElementById('select-beginner').addEventListener('click', () => handleSelection('beginner'));
    document.getElementById('select-intermediate').addEventListener('click', () => handleSelection('intermediate'));
    document.getElementById('select-advanced').addEventListener('click', () => handleSelection('advanced'));
    renderReferences();
});