const Sequelize = require('sequelize')

const sequelize = new Sequelize('demo', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
})

const User = sequelize.define('user', {
    userId: { type: Sequelize.STRING, primaryKey: true },
    userName: Sequelize.STRING,
    password: Sequelize.STRING,
    version: Sequelize.NUMBER,
}, { timestamps: true })

module.exports = {
    sequelize,
    User
}
