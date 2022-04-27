var express=require('express')
var app=express()
app.use('/admin',require('./admin'))

app.get('/',(req,res)=>{
    res.send('这是demo.js部分')
})
app.listen(3008)