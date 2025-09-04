self.onmessage = async (e) => {
  const level = e.data;
  try {
    const { generate } = await import("https://esm.sh/sudoku-core");
    const puzzle = generate(level);
    self.postMessage(puzzle);
  } catch (error) {
    console.error("Error generating puzzle:", error);
    self.postMessage(null);
  }
};

