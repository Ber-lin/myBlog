const MongoControl = require('./tools/mongoControl')
const moment = require('moment')
var page = new MongoControl('blog', 'user')
var comment = new MongoControl('blog', 'comment')
// page.insertOneData({
//     name:'柏林',
//     psword:123456,
//     power:3
// },(result)=>{})
page.insertManyData([
    // {
    //     name: '应文浩',
    //     psword: '123456',
    //     power: 3
    // },
    // {
    //     name: '刘玉岑',
    //     psword: '123456',
    //     power: 3
    // },
    // {
    //     name: '毕明昊',
    //     psword: '123456',
    //     power: 3
    // },
    // {
    //     name:'柏林',
    //     psword:'123456',
    //     power:3
    // },
    {
        name: '吴俊彤',
        psword: '123456',
        power: 3
    },
    {
        name: '王满平',
        psword: '123456',
        power: 3
    },
    {
        name: '李伟玉',
        psword: '123456',
        power: 3
    },
    {
        name: '于震',
        psword: '123456',
        power: 3
    },
    {
        name: '龚俊霖',
        psword: '123456',
        power: 3
    }
],
    () => { })
// comment.insertOneData({
//     fid:'60855df14c9fd0682059c02f',
//     content:'琪哥为什么那么喜欢臭鸡蛋',
//     author:'bmh@qq.com',
//     date:moment().format('YYYY-MM-DD HH:mm:ss '),
//     state:0
// },()=>{})
// page.delteOneDataById('60b4d4a13a3e4945f8f1405c', () => { })