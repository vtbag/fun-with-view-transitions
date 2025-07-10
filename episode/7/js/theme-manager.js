import { mayStartViewTransition } from "@vtbag/utensil-drawer/may-start-view-transition";

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.documentElement.style.colorScheme = theme;
}

async function toggleTheme() {
  const mode = viewTransitions.value;
  if (mode !== "none") {
    mode === "vectors" && [1, 2, 3, 4, 5].forEach(nextStep.click.bind(nextStep));
    playAgain.disabled =
      reset.disabled =
      nextStep.disabled =
      toggleButton.disabled =
      viewTransitions.disabled =
        true;

    // save settings
    const vectors = document.documentElement.classList.contains("vectors");

    const landscape = matchMedia("(orientation: landscape)").matches;
    if (landscape) {
      await mayStartViewTransition(
        {
          update: () => {
            document.documentElement.classList.toggle("vectors", true);
            document.querySelectorAll(".disk").forEach((disk) => {
              disk.style.transform = "translateY(-250px)";
            });
            reset.style.transform = "translateY(40px)";
          },
          types: ["board-move"],
        },
        { collisionBehavior: "chaining" }
      ).finished;
    }

    await mayStartViewTransition(
      { update, types: ["theme-toggle"] },
      { collisionBehavior: "chaining" }
    ).finished;

    if (landscape) {
      await mayStartViewTransition(
        {
          update: () => {
            // restore settings
            document.documentElement.classList.toggle("vectors", vectors);
            document.querySelectorAll(".disk").forEach((disk) => {
              disk.style.transform = "";
            });
            reset.style.transform = "";
          },
          types: ["board-move"],
        },
        { collisionBehavior: "chaining" }
      ).finished;
    }
    playAgain.disabled =
      reset.disabled =
      nextStep.disabled =
      toggleButton.disabled =
      viewTransitions.disabled =
        false;
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
