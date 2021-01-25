const router = require("express").Router()
const { Query } = require("../dbcon")
const { onlyAdmin, everyUser } = require("../verification")

router.get("/:category", everyUser, async (req, res) => {
    try {
        const productsbycategory = await Query(`
        SELECT * FROM products INNER JOIN categories ON products.category_id=categories.category_id
        WHERE category_name='${req.params.category}'`)
        res.json({ err: false, productsbycategory })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.get("/search/:searchword", everyUser, async (req, res) => {
    try {
        const productsbysearch = await Query(`
        SELECT * FROM products
        WHERE product_name Like '%${req.params.searchword}%'`)
        res.json({ err: false, productsbysearch })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.post("/add", onlyAdmin, async (req, res) => {
    const { product_name, product_price, image, category_id } = req.body
    try {
        if (!product_name || !product_price || !image || !category_id)
            return res.json({ err: true, msg: "missing some info" })
        const q_addProd = `INSERT INTO products(product_name, product_price, image, category_id)
        VALUES("${product_name}",${product_price},"${image}", ${category_id})`
        await Query(q_addProd)
        const productsbycategory = await Query(`
        SELECT * FROM products INNER JOIN categories ON products.category_id=categories.category_id
        WHERE categories.category_id=${category_id}`)
        res.json({ err: false, productsbycategory })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

router.put("/edit",onlyAdmin, async (req, res) => {
    const { product_id, product_name, product_price, image, category_id } = req.body
    try {
        const q_updateProd = `UPDATE products
        SET product_name="${product_name}", product_price=${product_price}, image="${image}"
        WHERE product_id= ${product_id}`
        await Query(q_updateProd)
        const productsbycategory = await Query(`
        SELECT * FROM products INNER JOIN categories ON products.category_id=categories.category_id
        WHERE categories.category_id=${category_id}`)
        res.json({ err: false, productsbycategory })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

module.exports = router