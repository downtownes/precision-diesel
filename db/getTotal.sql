select price, qty from cart 
inner join parts on cart.productid = parts.productid
WHERE orderid = $1;