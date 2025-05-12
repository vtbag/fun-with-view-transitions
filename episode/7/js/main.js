import { TowerOfHanoi } from "./tower-of-hanoi.js";
import { updateProgressUI } from "./progress.js";
import { render } from "./game-renderer.js";
import { initTheme } from "./theme-manager.js";
import { mayStartViewTransition } from "@vtbag/utensil-drawer/may-start-view-transition";

let game;

nextStep.addEventListener("click", () => {
  if (game.currentStep < game.totalSteps) {
    game.nextStep();
    render(game.pegs);
    updateProgressUI(game.currentStep, game.totalSteps);
    updateCompletion();
  }
});

playAgain.addEventListener("click", initGame);
reset.addEventListener("click", initGame);

viewTransitions.addEventListener("change", (e) => {
  document.documentElement.classList.toggle(
    "vectors",
    e.target.value === "vectors"
  );
});

function initGame() {
  game = new TowerOfHanoi(6);
  render(game.pegs);
  updateProgressUI(0, game.totalSteps);
  updateCompletion();
}

function updateCompletion() {
  const mode = viewTransitions.value;
  if (mode !== "none") {
    mayStartViewTransition(updateMessage, {
      collisionBehavior: mode === "vanilla" ? "skipNew" : "chaining",
    });
  } else {
    updateMessage();
  }
  function updateMessage() {
    completionMessage.classList.toggle("hidden", !game.done);
    resetMessage.classList.toggle("hidden", game.done);
  }
}
initGame();
initTheme();
