const Movies = require("./Movies")
const User = require("./User")

class DataStorage {
    constructor() {

        this.users = []
        this.movies = []
        this.tickets = []

        this.initMovies()
    }

    initMovies() {
        fetch("https://seleksi-sea-2023.vercel.app/api/movies")
            .then(response => response.json())
            .then(res => {
                let uid = 0
                for (const mv of res) {
                    let mvs = new Movies(this,mv.title,mv.description,mv.release_date,mv.poster_url,mv.age_rating,mv.ticket_price)
                    mvs.uid = uid
                    uid++
                    this.movies.push(mvs)
                }
            })
    }

    findUser(username) {
        for (const u of this.users) {
            if (u.username === username) return u
        }
        return null
    }

    findUserSid(sid) {
        for (const u of this.users) {
            if (u.sid === sid) return u
        }
        return null
    }

    getMovie(uid) {
        for (const m of this.movies) {
            if (m.uid == uid) return m
        }
        return null
    }

    findTicket(uuid) {
        for (const t of this.tickets) {
            if (t.id === uuid) return t
        }
        return null
    }

    getMovieList() {
        let ret = []
        for (const mvs of this.movies) {
            ret.push(mvs.asJson())
        }
        return ret
    }

    getUsers() {
        let ret = []
        for (const u of this.users) {
            ret.push(u.asJson())
        }
        return ret
    }

    addUser(user) {
        this.users.push(user)
    }


}

module.exports = DataStorage