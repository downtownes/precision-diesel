SELECT * FROM cart
INNER JOIN parts ON cart.productid = parts.productid
INNER JOIN services ON cart.productid = services.productid
WHERE orderId = $1;