let loadedCheck = [];
let gameOver = false;
let transmitting = false;
let targetBuggane;
let bugganeNumber = -1;
let lastLife = false;

const lives = [...document.getElementById("life-bar").children];
let lifeCount = lives.length - 1;

function checkRemaining (check) {
    const bugganesRemaining = new Set();
    bugganeyn.forEach(b => {
        if (!b.guessed) bugganesRemaining.add({...b});
    });
    const totalRemaining = bugganesRemaining.size;
    if (totalRemaining == 1) {
        delete descriptors["Vel"];
        const remainingName = Array.from(bugganesRemaining)[0].ennym;
        for (const ennym in descriptors["Nee"]) {
            if (ennym != remainingName) delete descriptors["Nee"][ennym];
        };
        changeQuestion();
        return;
    };
    const remainingDescriptors = {
        names: []
    };
    if (!lastLife) Object.entries(descriptors["Vel"]).forEach(d => {
        if (typeof d[1] == "string") remainingDescriptors[d[0]] = 0;
        else if (typeof d[1] == "object") {
            remainingDescriptors[d[0]] = {};
            Object.keys(d[1]).forEach(v => {
                remainingDescriptors[d[0]][v] = false;
            });
        };
    });
    bugganesRemaining.forEach(d => {
        if (check != d.ennym) remainingDescriptors.names.push(d.ennym);
        delete d.ennym;
        delete d.position;
        delete d.guessed;
        Object.entries(d).forEach(e => {
            if (typeof e[1] == "boolean") {
                switch (e[0]) {
                    case "breck":
                        if (e[1] == true && "oo" in remainingDescriptors) remainingDescriptors["oo"]++;
                        if (e[1] == false && "oo" in remainingDescriptors) remainingDescriptors["oo"]--;
                        if (remainingDescriptors["oo"] != totalRemaining) remainingDescriptors["oo"] = true;
                        break;
                    default:
                        if (e[1] == true && e[0] in remainingDescriptors) remainingDescriptors[e[0]]++;
                        if (e[1] == false && e[0] in remainingDescriptors) remainingDescriptors[e[0]]--;
                };
            } else if (typeof e[1] == "string" && e[0] in remainingDescriptors) remainingDescriptors[e[0]][e[1]] = true;
            else if (typeof e[1] == "object") {
                Object.values(e[1]).forEach(v => {
                    switch (v) {
                        case "daa":
                            if (d[e[0]][v] = true && "daa" in remainingDescriptors) remainingDescriptors[v]["hooill"] = true;
                            break;
                        case "tree":
                            if (d[e[0]][v] = true  && "tree" in remainingDescriptors) remainingDescriptors[v]["sooillyn"] = true;
                            break;
                        default:
                            if (d[e[0]][v] = true && e[0] in remainingDescriptors) remainingDescriptors[e[0]][v] = true;
                    };
                });
            };
        });
    });
    Object.keys(descriptors["Nee"]).forEach(k => {
        if (!remainingDescriptors.names.includes(k)) delete descriptors["Nee"][k];
    });
    if (!lastLife) {
        Object.entries(remainingDescriptors).forEach(rd => {
        if (typeof rd[1] == "number" && Math.abs(rd[1]) == totalRemaining) delete descriptors["Vel"][rd[0]];
        else if (typeof rd[1] == "object") {
            Object.keys(rd[1]).forEach(v => {
                if (remainingDescriptors[rd[0]][v] == false) delete descriptors["Vel"][rd[0]][v];
            });
        };
        });
        const eyesGone = ("tree" in remainingDescriptors && !remainingDescriptors["tree"]["sooillyn"]) || ("daa" in remainingDescriptors && !remainingDescriptors["daa"]["hooill"]);
        Object.entries(descriptors["Vel"]).forEach(c => {
            if (typeof c[1] == "object" && Object.keys(c[1]).length < 2) {
                switch (true) {
                    case "hooill" in c[1] || "sooillyn" in c[1]:
                        if (eyesGone) delete descriptors["Vel"][c[0]];
                        break;
                    default:
                        delete descriptors["Vel"][c[0]];
                };
            };
        });
    } else delete descriptors["Vel"];
};

