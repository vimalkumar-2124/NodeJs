const express = require('express')
const fs = require('fs')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.writeHead(200, "Success",{
        "Content-Type":"text/html"
    })
    res.write("<h1>Welcome to Express FS</h1>")
    res.end()
})
app.get('/write', (req, res) => {
    let today = new Date()
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    let date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
    console.log(time, date)
    let content = date + "_" + time
    fs.writeFile(`./files/${content}.txt`,content, (err) =>{
        if(err){
            console.log(err)
        }
        res.write("File created successfully")
        // res.write("File created")
        res.end()
    })
   
})

app.get('/all',(req, res) => {
    fs.readdir('./files','utf8', (err, files) => {
        if(err){
            console.log(err)
        }
        files.forEach((file) => {
            console.log(file)
            res.write(file + "\n")
        })
        res.end()
    })
})

app.listen(process.env.PORT || 8000, () => console.log(`Server is listening to pot ${process.env.PORT? process.env.PORT : 8000}`))