// bot.js
document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Element Selections ---
  const chatForm = document.getElementById('chat-form');
  const messageInput = document.getElementById('message-input');
  const chatMessages = document.getElementById('chat-messages');
  const chatContainer = document.getElementById('chat-container');
  const suggestionContainer = document.getElementById('chat-suggestions');
  const saveChatBtn = document.getElementById('save-chat-btn');
  const clearChatBtn = document.getElementById('clear-chat-btn');
  const modelSelector = document.getElementById('model-selector');

  // --- Initial State ---
  const updateControlButtons = () => {
    const hasMessages = chatContainer.classList.contains('has-messages');
    saveChatBtn.disabled = !hasMessages;
    clearChatBtn.disabled = !hasMessages;
  };
  updateControlButtons(); // Set initial state on load

  // --- Event Listeners ---
  suggestionContainer.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('suggestion-item')) {
      const prompt = e.target.getAttribute('data-prompt');
      messageInput.value = prompt;
      chatForm.dispatchEvent(new Event('submit'));
    }
  });

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userMessage = messageInput.value.trim();
    if (!userMessage) return;

    if (!chatContainer.classList.contains('has-messages')) {
        chatContainer.classList.add('has-messages');
        updateControlButtons(); // Enable buttons
    }

    addMessage(userMessage, 'user');
    messageInput.value = '';
    
    const typingIndicator = addMessage('Leo is thinking...', 'bot', 'typing');

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // UPDATED BODY: send the message AND the selected model
        body: JSON.stringify({
          message: userMessage,
          model: modelSelector.value 
        }),
      });


    } catch (error) {
      console.error('Error:', error);
      const p = document.createElement('p');
      p.textContent = 'Sorry, something went wrong. Please try again.';
      typingIndicator.innerHTML = '';
      typingIndicator.appendChild(p);
      typingIndicator.classList.remove('typing');
    }
  });

  // NEW: Clear Chat Logic
  clearChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '';
    chatContainer.classList.remove('has-messages');
    updateControlButtons(); // Disable buttons
  });

  // NEW: Save Chat Logic
  saveChatBtn.addEventListener('click', () => {
    let chatContent = "AI Market Analyst Chat Log\n";
    chatContent += `Saved on: ${new Date().toLocaleString()}\n\n`;
    
    const messages = chatMessages.querySelectorAll('.message');
    messages.forEach(msg => {
      const isUser = msg.classList.contains('user');
      const prefix = isUser ? 'User:' : 'Leo:';
      // .textContent gets the clean text without any HTML or Markdown
      chatContent += `${prefix}\n${msg.textContent.trim()}\n\n`;
    });
    
    // Create a blob and trigger a download
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat-log.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });

  // --- Core Functions ---
  function addMessage(text, ...senders) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', ...senders);

    if (senders.includes('bot') && !senders.includes('typing')) {
      messageElement.innerHTML = marked.parse(text);
    } else {
      const p = document.createElement('p');
      p.textContent = text;
      messageElement.appendChild(p);
    }
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return messageElement;
  }
});