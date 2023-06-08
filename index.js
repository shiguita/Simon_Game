// Variables
const colors = ["green", "red", "yellow", "blue"];
let highscore = 0;

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
    const newColor = colors[Math.floor(Math.random() * colors.length)];
    this.sequence.push(newColor);
    this.playSequence();
  }

  playSequence() {
    let myInterval = setInterval(() => {
      // animacion
      this.indexOfSeq++;
      if (this.indexOfSeq >= this.sequence.length) {
        this.seqIsPlaying = false;
        this.indexOfSeq = 0;
        clearInterval(myInterval);
        // animacion
      }
    }, 800);
  }

  buttonHandler(event) {
    if (this.isGameAlive && !this.seqIsPlaying) {
      const clickedColor = event.target.classList[1];
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
    document.getElementById("score").textContent = this.score;
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
    // ANIMACION
    this.isGameAlive = false;
  }
}

const simonGame = new GameAlgorithm();
document.querySelector(".circle").addEventListener("click", () => {
  if (!simonGame.isGameAlive) {
    simonGame.beginGame();
  }
});
// ANIMACIONES
// - cambio de color en los botones al pulsarlos y cuando muestra la secuencia
// - boton central (memoriza, te toca, etc.)
// - cuando falla el jugador
