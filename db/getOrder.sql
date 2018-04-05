SELECT * FROM orders
WHERE id = $1 AND status = true;