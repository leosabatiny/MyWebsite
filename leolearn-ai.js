// leolearn-ai.js
document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('difficulty-modal-overlay');
    
    // Buttons for selection
    const selectBeginnerBtn = document.getElementById('select-beginner');
    const selectIntermediateBtn = document.getElementById('select-intermediate');
    const selectAdvancedBtn = document.getElementById('select-advanced');
    
    // Content sections to display
    const contentBeginner = document.getElementById('content-beginner');
    const contentIntermediate = document.getElementById('content-intermediate');
    const contentAdvanced = document.getElementById('content-advanced');

    // Function to handle the selection
    const handleSelection = (contentToShow) => {
        // Hide the modal
        modalOverlay.style.display = 'none';

        // Hide all content sections first
        contentBeginner.classList.add('is-hidden');
        contentIntermediate.classList.add('is-hidden');
        contentAdvanced.classList.add('is-hidden');

        // Show the selected content
        contentToShow.classList.remove('is-hidden');
    };

    // Add event listeners to the buttons
    selectBeginnerBtn.addEventListener('click', () => handleSelection(contentBeginner));
    selectIntermediateBtn.addEventListener('click', () => handleSelection(contentIntermediate));
    selectAdvancedBtn.addEventListener('click', () => handleSelection(contentAdvanced));
});