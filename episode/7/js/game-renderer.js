import { mayStartViewTransition } from "@vtbag/utensil-drawer/may-start-view-transition";
import { setVectors } from "@vtbag/utensil-drawer/vectors";

const stack = document.querySelectorAll(".disks");

export function render(pegs) {
  const mode = viewTransitions.value;
  if (mode !== "none") {
    const types = ["move"];
    if (mode === "vectors") types.push("lift-and-shift");
    const transition = mayStartViewTransition(
      { update, types },
      {
        collisionBehavior: mode === "normal" ? "skipOld" : "chaining",
        speedUpWhenChained: 1.33,
      }
    );

    if (mode === "vectors") {
      transition.ready.then(
        () => {
          setVectors([{ pattern: ".*", props: ["x", "y"] }], "pseudo");
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
    pegs.forEach((peg, pegIndex) => {
      stack[pegIndex].innerHTML = "";
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
