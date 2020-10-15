const express=require('express');
const chalk=require('chalk');
const app=express();
const port=process.env.PORT||3000
const path=require('path');
const publicDirectoryPath=path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath));
app.listen(port,()=>
{
    console.log(chalk.blueBright("Hi Sudhir Pal"))
    console.log(chalk.greenBright.underline('Sever is Running on port '+port))
});