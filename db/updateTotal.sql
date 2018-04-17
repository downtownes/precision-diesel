UPDATE orders
SET total = $2
WHERE orderid = $1 AND status = true;