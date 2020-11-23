const express = require("express");//引入EXPRESS库
const cookieParser = require("cookie-parser");//引入cookie库
const creatError=require('http-errors')//引入错误库

const path = require("path");//引入fs.path拼接

const userRouter = require("./router/users");//引入注册路由
const productRouter = require("./router/products");//引入商品路由

// console.log(cookieParser);

const app = express();//启动EXPRESS

const conf = {
  port: 7717,
  host: "10.31.162.13",
};//配置文件

//中间件如下
app.use(express.static(path.join(__dirname, "/public")));//设置主路径

app.use(express.json());
app.use(express.urlencoded({extends: true,})
); //post表单解析成json

app.use(cookieParser());//使用cookie中间件解析

app.use("/products", productRouter);
app.use("/users", userRouter);//相继使用路由文件

// 创建错误，重定向页面
app.use((req,res,next)=>{
    next(creatError(404))
})
app.use((err,req,res,next)=>{
    res.status(err.status||500);
    res.location('html/404.html')
})

app.listen(conf.port, conf.host, () => {
  console.log(`app is running on http://${conf.host}:${conf.port}`);
});//后端实时监听
