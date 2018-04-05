CREATE TABLE IF NOT EXISTS parts (
    productId SERIAL PRIMARY KEY,
    prodImage TEXT,
    prodName TEXT,
    prodDesc TEXT,
    price DECIMAL(5,2)
)