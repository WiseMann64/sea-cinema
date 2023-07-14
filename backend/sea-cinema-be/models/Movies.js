const Ticket = require("./Ticket")

class Movies {
    constructor(holder,title,desc,release_date,poster_url,age_rating,price) {
        this.holder = holder

        this.uid = -1
        this.title = title
        this.description = desc
        this.release_date = release_date
        this.poster_url = poster_url
        this.age_rating = age_rating
        this.price = price

        this.available_seats = Array.from({length: 64}, (_,i) => i+1)
    }

    checkAvailability(seats) {
        for (const i of seats) if (!this.available_seats.includes(i)) return false
        return true
    }

    createTicket(booker,seats) {
        for (const i of seats) {
            let idx = this.available_seats.indexOf(i)
            this.available_seats.splice(idx,1)
        }
        const tix = new Ticket(this.holder,booker,this,seats,this.price*seats.length)
        this.holder.tickets.push(tix)
        return tix
    }

    asJson() {
        return {
            id: this.uid,
            title: this.title,
            desc: this.description,
            release_date: this.release_date,
            poster_url: this.poster_url,
            age_rating: this.age_rating,
            price: this.price,
            available_seats: this.available_seats
        }
    }
}

module.exports = Movies