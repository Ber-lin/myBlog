const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const mongoUrl = 'mongodb://localhost:27017'
const ObjectId = mongodb.ObjectId

// 以构造器的形式
var MongoControl = function (kuName, biaoName){
    this.kuName = kuName
    this.biaoName = biaoName
    this.insertOneData = function (newData, callback) {                //  此处选择es5还是es6看this的需要
        MongoClient.connect(mongoUrl, { useUnifiedTopology: true },  (err, client)=> {
            // console.log(this.kuName)
            if (err) {
                console.log(err)
                return
            } else {
                // 选库
                var db = client.db(this.kuName)
                // 选表
                var coll = db.collection(this.biaoName)
                // 数据操作
                coll.insertOne(newData, (error, final) => {
                    if (error) {
                        console.log(error)
                        return
                    }else{
                        if(callback){
                            callback(final.result)
                        }
                        else{
                            console.log(final.result)
                        }
                        client.close()
                    }
                })
            }

        })
    }
    
    // 插入多条数据
    this.insertManyData=function(newDataArr,callback){
        MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
            // console.log(this,this.kuName,this.biaoName)
            if(err){
                console.log(err)
                return
            }else{
                // 选库
                var db=client.db(this.kuName)
                // 选表
                var coll=db.collection(this.biaoName)
                // 数据操作
                coll.insertMany(newDataArr,(error,final)=>{
                    if(error){
                        console.log(error)
                        return
                    }else{
                        if(callback){
                            callback(final.result)
                        }else{
                            console.log(final.result)
                        }
                        client.close()
                    }
                })
            }
        })
    }
    // 删除一条数据
    this.delteOneData=function(conditionObj,callback){
        MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
            // console.log(this,this.kuName,this.biaoName)
            if(err){
                console.log(err)
                return
            }else{
                // 选库
                var db=client.db(this.kuName)
                // 选表
                var coll=db.collection(this.biaoName)
                // 数据操作
                coll.deleteOne(conditionObj,(error,final)=>{
                    if(error){
                        console.log(error)
                        return
                    }else{
                        if(callback){
                            callback(final.result)
                        }else{
                            console.log(final.result)
                        }
                        client.close()
                    }
                })
            }
        })
    }
    // 删除多条数据
    this.deleteManyData=function(conditionObj,callback){
        MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
            // console.log(this,this.kuName,this.biaoName)
            if(err){
                console.log(err)
                return
            }else{
                // 选库
                var db=client.db(this.kuName)
                // 选表
                var coll=db.collection(this.biaoName)
                // 数据操作
                coll.deleteMany(conditionObj,(error,final)=>{
                    if(error){
                        console.log(error)
                        return
                    }else{
                        if(callback){
                            callback(final.result)
                        }else{
                            console.log(final.result)
                        }
                        client.close()
                    }
                })
            }
        })
    }
    // 通过id来删除数据
    this.delteOneDataById=function(idStr,callback){
        var idObj={
            _id:ObjectId(idStr)
        }
        this.delteOneData(idObj,callback)
    }
    // 查找数据
    this.findData=function(conditionObj,callback){
        MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
            // console.log(this,this.kuName,this.biaoName)
            if(err){
                console.log(err)
                return
            }else{
                // 选库
                var db=client.db(this.kuName)
                // 选表
                var coll=db.collection(this.biaoName)
                // 数据操作
                coll.find(conditionObj).toArray((error,res)=>{
                    if(error){
                        console.log(error)
                        return
                    }else{
                        if(callback){
                            callback(res)
                        }else{
                            console.log(res)
                        }
                        client.close()
                    }
                })
            }
        })
    }
    // 通过id来查找数据
    this.findDataById=function(IdStr,callback){
        var idObj={
            _id:ObjectId(IdStr)
        }
        // 调用上面封装过的findData方法，参数需要是对象形式的
        this.findData(idObj,callback)
        // 能拿到唯一的一条数据
        // MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
        //     console.log(this,this.kuName,this.biaoName)
        //     if(err){
        //         console.log(err)
        //         return
        //     }else{
        //         // 选库
        //         var db=client.db(this.kuName)
        //         // 选表
        //         var coll=db.collection(this.biaoName)
        //         // 数据操作
        //         coll.find({_id:ObjectId(IdStr)}).toArray((error,res)=>{
        //             if(error){
        //                 console.log(error)
        //                 return
        //             }else{
        //                 if(callback){
        //                     callback(res[0])
        //                 }else{
        //                     console.log(res[0])
        //                 }
        //                 client.close()
        //             }
        //         })
        //     }
        // })

    }
    // 修改一条数据
    this.updateOneData=function(conditionObj,newData,callback){
        MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
            // console.log(this,this.kuName,this.biaoName)
            if(err){
                console.log(err)
                return
            }else{
                // 选库
                var db=client.db(this.kuName)
                // 选表
                var coll=db.collection(this.biaoName)
                // 数据操作
                coll.updateOne(conditionObj,{$set:newData},(error,final)=>{
                    if(error){
                        console.log(error)
                        return
                    }else{
                        if(callback){
                            callback(final.result)
                        }else{
                            console.log(final.result)
                        }
                        client.close()
                    }
                })
            }
        })
    }
    // 修改多条数据
    this.updateManyData=function(conditionObj,newData,callback){
        MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
            // console.log(this,this.kuName,this.biaoName)
            if(err){
                console.log(err)
                return
            }else{
                // 选库
                var db=client.db(this.kuName)
                // 选表
                var coll=db.collection(this.biaoName)
                // 数据操作
                coll.updateMany(conditionObj,{$set:newData},(error,final)=>{
                    if(error){
                        console.log(error)
                        return
                    }else{
                        if(callback){
                            callback(final.result)
                        }else{
                            console.log(final.result)
                        }
                        client.close()
                    }
                })
            }
        })
    }
    // 通过id修改一条数据
    this.updateOneDataById=function(idStr,newData,callback){
        var idObj={
            _id:ObjectId(idStr)
        }
        this.updateOneData(idObj,newData,callback)
    }
}
// var ikuIbiao = new MongoControl('iku','ibiao')
var ikuIbiao=new MongoControl('test','page')
// ikuIbiao.findDataById('607a97d4faa3194e9c6d82c7',(res)=>{
//     console.log(res[0].content)
// })
// ikuIbiao.findData({},(res)=>{
//         console.log(res)
//     })
// ikuIbiao.insertOneData({name:'aaa'},(res)=>{
//     console.log(res)
// })



// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const mongoUrl = 'mongodb://localhost:27017'
// const ObjectId=mongodb.ObjectId

// var MongoControl=function(kuName,biaoName){
//     this.kuName=kuName
//     this.biaoName=biaoName
//     // 插入一条数据
//     this.insertOneData=function(newData,callback){
//         MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
//             // console.log(this,this.kuName,this.biaoName)
//             if(err){
//                 console.log(err)
//                 return
//             }else{
//                 // 选库
//                 var db=client.db(this.kuName)
//                 // 选表
//                 var coll=db.collection(this.biaoName)
//                 // 数据操作
//                 coll.insertOne(newData,(error,final)=>{
//                     if(error){
//                         console.log(error)
//                         return
//                     }else{
//                         if(callback){
//                             callback(final.result)
//                         }else{
//                             console.log(final.result)
//                         }
//                         client.close()
//                     }
//                 })
//             }
//         })
//     }
//     // 插入多条数据
//     this.insertManyData=function(newDataArr,callback){
//         MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
//             // console.log(this,this.kuName,this.biaoName)
//             if(err){
//                 console.log(err)
//                 return
//             }else{
//                 // 选库
//                 var db=client.db(this.kuName)
//                 // 选表
//                 var coll=db.collection(this.biaoName)
//                 // 数据操作
//                 coll.insertMany(newDataArr,(error,final)=>{
//                     if(error){
//                         console.log(error)
//                         return
//                     }else{
//                         if(callback){
//                             callback(final.result)
//                         }else{
//                             console.log(final.result)
//                         }
//                         client.close()
//                     }
//                 })
//             }
//         })
//     }
//     // 删除一条数据
//     this.delteOneData=function(conditionObj,callback){
//         MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
//             // console.log(this,this.kuName,this.biaoName)
//             if(err){
//                 console.log(err)
//                 return
//             }else{
//                 // 选库
//                 var db=client.db(this.kuName)
//                 // 选表
//                 var coll=db.collection(this.biaoName)
//                 // 数据操作
//                 coll.deleteOne(conditionObj,(error,final)=>{
//                     if(error){
//                         console.log(error)
//                         return
//                     }else{
//                         if(callback){
//                             callback(final.result)
//                         }else{
//                             console.log(final.result)
//                         }
//                         client.close()
//                     }
//                 })
//             }
//         })
//     }
//     // 删除多条数据
//     this.deleteManyData=function(conditionObj,callback){
//         MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
//             // console.log(this,this.kuName,this.biaoName)
//             if(err){
//                 console.log(err)
//                 return
//             }else{
//                 // 选库
//                 var db=client.db(this.kuName)
//                 // 选表
//                 var coll=db.collection(this.biaoName)
//                 // 数据操作
//                 coll.deleteMany(conditionObj,(error,final)=>{
//                     if(error){
//                         console.log(error)
//                         return
//                     }else{
//                         if(callback){
//                             callback(final.result)
//                         }else{
//                             console.log(final.result)
//                         }
//                         client.close()
//                     }
//                 })
//             }
//         })
//     }
//     // 通过id来删除数据
//     this.delteOneDataById=function(idStr,callback){
//         var idObj={
//             _id:ObjectId(idStr)
//         }
//         this.delteOneData(idObj,callback)
//     }
//     // 查找数据
//     this.findData=function(conditionObj,callback){
//         MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
//             // console.log(this,this.kuName,this.biaoName)
//             if(err){
//                 console.log(err)
//                 return
//             }else{
//                 // 选库
//                 var db=client.db(this.kuName)
//                 // 选表
//                 var coll=db.collection(this.biaoName)
//                 // 数据操作
//                 coll.find(conditionObj).toArray((error,res)=>{
//                     if(error){
//                         console.log(error)
//                         return
//                     }else{
//                         if(callback){
//                             callback(res)
//                         }else{
//                             console.log(res)
//                         }
//                         client.close()
//                     }
//                 })
//             }
//         })
//     }
//     // 通过id来查找数据
//     this.findDataById=function(IdStr,callback){
//         var idObj={
//             _id:ObjectId(IdStr)
//         }
//         this.findData(idObj,callback)

