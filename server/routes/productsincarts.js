const router = require("express").Router()
const { Query } = require("../dbcon")
const { onlyAdmin, everyUser } = require("../verification")

router.get("/", everyUser, async (req, res) => {
    const { cart_id, user_id } = req.body
    try {
        // const datenow = Date()
        // if (!cart_id) {
        //     await Query(`INSERT INTO carts(date_cart_created,user_id)
        //     VALUES(${datenow},${user_id})`)
        //     cart_new_id= await Query()
        // }
        const productsofcart = await Query(`
        SELECT * FROM productsincarts INNER JOIN products ON productsincarts.product_id=products.product_id
        WHERE cart_id=${cart_id}`)
        res.json({ err: false, productsofcart })
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
        res.json({ err: false, productsofcart })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.delete("/deleteoneproduct", everyUser, async (req, res) => {
    const { productincart_id, cart_id } = req.body
    try {
        await Query(`DELETE FROM productsincarts
        WHERE productincart_id= ${productincart_id}`)
        // const cart_id = await Query(`SELECT cart_id FROM productsincarts WHERE productincart_id= ${productincart_id}`)
        const productsofcart = await Query(`
        SELECT * FROM productsincarts INNER JOIN products ON productsincarts.product_id=products.product_id
        WHERE cart_id=${cart_id}`)
        res.json({ err: false, productsofcart })
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