UPDATE orders
SET total = $2
WHERE id = $1;