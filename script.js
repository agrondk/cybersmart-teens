// Mobile navigation
const menuButton = document.getElementById("menuButton");
const navigation = document.getElementById("navigation");

menuButton.addEventListener("click", function () {
  navigation.classList.toggle("open");
  const menuIsOpen = navigation.classList.contains("open");
  menuButton.setAttribute("aria-expanded", menuIsOpen);
});

// Close the mobile menu after a link is clicked
const navigationLinks = navigation.querySelectorAll("a");
navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Password strength checker
const passwordInput = document.getElementById("passwordInput");
const showPasswordButton = document.getElementById("showPassword");
const strengthBar = document.getElementById("strengthBar");
const strengthMessage = document.getElementById("strengthMessage");

const lengthRule = document.getElementById("lengthRule");
const caseRule = document.getElementById("caseRule");
const numberRule = document.getElementById("numberRule");
const symbolRule = document.getElementById("symbolRule");

passwordInput.addEventListener("input", function () {
  const password = passwordInput.value;

  const hasLength = password.length >= 12;
  const hasUpperAndLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  updateRule(lengthRule, hasLength);
  updateRule(caseRule, hasUpperAndLower);
  updateRule(numberRule, hasNumber);
  updateRule(symbolRule, hasSymbol);

  const score = [hasLength, hasUpperAndLower, hasNumber, hasSymbol].filter(Boolean).length;
  updateStrength(score, password.length);
});

function updateRule(rule, passed) {
  rule.classList.toggle("passed", passed);
}

function updateStrength(score, passwordLength) {
  const widths = ["0%", "25%", "50%", "75%", "100%"];
  const colors = ["#e95555", "#e95555", "#e69538", "#d1b628", "#3c9a48"];
  const messages = ["Start typing to test its strength.", "Very weak", "Getting better", "Almost there", "Strong practice password!"];

  if (passwordLength === 0) {
    score = 0;
  }

  strengthBar.style.width = widths[score];
  strengthBar.style.backgroundColor = colors[score];
  strengthMessage.textContent = messages[score];
}

showPasswordButton.addEventListener("click", function () {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  showPasswordButton.textContent = isHidden ? "Hide" : "Show";
});

// Scam-spotting quiz
const quizQuestions = [
  {
    question: "A friend sends: â€˜I am locked out! Send me the code that just arrived on your phone.â€™ What should you do?",
    answers: [
      "Send the code because they are my friend",
      "Contact my friend another way and never share the code",
      "Post the code in the group chat"
    ],
    correctAnswer: 1,
    explanation: "Correct! Login codes are private. The friend's account may have been hacked."
  },
  {
    question: "You receive an email saying you won a new phone, but you must click immediately. What is safest?",
    answers: [
      "Click quickly before the prize expires",
      "Reply with my home address",
      "Do not click; check the company through its official website"
    ],
    correctAnswer: 2,
    explanation: "Correct! Urgent prizes are a common trick. Visit the official website yourself."
  },
  {
    question: "Someone you do not know asks which school you attend and when you finish class. What should you do?",
    answers: [
      "Do not share it, block them and tell a trusted adult",
      "Tell them only the school name",
      "Share everything because they seem friendly"
    ],
    correctAnswer: 0,
    explanation: "Correct! Your school and timetable are private information."
  }
];

let currentQuestion = 0;
let score = 0;
let answerChosen = false;

const questionCount = document.getElementById("questionCount");
const questionText = document.getElementById("questionText");
const answerList = document.getElementById("answerList");
const quizFeedback = document.getElementById("quizFeedback");
const nextButton = document.getElementById("nextButton");

function showQuestion() {
  answerChosen = false;
  nextButton.disabled = true;
  quizFeedback.textContent = "";
  answerList.innerHTML = "";

  const item = quizQuestions[currentQuestion];
  questionCount.textContent = "Question " + (currentQuestion + 1) + " of " + quizQuestions.length;
  questionText.textContent = item.question;

  item.answers.forEach(function (answer, answerNumber) {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = answer;
    button.addEventListener("click", function () {
      chooseAnswer(answerNumber, button);
    });
    answerList.appendChild(button);
  });
}

function chooseAnswer(answerNumber, selectedButton) {
  if (answerChosen) return;
  answerChosen = true;

  const item = quizQuestions[currentQuestion];
  const allButtons = answerList.querySelectorAll("button");
  allButtons.forEach(function (button) {
    button.disabled = true;
  });

  if (answerNumber === item.correctAnswer) {
    selectedButton.classList.add("correct");
    score++;
    quizFeedback.textContent = item.explanation;
  } else {
    selectedButton.classList.add("incorrect");
    allButtons[item.correctAnswer].classList.add("correct");
    quizFeedback.textContent = "Not quite. " + item.explanation;
  }

  nextButton.disabled = false;
}

nextButton.addEventListener("click", function () {
  currentQuestion++;

  if (currentQuestion < quizQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  questionCount.textContent = "Quiz complete";
  questionText.textContent = "You scored " + score + " out of " + quizQuestions.length + ".";
  answerList.innerHTML = "";
  quizFeedback.textContent = score === quizQuestions.length
    ? "Excellent! You spotted every risky situation."
    : "Good effort! Review the four safety habits and try again.";
  nextButton.textContent = "Try again";
  nextButton.disabled = false;

  nextButton.onclick = function () {
    currentQuestion = 0;
    score = 0;
    nextButton.textContent = "Next question";
    nextButton.onclick = null;
    showQuestion();
  };
}

// Show the current year automatically
document.getElementById("year").textContent = new Date().getFullYear();

showQuestion();

