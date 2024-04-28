#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const analysisGame = () => {
  const file = path.join(__dirname, "logs", "log.json");

  fs.readFile(file, "utf-8", (err, data) => {
    if (err && err.code === "ENOENT") {
      console.error("Вы не играли в игру, запустите команду game");
      return;
    }

    const totalGames = JSON.parse(data);
    const gamesWon = totalGames.filter((item) => item.isWin);
    const gamesLost = totalGames.filter((item) => !item.isWin);
    const winPercentage = (gamesWon.length / totalGames.length) * 100;

    console.log(`Общее количетво партий: ${totalGames.length}`);
    console.log(`Выиграные партии ${gamesWon.length}`);
    console.log(`Проигранные партии ${gamesLost.length}`);
    console.log(`Процентное соотношение выигранных партий ${winPercentage} %`);
  });
};

analysisGame();
