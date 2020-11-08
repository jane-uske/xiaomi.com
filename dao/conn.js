const database = require('mime-db');
const mysql=require('mysql');
const pool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'root',
    database:'jane'
})
module.exports=pool;