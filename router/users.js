const express = require('express');//引进EXPRESS
const conn = require('../dao/conn');//连接数据库
const crypto = require('crypto');//连接加密库
const {create} = require('domain');

const router = express.Router();//启动路由文件

router.route('/login')
    .post((req, res, next) => {

        let searchUser = `select * from users where username='${req.body.username}'`

        conn.query(searchUser, (err, result) => {
            console.log(result);
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
                console.log(passResult);
                let sql = `insert into users(username,password,email,phone)
                value ('${req.body.username}','${passResult}','${req.body.email}','${req.body.phone}')`
                console.log(sql);
                res.send('已经给您注册了')

                conn.query(sql, (err, result) => {
                    if (err) console.log(err);
                    console.log(result);
                    if (result.insertId) {
                        res.cookie('username', req.body.username);
                        res.cookie('isLogined', true);
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
    console.log(req.cookie);
})
module.exports = router;