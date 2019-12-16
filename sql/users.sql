DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    imgurl VARCHAR,
    filename VARCHAR,
    bio VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS amazondata CASCADE;
CREATE TABLE amazondata(
    start date,
    end_ date,
    Portfolio VARCHAR(255) NOT NULL,
    currency VARCHAR(255) NOT NULL,
    campaign_name VARCHAR(255) NOT NULL,
    ad_group_name VARCHAR(255) NOT NULL,
    targeting VARCHAR(255) NOT NULL,
    match_type VARCHAR(255) NOT NULL,
    customer_search_term VARCHAR(255) NOT NULL,
    impressions INT,
    clicks INT,
    click_thru_rate VARCHAR(255) NOT NULL,
    Cost_Per_Click VARCHAR(255) NOT NULL,
    spend VARCHAR(255) NOT NULL,
    totalsales VARCHAR(255) NOT NULL,
    ACoS_cost VARCHAR,
    RoAS VARCHAR(255) NOT NULL,
    seven_day_total_orders INT,
    seven_day_total_units VARCHAR(255) NOT NULL,
    seven_day_conversionrate VARCHAR(255) NOT NULL,
    seven_day_SKUunites VARCHAR(255) NOT NULL,
    seven_day_other_SKUunites VARCHAR(255) NOT NULL,
    seven_day_SKUSales VARCHAR(255) NOT NULL,
    seven_day_other_SKUSales VARCHAR(255) NOT NULL
);
