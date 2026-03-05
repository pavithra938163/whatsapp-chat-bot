const express = require("express")
require("dotenv").config()

const whatsappRoutes = require("./routes/whatsappRoutes")

const app = express()

app.use(express.json())

app.use("/whatsapp",whatsappRoutes)

app.listen(process.env.PORT,()=>{

console.log("Server running on port",process.env.PORT)

})
