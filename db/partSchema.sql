CREATE TABLE IF NOT EXISTS parts (
    productId SERIAL PRIMARY KEY,
    subId VARCHAR(1),
    prodImage TEXT,
    prodName TEXT,
    prodDesc TEXT,
    price DECIMAL(5,2),
    category VARCHAR(20)
)

-------ADDED THE SUBID FIELD FOR PRODUCT COMBINING------