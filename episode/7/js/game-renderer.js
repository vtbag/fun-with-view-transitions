import { mayStartViewTransition } from "@vtbag/utensil-drawer/may-start-view-transition";
import { setVectors } from "@vtbag/utensil-drawer/vectors";

const stack = document.querySelectorAll(".disks");

export function render(pegs) {
  const mode = viewTransitions.value;

  if (mode !== "none") {
    const transition = mayStartViewTransition(
      { update },
      {
        collisionBehavior: mode === "vanilla" ? "skipOld" : "chaining",
        speedUpWhenChained: 1.1,
      }
    );

    if (mode === "vectors") {
      transition.ready.then(
        () => {
          setVectors([{ pattern: "disk-.", props: ["x", "y"] }], "pseudo");
        },
        (e) => {
          console.error("View transition failed:", e);
        }
      );
    }
  } else {
    update();
  }

  function update() {
    stack.forEach((stack) => (stack.innerHTML = ""));
    pegs.forEach((peg, pegIndex) => {
      peg.forEach((diskSize) => {
        const disk = document.createElement("div");
        disk.className = `disk disk-${diskSize}`;
        disk.style.viewTransitionName = `disk-${diskSize}`;
        disk.style.viewTransitionClass = "disk";
        stack[pegIndex].appendChild(disk);
      });
    });
  }
}
