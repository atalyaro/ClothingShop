const router = require("express").Router()
const { Query } = require("../dbcon")
const { everyUser } = require("../verification")

router.post("/add", everyUser, async (req, res) => {
    const { city, street, date_of_order, cart_id, four_digits_creditcard } = req.body
    try {
        if (!city || !street || !date_of_order || !cart_id || !four_digits_creditcard)
            return res.json({ err: true, msg: "missing some info" })
        const checkdate_dateorder = new Date(date_of_order)
        let date_order_created = new Date()
        if (date_order_created.getTime() >= checkdate_dateorder.getTime())
            return res.json({ err: true, msg: "date of order must be after today" })
        const order_price = await Query(`SELECT SUM(total_price) FROM productsincarts WHERE cart_id=${cart_id}`)
        date_order_created = date_order_created.toISOString().slice(0, 10)
        const q_addOrder = `INSERT INTO orders(city, street, order_price, date_of_order,date_order_created, cart_id, four_digits_creditcard)
        VALUES('${city}','${street}',${order_price[0]['SUM(total_price)']},DATE '${date_of_order}',DATE '${date_order_created}',${cart_id},${four_digits_creditcard})`
        await Query(q_addOrder)
        await Query(`UPDATE carts SET status="close" WHERE cart_id=${cart_id}`)
        res.json({ err: false, msg: "ok" })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

module.exports = router