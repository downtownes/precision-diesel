CREATE TABLE IF NOT EXISTS orders ( orderId SERIAL PRIMARY KEY, status BOOLEAN, total DECIMAL(7,2), id INTEGER )