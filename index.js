require('dotenv').config();
const axios = require('axios');
var json2xls = require('json2xls');
const fs = require('fs-extra');

const BASE_URL = 'https://api.finage.co.uk/agg/crypto';

const fetchPrices = async (symbol, interval, start, end) => {
  const FINAL_URL = `${BASE_URL}/${symbol}/${interval}/${start}/${end}?apiKey=${process.env.API_KEY}`;
  const { data } = await axios.get(FINAL_URL);

  const xls = json2xls(data);

  fs.writeFileSync('data.xlsx', xls, 'binary');
  console.log(data);
};

const startDate = new Date('2021-01-14').getTime();
const endDate = Date.now();

fetchPrices('btcusd', '15m', startDate, endDate);
