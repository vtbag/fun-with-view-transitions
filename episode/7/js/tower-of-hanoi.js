export class TowerOfHanoi {
  constructor(numDisks) {
    this.numDisks = numDisks;
    this.pegs = [[], [], []];
    this.moves = [];
    this.currentStep = 0;
    this.done = false;

    // Initialize the first peg with all disks
    for (let i = numDisks; i >= 1; i--) {
      this.pegs[0].push(i);
    }

    // Generate the solution moves
    this.generateMoves(numDisks, 0, 2, 1);
    this.totalSteps = this.moves.length;
  }

  // Recursive function to generate the solution moves
  generateMoves(n, source, target, auxiliary) {
    if (n === 1) {
      this.moves.push({ from: source, to: target });
      return;
    }
    this.generateMoves(n - 1, source, auxiliary, target);
    this.moves.push({ from: source, to: target });
    this.generateMoves(n - 1, auxiliary, target, source);
  }

  // Execute the next move in the solution
  nextStep() {
    if (this.currentStep < this.totalSteps) {
      const move = this.moves[this.currentStep];
      const disk = this.pegs[move.from].pop();
      this.pegs[move.to].push(disk);
      this.currentStep++;
      if (this.currentStep === this.totalSteps) {
        this.done = true;
      }
    }
  }
}
