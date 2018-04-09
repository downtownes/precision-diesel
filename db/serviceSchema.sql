CREATE TABLE IF NOT EXISTS services (
    serviceId SERIAL PRIMARY KEY,
    servImage TEXT,
    servName TEXT,
    servDesc TEXT,
    price DECIMAL(5,2)
)