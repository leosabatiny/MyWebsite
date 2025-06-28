// leolearn-svd.js
document.addEventListener('DOMContentLoaded', () => {
    // --- Store all content and references as data ---
    const referencesData = [
        {
            id: 'stewart1993',
            author: 'Stewart, G. W.',
            tooltipText: `Stewart, G. W. (1993). On the Early History of the Singular Value Decomposition. SIAM Review, 35(4), 551–566.`,
            fullHtml: `Stewart, G. W. (1993). On the Early History of the Singular Value Decomposition. <em>SIAM Review, 35</em>(4), 551–566. <a href="https://doi.org/10.1137/1035134" target="_blank" rel="noopener noreferrer">https://doi.org/10.1137/1035134</a>`
        },
        {
            id: 'strang2016',
            author: 'Strang, G.',
            tooltipText: `Strang, G. (2016). Introduction to Linear Algebra (5th ed.). Wellesley-Cambridge Press.`,
            fullHtml: `Strang, G. (2016). <em>Introduction to Linear Algebra</em> (5th ed.). Wellesley-Cambridge Press.`
        },
        {
            id: 'andrews1976',
            author: 'Andrews, H. C., & Patterson, C. L.',
            tooltipText: `Andrews, H. C., & Patterson, C. L. (1976). Singular Value Decomposition (SVD) Image Coding. IEEE Transactions on Communications, 24(4), 425–432.`,
            fullHtml: `Andrews, H. C., & Patterson, C. L. (1976). Singular Value Decomposition (SVD) Image Coding. <em>IEEE Transactions on Communications, 24</em>(4), 425–432. <a href="https://doi.org/10.1109/TCOM.1976.1093309" target="_blank" rel="noopener noreferrer">https://doi.org/10.1109/TCOM.1976.1093309</a>`
        }
    ];

    const contentData = {
        beginner: `
<div class="container">
    <div class="content-header"><h2>Beginner: The Master Recipe for Data</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>Singular Value Decomposition (SVD) is a powerful mathematical tool for breaking down complex information into its simplest, most fundamental parts. Its origins trace back to the work of 19th-century mathematicians who were studying how to simplify complex systems of equations.{{CITE:stewart1993}} In the modern world, its applications are vast, from compressing images to powering the recommendation engines on sites like Netflix and Spotify.</p>
    <p>The best way to understand SVD is with an analogy. Imagine a photograph is a complex "smoothie." SVD acts as a master recipe that identifies the core "ingredients" of the image. These aren't pixels, but more abstract concepts like **"overall shape," "dominant colors," "major textures," and "fine details."** The most crucial aspect of SVD is that it **ranks these ingredients by importance**—how much each one contributes to the final look and feel of the image.</p>
    <div class="info-box"><h4>Core Concept: Low-Rank Approximation</h4><p>Because SVD ranks the ingredients, we can create a "good enough" version of the original image by using only the top-ranked, most important ones. This is called a **low-rank approximation**. By discarding the hundreds or thousands of less important details (the "least important ingredients"), we can drastically reduce the amount of data needed to store the image, forming the foundation of modern compression techniques like JPEG.{{CITE:andrews1976}}</p></div>
    <h3>Check Your Understanding</h3>
    <p>This interactive section helps build your intuition. Click on a question to reveal its answer and see if your thinking aligns.</p>
    <details class="interactive-toggle"><summary>If you use SVD to compress an image by keeping only 10% of the ingredients, what will the result look like?</summary><p><strong>A:</strong> The image will be recognizable but blurry or less detailed. You've captured the main shapes and colors (the most important ingredients) but have thrown away all the fine textures and subtle variations (the least important ingredients). It's like a low-resolution version of the original.</p></details>
</div>`,
        intermediate: `
<div class="container">
    <div class="content-header"><h2>Intermediate: A Geometric Story</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>In linear algebra, we can view a matrix not just as a grid of numbers, but as a function that performs a **linear transformation** on space. It can take any vector (an arrow pointing from the origin) and transform it into a new vector by rotating, stretching, or shearing it. The SVD theorem provides a profound geometric insight: *any* complex linear transformation is secretly just a sequence of three simpler, fundamental operations.{{CITE:strang2016}}</p>
    <p>This decomposition is captured in the equation \`A = U \\Sigma V^T\`, where \`A\` is our original transformation, and the three components represent:</p>
    <ol>
        <li><strong>A Rotation (\`V^T\`):</strong> The space is first rotated. The \`V\` matrix is **orthogonal**, a special type of matrix that performs a pure rotation without changing any lengths or angles. Its job is to align the main "input" directions of our space with the axes.</li>
        <li><strong>A Scaling (\`\\Sigma\`):</strong> The rotated space is then stretched or squashed along these newly aligned axes. This is the only step where lengths change. The \`\\Sigma\` matrix is **diagonal**, meaning it only has values on its main diagonal. These values, the **singular values**, tell us the exact amount of stretch for each axis.</li>
        <li><strong>Another Rotation (\`U\`):</strong> The scaled space is rotated a final time to its resulting orientation in the "output" space. \`U\` is also an orthogonal matrix.</li>
    </ol>
    <h3>Interactive Scaling Demo</h3>
    <p>This demo isolates the crucial second step: the scaling controlled by the \`\\Sigma\` matrix. The two sliders represent the two main singular values for a 2D transformation, \`\\sigma_1\` and \`\\sigma_2\`. They control the amount of stretch along the horizontal and vertical axes, respectively. By adjusting them, you are manually performing the core "stretching" action that SVD automatically discovers for any transformation.</p>
    <div class="svd-image-demo">
        <div class="svd-image-container"><img src="https://placehold.co/200x200/2563EB/FFFFFF?text=Shape" id="svd-shape" alt="A shape to be transformed"></div>
        <div class="svd-controls">
            <div class="input-group"><label>Horizontal Stretch (σ₁):</label><input type="range" id="sigma1" min="0.1" max="2" step="0.01" value="1"></div>
            <div class="input-group"><label>Vertical Stretch (σ₂):</label><input type="range" id="sigma2" min="0.1" max="2" step="0.01" value="1"></div>
        </div>
    </div>
</div>`,
        advanced: `
<div class="container">
    <div class="content-header"><h2>Advanced: The Link to Eigendecomposition</h2><button class="change-difficulty-btn">Change Difficulty</button></div>
    <p>The computational power of SVD stems from its deep connection to one of linear algebra's most fundamental concepts: **eigenvectors and eigenvalues**. An eigenvector of a matrix is a special non-zero vector that, when the matrix is applied to it, does not change its direction, only its length. The factor by which it's scaled is its corresponding eigenvalue. While this **eigendecomposition** only works for certain square matrices, SVD elegantly generalizes this idea to *any* rectangular matrix.</p>
    <p>For any \`m x n\` matrix \`A\`, we can construct two special square, symmetric matrices: \`A^TA\` and \`AA^T\`. These matrices are always positive semidefinite, guaranteeing their eigenvalues are real and non-negative. The SVD components of \`A\` are derived directly from the eigendecomposition of these two matrices.{{CITE:strang2016}}</p>
    <ul>
        <li>The columns of \`V\` (the **right singular vectors**) are the orthonormal eigenvectors of the covariance matrix \`A^TA\`. These vectors form an optimal basis for the input space.</li>
        <li>The columns of \`U\` (the **left singular vectors**) are the orthonormal eigenvectors of \`AA^T\`. These form an optimal basis for the output space.</li>
        <li>The singular values \`\\sigma_i\` in \`\\Sigma\` are the square roots of the non-zero eigenvalues of both \`A^TA\` and \`AA^T\`.</li>
    </ul>
    <p>This makes SVD the core engine behind **Principal Component Analysis (PCA)**, where it's used to reduce the dimensionality of data by finding the directions of maximum variance (the principal components).</p>
    <h3>Interactive 2x2 Singular Value Calculator</h3>
    <p>This demo performs the core mathematical steps to find the singular values for a 2x2 matrix \`A\`. It first computes \`B = A^TA\`, then finds the eigenvalues of \`B\` by solving its characteristic equation: \`\\lambda^2 - \\text{trace}(B)\\lambda + \\det(B) = 0\`. The singular values are the square roots of these eigenvalues.</p>
    <div class="svd-calculator-demo">
        <h4>Matrix A</h4>
        <div class="matrix-input-grid"><input type="number" class="matrix-input" id="a11" value="3"><input type="number" class="matrix-input" id="a12" value="0"><input type="number" class="matrix-input" id="a21" value="0"><input type="number" class="matrix-input" id="a22" value="-2"></div>
        <div class="svd-results"><h4>Singular Values (σ):</h4><div class="svd-output" id="sigma-output">σ₁ = ?, σ₂ = ?</div></div>
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
    let isImageDemoInitialized = false;
    let isCalcDemoInitialized = false;
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

        // --- THE DEFINITIVE FIX: Move all initialization inside a timeout ---
        setTimeout(() => {
            // Render LaTeX
            if (typeof renderMathInElement === 'function') {
                renderMathInElement(container, {
                    delimiters: [ {left: '`', right: '`', display: false} ],
                    throwOnError: false
                });
            }
            
            // Initialize demos now that HTML is guaranteed to be in the DOM
            if (difficulty === 'intermediate' && !isImageDemoInitialized) {
                initializeImageDemo();
                isImageDemoInitialized = true;
            }
            if (difficulty === 'advanced' && !isCalcDemoInitialized) {
                initializeCalcDemo();
                isCalcDemoInitialized = true;
            }
        }, 50); // A 50ms delay is imperceptible but allows the browser to render the HTML.
    }

    // --- Demo Initializers (no changes) ---
    function initializeImageDemo() {
        const sigma1Slider = document.getElementById('sigma1');
        const sigma2Slider = document.getElementById('sigma2');
        const shape = document.getElementById('svd-shape');
        if (!sigma1Slider || !sigma2Slider || !shape) return;
        function updateShape() { shape.style.transform = `scale(${sigma1Slider.value}, ${sigma2Slider.value})`; }
        sigma1Slider.addEventListener('input', updateShape);
        sigma2Slider.addEventListener('input', updateShape);
        updateShape();
    }
    function initializeCalcDemo() {
        const inputs = [document.getElementById('a11'), document.getElementById('a12'), document.getElementById('a21'), document.getElementById('a22')];
        const outputDiv = document.getElementById('sigma-output');
        if (!inputs[0] || !outputDiv) return;
        function calculateSvd() {
            const [a, b, c, d] = inputs.map(el => parseFloat(el.value) || 0);
            const b11 = a*a + c*c, b12 = a*b + c*d, b21 = b*a + d*c, b22 = b*b + d*d;
            const trace = b11 + b22, det = b11*b22 - b12*b21;
            const discriminant = Math.sqrt(Math.max(0, trace*trace - 4*det));
            const eig1 = (trace + discriminant) / 2, eig2 = (trace - discriminant) / 2;
            const s1 = Math.sqrt(Math.max(0, eig1)), s2 = Math.sqrt(Math.max(0, eig2));
            const sorted = [s1, s2].sort((x, y) => y - x);
            outputDiv.textContent = `σ₁ = ${sorted[0].toFixed(3)}, σ₂ = ${sorted[1].toFixed(3)}`;
        }
        inputs.forEach(input => input.addEventListener('input', calculateSvd));
        calculateSvd();
    }

    // --- Initial Page Setup ---
    document.getElementById('select-beginner').addEventListener('click', () => handleSelection('beginner'));
    document.getElementById('select-intermediate').addEventListener('click', () => handleSelection('intermediate'));
    document.getElementById('select-advanced').addEventListener('click', () => handleSelection('advanced'));
    
    renderReferences();
});