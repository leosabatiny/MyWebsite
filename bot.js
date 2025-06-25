// bot.js

// REGION START: setup
document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const messageInput = document.getElementById('message-input');
  const chatMessages = document.getElementById('chat-messages');
  const chatContainer = document.getElementById('chat-container');
  const suggestionContainer = document.getElementById('chat-suggestions');
  const saveChatBtn = document.getElementById('save-chat-btn');
  const clearChatBtn = document.getElementById('clear-chat-btn');
  const modelSelector = document.getElementById('model-selector');
// REGION END: setup

// REGION START: initial-state
  const updateControlButtons = () => {
    const hasMessages = chatContainer.classList.contains('has-messages');
    saveChatBtn.disabled = !hasMessages;
    clearChatBtn.disabled = !hasMessages;
  };
  updateControlButtons();
// REGION END: initial-state

// REGION START: listeners
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
        updateControlButtons();
    }

    addMessage(userMessage, 'user');
    messageInput.value = '';
    
    const typingIndicator = addMessage('Leo is thinking...', 'bot', 'typing');

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          model: modelSelector.value 
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      typingIndicator.remove();
      addMessage(data.reply, 'bot');

    } catch (error) {
      console.error('Error:', error);
      if(typingIndicator) typingIndicator.remove();
      addMessage('Sorry, something went wrong. Please check if the server is running and try again.', 'bot');
    }
  });

  clearChatBtn.addEventListener('click', () => {
    chatMessages.innerHTML = '';
    chatContainer.classList.remove('has-messages');
    updateControlButtons();
  });

  saveChatBtn.addEventListener('click', () => {
    let chatContent = "AI Market Analyst Chat Log\n";
    chatContent += `Saved on: ${new Date().toLocaleString()}\n\n`;
    
    const messages = chatMessages.querySelectorAll('.message');
    messages.forEach(msg => {
      const isUser = msg.classList.contains('user');
      const prefix = isUser ? 'User:' : 'Leo:';
      chatContent += `${prefix}\n${msg.textContent.trim()}\n\n`;
    });
    
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
// REGION END: listeners

// REGION START: add-message
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
// REGION END: add-message