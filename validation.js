function validateMessage(body){

if(!body.message || body.message.length < 2){
throw new Error("Invalid message")
}

}

module.exports = validateMessage
