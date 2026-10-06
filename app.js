const express = require("express")
const users = require("./users.json")
const fs = require("fs")
const app = express()
const PORT = 3000

//esto añade el body como parte del request
app.use(express.json())

app.post('/users', (request, response) => {
    const body = request.body

    if(body){
        body.id=users.length+1
        users.push(body)
        fs.writeFileSync(
            "./users.json",
            JSON.stringify(users,null,2)
        )
        response.status(201).json(body)
    }
    console.log(body)
})

app.get('/', (request, response) => {
    response.json({ mensaje: "hello world" })
    console.log("alguien pidio info en /")
    console.log(users)
})

app.get('/users', (request, response) => {
    response.json(users)
    console.log("alguien pidio usuarios en /users")
    // console.log(users)
})

app.get('/users/:id', (request, response) => {
    const { id } = request.params
    const user = users.find((u) => u.id == id)

    if (user) {
        response.json(user)
    } else {
        response.status(404).json({ mensaje: "no se encontro usuario" })
    }
    console.log("alguien pidio usuarios en /users/:id")
})

app.listen(PORT, () => console.log("Escuchando en localhost: " + PORT))