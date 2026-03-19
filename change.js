function changeQuestion () {
    answerContainer.textContent = "";
    choiceContainer.textContent = "";
    loadedCheck = [];
    descriptorsPosition = {};
    previousChoices = [];
    currentChoices = {};
    currentLevel = 0;
    nameChoice = false;
    bugganeNumber = -1;
    answerContainer.textContent = "|";
    answerContainer.classList.add("cursor-blink");
    firstWord = true;
    askContainer.style.visibility = "hidden";
    toggleChoiceContainer(false);
    presentOptions(descriptors);
};

const changeBtn = document.getElementById("change-btn");
    changeBtn.addEventListener("click", changeQuestion);
