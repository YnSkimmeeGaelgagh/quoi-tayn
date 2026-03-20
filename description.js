const descriptors = {
    "Vel": {
        "eairkyn": "ayd?",
        "cleayshyn": "ayd?",
        "stroin": "ayd?",
        "feeacklyn": "ayd?",
        "molleeyn": "ayd?",
        "folt": {
            "jiarg": "ayd?",
            "jiarg-bane": "ayd?",
            "jiarg-bwee": "ayd?",
            "glass": "ayd?",
            "doo": "ayd?",
            "gorrym": "ayd?",
            "jiarg-gorrym": "ayd?",
            "liauyr": "ayd?",
            "giare": "ayd?"
        },
        "sooillyn": {
            "mooarey": "ayd?",
            "beggey": "ayd?"
        },
        "beeal": {
            "foshlit": "ayd?",
            "dooint": "ayd?"
        },
        "lurgaghyn": {
            "liauyrey": "ayd?",
            "giarey": "ayd?"
        },
        "roihaghyn": {
            "liauyrey": "ayd?",
            "giarey": "ayd?"
        },
        "daa": {
            "hooill": "ayd?"
        },
        "tree": {
            "sooillyn": "ayd?"
        },
        "oo": "breck?"
    },
    "Nee": {
        "Bappagh": "oo?",
        "Cammagh": "oo?",
        "Dollagh": "oo?",
        "Jimmagh": "oo?",
        "Jollagh": "oo?",
        "Kiddagh": "oo?",
        "Moggagh": "oo?",
        "Mollagh": "oo?",
        "Nimmagh": "oo?",
        "Poddagh": "oo?",
        "Pimmagh": "oo?",
        "Roggagh": "oo?",
        "Summagh": "oo?",
        "Quiddagh": "oo?",
        "Tubbagh": "oo?",
        "Vommagh": "oo?",
    }
};

const answerContainer = document.getElementById("answer-container");
const choiceContainer = document.getElementById("choice-container");
const askContainer = document.getElementById("ask-container");

function toggleChoiceContainer (reveal) {
    choiceContainer.style.visibility = reveal ? "hidden" : "visible";
};

function phraseComplete () {
    toggleChoiceContainer(true);
    backBtnContainer.style.display = "none";
    askContainer.style.visibility = "visible";
};

let firstWord = true;
function nextChoice (event) {
    const des = event.target;
    des.classList = "";
    const audio = new Audio(`audio/${des.textContent.endsWith("?") ? des.textContent.slice(0, -1) : des.textContent}.mp3`);
    audio.play();
    let choiceText = des.textContent;
    if (choiceText == "Nee") nameChoice = true;
    des.classList.add("set-word");
    if (firstWord) {
        firstWord = false;
        answerContainer.classList.remove("cursor-blink");
        answerContainer.textContent = "";
    };
    answerContainer.append(des);
    loadedCheck.push(choiceText);
    choiceContainer.textContent = "";
    const level = currentChoices[choiceText];
    previousChoices.push(level);
    currentLevel++;
    presentOptions(level);
};

const backBtnContainer = document.getElementById("back-btn-container");
const backBtn = document.getElementById("back-btn");
    backBtn.addEventListener("click", previousChoice);

function previousChoice (event) {
    event.target.classList.add("pressed-btn");
    setTimeout(() => {
        currentLevel--;
        switch (currentLevel) {
            case 0:
                changeQuestion();
                break;
            default:
                answerContainer.lastElementChild.remove();
                choiceContainer.textContent = "";
                loadedCheck.splice(currentLevel, 1);
                presentOptions(previousChoices[currentLevel - 1]);
                previousChoices.pop();
        };
        event.target.classList.remove("pressed-btn");
    }, 300);
};

function animateButton (event) {
    event.target.removeEventListener("click", animateButton);
    event.target.classList.add("pressed-btn");
    setTimeout(() => nextChoice(event), 300);
};

let currentLevel = 0;
let previousChoices = [];
let currentChoices = {};
let nameChoice = false;

function presentOptions (level) {
    if (!level) {
        phraseComplete();
        return;
    };
    if (currentLevel > 0) backBtnContainer.style.display = "block";
    else backBtnContainer.style.display = "none";
    let targetDescriptors;
    targetDescriptors = typeof level == "string" ? [level] : Object.keys(level);
    currentChoices = level;
    targetDescriptors.forEach(d => {
        const des = document.createElement("div");
            des.classList.add("choice");
            des.textContent = d;
            des.addEventListener("click", animateButton);
        choiceContainer.append(des);
    });
};
presentOptions(descriptors);
