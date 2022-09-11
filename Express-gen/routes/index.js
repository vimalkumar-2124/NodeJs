var express = require('express');
var router = express.Router();
const {dbName, url, client, mongodb} = require('../dbconfig')

let mongoClient = new client(url)
/* GET home page. */
router.get('/', async (req, res) =>{
  await mongoClient.connect()
  try{
    const db = await mongoClient.db(dbName)
    let users = await db.collection('users').find().toArray()
    res.send({
      statusCode:200,
      users
    })
  }
  catch(error){
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
  finally{
    mongoClient.close()
  }
});

router.post('/', async(req, res) => {
  await mongoClient.connect()
  try{
    const db = await mongoClient.db(dbName)
    let users = await db.collection('users').insertOne(req.body)
    res.send({
      statusCode:200,
      message:"User created successfully",
      users
    })
  }
  catch(error){
    console.log(error)
    res.send({
      statusCode:500,
      message:"Internal server error"
    })
  }
  finally{
    mongoClient.close()
  }
})



module.exports = router;
