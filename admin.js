var express = require('express')
var router = express.Router()//功能和app一样---分路由
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const moment = require('moment')
const MongoControl = require('./tools/mongoControl')
const page = new MongoControl('blog', 'page')
const path = require('path')
const CookieControl = require('./cookie')
var admin = new CookieControl()
const comment = new MongoControl('blog', 'comment')
const ejs = require('ejs')
const pages = new MongoControl('blog', 'user')
const e = require('express')

// const token = '132464dfgsaij@d45'
// var tips=document.getElementsByClassName('tips')[0]
// 如果要处理的接口都想放在/admin接口下，只需要把要处理的接口请求全都放在这个js文件中，在解析路由时会自动在接口前加上'/admin'
router.get('/', (req, res) => {
    // 只有携带token令牌的才可以访问管理页面
    if (admin.checkToken(req.cookies.token)) {
        res.sendFile(path.resolve('./static/admin.html'))
    } else {
        // res.status(403).send('你么有权限')
        res.redirect('/admin/login')
    }
})
// 发送登录模块页面
router.get('/login', (req, res) => {
    res.sendFile(path.resolve('./static/login.html'))
})
// 登录模块逻辑处理
router.post('/login', urlencodedParser, (req, res) => {
    var { username, password } = req.body
    // console.log(username,password)
    pages.findData({ name: username }, (result) => {
        // console.log(result)
        if (password == result[0].psword) {
            // 登录成功就给他设置cookie
            res.cookie('token', admin.getToken())
            // res.send('登录成功')
            res.redirect('/admin')
        }
        else{
            res.redirect('/admin/login')
        }
    })
   
})

// 删除管理员
router.get('/deleteManager',(req,res)=>{
    var {_id}=req.query
    // console.log(_id)

    pages.delteOneDataById(_id,(result)=>{
    //    console.log(_id)
        res.redirect('/admin')
    })
})
// 管理员信息分页页面

router.get('/user', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', "*")
    pages.findData({}, (result) => {
        res.send(result)
    })
})

// 添加管理员
router.post('/addManager',urlencodedParser,(req,res)=>{
    if (admin.checkToken(req.cookies.token)) {

    } else {
        res.status(403).send('你么有此项权限')
        return
    }
    var {managerName,managerPsword,power}=req.body
    var isFormat=true
    managerName?managerName:isFormat=false
    managerPsword?managerPsword:isFormat=false
    power?power:isFormat=false
    if(isFormat){
        pages.insertOneData({
            name:managerName,
            psword:managerPsword,
            power:power
        }, () => {
            res.redirect('/admin')
        })
    }else{
        res.send('不能有空项')
    }
})
// 发表文章模块
router.post('/uploadPage', urlencodedParser, (req, res) => {
    if (admin.checkToken(req.cookies.token)) {

    } else {
        res.status(403).send('你么有此项权限')
        return
    }
    var { sort, title, content, intro, author } = req.body
    var now = moment().format('YYYY-MM-DD HH:mm:ss ')
    var isFormat = true
    sort ? sort : isFormat = false
    title ? title : isFormat = false
    author ? author : isFormat = false
    content ? content : isFormat = false
    intro ? intro : isFormat = false

    if (isFormat) {
        page.insertOneData({
            sort: sort,
            title: title,
            author: author,
            content: content,
            intro: intro,
            date: now,
            commentNum: 0
        }, () => {
            res.redirect('/admin')
        })
    }
    else {
        console.log('不能有空项')
    }
})

router.get('/getComment', (req, res) => {
    // res.setHeader('Access-Control-Allow-Origin', '*')
    if (admin.checkToken(req.cookies.token)) {

    } else {
        res.status(404).send('你么有权限')
        return
    }
    comment.findData({ state: 0 }, (result) => {
        if (result.length == 0) {

            res.send([])
            return
        }
        // 哨兵变量
        var count = 0
        // res.send(result)
        var arr = []
        for (var i = 0; i < result.length; i++) {
            var newData = result[i]
            var newDataFid = newData.fid
            page.findDataById(newDataFid, (data) => {
                var page = data[0]
                console.log(89, page)
                newData['f_title'] = page.title
                newData['f_intro'] = page.intro
                arr.push(newData)
                count++
                // console.log(93, count, result.length)
                if (count == result.length) {
                    console.log(95, newData)
                    res.send(arr)

                }
            })
        }
    })
})

// 删除文章接口
router.get('/deletePage',(req,res)=>{
    var {_id}=req.query
    console.log(_id)
    page.delteOneDataById(_id,(result)=>{
        res.redirect('/admin')
        // console.log(148,'删除成功')
    })
})
router.get('/getPage', (req, res) => {
    // console.log('111')
    // 获取前端传入的id
    page.findData({}, (result) => {
        // console.log(result)

        // 发送了整个文件因为使用了ejs
        ejs.renderFile('./ejs-tpl/index_2.ejs', { data: result }, function (error, html) {
            if (error) {
                console.log(error)
            }
            res.send(html)
            // console.log(117, html)
        })
    })
    // 查评论

})

router.get('/passComment', (req, res) => {
    if (admin.checkToken(req.cookies.token)) {

    } else {
        res.status(404).send('你么有权限')
        return
    }
    var { _id } = req.query
    comment.updateOneDataById(_id, { state: 1 }, (result) => {
        res.send({
            result: 'ok'
        })
    })


})
router.get('/refuseComment', (req, res) => {
    if (admin.checkToken(req.cookies.token)) {

    } else {
        res.status(404).send('你么有权限')
        return
    }
    var { _id } = req.query
    comment.updateOneDataById(_id, { state: 2 }, (result) => {
        res.send({
            result: 'ok'
        })
    })
})
// /admin/uploadPage上传文章

// 记得引出和引入
module.exports = router