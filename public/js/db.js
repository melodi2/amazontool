const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/amazontool");

let runOnce = true; //change to false

var fs = require("fs");
var { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "amazontool",
    password: "postgres",
    port: 5432,
    max: 20
});

var copyFrom = require("pg-copy-streams").from;

// module.exports.getInfo = function getInfo(id) {
//     return db.query("SELECT * from users WHERE id=$1", [id]);
// };
pool.on("error", function(err) {
    console.log("pool.on error", err);
});

module.exports.connectPool = function connectPool(path) {
    //Promise constructor
    return new Promise((resolve, reject) => {
        pool.connect(function(err, client, done) {
            if (err) {
                console.log("in if err of pool.connect", err);
            } else {
                const stream = client.query(
                    copyFrom(
                        `COPY amazondata FROM STDIN DELIMITER ';' CSV HEADER`
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
                resolve();
                //resolve

                //in index .then...
            }
        });
    });
};

module.exports.getWinningKeywordsP1 = async function getWinningKeywordsP1() {
    if (runOnce == false) {
        console.log("update stuff run once");
        runOnce = true;

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
    }
    console.log("selecting getWinningKeywords");

    return db.query(
        "SELECT targeting,seven_day_total_orders,ACoS_cost  from amazondata WHERE seven_day_total_orders >= 2 AND ACoS_cost < 40;"
    );
};

module.exports.getWinningKeywordsP2 = async function getWinningKeywordsP2() {
    return db.query(
        "SELECT targeting,seven_day_total_orders,click_thru_rate  from amazondata WHERE seven_day_total_orders >= 1 AND click_thru_rate > 0.3;"
    );
};

module.exports.getLoosingKeywordsP1 = async function getLoosingKeywordsP1() {
    return db.query(
        "SELECT targeting,impressions,click_thru_rate  from amazondata WHERE impressions >= 1000 AND click_thru_rate < 0.2;"
    );
};

module.exports.getLoosingKeywordsP2 = async function getLosingKeywordsP2() {
    return db.query(
        "SELECT targeting,clicks,seven_day_total_orders from amazondata WHERE clicks BETWEEN 10 AND 20 AND seven_day_total_orders = 0;"
    );
};
