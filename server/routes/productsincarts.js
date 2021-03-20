const router = require("express").Router()
const { Query } = require("../dbcon")
const { everyUser } = require("../verification")

router.get("/", everyUser, async (req, res) => {
    try {
        let opencart = await Query(`Select * FROM carts WHERE user_id=${req.user.user_id} AND status="open"`)
        if (!opencart.length) {
            const now = new Date()
            await Query(`INSERT INTO carts(date_cart_created,user_id, status)
            VALUES(DATE '${now.toISOString().slice(0, 10)}',${req.user.user_id},'open')`)
            opencart = await Query(`Select * FROM carts WHERE user_id=${req.user.user_id} AND status="open"`)
        }
        const productsofcart = await Query(`
        SELECT * FROM productsincarts INNER JOIN products ON productsincarts.product_id=products.product_id
        WHERE cart_id=${opencart[0].cart_id}`)
        opencartid = opencart[0].cart_id
        let meanwhileprice = await Query(`SELECT SUM(total_price) FROM productsincarts WHERE cart_id=${opencartid}`)
        meanwhileprice = meanwhileprice[0]['SUM(total_price)']
        res.json({ err: false, productsofcart, opencartid, meanwhileprice })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.post("/add", everyUser, async (req, res) => {
    const { amount, product_id, cart_id } = req.body
    try {
        if (!amount || !product_id || !cart_id)
            return res.json({ err: true, msg: "missing some info" })
        const priceforone = await Query(`SELECT product_price FROM products Where product_id=${product_id}`)
        const q_addProdtoCart = `INSERT INTO productsincarts(amount, total_price, product_id, cart_id)
        VALUES(${amount},${amount * priceforone[0].product_price},${product_id},${cart_id})`
        await Query(q_addProdtoCart)
        const productsofcart = await Query(`
        SELECT * FROM productsincarts INNER JOIN products ON productsincarts.product_id=products.product_id
        WHERE cart_id=${cart_id}`)
        const totalprice = amount * priceforone[0].product_price
        res.json({ err: false, productsofcart, totalprice })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.delete("/deleteoneproduct", everyUser, async (req, res) => {
    const { productincart_id, cart_id } = req.body
    try {
        await Query(`DELETE FROM productsincarts
        WHERE productincart_id= ${productincart_id}`)
        const productsofcart = await Query(`
        SELECT * FROM productsincarts INNER JOIN products ON productsincarts.product_id=products.product_id
        WHERE cart_id=${cart_id}`)
        let meanwhileprice = await Query(`SELECT SUM(total_price) FROM productsincarts WHERE cart_id=${cart_id}`)
        meanwhileprice = meanwhileprice[0]['SUM(total_price)']
        res.json({ err: false, productsofcart, meanwhileprice })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.delete("/deleteallcart", everyUser, async (req, res) => {
    const { cart_id } = req.body
    try {
        await Query(`DELETE FROM productsincarts
        WHERE cart_id= ${cart_id}`)
        const productsofcart = await Query(`
        SELECT * FROM productsincarts INNER JOIN products ON productsincarts.product_id=products.product_id
        WHERE cart_id=${cart_id}`)
        res.json({ err: false, productsofcart })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

module.exports = router