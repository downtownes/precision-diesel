UPDATE orders
SET status = false
WHERE orderid = $1 AND id = $2;