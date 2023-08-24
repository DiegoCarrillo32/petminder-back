const express = require('express')
const bodyParser = require("body-parser")
const user_router = require('./routes/user.routes')
const feedinglog_router = require('./routes/feeding-log.routes')
const pet_router = require('./routes/pet.routes')

const app = express()
const port = 3000
const jsonParser = bodyParser.json()

app.use("/user", jsonParser ,user_router)
app.use("/feed_log",jsonParser, feedinglog_router)
app.use("/pet", jsonParser ,pet_router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})