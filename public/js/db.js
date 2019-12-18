const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/amazontool");

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
                        `COPY amazondata (start,end_,portfolio,currency, campaign_name,ad_group_name,targeting,match_type,customer_search_term, impressions,clicks,click_thru_rate,Cost_Per_Click,spend,totalsales,ACoS_cost,RoAS,seven_day_total_orders,seven_day_total_units,seven_day_conversionrate,seven_day_SKUunites,seven_day_other_SKUunites,seven_day_SKUSales,seven_day_other_SKUSales) FROM STDIN DELIMITER ';' CSV HEADER`
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

module.exports.setDatatype = async function setDatatype() {
    try {
        await db.query(
            "ALTER TABLE amazondata ALTER COLUMN ACoS_cost TYPE VARCHAR USING ACoS_cost::VARCHAR"
        );
        await db.query(
            "ALTER TABLE amazondata ALTER COLUMN click_thru_rate TYPE VARCHAR USING click_thru_rate::VARCHAR"
        );
        console.log("varchar datatype");
    } catch (err) {
        console.log("catch error in setDatatype", err);
    }
};

module.exports.rowsCount = async function rowsCount() {
    await db.query(
        "INSERT INTO id_table (data_id) SELECT COUNT(*) FROM amazondata;"
    );
};

module.exports.setNewDatatype = async function setNewDatatype() {
    try {
        await db.query(
            "UPDATE amazondata SET ACoS_cost = replace(replace(ACoS_cost, '%', ''), ',', '.');"
        );
        // await db.query(
        //     "UPDATE amazondata SET ACoS_cost = replace(ACoS_cost, ',', '.');"
        // );
        console.log("numeric datatype query1");
        await db.query(
            "ALTER TABLE amazondata ALTER COLUMN ACoS_cost TYPE DECIMAL USING ACoS_cost::numeric"
        );
        console.log("numeric datatype query2");

        await db.query(
            "UPDATE amazondata SET click_thru_rate = replace(click_thru_rate, '%', '');"
        );
        console.log("numeric datatype query3");
        await db.query(
            "UPDATE amazondata SET click_thru_rate = replace(click_thru_rate, ',', '.');"
        );
        console.log("numeric datatype query4");
        await db.query(
            "ALTER TABLE amazondata ALTER COLUMN click_thru_rate TYPE DECIMAL USING click_thru_rate::numeric"
        );
        console.log("numeric datatype final");
    } catch (err) {
        console.log("catch error in setNewDatatype", err);
    }
};

module.exports.getWinningKeywordsP1 = function getWinningKeywordsP1() {
    return db.query(
        "SELECT id,targeting,seven_day_total_orders,ACoS_cost from amazondata WHERE seven_day_total_orders >= 2 AND ACoS_cost < 40;"
    );
};

module.exports.getWinningKeywordsP2 = function getWinningKeywordsP2() {
    return db.query(
        "SELECT id,targeting,seven_day_total_orders,click_thru_rate from amazondata WHERE seven_day_total_orders >= 1 AND click_thru_rate > 0.3;"
    );
};

module.exports.getLosingKeywordsP1 = function getLosingKeywordsP1() {
    return db.query(
        "INSERT INTO results (targeting, uploaded_at) SELECT targeting, uploaded_at FROM amazondata WHERE impressions >= 1000 AND click_thru_rate < 0.2 returning *;"
    );
};

// module.exports.getLosingKeywordsP1 = function getLosingKeywordsP1() {
//     return db.query(
//         "SELECT id,targeting,impressions,click_thru_rate  from amazondata WHERE impressions >= 1000 AND click_thru_rate < 0.2;"
//     );
// };

module.exports.getLosingKeywordsP2 = function getLosingKeywordsP2() {
    return db.query(
        "SELECT id,targeting,clicks,seven_day_total_orders from amazondata WHERE clicks BETWEEN 10 AND 20 AND seven_day_total_orders = 0;"
    );
};
