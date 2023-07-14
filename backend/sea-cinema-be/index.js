const express = require("express")
const cors = require("cors")
const app = express()
const uuid = require("uuid")
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log("App started at port 4000")
})

const DataStorage = require("./models/DataStorage")
const User = require("./models/User")

const data = new DataStorage()

app.get("/movies", (req,res) => {
    res.status(200).json(data.getMovieList())
})

app.get("/movies/:id", (req,res) => {
    const mv = data.getMovie(req.params.id)
    res.status(200).json(mv == null ? {} : mv.asJson())
})

app.post("/auth/register", async (req,res) => {
    try {
        const { username,password,name,age } = req.body

        if (data.findUser(username) != null) {
            res.status(200).json({success: false, message: "User already exists", result: 0})
            return
        }

        console.log('ngab')

        const user = new User(data,username,password,name,age)

        await user.hashPassword()
        data.addUser(user)

        res.status(201).json({ success: true, message: "User registered successfully", result: 1})
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

const jwt = require("jsonwebtoken")

app.post("/auth/login", async (req,res) => {
    try {
        const { username, password } = req.body
        const user = data.findUser(username)
        if (user == null) {
            res.status(200).json({ success: false, result: 0, message: "Not found"})
            return
        }

        const match = await user.comparePassword(password)
        if (match) {
            let sid = user.refreshSid()
            token = jwt.sign({ sid: sid },"SecretKeeyyyy",{ expiresIn: "30m"})
            res.status(200).json({ success: true, data: {sid: sid, token: token}})
        } else {
            res.status(200).json({ success: false, result: 2, message: "Wrong password"})
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error'})
    }
})

app.get("/auth/profile", (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(200).json({ success: false, message: "Token not provided"})
            return
        }

        const decoded = jwt.verify(token,"SecretKeeyyyy")
        const sid = decoded.sid
        if (sid) {
            const user = data.findUserSid(sid)
            if (user) res.status(200).json({success: true, user: user.asJson()})
        } else res.status(200).json({success: false})
    } catch (error) {
        res.status(500)
    }
})

app.get("/tickets", (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(200).json({ success: false, message: "Token not provided"})
            return
        }

        const decoded = jwt.verify(token,"SecretKeeyyyy")
        const sid = decoded.sid
        if (sid) {
            const user = data.findUserSid(sid)
            if (user) {
                const ret = []
                for (const tix of user.ownedTickets) {
                    ret.push(tix.asJson())
                }
                res.status(200).json({success: true, tickets: ret})
            }
        } else res.status(200).json({success: false})
    } catch (error) {
        res.status(500)
    }
})

app.post("/tickets/cancel", (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(200).json({ success: false, message: "Token not provided"})
            return
        }

        const decoded = jwt.verify(token,"SecretKeeyyyy")
        const sid = decoded.sid
        if (sid) {
            const user = data.findUserSid(sid)
            if (user) {
                const { id } = req.body
                const tix = data.findTicket(id)
                tix.cancel()
                res.status(200).json({success: true})
            }
        } else res.status(200).json({success: false})
    } catch (error) {
        res.status(500)
    }
})

app.post("/topup", (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(200).json({ success: false, message: "Token not provided"})
            return
        }

        const decoded = jwt.verify(token,"SecretKeeyyyy")
        const sid = decoded.sid
        if (sid) {
            const user = data.findUserSid(sid)
            if (user) {
                const { amount } = req.body
                res.status(200).json({success: user.topup(amount)})
            }
        } else res.status(200).json({success: false})
    } catch (error) {
        res.status(500)
    }
})

app.post("/withdraw", (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(200).json({ success: false, message: "Token not provided"})
            return
        }

        const decoded = jwt.verify(token,"SecretKeeyyyy")
        const sid = decoded.sid
        if (sid) {
            const user = data.findUserSid(sid)
            if (user) {
                const { amount } = req.body
                res.status(200).json({success: user.withdraw(amount)})
            }
        } else res.status(200).json({success: false})
    } catch (error) {
        res.status(500)
    }
})

app.post("/order", (req,res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            res.status(200).json({ success: false, message: "Token not provided"})
            return
        }
        const decoded = jwt.verify(token,"SecretKeeyyyy")
        const sid = decoded.sid
        if (sid) {
            const user = data.findUserSid(sid)
            if (user) {
                const { movie_id,seats } = req.body
                const result = user.bookMovie(movie_id,seats)
                console.log(result)
                res.status(200).json(result)
            }
        } else res.status(200).json({success: false})
    } catch (error) {
        res.status(500)
    }
})