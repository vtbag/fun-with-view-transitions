import { mayStartViewTransition } from "@vtbag/utensil-drawer/may-start-view-transition";

export function updateProgressUI(current, total) {
  currentStep.textContent = current;
  totalSteps.textContent = total;
  const mode = viewTransitions.value;

  if (mode !== "none") {
    mayStartViewTransition(
      { update, types: ["progress"] },
      {
        collisionBehavior: "chaining",
        useTypesPolyfill: "auto",
      }
    ).finished.then(
      () => (progressFill.style.backgroundColor = `hsl(115, 74.50%, 41.60%)`)
    );
  } else {
    return update();
  }

  function update() {
    progressFill.style.width = `${(current / total) * 100}%`;
    progressFill.style.backgroundColor = `hsl(212, 60.20%, 54.70%)`;
  }
}
