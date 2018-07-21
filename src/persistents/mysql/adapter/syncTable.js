const { sequelize, User } = require('./makeMysqlClient')
sequelize.sync().then(async () => {
    console.log('sync success')
    // const users = await User.findAll()
    // console.log(users)
})
