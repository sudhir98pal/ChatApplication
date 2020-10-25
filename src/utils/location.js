const generateLocationMessage = (message) => {

    return {
        message: message,
        createdAt: new Date().getTime()
    }
}


module.exports =
{
    generateLocationMessage
}