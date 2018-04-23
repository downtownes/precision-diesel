UPDATE users
SET firstname = $2, lastname =$3, phone = $4, address = $5, city = $6, state = $7, zip = $8
WHERE id = $1
RETURNING *;