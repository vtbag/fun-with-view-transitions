import { TowerOfHanoi } from "./tower-of-hanoi.js";
import { updateProgressUI } from "./progress.js";
import { render } from "./game-renderer.js";
import { initTheme } from "./theme-manager.js";
import { mayStartViewTransition } from "@vtbag/utensil-drawer/may-start-view-transition";
import { setVectors } from "@vtbag/utensil-drawer/vectors";

let game;

nextStep.addEventListener("click", () => play());
playAgain.addEventListener("click", () => play(true));
reset.addEventListener("click", () => play(true));

let targetMode = viewTransitions.value;
viewTransitions.addEventListener("change", (e) => {
  const old = targetMode;
  targetMode = e.target.value;

  const types = ["mode-toggle"];
  if (
    (old === "vectors" && targetMode !== "vectors") ||
    (old !== "vectors" && targetMode === "vectors")
  ) {
    types.push("board-move");
  }

  e.target.value = old;

  const transition = mayStartViewTransition(
    {
      update: () => {
        e.target.value = targetMode;
        document.documentElement.classList.toggle(
          "vectors",
          e.target.value === "vectors"
        );
      },
      types,
    },
    { collisionBehavior: "chaining", useTypesPolyfill: "auto" }
  );
  transition.ready.then(() =>
    setVectors([{ pattern: "select", props: ["width"] }], "pseudo")
  );
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
        collisionBehavior: "chaining",
        useTypesPolyfill: "auto",
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
