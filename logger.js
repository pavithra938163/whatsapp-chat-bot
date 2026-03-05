const fs = require("fs")

function logConversation(data){

const file = "./logs/ai_logs.json"

let logs = []

if(fs.existsSync(file)){
logs = JSON.parse(fs.readFileSync(file))
}

logs.push(data)

fs.writeFileSync(file,JSON.stringify(logs,null,2))

}

module.exports = logConversation
