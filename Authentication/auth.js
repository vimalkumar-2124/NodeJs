const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { token } = require('morgan')
const secret = 'Plshdms%7s7dg'
const saltRounds = 10

const hashPassword = (password) => {
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

const hashCompare = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}

let createToken = async(email,role) =>{
    let token = await jwt.sign({
        email,
        role
    }, secret,{expiresIn : '2m'})
    return token

}

let decodeToken = async(token) => {
    let decodeToken = await jwt.decode(token)
    return decodeToken
}

let validity = async(req, res,next) => {
    let token = req.headers.authorization.split(' ')[1]
    let data = await decodeToken(token)
    const currentTime = Math.floor(+new Date()/1000)
    if(currentTime <= data.exp){
        next()
    }
    else{
        res.send({
            statusCode:401,
            message:"Token expired"
        })
    }
}

let adminGuard = async(req,res,next) => {
    let token = req.headers.authorization.split(' ')[1]
    let data = await decodeToken(token)
    if(data.role === 'admin'){
        next()
    
    }
    else{
        res.send({
            statusCode: 401,
            message: "Only admin can access"
        })
    }
}
module.exports = {hashPassword, hashCompare, createToken, decodeToken, validity, adminGuard}