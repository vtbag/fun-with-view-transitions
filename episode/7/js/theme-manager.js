import { mayStartViewTransition } from "@vtbag/utensil-drawer/may-start-view-transition";

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

function toggleTheme() {
  nextStep.click();
  const mode = viewTransitions.value;

  if (mode !== "none") {
    // save settings
    const vectors = document.documentElement.classList.contains("vectors");
    const hidden = completionMessage.classList.contains("hidden");
    // make space
    document.documentElement.classList.toggle("vectors", true);
    completionMessage.classList.toggle("hidden", true);
    // add pseudo-elements
    document.documentElement.style.viewTransitionName = "root";
    gameBoard.style.viewTransitionName = "board";

    const transition = mayStartViewTransition(
      {
        update,
        types: ["themeToggle"],
      },
      {
        collisionBehavior: mode === "vanilla" ? "skipOld" : "chaining",
      }
    );

    transition.finished.then(() => {
      // remove pseudo-elements
      document.documentElement.style.viewTransitionName =
        gameBoard.style.viewTransitionName = "";
      document
        .querySelectorAll(".disk")
        .forEach((d) => (d.style.viewTransitionName = ""));
      mayStartViewTransition(() => {
        // restore settings
        completionMessage.classList.toggle("hidden", hidden);
        document.documentElement.classList.toggle("vectors", vectors);
      }).ready.then(() => {
        document
          .querySelectorAll(".disk")
          .forEach((d) => (d.style.viewTransitionName = d.classList[1]));
      });
    });
  } else {
    update();
  }
}

function update() {
  setTheme(
    (document.documentElement.getAttribute("data-theme") || "light") === "light"
      ? "dark"
      : "light"
  );
}

export function initTheme() {
  toggleButton.addEventListener("click", toggleTheme);
  setTheme(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );
}
