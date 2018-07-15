const Sequelize = require('sequelize')

const sequelize = new Sequelize('demo', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
}, {
    operatorsAliases: false,
})

const User = sequelize.define('user', {
    userId: { type: Sequelize.STRING({ length: 100 }), field: 'userId', primaryKey: true },
    userName: { type: Sequelize.STRING({ length: 100 }), field: 'userName'},
    password: { type: Sequelize.STRING({ length: 100 }), field: 'password'},
    version: { type: Sequelize.INTEGER, field: 'version'},
}, { timestamps: true })

module.exports = {
    sequelize,
    User
}
