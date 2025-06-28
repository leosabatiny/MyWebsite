// leolearn-ml.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Store all content and references as data ---
    const referencesData = [
        {
            id: 'samuel1959',
            author: 'Samuel, A. L.',
            tooltipText: `Samuel, A. L. (1959). Some Studies in Machine Learning Using the Game of Checkers. IBM Journal of Research and Development, 3(3), 210–229.`,
            fullHtml: `Samuel, A. L. (1959). Some Studies in Machine Learning Using the Game of Checkers. <em>IBM Journal of Research and Development, 3</em>(3), 210–229. <a href="https://doi.org/10.1147/rd.33.0210" target="_blank" rel="noopener noreferrer">https://doi.org/10.1147/rd.33.0210</a>`
        },
        {
            id: 'mcculloch1943',
            author: 'McCulloch, W. S., & Pitts, W.',
            tooltipText: `McCulloch, W. S., & Pitts, W. (1943). A logical calculus of the ideas immanent in nervous activity. The Bulletin of Mathematical Biophysics, 5(4), 115–133.`,
            fullHtml: `McCulloch, W. S., & Pitts, W. (1943). A logical calculus of the ideas immanent in nervous activity. <em>The Bulletin of Mathematical Biophysics, 5</em>(4), 115–133. <a href="https://doi.org/10.1007/BF02478259" target="_blank" rel="noopener noreferrer">https://doi.org/10.1007/BF02478259</a>`
        },
        {
            id: 'rumelhart1986',
            author: 'Rumelhart, D. E., Hinton, G. E., & Williams, R. J.',
            tooltipText: `Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). Learning representations by back-propagating errors. Nature, 323(6088), 533–536.`,
            fullHtml: `Rumelhart, D. E., Hinton, G. E., & Williams, R. J. (1986). Learning representations by back-propagating errors. <em>Nature, 323</em>(6088), 533–536. <a href="https://doi.org/10.1038/323533a0" target="_blank" rel="noopener noreferrer">https://doi.org/10.1038/323533a0</a>`
        }
    ];

    const contentData = {
        beginner: `
<div class="container">
    <div class="content-header"><h2>Beginner: Learning from Experience</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>Machine Learning (ML) is a field of artificial intelligence where computers learn to perform tasks without being explicitly programmed with rules. The formal definition, coined by AI pioneer Arthur Samuel in 1959, is the "field of study that gives computers the ability to learn without being explicitly programmed."{{CITE:samuel1959}}</p>
    <p>Think about how you learned to identify a cat. You weren't given a list of rules like "if it has whiskers and pointy ears, it's a cat." Instead, you saw many examples of cats. Your brain automatically learned the underlying patterns. ML works the same way: we show a computer thousands of examples, and it learns the patterns on its own.</p>
    <div class="info-box"><h4>Core Concept: Training vs. Prediction</h4><p>The ML process has two main phases. First is **Training**, where the model learns from a large dataset of examples. Second is **Prediction** (or "Inference"), where the trained model uses what it learned to make decisions about new, unseen data. Your spam filter was trained on millions of emails; now it makes predictions on your incoming mail.</p></div>
    <h3>Check Your Intuition</h3>
    <p>This interactive section helps build your intuition for what is (and isn't) a machine learning task. Click on the questions to reveal the answers.</p>
    <details class="interactive-toggle"><summary>Is a video game character that follows a set patrol path using ML?</summary><p><strong>A: No.</strong> That character is following a pre-programmed set of rules (go here, turn, go there). However, an opponent that adapts its strategy based on how *you* play the game *is* using machine learning.</p></details>
</div>`,
        intermediate: `
<div class="container">
    <div class="content-header"><h2>Intermediate: The Artificial Neuron</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>The building block of modern "deep learning" models is the **artificial neuron**. This is a mathematical concept first proposed in 1943 by McCulloch and Pitts, who were trying to create a simple model of how biological neurons in the brain work.{{CITE:mcculloch1943}}</p>
    <p>A neuron is a simple computational unit that does two things:</p>
    <ol>
        <li>It calculates a **weighted sum** of its inputs. Each input is multiplied by a "weight," which represents its importance. A high positive weight means the input is very important for making the neuron fire, while a negative weight means the input actively works against it.</li>
        <li>It passes this sum through an **activation function**. This function squashes the output into a useful range (like 0 to 1) and determines the final "signal" that the neuron sends to other neurons.</li>
    </ol>
    <h3>Interactive Neuron Demo</h3>
    <p>This demo shows a neuron with two inputs. The "weights" are like dials that control how much the neuron "listens to" each input. Adjust the sliders to see how changing the inputs and their importance affects the neuron's final output signal. The entire goal of "training" a large network of these neurons is for the machine to find the perfect set of weights for a given task automatically.</p>
    <div class="interactive-neuron">
        <div class="neuron-inputs">
            <div class="input-group"><label>Input 1 (x₁):</label><input type="range" id="input1" min="0" max="1" step="0.01" value="0.75"></div>
            <div class="input-group"><label>Weight 1 (w₁):</label><input type="range" id="weight1" min="-1" max="1" step="0.01" value="0.8"></div>
            <div class="input-group"><label>Input 2 (x₂):</label><input type="range" id="input2" min="0" max="1" step="0.01" value="0.25"></div>
            <div class="input-group"><label>Weight 2 (w₂):</label><input type="range" id="weight2" min="-1" max="1" step="0.01" value="-0.5"></div>
        </div>
        <div class="neuron-core"><div class="neuron-body" id="neuron-body"><span>Σ</span></div></div>
        <div class="neuron-output"><label>Activation (Output)</label><div class="output-value" id="output-value">0.0</div></div>
    </div>
</div>`,
        advanced: `
<div class="container">
    <div class="content-header"><h2>Advanced: The Engine of Learning</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>How does a network of millions of neurons "learn" the correct weights? The answer is an algorithm called **Backpropagation**, which works hand-in-hand with an optimization method called **Gradient Descent**. The 1986 paper by Rumelhart, Hinton, and Williams was instrumental in popularizing backpropagation as an effective training method for neural networks.{{CITE:rumelhart1986}}</p>
    <p>The process starts with a **Cost Function**, which measures how "wrong" the network's current predictions are compared to the true answers. A common one is **Mean Squared Error (MSE)**:</p>
    <p>\`J = \\frac{1}{N} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2\`</p>
    <p>Where \`y_i\` is the true value and \`\\hat{y}_i\` is the model's prediction. The goal is to minimize this cost. Backpropagation is the algorithm that efficiently calculates the **gradient** of this cost function—essentially, it determines how much each individual weight in the network contributed to the final error. Gradient Descent then uses this information to slightly adjust all the weights in the direction that will reduce the error. This process is repeated thousands of times, and with each iteration, the network's predictions become slightly less wrong.</p>
    <h3>Interactive MSE Calculator</h3>
    <p>This demo shows how the MSE cost is calculated for three data points. Change the model's prediction for the second data point and watch how it affects both the individual squared error and the total average cost. Backpropagation calculates how to change the model's internal weights to make this "Total Cost" value as small as possible.</p>
    <div class="mse-demo">
        <div class="mse-row mse-header"><div class="mse-label">True Value (y)</div><div class="mse-label">Predicted Value (ŷ)</div><div class="mse-label">Squared Error</div></div>
        <div class="mse-row"><div class="mse-value">150</div><div class="mse-value">160</div><div class="mse-error" id="err1">100</div></div>
        <div class="mse-row"><div class="mse-value">210</div><div class="mse-input-container"><input type="number" class="mse-input" id="pred2" value="200"></div><div class="mse-error" id="err2">100</div></div>
        <div class="mse-row"><div class="mse-value">250</div><div class="mse-value">235</div><div class="mse-error" id="err3">225</div></div>
        <div class="mse-total"><h4>Total Cost (MSE):</h4><div id="mse-cost-value">0</div></div>
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
    let isNeuronDemoInitialized = false;
    let isMseDemoInitialized = false;
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

        // Step 1: Use marked.js to parse the entire raw content block into HTML.
        let processedHtml = typeof marked === 'function' ? marked.parse(rawContent) : rawContent;

        // Step 2: Replace placeholders with the final citation HTML.
        processedHtml = processedHtml.replace(/{{CITE:(\w+)}}/g, (match, id) => {
            const num = citationMap[id];
            if (!num) return '';
            const ref = referencesData.find(r => r.id === id);
            return `<sup class="citation"><a href="#ref-${num}">${num}<span class="citation-tooltip">${ref.tooltipText}</span></a></sup>`;
        });
        
        // Step 3: Inject the fully rendered HTML into the container.
        container.innerHTML = processedHtml;
        container.classList.remove('is-hidden');

        // Step 4: Re-attach event listeners for elements inside the new content.
        container.querySelector('.change-difficulty-btn').addEventListener('click', () => {
            modalOverlay.style.display = 'flex';
        });

        // Step 5: Render LaTeX and initialize demos *after* a short delay.
        setTimeout(() => {
            if (typeof renderMathInElement === 'function') {
                renderMathInElement(container, {
                    delimiters: [ {left: '`', right: '`', display: false} ],
                    throwOnError: false
                });
            }
            
            if (difficulty === 'intermediate' && !isNeuronDemoInitialized) {
                initializeNeuronDemo();
                isNeuronDemoInitialized = true;
            }
            if (difficulty === 'advanced' && !isMseDemoInitialized) {
                initializeMseDemo();
                isMseDemoInitialized = true;
            }
        }, 50);
    }

    // --- Demo Initializers ---
    function initializeNeuronDemo() {
        const inputs = [document.getElementById('input1'), document.getElementById('input2')];
        const weights = [document.getElementById('weight1'), document.getElementById('weight2')];
        const neuronBody = document.getElementById('neuron-body');
        const outputValue = document.getElementById('output-value');
        if (!inputs[0] || !weights[0] || !neuronBody || !outputValue) return;
        const sigmoid = (x) => 1 / (1 + Math.exp(-x));
        function updateNeuron() {
            let sum = 0;
            for (let i = 0; i < inputs.length; i++) { sum += parseFloat(inputs[i].value) * parseFloat(weights[i].value); }
            const output = sigmoid(sum);
            outputValue.textContent = output.toFixed(4);
            neuronBody.style.backgroundColor = `rgba(59, 130, 246, ${output})`;
            neuronBody.style.transform = `scale(${0.9 + output * 0.2})`;
        }
        [...inputs, ...weights].forEach(slider => slider.addEventListener('input', updateNeuron));
        updateNeuron();
    }
    function initializeMseDemo() {
        const trueValues = [150, 210, 250];
        const predValues = [160, 0, 235];
        const predInput = document.getElementById('pred2');
        const errorDisplays = [document.getElementById('err1'), document.getElementById('err2'), document.getElementById('err3')];
        const costValueDiv = document.getElementById('mse-cost-value');
        if (!predInput || !costValueDiv) return;
        function updateMse() {
            predValues[1] = parseFloat(predInput.value) || 0;
            let totalSquaredError = 0;
            for (let i = 0; i < trueValues.length; i++) {
                const error = trueValues[i] - predValues[i];
                const squaredError = Math.pow(error, 2);
                errorDisplays[i].textContent = squaredError.toFixed(0);
                totalSquaredError += squaredError;
            }
            const mse = totalSquaredError / trueValues.length;
            costValueDiv.textContent = mse.toFixed(0);
        }
        predInput.addEventListener('input', updateMse);
        updateMse();
    }

    // --- Initial Page Setup ---
    document.getElementById('select-beginner').addEventListener('click', () => handleSelection('beginner'));
    document.getElementById('select-intermediate').addEventListener('click', () => handleSelection('intermediate'));
    document.getElementById('select-advanced').addEventListener('click', () => handleSelection('advanced'));
    
    renderReferences();
});