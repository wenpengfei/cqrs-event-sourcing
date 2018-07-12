const initialState = {
    userId: '',
    userName: '',
    password: '',
}

const reducer = (acc, curr) => {
    switch (curr.type) {
        case 'UserCreated':
            return {
                ...initialState,
                userId: curr.payload.userId
            }
        case 'UserNameDefined':
            return {
                ...acc,
                userName: curr.payload.userName
            }
        case 'UserPasswordDefined':
            return {
                ...acc,
                password: curr.payload.password
            }
        default:
            return initialState
    }
}

const reduceToUser = (history) => {
    if (!Array.isArray(history)) {
        throw 'history must be an array'
    }
    return history.reduce(reducer, initialState)
}

module.exports = reduceToUser