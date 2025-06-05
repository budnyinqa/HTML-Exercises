# HTML - Exercises
This repository documents the process of learning the fundamentals of HTML, CSS and JavaScript during my university studies.

## Operations on Variables - Exercise 1
This project is a simple, interactive calculator-like web app that performs basic aggregate operations on values entered by the user. Its main purpose was to practice working with variables and functions in a real-world scenario.

The goal of this exercise was not just to build a calculator, but to deepen my understanding of how user input is processed and used in calculations, while reinforcing front-end development fundamentals.

![Image](https://github.com/user-attachments/assets/97095aca-376e-4c1b-bf76-5d43e2077ab1)



## WCAG - Exercise 2
This is one of the simplest websites I created during my studies — but also one of the most informative when it comes to accessibility. While the page contains only a single image, a heading, and a short description, the focus of the exercise was on applying WCAG (Web Content Accessibility Guidelines) best practices.

Despite the minimalist layout, I learned a lot about:

- structuring content semantically using proper HTML elements,
- assigning descriptive alt text to images to ensure screen reader compatibility,
- using logically ordered headings to provide a clear content hierarchy,
- ensuring good contrast ratios for readability,
- making the site navigable and understandable for people using assistive technologies.

![Image](https://github.com/user-attachments/assets/a3c6e338-ccb9-425b-84c2-92f589577e62)



## Calculator - Exercise 3
The goal of this project was to create a functional calculator that not only looks clean and responsive, but also performs common arithmetic operations with proper error handling and accessibility. While my first exercise focused on basic variable handling and simple operations, this project brings it all together into a fully interactive and visually polished web calculator.

The calculator logic is powered by a set of custom JavaScript functions. Here's a breakdown:
```html
appendToDisplay(input);  // Adds number or symbol to the display
clearDisplay();          // Clears the entire input
calculate();             // Evaluates the expression using eval(), with safety checks
percentage();            // Converts input value to its percentage
squareRoot();            // Calculates square root if input is valid and non-negative
deleteLast();            // Removes last character (like backspace)
```
Each function includes basic validation, and the UI automatically prevents layout overflow for long results. The calculator also gracefully handles mathematical edge cases like division by zero or square roots of negative numbers.

Through this project, I developed a deeper understanding of:
- DOM manipulation – selecting elements like the display and attaching events to buttons
- UI/UX improvements – shortening long results to fit the screen with slice() and adding visual consistency with CSS variables

![Image](https://github.com/user-attachments/assets/541cda99-f1f9-460b-9e58-66e4071b32cd)




## Multiplication Table Quiz - Exercise 4
This project is a simple yet powerful quiz app designed to help users practice multiplication in a fun, interactive way. The quiz dynamically generates multiplication questions across three difficulty levels. Each level contains a series of randomized questions with multiple answer options. The user receives immediate feedback after picking the wrong answer, and their progress is tracked.

To ensure the quiz offers a balanced and fair challenge, each question is generated with one correct answer and two plausible incorrect options. These are randomized to prevent memorization of positions and to keep users engaged.
```html
const answers = new Set([correctAnswer]);

while (answers.size < 3) {
  const wrong = correctAnswer + Math.floor(Math.random() * 11) - 5;
  if (wrong > 0 && wrong !== correctAnswer) {
    answers.add(wrong);
  }
}

const answerOptions = Array.from(answers).sort(() => Math.random() - 0.5);
```
This snippet builds a set of three unique answer choices—including the correct one—and then shuffles them before rendering. This logic helps maintain fairness and variety throughout the quiz.

Through this project, I:
- implemented condition-based logic for state transitions,
- learned about sets for unique data handling,
- built a responsive, no-framework interface,
- applied progressive enhancement techniques.

![Image](https://github.com/user-attachments/assets/22f2cc25-bb02-4642-a4b1-afb41379a0b6)



## Chatbot - Exercise 5
This interactive chatbot was created as part of an exercise to practice conversational state management and user personalization in JavaScript. The bot welcomes the user, asks for their name and birthday, and tailors its replies based on that data. It also responds intelligently to certain queries like checking the weather or time – with a humorous twist.

The bot starts by greeting the user and capturing their name, either from structured input like “My name is X” or a direct name input.
```html
if (state === 1) {
  const nameMatch = userMessage.match(/\b(?:my name is|i'm|i am)\s+([^.!?,]+)/i);
  userName = nameMatch ? nameMatch[1].trim() : userMessage.trim();
  appendMessage(`Nice to meet you, ${userName}! When is your birthday? (YYYY-MM-DD)`);
  state = 2;
}
```

After receiving the user's birth date in YYYY-MM-DD format, the bot calculates how many days are left until the next birthday and responds accordingly.
```html
const now = new Date();
let nextBday = new Date(now.getFullYear(), mm - 1, dd);
if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
const daysLeft = Math.ceil((nextBday - now) / (1000 * 60 * 60 * 24));
appendMessage(`There are ${daysLeft} days left until your birthday, ${userName}! 🎉`);
```

When the conversation progresses, the bot listens for keywords like "weather" or "time", and provides external resources using dynamically embedded links.
```html
if (msg.includes("weather")) {
  appendMessage("Check the weather here: https://www.accuweather.com");
} else if (msg.includes("time") || msg.includes("hour")) {
  appendMessage("Buy yourself a watch to keep track of time. Just avoid cheap ones — they lie! Check this site: https://www.rolex.com");
}
```
Skills I practiced:
- managing conversation state with conditional logic,
- parsing user input using regular expressions,
- using Date objects for time-based calculations,
- dynamically generating DOM content,
- embedding secure clickable links in messages,
- structuring user-friendly UI updates using scrollHeight and scroll behavior.
  
![Image](https://github.com/user-attachments/assets/e3596aa8-2617-4dd0-9460-498397ef021b)
