var express = require('express');
var router = express.Router();
const {mongoDb, dbName, url, mongoClient} = require('../dbConfig')
const {hashPassword, hashCompare} = require('../auth')
const client = new mongoClient(url)

router.post('/signin', async(req,res) => {
  await client.connect()
  try{
    const db = await client.db(dbName)
    let user = await db.collection('auth').findOne({email:req.body.email})
    if(user){
      const compare = hashCompare(req.body.password, user.password)
      if(compare){
        res.send({
          statusCode: 200,
        message:"Signin successfull"        
      })
    }
    else{
      res.send({
        statusCode: 400,
      message:"Password does not match"        
    })
    }
  }
  else{
    res.send({
      statusCode:400,
      message : "User does not exists"
    })
  }
}
catch(err){
  console.log(err)
}
finally{
  client.close()
}
})

router.post('/signup', async(req,res)=>{
  await client.connect()
  try{
    const db = await client.db(dbName)
    let hasshedPassword = hashPassword(req.body.password)
    req.body.password = hasshedPassword
    let users = await db.collection('auth').insertOne(req.body)
    res.send({
      statusCode: 200,
      message : "User created successfully",
      data: users
    })
  }
  catch(err){
    console.log(err)
    res.send({
      statusCode: 500,
      message : "Internal server error",
      err
    })
  }
  finally{
    client.close()
  }
})

router.post('/change-password/:id', async(req,res) =>{
  await client.connect()
  try{
    let db = await client.db(dbName)
    let user = await db.collection('auth').findOne({_id:mongoDb.ObjectId(req.params.id)})
    if(user){
      const compare = hashCompare(req.body.old_pass, user.password)
      if(compare){
        let hasshedPassword = hashPassword(req.body.new_pass)
        let pw_update = await db.collection('auth').updateOne({_id:mongoDb.ObjectId(req.params.id)},
        {$set:{password:hasshedPassword}})
        res.send({
          statusCode:200,
          message:"Password updated successfully",
        })
      }
      else{
        res.send({
          statusCode:400,
          message:"Password not match"
        })
      }
    }
    else{
      res.send({
        statusCode:400,
        message:"User not exist"
      })
    }

  }
  catch(err){
    console.log(err)
    res.send({
      statusCode: 500,
      message : "Internal server error",
      err
    })
  }
  finally{
    client.close()
  }
})

module.exports = router;
