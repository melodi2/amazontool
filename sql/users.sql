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
    Start_ date,
    END_ date,
    Portfolio VARCHAR(255) NOT NULL,
    Currency VARCHAR(255) NOT NULL,
    Campaign_Name VARCHAR(255) NOT NULL,
    Ad_Group_Name VARCHAR(255) NOT NULL,
    Targeting VARCHAR(255) NOT NULL,
    Match_Type VARCHAR(255) NOT NULL,
    Customer_Search_Term VARCHAR(255) NOT NULL,
    Impressions VARCHAR(255) NOT NULL,
    Clicks VARCHAR(255) NOT NULL,
    Click_Thru_Rate VARCHAR(255) NOT NULL,
    Cost_Per_Click VARCHAR(255) NOT NULL,
    Spend VARCHAR(255) NOT NULL,
    totalsales VARCHAR(255) NOT NULL,
    ACoS_cost VARCHAR,
    RoAS VARCHAR(255) NOT NULL,
    seven_Day_Total_Orders INT,
    seven_Day_Total_units VARCHAR(255) NOT NULL,
    seven_Day_conversionrate VARCHAR(255) NOT NULL,
    seven_Day_SKUunites VARCHAR(255) NOT NULL,
    seven_Day_other_SKUunites VARCHAR(255) NOT NULL,
    seven_Day_SKUSales VARCHAR(255) NOT NULL,
    seven_Day_other_SKUSales VARCHAR(255) NOT NULL
);
