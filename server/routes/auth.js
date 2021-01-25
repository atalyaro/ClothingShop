const router = require("express").Router()
const { Query } = require("../dbcon")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { everyUser } = require("../verification")

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(400).json({ err: true, msg: "missing info" })
        const users = await Query("SELECT * FROM users")
        const user = users.find(u => u.email == email)
        if (!user) return res.status(401).json({ err: true, msg: "user not exist" })
        const match = await bcrypt.compare(password, user.password)
        if (!match) return res.status(402).json({ err: true, msg: "password is wrong" })
        const access_token = jwt.sign({ ...user, password: "****" }, "thisismysecret", { expiresIn: "20m" })
        const refresh_token = jwt.sign({ id: user.user_id }, "thisismysecret2", { expiresIn: "100d" })
        res.json({ err: false, access_token, refresh_token })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.post("/register", async (req, res) => {
    const { user_id, private_name, family_name, email, password, city, street } = req.body
    try {
        if (!user_id || !private_name || !family_name || !email || !password || !city || !street)
            return res.status(400).json({ err: true, msg: "missing info" })
        const hash = await bcrypt.hash(password, 10)
        await Query(`INSERT INTO users(user_id,private_name, family_name, email, password, city, street)
        VALUES(${user_id},"${private_name}","${family_name}","${email}","${hash}", "${city}","${street}")`)
        const users = await Query(`SELECT * FROM users`)
        const user = users.find(u => u.user_id == user_id)
        const access_token = jwt.sign({ ...user, password: "****" }, "thisismysecret", { expiresIn: "20m" })
        res.json({ err: false, access_token })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/refresh", async (req, res) => {
    try {
        jwt.verify(req.headers.refresh, "thisismysecret2", async (err, payload) => {
            if (err) return res.status(402).json({ err: true, msg: "token refresh expires" })
            const users = await Query("SELECT * FROM users")
            const user = users.find(u => u.user_id == payload.id)
            if (!user) return res.status(401).json({ err: true, msg: "user isnt longer exist" })
            const access_token = jwt.sign({ ...user, password: "****" }, "thisismysecret", { expiresIn: "20m" })
            res.json({ err: false, access_token, user })
        })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/logout", async (req, res) => {
    try {
        const access_token = ""
        res.json({ err: false, access_token })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/infoweb", async (req, res) => {
    try {
        productsamount = await Query(`SELECT COUNT(product_id) FROM products`)
        productsamount = productsamount[0]['COUNT(product_id)']
        ordersamount = await Query(`SELECT COUNT(order_id) FROM orders`)
        ordersamount = ordersamount[0]['COUNT(order_id)']
        res.json({ err: false, productsamount, ordersamount })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/checkinglogin", everyUser, (req, res) => {
    res.json(req.user)
})

router.get("/checkinguserstatus", everyUser, async (req, res) => {
    try {
        const opencart = await Query(`SELECT * FROM carts
        WHERE status="open" AND user_id=${req.user.user_id}`)
        const lastorder = await Query(`SELECT * FROM orders INNER JOIN users ON orders.user_id=users.user_id
        WHERE users.user_id=${req.user.user_id} AND date_order_created IN (SELECT max(date_order_created) FROM orders)`)
        if (opencart.length) {
            const meanwhileprice = await Query(`SELECT SUM(total_price) FROM productsincarts WHERE cart_id=${opencart.cart_id}`)
            const dateofcart = opencart.date_cart_created
            return res.json({ err: false, meanwhileprice, dateofcart })
        } else if (lastorder.length) {
            return res.json({ err: false, lastorder })
        } else {
            return res.json({ err: false, msg: "new user" })
        }
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

module.exports = router