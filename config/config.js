require('dotenv').config()
const config = {

    PORT: process.env.PORT,
    SECRETORPRIVATEKEY: process.env.SECRETORPRIVATEKEY,
    DB: process.env.DB,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_HOST: process.env.DB_HOST,
    ACCOUNTSIDE: process.env.ACCOUNTSIDE,
    AUTHTOKEN: process.env.AUTHTOKEN



}


module.exports = {
    config
}