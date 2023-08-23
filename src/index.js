const express = require('express')
const user_router = require('./routes/user.routes')
const week_router = require('./routes/week.routes')

const app = express()
const port = 3000

app.use("/user", user_router)
app.use("/week", week_router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})