const questions = [
  {
    question: "What is the capital of France?",
    choices: {
      A: "London",
      B: "Paris",
      C: "Berlin",
      D: "Rome",
    },
    correctAnswer: "B",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    choices: {
      A: "Mark Twain",
      B: "Harper Lee",
      C: "Charles Dickens",
      D: "Ernest Hemingway",
    },
    correctAnswer: "B",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: {
      A: "Mars",
      B: "Venus",
      C: "Jupiter",
      D: "Saturn",
    },
    correctAnswer: "A",
  },
  {
    question: "Who painted the Mona Lisa?",
    choices: {
      A: "Leonardo da Vinci",
      B: "Vincent van Gogh",
      C: "Pablo Picasso",
      D: "Michelangelo",
    },
    correctAnswer: "A",
  },
  {
    question: "What is the chemical symbol for water?",
    choices: {
      A: "H",
      B: "O",
      C: "W",
      D: "H2O",
    },
    correctAnswer: "B",
  },
  {
    question: "Which is the largest ocean on Earth?",
    choices: {
      A: "Atlantic Ocean",
      B: "Indian Ocean",
      C: "Arctic Ocean",
      D: "Pacific Ocean",
    },
    correctAnswer: "D",
  },
  {
    question: "Who is known as the 'Father of Computers'?",
    choices: {
      A: "Charles Babbage",
      B: "Alan Turing",
      C: "Ada Lovelace",
      D: "Steve Jobs",
    },
    correctAnswer: "A",
  },
  {
    question: "Which country is famous for the Taj Mahal?",
    choices: {
      A: "India",
      B: "Egypt",
      C: "China",
      D: "Italy",
    },
    correctAnswer: "A",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: {
      A: "William Shakespeare",
      B: "Jane Austen",
      C: "Emily Bronte",
      D: "F. Scott Fitzgerald",
    },
    correctAnswer: "A",
  },
  {
    question: "What is the largest mammal in the world?",
    choices: {
      A: "Elephant",
      B: "Blue Whale",
      C: "Giraffe",
      D: "Hippopotamus",
    },
    correctAnswer: "B",
  },
];

let currentQuestionIndex = 0;
let score = 0;

function shuffleQuestions() {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
}

function displayQuestion() {
  const questionElem = document.getElementById("question");
  const choicesElem = document.getElementById("choices");
  const question = questions[currentQuestionIndex];

  // Shuffle choices array
  const shuffledChoices = shuffle(Object.entries(question.choices));

  questionElem.textContent = question.question;

  // Clear previous choices
  choicesElem.innerHTML = "";

  // Display shuffled choices
  shuffledChoices.forEach(([choice, text], index) => {
    const choiceBtn = document.createElement("button");
    choiceBtn.textContent = `${String.fromCharCode(65 + index)}: ${text}`; // A, B, C, D
    choiceBtn.classList.add("choice-btn");
    choiceBtn.addEventListener("click", () => checkAnswer(choice));
    choicesElem.appendChild(choiceBtn);
  });

  document.getElementById("result").textContent = "";
  document.getElementById("next-btn").style.display = "none";
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function checkAnswer(answer) {
  const question = questions[currentQuestionIndex];
  if (answer === question.correctAnswer) {
    document.getElementById("result").textContent = "Correct!";
    score++;
  } else {
    document.getElementById("result").textContent = "Incorrect!";
  }
  document.getElementById("score-value").textContent = score;
  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    alert(`Quiz Finished! Your score is ${score}/${questions.length}`);
    shuffleQuestions();
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
  }
}

shuffleQuestions(); // Randomize questions initially
displayQuestion();
