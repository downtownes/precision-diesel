DELETE FROM cart
WHERE productid = $1 AND orderid = $2;