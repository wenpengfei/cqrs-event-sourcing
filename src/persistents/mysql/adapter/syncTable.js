const { sequelize } = require('./makeMysqlClient')
sequelize.sync().then(() => {
    console.log('sync success')
})
