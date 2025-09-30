import { easy9x9 } from "./sudokuGrids/9x9/easy.js";
import { hard9x9 } from "./sudokuGrids/9x9/hard.js";
import { expert9x9 } from "./sudokuGrids/9x9/expert.js";
import { medium9x9 } from "./sudokuGrids/9x9/medium.js";
import { easy4x4 } from "./sudokuGrids/4x4/easy.js";
import { easy6x6 } from "./sudokuGrids/6x6/easy.js";
import { hard16x16 } from "./sudokuGrids/16x16/hard.js";

self.onmessage = (e) => {
  const { level, size } = e.data;

  try {
    let boardSize;
    switch (size) {
      case 4:
        boardSize = easy4x4;
        break;
      case 6:
        boardSize = easy6x6;
        break;
      case 9:
        boardSize = {
          easy: easy9x9,
          medium: medium9x9,
          hard: hard9x9,
          expert: expert9x9,
        };
        break;
      case 16:
        boardSize = hard16x16;
        break;
    }

    const length = {
      4: easy4x4.length,
      6: easy6x6.length,
      9: {
        easy: easy9x9.length,
        medium: medium9x9.length,
        hard: hard9x9.length,
        expert: expert9x9.length,
      },
      16: hard16x16.length,
    };

    let pool = boardSize;
    if (size === 9) {
      pool = boardSize[level];
    }

    let selectedLength;
    if (size === 9) {
      selectedLength = length[9][level];
    } else {
      selectedLength = length[size];
    }
    const puzzles = pool.map((entry) => entry.puzzle);
    const solutions = pool.map((entry) => entry.solution);

    console.log(selectedLength);
    self.postMessage({
      puzzles,
      solutions,
      selectedLength,
    });
    console.log(e.data);
  } catch (error) {
    console.error("Error fetching puzzle:", error);
    self.postMessage(null);
  }
};
