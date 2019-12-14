const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/cities");

var fs = require("fs");
// var { Pool } = require("pg");
//
// const pool = new Pool();

var copyFrom = require("pg-copy-streams").from;

// module.exports.getInfo = function getInfo(id) {
//     return db.query("SELECT * from users WHERE id=$1", [id]);
// };

module.exports.connectPool = function connectPool(path) {
    return db.query(
        copyFrom(
            `COPY cats (name, age, gender, color, personality) FROM '${path}' WITH DELIMITER ',' CSV HEADER`
        )
    );
    // var fileStream = fs.createReadStream(path);
    // fileStream.pipe(stream);
};
