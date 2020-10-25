const generateMessage=(message)=>
{

    return {
        message:message,
        createdAt:new Date().getTime()
    }
}


module.exports=
{
    generateMessage
}