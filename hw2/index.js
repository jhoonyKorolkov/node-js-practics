#!/usr/bin/env node
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const fs = require("fs");
const rl = readline.createInterface({ input, output });
const path = require("path");

const randomIndex = Math.floor(1 + Math.random() * 2);

const startGame = (dirName) => {
  createDirLog(dirName);
  const file = path.join(__dirname, dirName, "log.json");

  console.log("Орёл или решка?");

  rl.prompt();
  rl.on("line", (line) => {
    const userInput = parseInt(line.trim());

    const userData = {
      date: new Date().toISOString(),
      userAnswer: userInput,
    };

    if (randomIndex !== userInput) {
      console.log("Не верно");
      userData.isWin = false;
    } else {
      console.log("Угадали");
      userData.isWin = true;
    }

    setLogs(file, userData);
    rl.close();
    return;
  });
};

const createDirLog = (dirName) => {
  if (fs.existsSync(dirName)) return;
  fs.mkdir(dirName, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

const setLogs = (file, answer) => {
  fs.readFile(file, (err, data) => {
    let logs = [];
    if (!err && data.length) {
      try {
        logs = JSON.parse(data);
      } catch (err) {
        console.error(err);
      }
    }

    logs.push(answer);
    fs.writeFile(file, JSON.stringify(logs), (err) => {
      if (err) {
        console.error(err);
      }
    });
  });
};

startGame("logs");
