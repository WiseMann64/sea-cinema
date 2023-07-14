const bcrypt = require("bcrypt")
const uuid = require("uuid")

class User {
    constructor(holder,username,password,name,age) {
        this.holder = holder

        this.username = username
        this.password = password
        this.name = name
        this.age = age
        this.balance = 0
        this.ownedTickets = []

        this.sid = -1
    }

    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    async comparePassword(password) {
        return await bcrypt.compare(password,this.password)
    }

    topup(amount) {
        amount = Number(amount)
        if (amount < 0) return false
        this.balance += amount
        return true
    }

    withdraw(amount) {
        amount = Number(amount)
        if (amount > Math.min(500000,this.balance)) {
            return false
        } else {
            this.balance -= amount
            return true
        }
    }

    checkBalance(amount) {
        return this.balance >= amount
    }

    bookMovie(id,seats) {
        const mv = this.holder.getMovie(id)
        if (!mv || seats.length > 6) return {
            result: 0,
            success: false,
            message: "Jumlah kursi yang dipesan tidak bisa melebihi 6"
        }
        if (!mv.checkAvailability(seats)) return {
            result: 1,
            success: false,
            message: "Kursi yang dipesan tidak tersedia"
        }
        if (!this.checkBalance(seats.length*mv.price)) return {
            result: 2,
            success: false,
            message: "Saldo tidak cukup"
        }
        if (this.age < mv.age_rating) return {
            result: 3,
            success: false,
            message: "Umur anda di bawah batas rating"
        }
        const tix = mv.createTicket(this,seats)
        this.balance -= seats.length*mv.price
        this.ownedTickets.push(tix)
        return {
            result: 4,
            success: true,
            message: "Tiket berhasil dipesan"
        }
    }

    ticketUUIDs() {
        let ret = []
        for (const t of this.ownedTickets) ret.push(t.id)
        return ret
    }

    asJson() {
        return {
            username: this.username,
            name: this.name,
            password: this.password,
            age: this.age,
            balance: this.balance,
            tickets: this.ticketUUIDs()
        }
    }

    refreshSid() {
        this.sid = uuid.v4()
        return this.sid
    }

}

module.exports = User