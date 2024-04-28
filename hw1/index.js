#!/usr/bin/env node
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const date = new Date();

const adjustDate = (argv) => {
  const change = argv._[0] === "add" ? 1 : -1;
  if (argv.month < 0 || argv.date < 0) {
    console.log("Не верное значение, введите положительное число.");
    return;
  }
  if (argv.month) {
    date.setMonth(date.getMonth() + change * argv.month);
  }
  if (argv.date) {
    date.setDate(date.getDate() + change * argv.date);
  }
  console.log(date.toISOString());
};

yargs(hideBin(process.argv))
  .command(
    "current",
    "Показать текушую дату и время в формате ISO",
    (yargs) => {
      return yargs
        .option("year", {
          alias: "y",
          type: "boolean",
          description: "Показать только текущий год",
        })
        .option("month", {
          alias: "m",
          type: "boolean",
          description: "Показать только текущий месяц",
        })
        .option("date", {
          alias: "d",
          type: "boolean",
          description: "Показать только текущую дату",
        });
    },
    (argv) => {
      if (argv.year) {
        console.log(date.getFullYear());
      } else if (argv.month) {
        console.log(date.getMonth() + 1);
      } else if (argv.date) {
        console.log(date.getDate());
      } else {
        console.log(date.toISOString());
      }
    }
  )
  .command(
    "add",
    "Добавить день или месяц к текущей дате",
    (yargs) => {
      return yargs
        .option("month", {
          alias: "m",
          type: "number",
          description: "Число для добавления в месяцы",
        })
        .option("date", {
          alias: "d",
          type: "number",
          description: "Число для добавления в дни",
        });
    },
    adjustDate
  )
  .command(
    "sub",
    "Вычесть день или месяц из текущей даты",
    (yargs) => {
      return yargs
        .option("month", {
          alias: "m",
          type: "number",
          description: "Количество месяцев, которое нужно вычесть",
        })
        .option("date", {
          alias: "d",
          type: "number",
          description: "Количество дней, которое нужно вычесть",
        });
    },
    adjustDate
  )
  .help()
  .alias("help", "h")
  .parse();
