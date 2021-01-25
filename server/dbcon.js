const mysql = require("mysql")

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "clothingshop"
})

connection.connect(err => {
    if (err) throw err
    console.log("connected to mysql")
})

const Query = (q, ...values) => {
    return new Promise((resolve, reject) => {
        connection.query(q, values, (err, results) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                resolve(results)
            }
        })
    })
}

module.exports = { connection, Query }