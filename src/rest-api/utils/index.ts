// const enhanceCommand = (request) => {
//     // const timestamp = Date.parse((new Date()).toString())
//     // const { version } = command.payload
//     // return R.pipe(
//     //     R.merge({ timestamp, commandId: uuid(), version }),
//     //     R.dissocPath(['payload', 'version'])
//     // )(command)
//     const timestamp = (new Date()).valueOf()
//     return Object.assign(request, { timestamp, commandId: uuid() })
// }

// export { enhanceCommand }