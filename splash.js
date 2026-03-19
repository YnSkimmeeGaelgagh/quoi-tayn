document.body.style.overflow = "hidden";
let gameStarted = false;
const splashContainer = document.getElementById("splash-container");

function startGame (event) {
    splashContainer.style.visibility = "hidden";
    gameStarted = true;
    const topBarChildren = [...document.getElementById("top-bar").children];
        topBarChildren[1].classList.add("title-anim");
        topBarChildren[2].classList.add("hint-anim");
        topBarChildren[3].classList.add("arrow-anim");
    document.body.style.overflow = "auto";
};

const splashBtn = document.getElementById("splash-btn");
    splashBtn.addEventListener("click", startGame);
