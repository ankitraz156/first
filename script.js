const chatButton = document.createElement('div');
chatButton.id = 'chatButton';

const chatImage = document.createElement('img');
chatImage.src = 'https://i.ibb.co/CBn8f74/Picsart-24-10-27-23-06-37-742.png';
chatImage.alt = 'Chat with us!';
chatImage.style.width = '110px';
chatImage.style.height = '100px';

chatButton.appendChild(chatImage);
document.body.appendChild(chatButton);

// Create chat box
const chatBox = document.createElement('div');
chatBox.id = 'chatBox';
chatBox.style.position = 'fixed';
chatBox.style.bottom = '20px';
chatBox.style.right = '20px';
chatBox.style.width = '300px';
chatBox.style.border = '1px solid #ccc';
chatBox.style.borderRadius = '8px';
chatBox.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
chatBox.style.display = 'none';
chatBox.style.flexDirection = 'column';

const closeButton = document.createElement('button');
closeButton.innerText = '✖';
closeButton.style.background = 'none';
closeButton.style.border = 'none';
closeButton.style.color = '#f00';
closeButton.style.fontSize = '40px';
closeButton.style.cursor = 'pointer';
closeButton.style.position = 'absolute';
closeButton.style.top = '-11px';
closeButton.style.right = '7px';
closeButton.title = 'Close chat';

chatBox.appendChild(closeButton);

const chatBoxHeader = document.createElement('div');
chatBoxHeader.id = 'chatBoxHeader';
chatBoxHeader.style.background = '#0099ff';
chatBoxHeader.style.padding = '10px';
chatBoxHeader.style.borderTopLeftRadius = '8px';
chatBoxHeader.style.borderTopRightRadius = '8px';
chatBoxHeader.textContent = 'Customer Support';

// Form for email and name
const userForm = document.createElement('form');
userForm.id = 'userForm';
userForm.style.padding = '20px';

const emailInput = document.createElement('input');
emailInput.type = 'email';
emailInput.placeholder = 'Enter your email';
emailInput.required = true;
emailInput.style.marginBottom = '20px';
emailInput.style.width = '95%';
emailInput.style.padding = '2px';

const nameInput = document.createElement('input');
nameInput.type = 'text';
nameInput.placeholder = 'Enter your name';
nameInput.required = true;
nameInput.style.marginBottom = '30px';
nameInput.style.width = '95%';
nameInput.style.padding = '2px';

const startChatButton = document.createElement('button');
startChatButton.type = 'submit';
startChatButton.textContent = 'Start Chat';
startChatButton.style.width = '100%';
startChatButton.style.padding = '10px';
startChatButton.style.background = '#4CAF50';
startChatButton.style.border = 'none';
startChatButton.style.color = 'white';
startChatButton.style.cursor = 'pointer';
startChatButton.style.borderRadius = '50px';

userForm.appendChild(emailInput);
userForm.appendChild(nameInput);
userForm.appendChild(startChatButton);

chatBox.appendChild(chatBoxHeader);
chatBox.appendChild(userForm);

const chatBoxContent = document.createElement('div');
chatBoxContent.id = 'chatBoxContent';
chatBoxContent.style.padding = '10px';
chatBoxContent.style.maxHeight = '280px';
chatBoxContent.style.overflowY = 'auto';
chatBoxContent.style.display = 'none';

const inputContainer = document.createElement('div');
inputContainer.style.display = 'flex';
inputContainer.style.alignItems = 'center';
inputContainer.style.padding = '10px';
inputContainer.style.borderTop = '3px solid #ccc';
inputContainer.style.marginTop = 'auto';
inputContainer.style.display = 'none';

const chatInput = document.createElement('input');
chatInput.id = 'chatInput';
chatInput.placeholder = 'Type your Message...';
chatInput.style.flex = '1';
chatInput.style.padding = '10px';
chatInput.style.border = '1px solid #ccc';
chatInput.style.borderRadius = '4px';

