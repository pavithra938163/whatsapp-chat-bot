const { classifyQuery } = require("../services/aiService")
const { getOrderStatus } = require("../services/orderService")
const logConversation = require("../utils/logger")
const validateMessage = require("../utils/validation")

async function handleMessage(req,res){

try{

validateMessage(req.body)

const message = req.body.message

const aiResponse = await classifyQuery(message)

const parsed = JSON.parse(aiResponse)

let reply = ""

if(parsed.category === "order_status"){

const orderId = message.match(/\d+/)?.[0]

if(!orderId){
reply = "Please provide your order ID."
}else{

const status = await getOrderStatus(orderId)

reply = status
? `Your order status is: ${status}`
: "Order not found."

}

}

else if(parsed.category === "return_policy"){

reply = "Our return policy allows returns within 7 days of delivery."

}

else if(parsed.category === "refund_issue"){

reply = "Your issue has been escalated to our support team."

}

else{

reply = "I’m sorry, I didn’t understand. A human agent will assist you."

}

logConversation({
message,
aiResponse,
reply,
timestamp:new Date()
})

res.json({
success:true,
reply
})

}catch(error){

res.status(500).json({
success:false,
error:error.message
})

}

}

module.exports = {
handleMessage
}
