let gameCardWrapper = document.querySelector(".game_card_wrapper");
let preLoader = document.querySelector(".preLoader");

const renderPageContent = () => {
  gameCardWrapper.style.display = "block";
  preLoader.style.display = "none";
};

document.addEventListener("DOMContentLoaded", renderPageContent);

//

let options = document.querySelectorAll(".option");
const basketElements = ["ruler", "eraser", "book", "pencil", "pen"];
let selectedOption;

const selectOption = (event) => {
  selectedOption = event.target.dataset.option;
  resetSelectedOptionStyle();
  addSelectionStyle(event.target);
};
const resetSelectedOptionStyle = () => {
  for (var option of options) {
    option.style.backgroundColor = "white";
    option.style.color = "black";
  }
};

const addSelectionStyle = (selectedElement) => {
  selectedElement.style.backgroundColor = "rgb(40 134 212)";
  selectedElement.style.color = "white";
};

for (const option of options) {
  option.addEventListener("click", selectOption);
}

//
let rightAnswerAudio = document.querySelector(".right_answer_audio");
let answeredOptions = [];
let answersPlaceHolders = document.querySelectorAll(".answer");
const setAnswer = (evant) => {
  var wrongAnswerAudio = new Audio("assets/Sololearn Wrong.mp3");
  var rightAnswerAudio = new Audio("assets/Sololearn Correct.mp3");

  if (!selectedOption) return;
  if (evant.target.innerHTML) return;

  if (!basketElements.includes(selectedOption)) {
    wrongAnswerAudio.play();
    function renderErrorAnswer() {
      interval = setInterval(function () {
        if (
          evant.target.innerHTML.includes(
            `<img src="/assets/crossMark-small.png" alt="correct"></div>`
          )
        ) {
          evant.target.innerHTML = `<p class="wrong_Answer">${selectedOption}</p>`;
        } else {
          evant.target.innerHTML = `<p class="wrong_Answer">${selectedOption}</p> <div ><img src="/assets/crossMark-small.png" alt="correct"></div> `;
        }
      }, 200);
    }
    renderErrorAnswer();
    setTimeout(function () {
      evant.target.innerHTML = "";
      clearInterval(interval);
    }, 900);
    return;
  }

  if (answeredOptions.includes(selectedOption)) return;

  answeredOptions[answeredOptions.length] = selectedOption;
  !hideAnswerdOption();
  rightAnswerAudio.play();
  evant.target.innerHTML = `<p class="right_Answer">${selectedOption}</p> <div ><img src="/assets/tikMark-small.png" alt="correct"></div> `;
};

const hideAnswerdOption = () => {
  for (const option of options) {
    if (option.dataset.option === selectedOption) {
      option.style.visibility = "hidden";
    }
  }
};

for (const answer of answersPlaceHolders) {
  answer.addEventListener("click", setAnswer);
}

//

let resetIcon = document.querySelector(".reset");

const resetAnswers = () => {
  resetSelectedOptionStyle();
  resetOptions();
  clearAnswers();
  selectedOption = null;
  answeredOptions = [];
};

const resetOptions = () => {
  for (const option of options) {
    option.style.visibility = "visible";
  }
};

const clearAnswers = () => {
  for (const answer of answersPlaceHolders) {
    answer.innerHTML = "";
  }
};
resetIcon.addEventListener("click", resetAnswers);

//
let showAnswersIcon = document.querySelector(".show_answers");

const showAllAnswers = () => {
  hideRightOptions();
  showRightAnswers();
};

const hideRightOptions = () => {
  for (const option of options) {
    if (basketElements.includes(option.dataset.option)) {
      option.style.visibility = "hidden";
    }
  }
};

const showRightAnswers = () => {
  for (let i = 0; i < answersPlaceHolders.length; i++) {
    answersPlaceHolders[
      i
    ].innerHTML = `<p class="right_Answer">${basketElements[i]}</p> <div ><img src="/assets/tikMark-small.png" alt="correct"></div> `;
  }
};

showAnswersIcon.addEventListener("click", showAllAnswers);

//

let imgIcon = document.querySelector(".img_icon");
let gameCard = document.querySelector(".game_card_wrapper");
let dummyImgpopUp = document.querySelector(".dummy_Img");
const showImgPopUp = () => {
  gameCard.style.opacity = 0.3;
  dummyImgpopUp.style.visibility = "visible";
};

imgIcon.addEventListener("click", showImgPopUp);

//
let closeIcon = document.querySelector(".img_close_icon");

let closeImgPopUp = () => {
  gameCard.style.opacity = 1;
  dummyImgpopUp.style.visibility = "hidden";
};

closeIcon.addEventListener("click", closeImgPopUp);

//

let helpIcon = document.querySelector(".help_icon");
let helpContentpopUp = document.querySelector(".help_content");
const showHelpCcontent = () => {
  gameCard.style.opacity = 0.3;
  helpContentpopUp.style.visibility = "visible";
};

helpIcon.addEventListener("click", showHelpCcontent);

//
let helpCloseIcon = document.querySelector(".help_close_icon");

let closeHelpPopUp = () => {
  gameCard.style.opacity = 1;
  helpContentpopUp.style.visibility = "hidden";
};

helpCloseIcon.addEventListener("click", closeHelpPopUp);

//

let pageContentContainer = document.querySelector(".container");

function rescaleWindow(e) {
  let clientWidth = 1280;
  let clientHeight = 960;
  const baseRatio = clientWidth / clientHeight;
  const windowRatio = window.innerWidth / window.innerHeight;
  if (windowRatio > baseRatio) {
    const ratio = window.innerHeight / clientHeight;
    pageContentContainer.style.left = `${
      (window.innerWidth - clientWidth * ratio) / 2
    }px`;
    pageContentContainer.style.transform = `scale(${ratio})`;
    return;
  }
  pageContentContainer.style.left = `0px`;
  pageContentContainer.style.transform = `scale(${
    window.innerWidth / clientWidth
  })`;
}
window.addEventListener("resize", rescaleWindow);
