SELECT * FROM cart
INNER JOIN parts ON cart.productid = parts.productid
WHERE orderId = $1;