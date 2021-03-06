const express = require('express');//引进EXPRESS
const conn = require('../dao/conn');//连接数据库
const crypto = require('crypto');//连接加密库
// const {create} = require('domain');

const router = express.Router();//启动路由文件

router.route('/reg')
    .post((req, res, next) => {

        let searchUser = `select * from users where username='${req.body.username}'`

        conn.query(searchUser, (err, result) => {
            // console.log(result);
            if (result.length) {
                res.json({
                    msg: '用户名已存在',
                    username: req.body.username,
                    err: 1
                })
            } 
            
            else {
                let md5 = crypto.createHash('md5')
                let passResult = md5.update(req.body.password).digest('hex')
                // console.log(passResult);
                let sql = `insert into users(username,password,email,phone)
                value ('${req.body.username}','${passResult}','${req.body.email}','${req.body.phone}')`
                // console.log(sql);

                conn.query(sql, (err, result) => {
                    if (err) console.log(err);
                    // console.log(result);
                    if (result.affectedRows) {
                        // console.log(res.cookie)
                        // res.cookie('abc','123')
                        console.log(req.cookies);
                        res.cookie('username', req.body.username);
                        res.cookie('isLogined', true);
                        console.log(req.cookies)
                        res.json({
                            msg: "注册成功",
                            username: req.body.username,
                            error: 0
                        });
                    }
                });
            }
        });
    });
router.route('/login')
.post((req,res,next)=>{
    console.log(req.body.password);
    let md5 = crypto.createHash('md5')
    let passResult = md5.update(req.body.password).digest('hex')

    let sql = `select * from users where username='${req.body.username}' and password='${passResult}'`;//前端和后端两次加密后的密码
    console.log(sql);

    conn.query(sql,(err,result)=>{
        if(err) console.log(err);
        if(result.length){
            res.json({
                msg:'登录成功'
            })
        }else{
            res.json({
                msg:'账号或密码错误'
            })
        }
    })
})
module.exports = router;