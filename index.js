const express = require('express')
const app = express()

// 引入body-parser模块处理发送出去的评论,存入req.body中
const bodyParser = require('body-parser')
// 设置使用queryString模块来处理而不是qs模块
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const cookieParser = require('cookie-parser')


const MongoControl = require('./tools/mongoControl')

// 为请求添加中间件，解析cookie 
app.use(cookieParser())
// app.use(express.static('./static',{index:false}))

// 获取文章列表
const page = new MongoControl('blog', 'page')
// 获取评论列表
const comment = new MongoControl('blog', 'comment')

// 引入ejs模块做后端渲染
const ejs = require('ejs')
// const e = require('express')

// 使用static静态目录下的内容，取消默认index.html作为首页
app.use(express.static('./static', { index: false }))

// 引入moment模块处理日期格式
const moment = require('moment')

// 先把静态文件里的文件都用static处理完在处理自己设计的接口，不然bootstrap，jquery请求进不来
//此处要设置{ index: false }，不然会把static里的index.html当做/admin的默认页面
app.use('/admin', express.static('./static', { index: false }))
// 后台功能接口    接口全都交给admin.js处理（后台功能路由）
app.use('/admin', require('./admin'))

// 前台程序相关的接口
// 首页接口
app.get('/', (req, res) => {
    page.findData({}, (result) => {
        // console.log(result)
        ejs.renderFile('./ejs-tpl/index.ejs', { data: result }, function (error, html) {
            if (error) {
                console.log(error)
            }
            res.send(html)
            // console.log(html)
        })
    })
})

// 查看文章接口
app.get('/p', (req, res) => {
    // 获取前端传入的id
    var { _id } = req.query
    // 查主体
    page.findDataById(_id, (result) => {
        if (result.length == 0) {
            res.status(404).send('没有找到这篇文章')
            return
        }
        // result返回的是一个数组
        var data = result[0]

        // 把那些已经过审的评论显示在对应的文章下
        comment.findData({ fid: _id, state: 1 }, (com) => {
            // ejs.renderFile('./ejs-tpl/page.ejs', { comment: result }, (err, com) => {
            //     console.log(com)
            //     res.send(com)
            // }) 
            console.log(com)
            ejs.renderFile('./ejs-tpl/page.ejs', { data: data, comment: com }, (error, html) => {
                // console.log(html)
                if (error) {
                    console.log(error)
                }
                res.send(html)
            })
        })
        // 渲染



    })
    // 查评论

})

app.post('/submitComment', urlencodedParser, (req, res) => {
    var { _id } = req.query
    var { email, content } = req.body
    // console.log(_id,email,content)
    // 两种不允许评论的情况
    if (!_id) {
        res.send('不允许评论')
        return
    }
    if (!email || !content) {
        res.send('不允许评论')
        return
    }
    else{
        comment.insertOneData({
            fid: _id,
            author: email,
            content: content,
            state: 0,
            date: moment().format('YYYY-MM-DD HH:mm:ss ')
        }, (result) => {
            
                // 如果评论添加成功，就重定向回文章页面
                res.redirect(
                    '/p?_id=' + _id
                )
           
        })
    }
})


// 后台程序相关的接口



app.listen(3006)