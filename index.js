require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const { PORT } = process.env
const toiletRoutes = require("./routes/toilet")
require("./models/index")


app.use(cors())

app.use("/toilet", toiletRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
