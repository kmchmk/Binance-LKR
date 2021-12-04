



var btc_usdt_settings = {
    "url": "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
    "method": "GET",
    "timeout": 0,
};


var usdt_lkr_settings = {
    // "url": "https://cors-anywhere.herokuapp.com/https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search",
    "url": "https://p2p.binance.com/bapi/c2c/v2/friendly/c2c/adv/search",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json",
    },
    "data": JSON.stringify({
        "page": 1,
        "rows": 1,
        "asset": "USDT",
        "tradeType": "BUY",
        "fiat": "LKR",
        "merchantCheck": false
    }),
};


function get_part(num, size) {
    return (parseInt(num / size) % size)
}

$.ajax(btc_usdt_settings).done(function (btc_usdt_response) {
    // $.ajax(usdt_lkr_settings).done(function (usdt_lkr_response) {
    // price = btc_usdt_response.price * usdt_lkr_response.data[0].adv.price
    price = btc_usdt_response.price


    document.getElementById("million").innerHTML = get_part(price, 1000000) + " million"
    document.getElementById("thousand").innerHTML = get_part(price, 1000) + " thousand"
    document.getElementById("other").innerHTML = parseInt(price) % 1000 + " rupees"
    // });
});

