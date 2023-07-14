const express = require("express")
const User = require("./models/User")

const router = express.Router()

router.post('/register', async (req,res) => {
    try {

        const { username,password } = req.body

        const user = User(username,password)
        await user.hashPassword()

    } catch (error) {
        res.status(500).json({ error: 'Internal server error'})
    }
})

module.exports(router)