const difficultyLevels = ['easy', 'medium', 'hard'];
const questionsPerLevel = 3;
let currentLevelIndex = 0;
let currentQuestionIndex = 0;
let score = 0;
let allQuestions = [];

const quizProgress = document.getElementById('quizProgress');
const questionContainer = document.getElementById('questionContainer');
const answerContainer = document.getElementById('answerContainer');

function generateQuestions(count, difficulty = 'medium') {
    const questions = [];

    const ranges = {
        'easy': [1, 3],
        'medium': [4, 6],
        'hard': [7, 10]
    };

    const [min, max] = ranges[difficulty] || ranges['medium'];

    for (let i = 0; i < count; i++) {
        const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
        const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
        const correctAnswer = num1 * num2;
        const question = `${num1} * ${num2}`;

        const answers = new Set([correctAnswer]);

        while (answers.size < 3) {
            const wrong = correctAnswer + Math.floor(Math.random() * 11) - 5;
            if (wrong > 0 && wrong !== correctAnswer) {
                answers.add(wrong);
            }
        }

        const answerOptions = Array.from(answers).sort(() => Math.random() - 0.5);

        questions.push({
            question,
            correctAnswer,
            options: answerOptions,
            answered: false,
            wasIncorrectAttempted: false
        });
    }

    return questions;
}

function renderProgress() {
    quizProgress.innerHTML = '';
    difficultyLevels.forEach((_, index) => {
        const span = document.createElement('span');
        if (index <= currentLevelIndex) {
            span.classList.add('seen');
        }
        quizProgress.appendChild(span);
    });
}

function renderQuestion() {
    renderProgress();

    const currentLevel = difficultyLevels[currentLevelIndex];
    const currentQuiz = allQuestions[currentLevel];
    const current = currentQuiz[currentQuestionIndex];

    questionContainer.innerHTML = `
        <p>${currentLevel}</p>
        <p>What is ${current.question}?</p>
    `;

    answerContainer.innerHTML = '';
    current.options.forEach((option) => {
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('answer-btn');
        btn.disabled = current.answered;
        btn.onclick = () => {
            if (current.answered) return;

            const allBtns = document.querySelectorAll('.answer-btn');

            if (option === current.correctAnswer) {
                btn.classList.add('correct');

                if (!current.wasIncorrectAttempted) {
                    score++;
                }

                current.answered = true;

                allBtns.forEach(b => b.disabled = true);

                setTimeout(nextQuestion, 0);
            } else {
                current.wasIncorrectAttempted = true;
                btn.classList.remove('wrong');
                void btn.offsetWidth;
                btn.classList.add('wrong');
            }
        };


        answerContainer.appendChild(btn);
    });
}

function nextQuestion() {
    const currentQuiz = allQuestions[difficultyLevels[currentLevelIndex]];
    if (currentQuestionIndex < currentQuiz.length - 1) {
        currentQuestionIndex++;
        renderQuestion();
    } else {
        if (currentLevelIndex < difficultyLevels.length - 1) {
            currentLevelIndex++;
            currentQuestionIndex = 0;
            renderQuestion();
        } else {
            showFinalResult();
        }
    }
}

function showFinalResult() {
    renderProgress();
    questionContainer.style.textAlign = 'center';
    answerContainer.style.textAlign = 'center';
    questionContainer.innerHTML = `<p>End of the quiz!</p><p>Your score: <strong>${score}</strong> / ${difficultyLevels.length * questionsPerLevel}</p>`;
    answerContainer.innerHTML = `<button onclick="location.reload()">Play Again</button>`;
}

function initQuiz() {
    allQuestions = {
        easy: generateQuestions(questionsPerLevel, 'easy'),
        medium: generateQuestions(questionsPerLevel, 'medium'),
        hard: generateQuestions(questionsPerLevel, 'hard'),
    };
    currentLevelIndex = 0;
    currentQuestionIndex = 0;
    score = 0;
    renderQuestion();
}

initQuiz();
