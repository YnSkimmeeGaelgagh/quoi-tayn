let gameStarted = false;

function startGame (event) {
    event.target.parentElement.style.visibility = "hidden";
    event.target.parentElement.parentElement.style.visibility = "hidden";
    gameStarted = false;
    const topBarChildren = [...document.getElementById("top-bar").children];
        topBarChildren[1].classList.add("title-anim");
        topBarChildren[2].classList.add("hint-anim");
        topBarChildren[3].classList.add("arrow-anim");
};

const splashCover = document.getElementById("splash-cover");
    splashCover.style.visibility = "visible";
    const splashBtn = document.getElementById("splash-btn");
        splashBtn.addEventListener("click", startGame);