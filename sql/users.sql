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
    id SERIAL PRIMARY KEY,
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
    cost_per_click VARCHAR(255) NOT NULL,
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
    seven_day_other_SKUSales VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS results CASCADE;
CREATE TABLE results(
    id SERIAL PRIMARY KEY,
    start date,
    end_ date,
    campaign_name VARCHAR(255),
    ad_group_name VARCHAR(255),
    targeting VARCHAR(255),
    match_type VARCHAR(255),
    customer_search_term VARCHAR(255),
    impressions INT,
    clicks INT,
    click_thru_rate DECIMAL,
    cost_per_click VARCHAR(255),
    spend VARCHAR(255),
    ACoS_cost DECIMAL,
    RoAS VARCHAR(255),
    seven_day_total_orders INT,
    uploaded_at VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)