const sendButton = document.createElement('button');
sendButton.id = 'sendButton';
sendButton.style.background = '#4CAF50';
sendButton.style.border = 'none';
sendButton.style.color = 'white';
sendButton.style.fontSize = '30px';
sendButton.style.cursor = 'pointer';
sendButton.style.borderRadius = '8px';
sendButton.style.height = '40px';
sendButton.style.width = '40px';
sendButton.style.lineHeight = '40px';
sendButton.style.marginLeft = '5px';
sendButton.style.padding = '0px';
sendButton.textContent = '📤';

inputContainer.appendChild(chatInput);
inputContainer.appendChild(sendButton);
chatBox.appendChild(chatBoxContent);
chatBox.appendChild(inputContainer);
document.body.appendChild(chatBox);

// All functions and local storage functionality remain unchanged

//Local storage code //
let staticUsername = ''; 
let lastReceivedMessage = ''; 
let lastUpdateId = 0; 

// Load user data and chat history from local storage
window.addEventListener('load', () => {
  const savedEmail = localStorage.getItem('chatEmail');
  const savedName = localStorage.getItem('chatName');
  const savedChatHistory = localStorage.getItem('chatHistory');

  if (savedEmail && savedName) {
    staticUsername = `${savedEmail} (${savedName})`;
    emailInput.value = savedEmail;
    nameInput.value = savedName;
    userForm.style.display = 'none';
    chatBoxContent.style.display = 'block';
    inputContainer.style.display = 'flex';

    if (savedChatHistory) {
      chatBoxContent.innerHTML = savedChatHistory;
      chatBoxContent.scrollTop = chatBoxContent.scrollHeight; // Scroll to bottom
    }
  }
});

// Save message to local storage and display it
function displayMessage(sender, message) {
  const messageNode = document.createElement('p');
  messageNode.textContent = `${sender}: ${message}`;
 // Add class based on the sender
 if (sender === 'You') {
    messageNode.classList.add('message', 'user-message');
  } else {
    messageNode.classList.add('message', 'support-message');
  }

  chatBoxContent.appendChild(messageNode);
  chatBoxContent.scrollTop = chatBoxContent.scrollHeight; // Scroll to bottom

  // Save updated chat history
  localStorage.setItem('chatHistory', chatBoxContent.innerHTML);
}

// Function to send message
function sendMessage() {
  const message = chatInput.value.trim().toLowerCase();
  if (message) {
    displayMessage('You', message);
    chatInput.value = '';
    sendToTelegram(`${staticUsername}: ${message}`);
  }
}

// Send message to Telegram
function sendToTelegram(message) {
  const token = '7805255274:AAGwfpLm_V4OH4sB3W5UTPwZK1BeHpBPX78';
  const chatIds = ['5912338062', '7211346857'];
  const url = `https://api.telegram.org/bot${token}/sendMessage`;

  chatIds.forEach(chat_id => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chat_id, text: message })
    });
  });
}

// Receive messages from Telegram
function getResponse() {
  const token = '7805255274:AAGwfpLm_V4OH4sB3W5UTPwZK1BeHpBPX78';
  const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.result.length) {
        data.result.forEach(update => {
          if (update.message && update.message.reply_to_message && update.message.reply_to_message.text.includes(staticUsername)) {
            const messageText = update.message.text.replace(`${staticUsername}: `, '');
            displayMessage('Support', messageText);
            lastReceivedMessage = update.message.text;
          }
          lastUpdateId = update.update_id;
        });
      }
    });
}

// Save user details on form submit and display chat
userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();
  const name = nameInput.value.trim();
  if (email && name) {
    staticUsername = `${email} (${name})`;
    localStorage.setItem('chatEmail', email);
    localStorage.setItem('chatName', name);

    userForm.style.display = 'none';
    chatBoxContent.style.display = 'block';
    inputContainer.style.display = 'flex';
    getResponse();
    chatBoxContent.scrollTop = chatBoxContent.scrollHeight; // Scroll to bottom
  }
});

// Open and close chatbox
chatButton.addEventListener('click', () => {
  chatBox.style.display = 'block';
  chatBoxContent.scrollTop = chatBoxContent.scrollHeight; // Scroll to bottom
});
closeButton.addEventListener('click', () => {
  chatBox.style.display = 'none';
});

// Send message events
sendButton.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Poll for new responses
setInterval(getResponse, 2000);
