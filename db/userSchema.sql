CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    authid TEXT,
    firstname VARCHAR(40),
    lastname VARCHAR(40),
    email TEXT,
    phone TEXT,
    address TEXT,
    city VARCHAR(40),
    state VARCHAR(40),
    zip INTEGER
)