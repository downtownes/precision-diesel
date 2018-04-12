INSERT INTO cart
(cartId, orderId, productId, quantity)
VALUES($1, $2, $3, $4)
RETURNING *;