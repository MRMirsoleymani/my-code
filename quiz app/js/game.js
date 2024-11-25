import formatData from "./helper.js";

const level = localStorage.getItem("level") || "medium";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const questionNumber = document.getElementById("question-number");
const finishButton = document.getElementById("finish-button");
const error = document.getElementById("error");
const answerList = document.querySelectorAll(".answer-text");

const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAccepted = true;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const json = await response.json();
    formattedData = formatData(json.results);
    start();
  } catch {
    loader.style.display = "none";
    error.style.display = "block";
  }
};

const start = () => {
  showQuesttion();
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuesttion = () => {
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  questionNumber.innerText = questionIndex + 1;
  console.log(correctAnswer);
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const nextHandler = () => {
  questionIndex++;
  if (questionIndex < formattedData.length) {
    isAccepted = true;
    showQuesttion();
    removeClasses();
  } else {
    finishHandler();
  }
};

const finishHandler = () => {
  window.location.assign("./end.html");
  localStorage.setItem("Score", JSON.stringify(score));
};

const checkAnswer = (event, index) => {
  if (!isAccepted) return;
  isAccepted = false;

  if (index === correctAnswer) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const removeClasses = () => {
  answerList.forEach((button) => (button.className = "answer-text"));
};

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => checkAnswer(event, index));
});
