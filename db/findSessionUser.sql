SELECT * FROM users
FULL OUTER JOIN orders ON users.id = orders.id
WHERE users.id = $1;