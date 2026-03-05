const db = require("../config/db")

async function getOrderStatus(orderId){

const [rows] = await db.query(
"SELECT status FROM orders WHERE id = ?",
[orderId]
)

if(rows.length === 0){
return null
}

return rows[0].status

}

module.exports = {
getOrderStatus
}
