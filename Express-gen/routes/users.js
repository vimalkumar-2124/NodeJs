var express = require('express');
var router = express.Router();
const {dbName, url, client, mongodb} = require('../dbconfig')
const {loanRequest, mongoose} = require('../dbSchema')
// let mongoClient = new client(url)
// let data = []
mongoose.connect(url)

router.get('/', async(req,res) => {
  try{
    let users = await loanRequest.find()
    res.send({
      statusCode:200,
      data:users
    })
  }
  catch(err){
    console.log(err)
    res.send({
      statusCode : 500,
      Message : "Internal server error",err
    })
  }
})
router.post('/request', async(req, res) => {
  try{
    let users = await loanRequest.create(req.body)
    res.send({
      statusCode : 201,
      Message : "Created successfully",
      data: users
    })
  }
  catch(err){
    console.log(err)
    res.send({
      statusCode : 500,
      Message : "Internal server error",err
    })

  }
})
/* GET users listing. */
// router.get('/', (req,res) => {
//   console.log("GET API hit")
//   res.send({
//       statusCode: 200,
//       data
//   })
// })

// router.get('/:id', async (req, res) => {
//   console.log("GET individual API hit")
//   await mongoClient.connect()
//   try{
//     const db = await mongoClient.db(dbName)
//     let users = await db.collection('users').findOne({_id:mongodb.ObjectId(req.params.id)})
//     res.send({
//       statusCode:200,
//       users
//     })
//   }
//   catch(error){
//     console.log(error)
//     res.send({
//       statusCode:500,
//       message:"Internal server error"
//     })
//   }
//   finally{
//     mongoClient.close()
//   }
//   // if(req.params.id < data.length){
//   //     res.send({
//   //         statusCode: 200,
//   //         data : data[req.params.id]
//   //     })
//   // }
//   // else{
//   //     res.send({
//   //         statusCode: 204,
//   //         message:"Not Found"
//   //     })
//   // }
// })

// router.put('/change-password/:id', (req, res) => {
//   console.log("PUT API hit")
//   if(req.params.id < data.length){
//       if(data[req.params.id].password === req.body.old_pw){
//           data[req.params.id].password = req.body.new_pw
//           res.send({
//               statusCode: 200,
//               message : "Password changed successfully"
//           })
//       }
//       else{
//           res.send({
//               statusCode : 401,
//               message : "Invalid password"
//           })
//       }
//   }
//   else{
//       res.send({
//           statusCode: 400,
//           message: "Not found"
//       })
//   }
// })

// router.put('/:id', async(req, res) => {
//   console.log("UPDATE API hit")
//   await mongoClient.connect()
//   try{
//     const db = await mongoClient.db(dbName)
//     let users = await db.collection('users').updateOne({_id:mongodb.ObjectId(req.params.id)},{
//       $set:{
//         name:req.body.name,
//         email:req.body.email
//       }
//     })
//     res.send({
//       statusCode:200,
//       users
//     })
//   }
//   catch(error){
//     console.log(error)
//     res.send({
//       statusCode:500,
//       message:"Internal server error"
//     })
//   }
//   finally{
//     mongoClient.close()
//   }
//   // if(req.params.id < data.length){
//   //     data[req.params.id].name = req.body.name
//   //     data[req.params.id].email = req.body.email
//   //     res.send({
//   //         statusCode: 200,
//   //         message:"Updated successfully"
//   //     })
//   // }
//   // else{
//   //     res.send({
//   //         statusCode: 400,
//   //         message:"Not found"
//   //     })
//   // }
// })
// router.post('/users', (req, res) => {
//   console.log("POST API hit")
//   data.push(req.body)
//   res.send({
//       statusCode: 201,
//       message:"Response saved"
//   })
// })

// router.delete('/:id', async(req, res) => {
//   await mongoClient.connect()
//   try{
//     const db = await mongoClient.db(dbName)
//     let users = await db.collection('users').deleteOne({_id:mongodb.ObjectId(req.params.id)})
//     res.send({
//       statusCode:200,
//       message:"Deleted successfully",
//       users
//     })
//   }
//   catch(error){
//     console.log(error)
//     res.send({
//       statusCode:500,
//       message:"Internal server error"
//     })
//   }
//   finally{
//     mongoClient.close()
//   }
//   // if(req.params.id < data.length){
//   //     data.splice(req.params.id,1)
//   //     res.send({
//   //         statusCode: 200,
//   //         message: "Deleted successfully"
//   //     })
//   // }
//   // else{
//   //     res.send({
//   //         statusCode: 400,
//   //         message: "Not found"
//   //     })
//   // }
// })

module.exports = router;
