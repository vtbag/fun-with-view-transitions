import { TowerOfHanoi } from "./tower-of-hanoi.js";
import { updateProgressUI } from "./progress.js";
import { render } from "./game-renderer.js";
import { initTheme } from "./theme-manager.js";
import { mayStartViewTransition } from "@vtbag/utensil-drawer/may-start-view-transition";

let game;

nextStep.addEventListener("click", () => play());
playAgain.addEventListener("click", () => play(true));
reset.addEventListener("click", () => play(true));

let prevMode = viewTransitions.value;
viewTransitions.addEventListener("change", (e) => {
  const old = prevMode;
  prevMode = e.target.value;
  if (e.target.value !== "vectors" && old !== "vectors") return;
  mayStartViewTransition(
    {
      update: () => {
        document.documentElement.classList.toggle(
          "vectors",
          e.target.value === "vectors"
        );
      },
      types: ["vectors-toggle", "reset"],
    },
    { collisionBehavior: "chaining" }
  ).finished.then(() => {
    reset.style.viewTransitionName = "";
  });
});

function play(reset = false) {
  if (
    (reset && game?.currentStep === 0) ||
    (!reset && game.currentStep >= game.totalSteps)
  )
    return;


  game ??= new TowerOfHanoi(6);
  
  reset ? game.reset() : game.nextStep();

  window.reset.disabled = game.currentStep === 0;
  playAgain.disabled = !game.done;

  render(game.pegs);
  updateProgressUI(game.currentStep, game.totalSteps);
  updateCompletion();
}

function updateCompletion() {
  const mode = viewTransitions.value;

  if (game.done === game.wasDone) return;

  if (mode !== "none") {
    mayStartViewTransition(
      { update: updateMessage, types: ["reset"] },
      {
        collisionBehavior:  "chaining",
      }
    );
  } else {
    updateMessage();
  }
  function updateMessage() {
    completionMessage.classList.toggle("hidden", !game.done);
    resetMessage.classList.toggle("hidden", game.done);
  }
}

initTheme();
play(reset);
