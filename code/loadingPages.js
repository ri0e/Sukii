const loading = document.getElementById("loading");

const x = document.getElementById("x");
const texts = [
  "O_O",
  "0_O",
  " _0",
  " 0",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  " 0",
  "0_",
  "O_0",
  "O_O",
];
let index = 0;

const words = [
  "loading...",
  "loading..",
  "loading.",
  "you still waiting?",
  `what's up?`,
  "you are pretty you know that?",
  "hehehe",
  "go to sleep kid",
];

// Text animation
setInterval(() => {
  loading.textContent = texts[index];
  index = (index + 1) % texts.length;
}, 100);

// Word animation
let wordIndex = 0;
setInterval(() => {
  x.textContent = words[wordIndex];
  wordIndex = (wordIndex + 1) % words.length;
}, 2000);