function openDoors (check, hit) {
    const airlock = new Audio("audio/airlock.mp3");
    const alienVoice = new Audio("audio/alien-voice.mp3");
    alienVoice.play();
    if (nameChoice) {
        targetBuggane[0].firstElementChild.classList.add("got");
        targetBuggane[0].lastElementChild.style.color = "var(--monster-doo)";
        targetDoor.style.background = "url('images/door-open.webp')";
        airlock.play();
        targetDoor.style.transform = "scaleY(0)";
        loseLife();
        checkRemaining(check);
        changeQuestion();
        return;
    };
    const bugganesGone = [];
    const doorsToClose = [];
    const addTarget = (b, d) => {
        bugganesGone.push(b);
        doorsToClose.push(d);
    };
    bugganeyn.forEach((b, i) => {
        const buggane = document.getElementById(`buggane-${i - 1}`);
        const cellCover = document.getElementById(`cell-cover-${i - 1}`);
        if (typeof check == "object") {
            if (hit && !b[check[0]].includes(check[1])) addTarget(buggane, cellCover);
            else if (!hit && b[check[0]].includes(check[1])) addTarget(buggane, cellCover);
        } else {
            if (hit && !b[check]) addTarget(buggane, cellCover);
            else if (!hit && b[check]) addTarget(buggane, cellCover);
        };
    });
    let doorCount = 0;
    function openDoor (buggane, door) {
        if (doorCount > doorsToClose.length - 1) {
            loseLife();
            checkRemaining();
            if (!gameOver) changeQuestion();
            return;
        };
        buggane.parentElement.removeEventListener("click", showBuggane);
        buggane.nextElementSibling.style.color = "var(--monster-doo)";
        buggane.classList.add("got");
        bugganeyn.get(parseInt(buggane.id.match(/[0-9]/g).join("")) + 1).guessed = true;
        door.style.background = "url('images/door-open.webp')";
        airlock.play();
        door.style.transform = "scaleY(0)";
        door.nextElementSibling.classList.remove("cell-floor");
        door.nextElementSibling.classList.add("cell-floor-gone");
        doorCount++;
        setTimeout(() => openDoor(bugganesGone[doorCount], doorsToClose[doorCount]), 200);
    };
    openDoor(bugganesGone[0], doorsToClose[0]);
};

function revealCorrect () {
    const topBar = document.getElementById("top-bar");
        topBar.addEventListener("click", () => {
            location.reload();
        });
    const title = document.getElementById("title");
        title.style.fontSize = "1rem";
        title.textContent = `She ${bugganeyn.get(correct).ennym} v'ayn!`;
    const hint = document.getElementById("hint");
        hint.textContent = "[play again]";
        hint.style.color = "var(--monster-jiarg-bwee)";
    content.scrollIntoView({behavior: "smooth"});
    const correctElement = [...bugganeContainers.children].filter(c => c.id.includes("buggane")).filter(c => c.id.match(/[0-9]/g).join("") == correct - 1);
    correctElement[0].classList.add("reveal-right");
};

const coverContainer = document.getElementById("cover-container");
const gameBoard = document.getElementById("game-board");

function hideMessage () {
    const messageCover = document.getElementById("message-cover");
    messageCover.classList.remove("warning-light");
    if (transmitting || !gameStarted) return;
    if (gameOver) {
        answerContainer.textContent = "";
        choiceContainer.textContent = "";
        const replayBtn = document.getElementById("replay-btn");
            replayBtn.style.visibility = "visible";
            replayBtn.addEventListener("click", () => location.reload());
        revealCorrect();
    };
    coverContainer.style.visibility = "hidden";
    [...coverContainer.children].forEach(c => c.style.visibility = "hidden");
    document.body.style.overflow = "auto";
    if (guess) {
        gameBoard.scrollIntoView({behavior: "smooth"});
        openDoors(check, hit);
        guess = false;
    };
};

coverContainer.addEventListener("click", hideMessage);

