const router = require("express").Router()
const { Query } = require("../dbcon")
const { everyUser } = require("../verification")

router.get("/", everyUser, async (req, res) => {
    try {
        const categories = await Query(`SELECT * FROM categories`)
        res.json({ err: false, categories })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

module.exports = router