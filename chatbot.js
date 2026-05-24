document.addEventListener('DOMContentLoaded', () => {
  // Inject HTML
  const chatbotHTML = `
    <div id="chatbot-container">
      <div class="chatbot-window" id="chatbot-window">
        <div class="chatbot-header">
          <div class="chatbot-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><path d="M12 18v4"/></svg>
          </div>
          <div class="chatbot-title">
            <h3>SmartFlow Assistant</h3>
            <span><div class="chatbot-status-dot"></div> Online</span>
          </div>
          <button class="chatbot-close-mobile" id="chatbot-close-mobile" style="display:none; background:none; border:none; color:white; margin-left:auto; cursor:pointer;"><svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
        </div>
        <div class="chatbot-messages" id="chatbot-messages">
          <div class="chat-msg bot">
            <div class="chat-bubble">Hi there! 👋 I'm the SmartFlow AI assistant. How can I help you grow your business today?</div>
            <div class="chat-time">Just now</div>
          </div>
        </div>
        <form class="chatbot-input" id="chatbot-form">
          <input type="text" id="chatbot-input" placeholder="Type your message..." autocomplete="off">
          <button type="submit" class="chatbot-send">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </form>
      </div>
      <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open chat">
        <div class="chatbot-pulse"></div>
        <svg class="icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', chatbotHTML);

  const container = document.getElementById('chatbot-container');
  const toggleBtn = document.getElementById('chatbot-toggle');
  const windowEl = document.getElementById('chatbot-window');
  const form = document.getElementById('chatbot-form');
  const input = document.getElementById('chatbot-input');
  const messagesContainer = document.getElementById('chatbot-messages');
  const mobileCloseBtn = document.getElementById('chatbot-close-mobile');

  if(window.innerWidth <= 480) {
    mobileCloseBtn.style.display = 'block';
  }

  function toggleChat() {
    toggleBtn.classList.toggle('open');
    windowEl.classList.toggle('open');
    if(windowEl.classList.contains('open')) {
      if(window.innerWidth <= 480) container.classList.add('mobile-open');
      setTimeout(() => input.focus(), 300);
    } else {
      container.classList.remove('mobile-open');
    }
  }

  toggleBtn.addEventListener('click', toggleChat);
  mobileCloseBtn.addEventListener('click', toggleChat);

  let chatHistory = [];

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if(!text) return;
    
    appendMessage(text, 'user');
    chatHistory.push({ role: 'user', content: text });
    input.value = '';
    
    // Show typing
    const typingId = 'typing-' + Date.now();
    const typingHTML = `
      <div class="chat-msg bot" id="${typingId}">
        <div class="chat-typing">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
    scrollToBottom();

    // Advanced Mock AI Logic
    setTimeout(() => {
      const el = document.getElementById(typingId);
      if(el) el.remove();
      
      const lowerText = text.toLowerCase();
      let botReply = "";

      // Knowledge Base Keyword Matching
      const isBookingIntent = lowerText.includes('book') || lowerText.includes('call') || lowerText.includes('appointment') || lowerText.includes('consultation') || lowerText.includes('schedule') || lowerText.includes('meet');
      const isPricingIntent = lowerText.includes('price') || lowerText.includes('cost') || lowerText.includes('much') || lowerText.includes('fee');
      const isWebDesignIntent = lowerText.includes('web') || lowerText.includes('design') || lowerText.includes('site');
      const isAIReceptionistIntent = lowerText.includes('ai') || lowerText.includes('receptionist') || lowerText.includes('bot') || lowerText.includes('automation');
      const isProcessIntent = lowerText.includes('process') || lowerText.includes('step') || lowerText.includes('how it works');
      const isContactIntent = lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('phone') || lowerText.includes('number');

      if (isBookingIntent) {
        botReply = `
          That sounds great! You can easily book a free consultation with our team directly through our calendar.<br><br>
          <a href="https://calendar.app.google/k465HmB3Z1edUi9Q8" target="_blank" style="display:inline-block; background:var(--blue); color:var(--white); padding:8px 16px; border-radius:8px; text-decoration:none; font-weight:600; margin-top:8px;">📅 Book a Call Now</a>
        `;
      } else if (isPricingIntent) {
        botReply = "Our Website Design projects start from <strong>$300</strong>, and we provide custom quotes based on your specific requirements. We also offer transparent pricing for our AI Receptionist services. Would you like to book a call to discuss a quote?";
      } else if (isProcessIntent) {
        botReply = "Our process is simple and streamlined: <br>1️⃣ <strong>Consultation:</strong> We learn about your goals.<br>2️⃣ <strong>Planning:</strong> We create a tailored strategy.<br>3️⃣ <strong>Design & Setup:</strong> We build your solution.<br>4️⃣ <strong>Launch & Support:</strong> We launch and provide ongoing support.";
      } else if (isWebDesignIntent) {
        botReply = "We build stunning, custom-designed, mobile-responsive, and SEO-optimized websites that convert visitors into loyal customers. No templates, ever!";
      } else if (isAIReceptionistIntent) {
        botReply = "Our AI Receptionists are intelligent virtual assistants that handle calls, bookings, and customer inquiries 24/7 with a human-like touch, saving you hours of manual work every week.";
      } else if (isContactIntent) {
        botReply = "You can reach out to our human team directly at <strong>Smartflowaicc@gmail.com</strong> or call us at <strong>082 775 8781</strong>. Alternatively, you can book a consultation call!";
      } else {
        const defaultResponses = [
          "I'm the SmartFlow AI assistant. I can help you with information about our Website Design, AI Receptionists, pricing, or help you book a call with our team. What would you like to know?",
          "Our goal is to build digital experiences that drive real results. You can ask me about our services, our pricing, or how to get started!",
          "I'd love to tell you more about what we do. Are you interested in a new website or automating your business with an AI receptionist?"
        ];
        botReply = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      }

      chatHistory.push({ role: 'assistant', content: botReply });
      appendMessage(botReply, 'bot');
    }, 1200);
  });

  function appendMessage(text, sender) {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const msgHTML = `
      <div class="chat-msg ${sender}">
        <div class="chat-bubble">${text}</div>
        <div class="chat-time">${time}</div>
      </div>
    `;
    messagesContainer.insertAdjacentHTML('beforeend', msgHTML);
    scrollToBottom();
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});
