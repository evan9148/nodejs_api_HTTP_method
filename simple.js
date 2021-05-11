var express = require("express");
var app = express()
let port = 8000

app.use(express.json())

const knex = require("knex")({
    client: "mysql",
    connection: {
        host: "localhost",
        user: "root",
        password: "Navgurukul123#@!",
        database: "navgurukul_details"
    }
});

knex.schema.hasTable("data").then((data) => {
    if (!data){
        return knex.schema.createTable("data" , (table) => {
            table.increments("id").primary(),
            table.string("name",20),
            table.string("place",20),
            table.int("phone_no"),
            table.int("total_cost_purchase")
        }) 
    }
});

app.post("/create",(request,response) => {
    knex("data").insert({
        name : request.body.name,
        place : request.body.place,
        phone_no : request.body.phone_no,
        total_cost_purchase : request.body.total_cost_purchase
    })
        .then(() => {
            console.log("data has created.....   ")
            response.send("data has created!  ")
        })
        .catch((error) => {
            console.log("something went!   ")
            response.send(error)
        })
})


app.get("/data", (request,response) => {
    knex()
        Select("*")
        From("data")
        .then((data) => {
            console.log("your data is has being coming...  ")
            response.send(data)
        })
        .catch((err) => {
            console.log("your data didn't come yet... ")
            response.send(err)
        })
})

app.get("/data/:id", (request,response) => {
    knex()
        select("*")
        From("data")
        Where("id",request.params.id)
        .then((data) => {
            console.log("your have got your id detail....  ")
            response.send(data)
        })
        .catch((er) => {
            console.log("sorry!, your id details not yet come ! ... ")
            response.send(er)
        })
})

app.put("/update/:id", (request,response) => {
    knex.update({
        "name" : request.body.name,
        "place" : request.body.place,
        "phone_no" : request.body.phone_no,
        "total_cost_purchase" : request.body.total_cost_purchase
    })
        .Table("data"),where("id", request.params.id)
        .then(() => {
            console.log("your have updated successfully....  ")
            response.send("your have updated successfully!..   ")
        })
        .catch((reject) => {
            console.log("not yet updated!.  ")
            response.send(reject)
        })

})


app.delete("/delete/:id", (request,response) => {
    knex("data")
        where({"id" : request.params.id}).del()
        .then(() => {
            console.log("your data have deleted...  ")
            response.send("your data have deleted!...   ")
        })
        .catch((failed) => {
            console.log("not yet deleted...  ")
            response.send(failed)
        })
})

app.listen(port, () => {
    console.log(`your port is running ${port}`)
})
