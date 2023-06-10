// Variables
const colors = ["green", "red", "yellow", "blue"];
let highscore = 0;

const msg = document.getElementById("msg");
const background = document.querySelector("body");
const points = document.getElementById("score");

class GameAlgorithm {
  constructor() {
    this.sequence = [];
    this.indexOfSeq = 0;
    this.score = 0;
    this.isGameAlive = false;
    this.seqIsPlaying = false;

    this.buttons = document.querySelectorAll(".button");
    this.buttons.forEach((button) => {
      button.addEventListener("click", this.buttonHandler.bind(this));
    });
  }

  resetGame() {
    this.sequence = [];
    this.indexOfSeq = 0;
    this.score = 0;
  }

  addToSequence() {
    this.seqIsPlaying = true;
    msg.textContent = "MEMORIZE…";
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    this.sequence.push(newColor);
    this.playSequence();
  }

  playSequence() {
    let myInterval = setInterval(() => {
      this.buttonAnimation(
        this.buttons[colors.indexOf(this.sequence[this.indexOfSeq])]
      );
      this.indexOfSeq++;
      if (this.indexOfSeq >= this.sequence.length) {
        this.indexOfSeq = 0;
        this.seqIsPlaying = false;
        msg.textContent = "YOUR TURN";
        clearInterval(myInterval);
      }
    }, 800);
  }

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

  updateScore() {
    this.score++;
    points.textContent = this.score;
    if (this.score > highscore) {
      highscore = this.score;
      document.getElementById("best").textContent = highscore;
    }
  }

  beginGame() {
    this.isGameAlive = true;
    this.addToSequence();
  }

  endGame() {
    msg.textContent = "TRY AGAIN?";
    background.classList.add("errorBG");
    this.isGameAlive = false;
    this.resetGame();
  }

  buttonAnimation(button) {
    setTimeout(() => {
      button.classList.remove(button.classList[1] + "Glow");
    }, 300);
    button.classList.add(button.classList[1] + "Glow");
  }
}

const simonGame = new GameAlgorithm();
document.querySelector(".circle").addEventListener("click", () => {
  if (!simonGame.isGameAlive) {
    simonGame.beginGame();
    background.classList.remove("errorBG");
    points.textContent = 0;
  }
});
