if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
};
document.body.style.overflow = "hidden";
let gameStarted = false;
const splashContainer = document.getElementById("splash-container");

function startGame (event) {
    event.target.classList.add("pressed-btn");
    setTimeout(() => {
        splashContainer.style.visibility = "hidden";
        gameStarted = true;
        const topBarChildren = [...document.getElementById("top-bar").children];
            topBarChildren[1].classList.add("title-anim");
            topBarChildren[2].classList.add("hint-anim");
            topBarChildren[3].classList.add("arrow-anim");
        document.body.style.overflow = "auto";  
    }, 300);
};

const splashBtn = document.getElementById("splash-btn");
    splashBtn.addEventListener("click", startGame);