//         // MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
//         //     console.log(this,this.kuName,this.biaoName)
//         //     if(err){
//         //         console.log(err)
//         //         return
//         //     }else{
//         //         // 选库
//         //         var db=client.db(this.kuName)
//         //         // 选表
//         //         var coll=db.collection(this.biaoName)
//         //         // 数据操作
//         //         coll.find({_id:ObjectId(IdStr)}).toArray((error,res)=>{
//         //             if(error){
//         //                 console.log(error)
//         //                 return
//         //             }else{
//         //                 if(callback){
//         //                     callback(res[0])
//         //                 }else{
//         //                     console.log(res[0])
//         //                 }
//         //                 client.close()
//         //             }
//         //         })
//         //     }
//         // })

//     }
//     // 修改一条数据
//     this.updateOneData=function(conditionObj,newData,callback){
//         MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
//             // console.log(this,this.kuName,this.biaoName)
//             if(err){
//                 console.log(err)
//                 return
//             }else{
//                 // 选库
//                 var db=client.db(this.kuName)
//                 // 选表
//                 var coll=db.collection(this.biaoName)
//                 // 数据操作
//                 coll.updateOne(conditionObj,{$set:newData},(error,final)=>{
//                     if(error){
//                         console.log(error)
//                         return
//                     }else{
//                         if(callback){
//                             callback(final.result)
//                         }else{
//                             console.log(final.result)
//                         }
//                         client.close()
//                     }
//                 })
//             }
//         })
//     }
//     // 修改多条数据
//     this.updateManyData=function(conditionObj,newData,callback){
//         MongoClient.connect(mongoUrl,{ useUnifiedTopology: true },(err,client)=>{
//             // console.log(this,this.kuName,this.biaoName)
//             if(err){
//                 console.log(err)
//                 return
//             }else{
//                 // 选库
//                 var db=client.db(this.kuName)
//                 // 选表
//                 var coll=db.collection(this.biaoName)
//                 // 数据操作
//                 coll.updateMany(conditionObj,{$set:newData},(error,final)=>{
//                     if(error){
//                         console.log(error)
//                         return
//                     }else{
//                         if(callback){
//                             callback(final.result)
//                         }else{
//                             console.log(final.result)
//                         }
//                         client.close()
//                     }
//                 })
//             }
//         })
//     }
//     // 通过id修改一条数据
//     this.updateOneDataById=function(idStr,newData,callback){
//         var idObj={
//             _id:ObjectId(idStr)
//         }
//         this.updateOneData(idObj,newData,callback)
//     }
// }

// var ikuIbiao=new MongoControl('iku','ibiao')
// ikuIbiao.updateOneDataById('605ed9762200b31ee0dbd0f2',{name:"cdc",age:222},(res)=>{
//     console.log(res)
// })

// 这是整体引出
module.exports=MongoControl
// 这是引出某一方法
// exports.xxx=xxx