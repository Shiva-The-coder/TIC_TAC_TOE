let boxes = document.querySelectorAll('.box');
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let scoreXEl = document.getElementById("score-x");
let scoreOEl = document.getElementById("score-o");

let turn0 = true;
let count = 0;
let scoreX = 0;
let scoreO = 0;

const winPatterns = [
   [0, 1, 2],
   [0, 3, 6],
   [0, 4, 8],
   [1, 4, 7],
   [2, 4, 6],
   [2, 5, 8],
   [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
            box.classList.add("o-style");
            turn0 = false;
        } else {
            box.innerText = "X";
            box.classList.add("x-style");
            turn0 = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Bad Luck Try Next Time`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        box.classList.remove("x-style", "o-style");
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    if (winner === "X") {
        scoreX++;
        scoreXEl.innerText = scoreX;
    } else if (winner === "O") {
        scoreO++;
        scoreOEl.innerText = scoreO;
    }
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                return true;
            }
        }
    }
    return false;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", () => {
    scoreX = 0;
    scoreO = 0;
    scoreXEl.innerText = scoreX;
    scoreOEl.innerText = scoreO;
    resetGame();
});


