const express = require('express')
const app = express()
//Inorder to get req.body data while post, need to use bodyParser module to parse the contents
const bodyParser = require('body-parser')
app.use(bodyParser.json())
let data = [
    {
        name:"Vimal",
        email:"mdjohnvimal@gmail.com",
        password:"1223"
    },
    {
        name:"Vimal",
        email:"kkk",
        password:"2224"
    }
]
app.get('/', (req,res) => {
    console.log("GET API hit")
    res.send({
        statusCode: 200,
        data
    })
})

app.get('/:id', (req, res) => {
    console.log("GET individual API hit")
    if(req.params.id < data.length){
        res.send({
            statusCode: 200,
            data : data[req.params.id]
        })
    }
    else{
        res.send({
            statusCode: 204,
            message:"Not Found"
        })
    }
})

app.put('/change-password/:id', (req, res) => {
    console.log("PUT API hit")
    if(req.params.id < data.length){
        if(data[req.params.id].password === req.body.old_pw){
            data[req.params.id].password = req.body.new_pw
            res.send({
                statusCode: 200,
                message : "Password changed successfully"
            })
        }
        else{
            res.send({
                statusCode : 401,
                message : "Invalid password"
            })
        }
    }
    else{
        res.send({
            statusCode: 400,
            message: "Not found"
        })
    }
})

app.put('/:id', (req, res) => {
    console.log("UPDATE API hit")
    if(req.params.id < data.length){
        data[req.params.id].name = req.body.name
        data[req.params.id].email = req.body.email
        res.send({
            statusCode: 200,
            message:"Updated successfully"
        })
    }
    else{
        res.send({
            statusCode: 400,
            message:"Not found"
        })
    }
})
app.post('/', (req, res) => {
    console.log("POST API hit")
    data.push(req.body)
    res.send({
        statusCode: 201,
        message:"Response saved"
    })
})

app.delete('/:id', (req, res) => {
    if(req.params.id < data.length){
        data.splice(req.params.id,1)
        res.send({
            statusCode: 200,
            message: "Deleted successfully"
        })
    }
    else{
        res.send({
            statusCode: 400,
            message: "Not found"
        })
    }
})
app.listen(process.env.PORT || 8000, () => console.log(`Server is listening to port ${process.env.PORT ? process.env.PORT : 8000}`))