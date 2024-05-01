const https = require("node:https");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");
const { API_KEY, BASE_URL } = require("./config");

class WorldWeather {
  constructor(city, apiKey, baseUrl) {
    this.city = city;
    this.lang = "ru";
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  get apiUrl() {
    return `${this.baseUrl}?q=${this.city}&lang=${this.lang}&key=${this.apiKey}`;
  }

  getWeather() {
    https
      .get(this.apiUrl, (res) => {
        const { statusCode } = res;

        if (statusCode !== 200) {
          console.error(`Ошибка, статус код: ${statusCode}`);
          res.resume();
          return;
        }

        res.setEncoding("utf-8");
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            const { current } = JSON.parse(data);
            const {temp_c} = current;
            const result = `В городе ${this.city} температура ${temp_c}°C`;
            console.log(result);
          } catch (error) {
            console.error("Ошибка при парсинге данных:", error.message);
          }
        });
      })
      .on("error", (err) => {
        console.error("Ошибка сетевого соединения:", err.message);
      });
  }
}

const rl = readline.createInterface({ input, output });

rl.question("Введите название города: ", (city) => {
  const weather = new WorldWeather(city, API_KEY, BASE_URL);
  weather.getWeather();
  rl.close();
});
