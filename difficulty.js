const sizeOptions = document.querySelectorAll('input[name="boardSize"]');
const difficultyOptions = document.querySelectorAll(
  'input[name="deffeculity"]'
);

const difficultiesBySize = {
  4: ["easy"],
  6: ["easy"],
  9: ["easy", "medium", "hard", "expert"],
  16: ["expert"],
};

sizeOptions.forEach((size) => {
  size.addEventListener("change", () => {
    const selectedSize = parseInt(size.value, 10);
    const allowed = difficultiesBySize[selectedSize];

    difficultyOptions.forEach((diff) => {
      if (allowed.includes(diff.value)) {
        diff.parentElement.style.display = "inline-block";
        diff.disabled = false;
      } else {
        diff.parentElement.style.display = "none";
        diff.disabled = true;
        diff.checked = false;
      }
    });
  });
});
