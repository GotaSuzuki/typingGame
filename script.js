const RANDOM_SENTENCE_URL_API = "https://api.quotable.io/random";
const typeDisplay = document.getElementById("typeDisplay");
const typeInput = document.getElementById("typeInput");
const timer = document.getElementById("timer");

const typeSound = new Audio("./audio/typing-sound.mp3");
const wrongSound = new Audio("./audio/wrong.mp3");
const correctSound = new Audio("./audio/correct.mp3");

typeInput.addEventListener("input", () => {
  typeSound.volume = 0.3;
  typeSound.play();
  typeSound.currentTime = 0;
  const sentenceArray = typeDisplay.querySelectorAll("span");
  // console.log(sentenceArray);
  const arrayValue = typeInput.value.split("");
  let correct = true;
  // console.log(arrayValue);
  sentenceArray.forEach((characterSpan, index) => {
    if ((arrayValue[index] == null)) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (characterSpan.innerText == arrayValue[index]) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.add("incorrect");
      characterSpan.classList.remove("correct");

      wrongSound.volume = 0.1;
      wrongSound.play();
      wrongSound.currentTime = 0;

      correct = false;
    }
  })

  if (correct == true) {
    correctSound.volume = 0.5;
    correctSound.play();
    correctSound.currentTime = 0;
    RenderNextSentence();
  }
});

const GetRandomSentence = () => {
  return fetch(RANDOM_SENTENCE_URL_API)
    .then((response) => response.json())
    .then((data) => data.content);
}

const RenderNextSentence = async () => {
  const sentence = await GetRandomSentence();
  console.log(sentence);

  typeDisplay.innerText = "";
  let oneText = sentence.split("");

  oneText.forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    typeDisplay.appendChild(characterSpan);
    // characterSpan.classList.add("correct");
  });
  typeInput.value = "";

  startTimer();
};

let startTime;
let originTime = 30;
const startTimer = () => {
  timer.innerText = originTime;
  startTime = new Date();
  setInterval(() => {
    timer.innerText = originTime - getTimerTime();
    if (timer.innerText <= 0) timeUp();
  }, 1000);
}

const getTimerTime = () => {
  return Math.floor((new Date() - startTime) / 1000);
}

const timeUp = () => {
  RenderNextSentence();
}


RenderNextSentence();