// Use dynamic import instead of static import
self.onmessage = async (e) => {
  const level = e.data;
  try {
    // Dynamically import the sudoku-core module
    const { generate } = await import("https://esm.sh/sudoku-core");
    const puzzle = generate(level);
    self.postMessage(puzzle);
  } catch (error) {
    console.error("Error generating puzzle:", error);
    self.postMessage(null);
  }
};
