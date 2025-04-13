let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newbtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");

let turnO = true; // playerX, playerO
let count = 0; //To Track Draw

let win = [[0,1,2],
           [3,4,5],
           [6,7,8],
           [0,3,6],
           [2,5,8],
           [1,4,7],
           [0,4,8],
           [2,4,6]]; // winning combinations

const resetGame = () => {
turnO = true;
count = 0;
enableBoxes();
msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            box.style.color = "#072AC8";
            turnO = false;
        }
        else {
            box.innerText = "X";
            box.style.color = "#D62828";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWin();

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
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
    }
  };  

const showWinner = (winner) => {
    msg.innerText = "Player " + winner + " wins!"
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWin = () => {
    for(let i of win){
        let pos1 = boxes[i[0]].innerText;
        let pos2 = boxes[i[1]].innerText;
        let pos3 = boxes[i[2]].innerText;
        if(pos1 != "" && pos2!= "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                // alert("Player " + boxes[pos1].innerText + " wins!");
                showWinner(pos1);
                // resetGame();
                return true;
            }
        }
    }
}

newbtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);