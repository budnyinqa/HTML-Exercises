document.addEventListener("DOMContentLoaded", () => {
  const chatInput = document.querySelector(".chat_input textarea");
  const sendChatButton = document.querySelector("#send-btn");
  const chatbox = document.querySelector(".chatbox");
  const inputInitHeight = chatInput.scrollHeight;

  let userName = "";
  let state = 0;

  function appendMessage(message, sender = "bot") {
    const li = document.createElement("li");
    li.classList.add("chat", sender === "user" ? "start2" : "start1");

    // Zamień linki w wiadomości na klikalne
    const linkedMessage = message.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    if (sender === "bot") {
      li.innerHTML = `<span class="material-symbols-outlined">smart_toy</span><p>${linkedMessage}</p>`;
    } else {
      li.innerHTML = `<p>${linkedMessage}</p>`;
    }

    chatbox.appendChild(li);
    requestAnimationFrame(() => {
      chatbox.scrollTop = chatbox.scrollHeight;
    });
  }


  function botReply(userMessage = "") {
    if (state === 0) {
      state = 1;
    } else if (state === 1) {
      const nameMatch = userMessage.match(/\b(?:my name is|i'm|i am)\s+([^.!?,]+)/i);
      if (nameMatch) {
        userName = nameMatch[1].trim();
      } else {
        userName = userMessage.trim();
      }
      appendMessage(`Nice to meet you, ${userName}! When is your birthday? (YYYY-MM-DD)`);
      state = 2;
    } else if (state === 2) {
      const dateMatch = userMessage.match(/(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
      if (dateMatch) {
        const [_, yyyy, mm, dd] = dateMatch.map(Number);
        const now = new Date();
        let nextBday = new Date(now.getFullYear(), mm - 1, dd);
        if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
        const daysLeft = Math.ceil((nextBday - now) / (1000 * 60 * 60 * 24));
        appendMessage(`There are ${daysLeft} days left until your birthday, ${userName}! 🎉`);
        state = 3;
      } else {
        appendMessage(`I couldn't recognize the date. Please use the format YYYY-MM-DD.`);
      }
    } else {
      const msg = userMessage.toLowerCase();
      if (msg.includes("weather")) {
        appendMessage("Check the weather here: https://www.accuweather.com");
      } else if (msg.includes("time") || msg.includes("hour")) {
        appendMessage("Buy yourself a watch to keep track of time. Just avoid cheap ones — they lie! Check this site: https://www.rolex.com");
      } else if (msg.includes("thank")) {
        appendMessage("You're welcome! Glad I could help.");
      } else {
        appendMessage(`Sorry, ${userName}, I don't understand. You can ask about the weather or the time.`);
      }
    }
  }

  function handleChat() {
    const text = chatInput.value.trim();
    if (!text) return;
    appendMessage(text, "user");
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    setTimeout(() => botReply(text), 500);
  }

  sendChatButton.addEventListener("click", handleChat);
  chatInput.addEventListener("keyup", e => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleChat();
    }
  });
  chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
  });

  botReply();
});
