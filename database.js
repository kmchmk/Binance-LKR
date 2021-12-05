const sqlite3 = require('sqlite3').verbose();
var sync_sqlite = require("better-sqlite3");

const create_table = function () {
    let db = new sqlite3.Database('data.db')
    db.run("CREATE TABLE IF NOT EXISTS history ( \
            id INTEGER PRIMARY KEY, \
            symbol TEXT NOT NULL, \
            price REAL NOT NULL, \
            time DATETIME DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL \
        );");
    db.close()
}

const insert_current_price = function (symbol, price) {
    let db = new sqlite3.Database('data.db');
    db.run(`INSERT INTO history (symbol, price) VALUES(?, ?)`, [symbol, price]);
    db.close()
}

const get_history = function () {
    let db = new sync_sqlite('data.db');
    var rows = db.prepare("SELECT id, symbol, price, time FROM history ORDER BY symbol, time DESC").all();
    return rows
}

module.exports = {
    create_table, insert_current_price, get_history
}