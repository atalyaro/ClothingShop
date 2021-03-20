const express = require("express")
const app = express()
const cors = require("cors")
require("./dbcon")
const path = require('path')

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../recipts')))
app.use("/auth", require("./routes/auth"))
app.use("/categories", require("./routes/categories"))
app.use("/users", require("./routes/users"))
app.use("/products", require("./routes/products"))
app.use("/productsincarts", require("./routes/productsincarts"))
app.use("/orders", require("./routes/orders"))

app.listen(1000, () => "server 1000")