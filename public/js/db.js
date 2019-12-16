const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/cities");

var fs = require("fs");
var { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cities",
    password: "postgres",
    port: 5432,
    max: 20
});

var copyFrom = require("pg-copy-streams").from;

// module.exports.getInfo = function getInfo(id) {
//     return db.query("SELECT * from users WHERE id=$1", [id]);
// };
pool.on("error", function(err) {
    console.log(err);
});

module.exports.connectPool = function connectPool(path) {
    //Promise constructor
    pool.connect(function(err, client, done) {
        if (err) {
            console.log("in if err of pool connect", err);
        } else {
            const stream = client.query(
                copyFrom(
                    `COPY cats (name, age, gender, color, personality) FROM STDIN WITH DELIMITER ',' CSV HEADER`
                )
            );
            console.log("stream", stream);
            stream.on("error", function(err) {
                console.log("in stream", err);
            });
            stream.on("end", done);

            var fileStream = fs.createReadStream(path);
            fileStream.on("error", function(err) {
                console.log("in fileStream", err);
            });
            fileStream.pipe(stream);

            //resolve

            //in index .then...

            // function(err, data) {
            //     if (err) {
            //         console.log("in if err of stream cb", err);
            //     } else {
            //         console.log("data", data);
            //         console.log("stream", stream);
            //         stream.on("error", function(err) {
            //             console.log("in else of stream cb", err);
            //         });
            //         stream.on("end", done);
            //
            //         var fileStream = fs.createReadStream(path);
            //         fileStream.pipe(stream);
            //     }
            // }
        }
    });
    // const stream = pool.query(
    //     copyFrom(
    //         `COPY cats (name, age, gender, color, personality) FROM STDIN WITH DELIMITER ',' CSV HEADER`
    //     )
    // );
    // var fileStream = fs.createReadStream(path);
    // fileStream.pipe(stream);
};

module.exports.getKeywords = async function getKeywords() {
    await db.query(
        "UPDATE amazondata SET ACoS_cost = replace(ACoS_cost, '%', '');"
    );
    await db.query(
        "UPDATE amazondata SET ACoS_cost = replace(ACoS_cost, ',', '.');"
    );
    await db.query(
        "ALTER TABLE amazondata ALTER COLUMN ACoS_cost TYPE DECIMAL USING ACoS_cost::numeric"
    );

    await db.query(
        "UPDATE amazondata SET Click_Thru_Rate = replace(Click_Thru_Rate, '%', '');"
    );
    await db.query(
        "UPDATE amazondata SET Click_Thru_Rate = replace(Click_Thru_Rate, ',', '.');"
    );
    await db.query(
        "ALTER TABLE amazondata ALTER COLUMN Click_Thru_Rate TYPE DECIMAL USING click_thru_rate::numeric"
    );

    return db.query(
        "SELECT Targeting,seven_Day_Total_Orders,ACoS_cost  from amazondata WHERE seven_Day_Total_Orders >= 2 AND ACoS_cost < 40;"
    );
};
