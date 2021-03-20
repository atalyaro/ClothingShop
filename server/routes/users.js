const router = require("express").Router()
const { Query } = require("../dbcon")

router.get("/:id", async (req, res) => {
    try {
        const user_id = await Query(`SELECT user_id FROM users Where user_id=${req.params.id}`)
        if (user_id.length)
            return res.json(false)
        res.json(true)

    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})

module.exports = router