let guess = false;
function showMessage (reply) {
    document.body.style.overflow = "hidden";
    const messageCover = coverContainer.lastElementChild;
        messageCover.style.visibility = "visible";
    const messageCoverChildren = [...messageCover.children];
    const messageText = messageCoverChildren[0];
    const messageReply = messageCoverChildren[2];
    coverContainer.style.visibility = "visible";
    const messageImg = document.getElementById("astro-img");
        messageImg.classList = "";
    if (reply == "Game Over!") {
        const gameOverSFX = new Audio("audio/game-over.mp3");
        gameOverSFX.play();
        messageImg.classList.add("response");
        messageImg.style.background = "url('images/astro-foddee.webp')";
        messageText.textContent = "Ogh!";
        messageReply.textContent = reply;
        messageReply.style.color = "var(--monster-jiarg)";
        return;
    };
        messageText.textContent = loadedCheck.join(" ");
        messageReply.textContent = reply;
        switch (reply) {
            case "Transmitting...":
                transmitting = true;
                const signal = new Audio("audio/signal.mp3");
                signal.play();
                messageImg.classList.add("signal");
                messageImg.style.background = "url('images/signal.webp')";
                messageReply.style.color = "var(--monster-doo)";
                break;
            case "She!":
                const kiart = new Audio("audio/kiart.mp3");
                kiart.play();
                messageImg.classList.add("response");
                messageImg.style.background = "url('images/astro-kiart.webp')";
                messageReply.style.color = "var(--monster-gorrym)";
                break;
            case "Cha nee!":
                const neuChiart = new Audio("audio/neuchiart.mp3");
                neuChiart.play();
                messageImg.classList.add("response");
                messageImg.style.background = "url('images/astro-neu.webp')";
                messageReply.style.color = "var(--monster-jiarg)";
                break;
            case "Ship energy low!":
                const warning = new Audio("audio/warning.mp3");
                warning.play();
                messageImg.classList.add("response");
                messageImg.style.background = "url('images/last-life.webp')";
                messageImg.style.backgroundRepeat = "no-repeat";
                messageText.textContent = "";
                messageReply.style.color = "var(--monster-jiarg)";
                messageCover.classList.add("warning-light");
                break;
            default:
                const guess = new Audio("audio/guess.mp3");
                guess.play();
                messageImg.classList.add("response");
                messageImg.style.background = "url('images/astro-neu.webp')";
                messageReply.style.color = "var(--monster-gorrym)";
        };
};

let hit = false;
let check;
let targetDoor;

function checkBugganeyn () {
    guess = true;
    if (nameChoice) {
        if (bugganeyn.get(correct)["ennym"] == check) {
            guess = false;
            gameOver = true;
            showMessage("Transmitting...");
            setTimeout(() => {
                transmitting = false;
                const she = new Audio("audio/she.mp3");
                she.play();
                showMessage("She!");
            }, 2000);
        } else {
            targetBuggane = [...document.getElementById("buggane-containers").children]
                .filter(d => d.id.includes("buggane"))
                .filter(d => d.children[1].textContent == check);
            bugganeNumber = targetBuggane[0].id.match(/[0-9]/g).join("");
            targetDoor = document.getElementById(`cell-cover-${bugganeNumber}`);
            showMessage("Transmitting...");
            setTimeout(() => {
                transmitting = false;
                const chaNee = new Audio("audio/cha-nee.mp3");
                chaNee.play();
                showMessage("Cha nee!");
            }, 2000);
        };
        return;
    };
    if (typeof check == "string" && bugganeyn.get(correct)[check] || typeof check == "object" && bugganeyn.get(correct)[check[0]].includes(check[1])) {
        hit = true;
        showMessage("Transmitting...");
        setTimeout(() => {
            transmitting = false;
            const ta = new Audio("audio/ta.mp3");
            ta.play();
            showMessage("Ta!");
        }, 2000);
    } else {
        hit = false;
        showMessage("Transmitting...");
        setTimeout(() => {
            transmitting = false;
            const chaNel = new Audio("audio/cha-nel.mp3");
            chaNel.play();
            showMessage("Cha nel!");
        }, 2000);
    };
};

function loseLife () {
    lives[lifeCount].style.visibility = "hidden";
    lifeCount--;
    switch (lifeCount) {
        case 2:
            lives.forEach(l => l.style.backgroundColor = "var(--monster-bwee");
            break;
        case 1:
            lives.forEach(l => l.style.backgroundColor = "var(--monster-jiarg-bwee");
            break;
        case 0:
            lives.forEach(l => l.style.backgroundColor = "var(--monster-jiarg");
            lastLife = true;
            showMessage("Ship energy low!")
            break;
        case -1:
            gameOver = true;
            showMessage("Game Over!");
            break;
    };
};

function checkAnswer () {
    askContainer.style.visibility = "hidden";
    let keywords = [...loadedCheck];
    if (keywords[2] == "breck?") {
        keywords[2] = "breck";
        keywords.shift();
    } else {
        if (keywords[2].includes("ooill")) {
            [keywords[1], keywords[2]] = ["sooillyn", keywords[1]];
        };
        keywords.pop();
    };
    keywords.shift();
    check = keywords.length == 1 ? keywords[0] : keywords;
    checkBugganeyn();
};

const askBtn = document.getElementById("ask-btn");
    askBtn.addEventListener("click", checkAnswer);
