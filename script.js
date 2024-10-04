let score = 0;
let questionNumber = 0;
let timer, timeout;
let correctOption;

const quizQuestions = [
  {
    category: "Science & Nature",
    question: "What is the chemical symbol for water?",
    options: ["O₂", "H₂O", "CO₂", "H₂O₂"],
    answer: "H₂O",
  },
  {
    category: "General Knowledge",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    category: "History",
    question: "Who was the first President of the United States?",
    options: [
      "Thomas Jefferson",
      "Abraham Lincoln",
      "John Adams",
      "George Washington",
    ],
    answer: "George Washington",
  },
  {
    category: "Entertainment: Music",
    question: "Which singer is known as the 'Queen of Pop'?",
    options: ["Madonna", "Britney Spears", "Lady Gaga", "Beyoncé"],
    answer: "Madonna",
  },
  {
    category: "Sports",
    question: "In which sport would you perform a 'slam dunk'?",
    options: ["Football", "Tennis", "Basketball", "Baseball"],
    answer: "Basketball",
  },
];

// DOM Elements
let replay_btn = document.querySelector(".replay-quiz");
let exitquiz_btn = document.querySelector(".exit-quiz");
let score_card = document.querySelector(".result-box");
let start_btn = document.querySelector(".start_btn");
let instructionBox = document.querySelector(".instructions_box");
let quesBox = document.querySelector(".question_box");
let continueQuiz = document.querySelector(".continue_btn");

// Event Listeners
start_btn.addEventListener("click", (e) => {
  e.target.style.display = "none";
  instructionBox.style.display = "inline";
});

let exitQuiz = document.querySelector(".exit_btn");
exitQuiz.addEventListener("click", () => {
  start_btn.style.display = "inline";
  instructionBox.style.display = "none";
  questionNumber = 0;
});

continueQuiz.addEventListener("click", () => {
  quesBox.style.display = "inline";
  instructionBox.style.display = "none";
  showQuestion(questionNumber);
});

const showQuestion = (questionNumber) => {
  if (questionNumber < quizQuestions.length) {
    const element = quizQuestions[questionNumber];
    quesBox.innerHTML = `
      <div class="header">
        <div class="timer">Time left <span>15</span></div>
      </div>
      <div class="ques">${element.question}</div>
      <div class="options">
        <ul>
          <li class="option">${element.options[0]}</li>
          <li class="option">${element.options[1]}</li>
          <li class="option">${element.options[2]}</li>
          <li class="option">${element.options[3]}</li>
        </ul>
      </div>
      <div class="ques_footer">
        <div class="question_number"><span>${questionNumber + 1}</span> of <span>${quizQuestions.length}</span> Questions</div>
        <div class="button">
          <button class="next_btn">Next Que</button>
        </div>
      </div>
    `;

    clearInterval(timer);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      nextQuestion();
    }, 15000);
    startTimer();

    let options = document.querySelectorAll(".option");
    correctOption = Array.from(options).find(option => option.textContent === element.answer);

    options.forEach(option => {
      option.onclick = (e) => {
        const selected = e.target.textContent;
        const isCorrect = selected === element.answer;
        const feedback = document.createElement("span");

        if (isCorrect) {
          score += 1;
          feedback.innerHTML = "&#10003;"; // Checkmark
          feedback.className = "right";
        } else {
          feedback.innerHTML = "&#10005;"; // Cross
          feedback.className = "wrong";
          if (correctOption) {
            correctOption.classList.add("correct"); // Highlight the correct option
          }
        }

        e.target.appendChild(feedback);
        options.forEach(opt => opt.classList.add("disabled"));
        clearInterval(timer);
        clearTimeout(timeout);
        setTimeout(() => {
          if (correctOption) {
            correctOption.classList.remove("correct"); // Remove highlight before next question
          }
          nextQuestion();
        }, 1000); // Proceed to next question after feedback
      };
    });

    let nextques_btn = document.querySelector(".next_btn");
    nextques_btn.addEventListener("click", () => {
      nextQuestion();
    });
  } else {
    document.querySelector(".finalstatement").innerHTML = `Your Final score is <span>${score}</span> out of <span>${quizQuestions.length}</span>`;
    score_card.style.display = "inline";
    quesBox.style.display = "none";
  }
};

const nextQuestion = () => {
  questionNumber++;
  showQuestion(questionNumber);
};

const startTimer = () => {
  let timeLeft = 15;
  timer = setInterval(() => {
    if (timeLeft < 10) timeLeft = "0" + timeLeft;
    document.querySelector(".timer span").textContent = timeLeft;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
};

// Replay & Exit
replay_btn.addEventListener("click", () => {
  score_card.style.display = "none";
  quesBox.style.display = "inline";
  questionNumber = 0;
  score = 0;
  showQuestion(questionNumber);
});

exitquiz_btn.addEventListener("click", () => {
  start_btn.style.display = "inline";
  score_card.style.display = "none";
  questionNumber = 0;
  score = 0;
});

  