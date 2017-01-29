const SqliteToJson = require('sqlite-to-json');
const sqlite3 = require('sqlite3');
const exporter = new SqliteToJson({
    client: new sqlite3.Database('./dictionary_database')
});

exporter.tables(function (err, tables) {
    tables.forEach(table => {
        exporter.save(
            table,
            "./data/" + table + ".json",
            function (err) {
                if (err) throw err;
                else console.log("saved " + table + ".json")
            });
    });
});