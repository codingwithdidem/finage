require('dotenv').config();
const readline = require('readline');
const axios = require('axios');
var json2xls = require('json2xls');
const fs = require('fs-extra');
const { time, timeStamp } = require('console');

const BASE_URL = 'https://api.finage.co.uk/agg/stock';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// symbol = Symbol of the stock
// multiply = Time multiplier
// time = Size of the time. [minute, hour, day, week, month, quarter, year]
// from = Start date
// to = End date

const fetchPrices = async (symbol, multiply, time, from, to) => {
  const FINAL_URL = `${BASE_URL}/${symbol}/${multiply}/${time}/${from}/${to}?apiKey=${process.env.API_KEY}`;
  const { data: { results } } = await axios.get(FINAL_URL);

  const format = results.map(item => {
    return {
      open: item.o,
      high: item.h,
      low:  item.l,
      close: item.c,
      volume: item.v,
      timestamp: item.t
    }
  })



  const xls = json2xls(format);

  fs.writeFileSync('data.xlsx', xls, 'binary');
};




rl.question("What is the ticker symbol ? (Ex: AMZN) ", function(symbol) {
  rl.question("Multiply ? ", function(multiply) { 
    rl.question("Time ? ", function(time) {
      rl.question("Start Date ? ", function(from) {
        rl.question("End Date ? ", function(to) {
          rl.close();
          fetchPrices(symbol, multiply, time, from, to);
        });
      });
     });
  });
});


