
const http = require('http');
const https = require('https')
const dotenv = require('dotenv');
const request = require('request');
const sync_request = require('sync-request');
dotenv.config();

// const hostname = process.env.HOST_NAME =! undefined ? process.env.HOST_NAME :`${process.env.PROJECT_DOMAIN}.glitch.me`
const port = process.env.PORT;


function get_usdt_price(symbol) {
  var res = sync_request('GET', 'https://api.binance.com/api/v3/ticker/price?symbol=' + symbol + 'USDT');
  return JSON.parse(res.getBody()).price;
}

function get_usdt_lkr_price() {
  var res = sync_request('POST', 'https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search', {
    headers: {
      "Content-Type": "application/json",
    },
    json: {
      page: 1,
      rows: 1,
      asset: "USDT",
      tradeType: "BUY",
      fiat: "LKR",
      merchantCheck: false
    },
  });
  return JSON.parse(res.getBody()).data[0].adv.price
}

function get_part(num, size) {
  return (parseInt(num / size) % size)
}

const server = http.createServer((req, res) => {
  usdt_lkr = get_usdt_lkr_price()
  btc_price = get_usdt_price("BTC") * usdt_lkr
  eth_price = get_usdt_price("ETH") * usdt_lkr
  text = "1 BTC = " + get_part(btc_price, 1000000) + " million " + get_part(btc_price, 1000) + " thousand " + parseInt(btc_price) % 1000 + " LKR"
  text += "\n1 ETH = " + get_part(eth_price, 1000000) + " million " + get_part(eth_price, 1000) + " thousand " + parseInt(eth_price) % 1000 + " LKR"

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(text);
});

server.listen(port, () => {
  const hostname = server.address().address
  console.log(`Server running at http://${hostname}:${port}/`);
});
