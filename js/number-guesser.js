const container = document.querySelector("#game");
const play = document.querySelector("#play-button");
const maxNum = 100;
const minNum = 1;
const maxTurn = 10;
let magicNum;
let attempts = [];
let turn = 1;

const generatorMagicNum = () =>
  (magicNum = Math.floor(Math.random() * (maxNum - minNum) + minNum));

const restartGame = () => {
  alert("The game will be restarted now!");
  const guessInput = document.querySelector("#guess");
  guessInput.value = "";
  turn = 1;
  attempts = [];
  generatorMagicNum();
  gameLoop();
};

const guessNumber = (input, value) => {
  turn++;
  input.value = "";

  if (Number(value) === magicNum) {
    alert(`You win! \n The magic number is ${magicNum}`);
    restartGame();
    return;
  }

  if (turn > maxTurn) {
    alert(
      `You lose!\n The magic number is ${magicNum} \n Try again with a new number `
    );
    restartGame();
    return;
  }

  attempts.push(value);
  alert(
    "You were wrong! \n Tip: The magic number is a number between 1 and 100 \n Try other number"
  );
  gameLoop();
};

const gameLoop = () => {
  const turnSpan = document.querySelector("#turns");
  const attemptsSpan = document.querySelector("#attempts");
  const guessInput = document.querySelector("#guess");
  const sendButton = document.querySelector("#send-button");

  guessInput.focus();
  turnSpan.innerText = turn !== 10 ? `Turn: ${turn}` : "The last guess";
  attemptsSpan.innerText = `Attempts: ${attempts}`;

  const handleKeydown = (e) => {
    if (e.key === "Enter" && guessInput.value != "") {
      window.removeEventListener("keydown", handleKeydown);
      guessNumber(guessInput, guessInput.value);
    }
    return;
  };

  const handleSend = () => {
    if (guessInput.value != "") {
      sendButton.removeEventListener("click", handleSend);
      guessNumber(guessInput, guessInput.value);
    }
    return;
  };

  window.addEventListener("keydown", handleKeydown);

  sendButton.addEventListener("click", handleSend);
};

const renderGame = () => {
  play.blur();
  play.removeEventListener("click", renderGame);

  const header = document.createElement("header");
  const turnSpan = document.createElement("span");
  const attemptsSpan = document.createElement("span");
  const inputContainer = document.createElement("div");
  const guessInput = document.createElement("input");
  const sendButton = document.createElement("button");
  const replayButton = document.createElement("button");

  turnSpan.setAttribute("id", "turns");

  attemptsSpan.setAttribute("id", "attempts");
  header.append(turnSpan, attemptsSpan);

  guessInput.setAttribute("placeholder", "Do your try...");
  guessInput.setAttribute("type", "number");
  guessInput.setAttribute("min", "1");
  guessInput.setAttribute("max", "100");
  guessInput.setAttribute("id", "guess");
  guessInput.setAttribute("tabindex", "1");
  sendButton.innerText = "Send";
  sendButton.setAttribute("id", "send-button");
  inputContainer.append(guessInput, sendButton);

  replayButton.innerText = "Try again";
  replayButton.addEventListener("click", restartGame);

  container.append(header, inputContainer, replayButton);
  generatorMagicNum();
  gameLoop();
};

alert("Tap to play 'play' or press 'enter' to start game \n Have fun!!!");
play.focus();
play.addEventListener(
  "click",
  renderGame
  //   { once: true } foi removido pois causava um erro quando o botão perdia o foco
);
