const bcrypt = require('bcryptjs')
const saltRounds = 10

const hashPassword = (password) => {
    let salt = bcrypt.genSaltSync(saltRounds)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

const hashCompare = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}
module.exports = {hashPassword, hashCompare}