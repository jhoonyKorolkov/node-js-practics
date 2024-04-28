#!/usr/bin/env node
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

const randomIndex = Math.floor(Math.random() * 101);
console.log("Загадано число в диапазоне от 0 до 100");
rl.prompt();
rl.on("line", (line) => {
  const userInput = parseInt(line.trim());
  if (randomIndex < userInput) {
    console.log("Меньше");
  } else if (randomIndex > userInput) {
    console.log("Больше");
  } else if (randomIndex === userInput) {
    console.log(`Отгадано число ${randomIndex}`);
    rl.close();
    return;
  }
  rl.prompt();
});
