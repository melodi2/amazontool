const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/cities");

// var fs = require("fs");
// var { Pool } = require("pg");

// const pool = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "cities",
//     password: "postgres",
//     port: 5432
// });
//
// var copyFrom = require("pg-copy-streams").from;

// module.exports.getInfo = function getInfo(id) {
//     return db.query("SELECT * from users WHERE id=$1", [id]);
// };

// module.exports.connectPool = function connectPool(path) {
//     const stream = pool.query(
//         copyFrom(
//             `COPY cats (name, age, gender, color, personality) FROM STDIN WITH DELIMITER ',' CSV HEADER`
//         )
//     );
//     var fileStream = fs.createReadStream(path);
//     fileStream.pipe(stream);
// };

module.exports.getKeywords = function getKeywords() {
    return db.query("SELECT * from data WHERE ");
};
