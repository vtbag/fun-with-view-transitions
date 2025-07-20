import { mayStartViewTransition } from "@vtbag/utensil-drawer/may-start-view-transition";
import { setVectors } from "@vtbag/utensil-drawer/vectors";

const stack = document.querySelectorAll(".disks");

export function render(pegs) {
  const mode = viewTransitions.value;
  if (mode !== "none") {
    const types = ["move"];
    const transition = mayStartViewTransition(
      { update, types },
      {
        collisionBehavior: mode === "normal" ? "skipOld" : "chaining",
        speedUpWhenChained: 1.33,
        useTypesPolyfill: "auto",
      }
    );

    if (mode === "vectors") {
      transition.ready.then(
        () => {
          setVectors([{ pattern: "^disk-.$", props: ["x", "y"] }], "pseudo");
          transition.types.add("lift-and-shift");
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
