const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  API_KEY: process.env.API_KEY || "f889f810c5af463ca4e111529242904",
  BASE_URL: process.env.BASE_URL || "http://api.weatherapi.com/v1/current.json",
};
