const OpenAI = require("openai")
require("dotenv").config()

const client = new OpenAI({
apiKey: process.env.OPENAI_API_KEY
})

async function classifyQuery(message){

const prompt = `
Classify the customer message into one category:

1. order_status
2. return_policy
3. refund_issue
4. other

Return JSON only.

Customer message: "${message}"
`

const response = await client.chat.completions.create({
model: "gpt-4o-mini",
messages: [{role:"user",content:prompt}]
})

return response.choices[0].message.content

}

module.exports = {
classifyQuery
}
