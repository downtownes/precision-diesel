INSERT INTO orders 
(status, id)
VALUES(true, $1)
RETURNING orderId;