const { Sequelize } = require('sequelize')

const db = new Sequelize('db_compras','root','201271hy',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = db