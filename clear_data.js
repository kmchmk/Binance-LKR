const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('data.db')
db.run('DROP TABLE history')
db.close()