import { generate } from "https://esm.sh/sudoku-core?bundle";

self.onmessage = async (e) => {
  const level = e.data;
  try {
    // Dynamically import the sudoku-core module
    const puzzle = generate(level);
    self.postMessage(puzzle);
  } catch (error) {
    console.error("Error generating puzzle:", error);
    self.postMessage(null);
  }
};
