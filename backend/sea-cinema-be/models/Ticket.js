const uuid = require("uuid")

class Ticket {
    constructor(holder,booker,movie,seat,cost) {
        this.holder = holder

        this.id = uuid.v4()
        this.booker = booker
        this.movie = movie
        this.seat = seat
        this.cost = cost
        this.cancelled = false
    }

    cancel() {
        if (this.cancelled) return
        this.cancelled = true
        if (this.booker) {
            let i = this.booker.ownedTickets.indexOf(this)
            if (i !== -1) this.booker.ownedTickets.splice(i,1)
            this.booker.balance += this.cost
        }
        this.movie.available_seats.push(...this.seat)

        let i = this.holder.tickets.indexOf(this)
        if (i !== -1) this.holder.tickets.splice(i,1)
    }

    asJson() {
        return {
            uuid: this.id,
            booker_username: this.booker.username,
            booker_name: this.booker.name,
            title: this.movie.title,
            seats: this.seat,
            cost: this.cost
        }
    }
}

module.exports = Ticket