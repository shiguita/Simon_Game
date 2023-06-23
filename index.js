// Variables
const colors = ["green", "red", "yellow", "blue"];
let highscore = 0;

const greenAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"
);
const redAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"
);
const yellowAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"
);
const blueAudio = new Audio(
  "https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"
);

const msg = document.getElementById("msg");
const background = document.querySelector("body");
const points = document.getElementById("score");

class GameAlgorithm {
  constructor() {
    /**
     * We instantiate:
     * - the sequence of colors
     * - the index for playing the sequence and checking player inputs
     * - score for the current instance
     * - game states
     */
    this.sequence = [];
    this.indexOfSeq = 0;
    this.score = 0;
    this.isGameAlive = false;
    this.seqIsPlaying = false;

    // Event binding
    this.buttons = document.querySelectorAll(".button");
    this.buttons.forEach((button) => {
      button.addEventListener("click", (e) => this.buttonHandler(e));
    });
  }

  // Reseting the game parameters
  resetGame() {
    this.sequence = [];
    this.indexOfSeq = 0;
    this.score = 0;
  }

  // Adding new color to sequence
  addToSequence() {
    this.seqIsPlaying = true;
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    this.sequence.push(newColor);
    setTimeout(() => {
      msg.textContent = "MEMORIZE…";
      this.playSequence();
    }, 300);
  }

  // Show the sequence of colors
  playSequence() {
    let myInterval = setInterval(() => {
      this.buttonAnimation(
        this.buttons[colors.indexOf(this.sequence[this.indexOfSeq])]
      );
      this.indexOfSeq++;
      if (this.indexOfSeq >= this.sequence.length) {
        this.indexOfSeq = 0;
        setTimeout(() => {
          this.seqIsPlaying = false;
          msg.textContent = "YOUR TURN";
        }, 400);
        clearInterval(myInterval);
      }
    }, 800);
  }

  // Handling of button clicks
  buttonHandler(event) {
    if (this.isGameAlive && !this.seqIsPlaying) {
      const clickedColor = event.target.classList[1];
      this.buttonAnimation(event.target);
      if (this.sequence[this.indexOfSeq] !== clickedColor) {
        this.endGame();
      } else {
        this.indexOfSeq++;
        if (this.indexOfSeq >= this.sequence.length) {
          this.indexOfSeq = 0;
          this.updateScore();
          this.addToSequence();
        }
      }
    }
  }

  // Update the score and check for highscore
  updateScore() {
    this.score++;
    points.textContent = this.score;
    if (this.score > highscore) {
      highscore = this.score;
      document.getElementById("best").textContent = highscore;
    }
  }

  // Initiate game sequence
  beginGame() {
    this.isGameAlive = true;
    this.addToSequence();
  }

  // Game ends when failing
  endGame() {
    msg.textContent = "TRY AGAIN?";
    background.classList.add("errorBG");
    this.isGameAlive = false;
    this.resetGame();
  }

  // Animation and sound for the buttons
  buttonAnimation(button) {
    button.classList.add(button.classList[1] + "Glow");
    switch (button.classList[1]) {
      case "green":
        greenAudio.play();
        break;
      case "red":
        redAudio.play();
        break;
      case "yellow":
        yellowAudio.play();
        break;
      case "blue":
        blueAudio.play();
        break;

      default:
        break;
    }
    setTimeout(() => {
      button.classList.remove(button.classList[1] + "Glow");
    }, 300);
  }
}

// Event listener for starting a game
const simonGame = new GameAlgorithm();
document.querySelector(".circle").addEventListener("click", () => {
  if (!simonGame.isGameAlive) {
    background.classList.remove("errorBG");
    points.textContent = 0;
    simonGame.beginGame();
  }
});
