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

pool.on("error", function(err) {
    console.log("pool.on error", err);
});

module.exports.connectPool = function connectPool(path) {
    //Promise constructor
    return new Promise((resolve, reject) => {
        pool.connect(function(err, client, done) {
            if (err) {
                console.log("error of pool.connect", err);
            } else {
                const stream = client.query(
                    copyFrom(
                        `COPY amazondata (start,end_,portfolio,currency, campaign_name,ad_group_name,targeting,match_type,customer_search_term, impressions,clicks,click_thru_rate,Cost_Per_Click,spend,totalsales,ACoS_cost,RoAS,seven_day_total_orders,seven_day_total_units,seven_day_conversionrate,seven_day_SKUunites,seven_day_other_SKUunites,seven_day_SKUSales,seven_day_other_SKUSales) FROM STDIN DELIMITER ';' CSV HEADER`
                    )
                );
                stream.on("error", function(err) {
                    console.log("error in stream", err);
                });
                stream.on("end", done);

                var fileStream = fs.createReadStream(path);
                fileStream.on("error", function(err) {
                    console.log("error in fileStream", err);
                });
                fileStream.pipe(stream);
                resolve();
            }
        });
    });
};

module.exports.setDatatype = async function setDatatype() {
    //change column datatype to VARCHAR
    try {
        await pool.query(
            "ALTER TABLE amazondata ALTER COLUMN ACoS_cost TYPE VARCHAR USING ACoS_cost::VARCHAR"
        );
        await pool.query(
            "ALTER TABLE amazondata ALTER COLUMN click_thru_rate TYPE VARCHAR USING click_thru_rate::VARCHAR"
        );
    } catch (err) {
        console.log("catch error in setDatatype", err);
    }
};

module.exports.rowsCount = function rowsCount() {
    db.query(
        "INSERT INTO id_table (uploaded_at) SELECT uploaded_at FROM amazondata ORDER BY DESC LIMIT 1;"
    );
};

module.exports.setNewDatatype = async function setNewDatatype() {
    //alter column by deleting % character and replacing comma by dot
    try {
        await pool.query(
            "UPDATE amazondata SET ACoS_cost = replace(replace(ACoS_cost, '%', ''), ',', '.');"
        );
        //change column datatype to NUMERIC
        await pool.query(
            "ALTER TABLE amazondata ALTER COLUMN ACoS_cost TYPE DECIMAL USING ACoS_cost::numeric"
        );

        await pool.query(
            "UPDATE amazondata SET click_thru_rate = replace(replace(click_thru_rate, '%', ''), ',', '.');"
        );

        await pool.query(
            "ALTER TABLE amazondata ALTER COLUMN click_thru_rate TYPE DECIMAL USING click_thru_rate::numeric"
        );
    } catch (err) {
        console.log("catch error in setNewDatatype", err);
    }
};

module.exports.getWinningKeywordsP1 = function getWinningKeywordsP1() {
    return db.query(
        "INSERT INTO results (start,end_,campaign_name,ad_group_name,targeting,match_type,customer_search_term,impressions,clicks,click_thru_rate,cost_per_click,spend,ACoS_cost,RoAS,seven_day_total_orders,uploaded_at) SELECT start,end_,campaign_name,ad_group_name,targeting,match_type,customer_search_term,impressions,clicks,click_thru_rate,cost_per_click,spend,ACoS_cost,RoAS,seven_day_total_orders,uploaded_at FROM amazondata WHERE seven_day_total_orders >= 2 AND ACoS_cost < 40;"
    );
};

// module.exports.getWinningKeywordsP1 = function getWinningKeywordsP1() {
//     return db.query(
//         "SELECT id,targeting,seven_day_total_orders,ACoS_cost from amazondata WHERE seven_day_total_orders >= 2 AND ACoS_cost < 40;"
//     );
// };

module.exports.getWinningKeywordsP2 = function getWinningKeywordsP2() {
    return db.query(
        "INSERT INTO results (start,end_,campaign_name,ad_group_name,targeting,match_type,customer_search_term,impressions,clicks,click_thru_rate,cost_per_click,spend,ACoS_cost,RoAS,seven_day_total_orders,uploaded_at) SELECT start,end_,campaign_name,ad_group_name,targeting,match_type,customer_search_term,impressions,clicks,click_thru_rate,cost_per_click,spend,ACoS_cost,RoAS,seven_day_total_orders,uploaded_at FROM amazondata WHERE seven_day_total_orders >= 1 AND click_thru_rate > 0.3 returning *;"
    );
};

// module.exports.getWinningKeywordsP2 = function getWinningKeywordsP2() {
//     return db.query(
//         "SELECT id,targeting,seven_day_total_orders,click_thru_rate from amazondata WHERE seven_day_total_orders >= 1 AND click_thru_rate > 0.3;"
//     );
// };

module.exports.getLosingKeywordsP1 = function getLosingKeywordsP1() {
    return db.query(
        "INSERT INTO results (start,end_,campaign_name,ad_group_name,targeting,match_type,customer_search_term,impressions,clicks,click_thru_rate,cost_per_click,spend,ACoS_cost,RoAS,seven_day_total_orders,uploaded_at) SELECT start,end_,campaign_name,ad_group_name,targeting,match_type,customer_search_term,impressions,clicks,click_thru_rate,cost_per_click,spend,ACoS_cost,RoAS,seven_day_total_orders,uploaded_at FROM amazondata WHERE impressions >= 1000 AND click_thru_rate < 0.2 returning *;"
    );
};

// module.exports.getLosingKeywordsP1 = function getLosingKeywordsP1() {
//     return db.query(
//         "SELECT id,targeting,impressions,click_thru_rate  from amazondata WHERE impressions >= 1000 AND click_thru_rate < 0.2;"
//     );
// };

module.exports.getLosingKeywordsP2 = function getLosingKeywordsP2() {
    return db.query(
        "INSERT INTO results (start,end_,campaign_name,ad_group_name,targeting,match_type,customer_search_term,impressions,clicks,click_thru_rate,cost_per_click,spend,ACoS_cost,RoAS,seven_day_total_orders,uploaded_at) SELECT start,end_,campaign_name,ad_group_name,targeting,match_type,customer_search_term,impressions,clicks,click_thru_rate,cost_per_click,spend,ACoS_cost,RoAS,seven_day_total_orders,uploaded_at from amazondata WHERE clicks BETWEEN 10 AND 20 AND seven_day_total_orders = 0;"
    );
};

// module.exports.getLosingKeywordsP2 = function getLosingKeywordsP2() {
//     return db.query(
//         "SELECT id,targeting,clicks,seven_day_total_orders from amazondata WHERE clicks BETWEEN 10 AND 20 AND seven_day_total_orders = 0;"
//     );
// };
