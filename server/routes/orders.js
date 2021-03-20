const router = require("express").Router()
const { Query } = require("../dbcon")
const { everyUser } = require("../verification")
const fs = require('fs')
const path = require('path')

router.post("/add", everyUser, async (req, res) => {
    const { city, street, date_of_order, cart_id, four_digits_creditcard } = req.body
    try {
        if (!city || !street || !date_of_order || !cart_id || !four_digits_creditcard)
            return res.json({ err: true, msg: "missing some info" })
        let checkdate_dateorder = new Date(date_of_order)
        let date_order_created = new Date(Date.now())
        if (date_order_created.getTime() >= checkdate_dateorder.getTime())
            return res.json({ err: true, msg: "date of order must be after today" })
        const order_price = await Query(`SELECT SUM(total_price) FROM productsincarts WHERE cart_id=${cart_id}`)
        date_order_created = date_order_created.toISOString().slice(0, 10)
        checkdate_dateorder = checkdate_dateorder.toISOString().slice(0, 10)
        const q_addOrder = `INSERT INTO orders(city, street, order_price, date_of_order,date_order_created, cart_id,user_id,four_digits_creditcard)
        VALUES('${city}','${street}',${order_price[0]['SUM(total_price)']},DATE '${checkdate_dateorder}',DATE '${date_order_created}',${cart_id},${req.user.user_id},${four_digits_creditcard})`
        await Query(q_addOrder)
        await Query(`UPDATE carts SET status="close" WHERE cart_id=${cart_id}`)
        res.json({ err: false, msg: "ok" })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/datesorders", everyUser, async (req, res) => {
    try {
        const datesof3orders = await Query(`Select date_of_order FROM orders GROUP BY date_of_order HAVING COUNT(date_of_order)=3`)
        let datesorders = []
        for (let i = 0; i < datesof3orders.length; i++) {
            datesorders.push(new Date(datesof3orders[i]["date_of_order"]))
        }
        res.json({ err: false, datesorders })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.post("/recipt", everyUser, async (req, res) => {
    const { productsofcart, cartprice } = req.body
    try {
        let text = `order date: ${new Date(Date.now()).toISOString().slice(0, 10)}/client name: ${req.user.first_name} ${req.user.last_name}
XXXXXXXXXXXXXXXXXXXXXXX
`
        for (let i = 0; i < productsofcart.length; i++) {
            text += `${productsofcart[i].product_name} X${productsofcart[i].amount} = ${productsofcart[i].total_price}
`
        }
        text += (`XXXXXXXXXXXXXXXXXXXXXX
total price: ${cartprice}
thank you:)`)
        fs.writeFile(__dirname + '/../recipts/' + req.user.user_id + '_recipt.txt', text, (err) => {
            if (err) return res.sendStatus(500)
            const file = path.join(__dirname, '../recipts', req.user.user_id + '_recipt.txt')
            res.download(file)
        })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

module.exports = router