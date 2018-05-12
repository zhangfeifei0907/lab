/**
 * Created by feifei on 2018/5/11.
 */
//const http=require('http');
const mysql=require('mysql');
const express=require('express');
const jwt=require('jsonwebtoken');
const bodyParser = require('body-parser');
const API=require('../assets/component/api').express_api;
let app=express();
let con=mysql.createConnection({
    host:'localhost',
    user:'root',
    port:'3306',
    password:'ff123456',
    database:'focus'
});

con.connect(function(err){
    if(!!err){
        console.log('connecting error');
        //return;
    }
    else {
        console.log('connecting success');

    }
});

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({ extended: true }) ); // to support URL-encoded bodies
app.use(bodyParser.text());



/*  response format

 {
     errcode:'50001',
     errmsg:'用户邮箱已存在',
     data:{
        token:
     }
 }

 */
//token key=focus_secretkey

//format of token
//Authorization:Bearer <access_token>

//中间件 检验token
function verifyToken(req,res,next){
    //get auth header value
    const bearerHeader = req.headers['authorization'];
    //check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken=bearer[1];
        //set the token
        req.token=bearerToken;
        //next middleware
        next();

    }else {
        res.sendStatus(403);
    }

}


//user login
app.post(API.user, function (req, resp) {
    let d = req.body;
    console.log('http method:', req.method);
    let sql = `SELECT * FROM user where email='${d.email}' && password='${d.password}'`;
    console.log(sql);
    con.query(sql, function (err, rows) {
        if (!!err) {
            console.log('err');
            console.log(err);
            return resp.json({
                errcode: -1,
                errmsg: err.sqlMessage,
                data: {}
            });
        }
        else {
            console.log('success query');
            console.log(rows);
            if (rows.length >= 1) {
                jwt.sign({
                    user_id: rows[0].id,
                    user_name: rows[0].name,
                    user_email: rows[0].email,
                    user_phone: rows[0].phone,
                }, 'focus_secretkey', (err, token)=> {
                    if (err) {
                        return resp.json({
                            errcode: '407',
                            errmsg: 'token create error',

                        });
                    }
                    else {
                        //console.log('token:',token);
                        return resp.json({
                            errcode: '0',
                            errmsg: 'ok',
                            data: {
                                user_info: {
                                    user_id: rows[0].id,
                                    user_name: rows[0].name,
                                    user_email: rows[0].email,
                                    user_phone: rows[0].phone,
                                    role: 1,
                                },
                                token: token
                            }
                        });
                    }
                });

            }
            else {
                return resp.json({
                    errcode: '50002',
                    errmsg: '用户或密码错误',
                    data: {}
                });
            }

        }
    });
});


//user register
app.post(API.user_add, function (req, resp) {
    let d = req.body;
    //check email exit
    let check_sql = 'SELECT * FROM user WHERE email = ?';
    con.query(check_sql, d.email, (err, rows, fields)=> {
        if (!!err) {
            //console.log(err);
            return resp.json({
                errcode: -1,
                errmsg: err,
                data: {}
            });
        }
        console.log(rows);
        // 如果有重複的email
        if (rows.length >= 1) {
            console.log('用户邮箱已存在');

            return resp.json({
                errcode: '50001',
                errmsg: '用户邮箱已存在',
                data: {}
            });
        } else {
            //create user
            let sql = 'INSERT INTO user SET ?';
            let post = {email: d.email, password: d.password};
            con.query(sql, post, function (err, result) {
                if (!!err) {
                    return resp.json({
                        errcode: -1,
                        errmsg: err,
                        data: {}
                    });
                }
                else {
                    console.log('success insert result', result);
                    con.query(`SELECT * FROM user WHERE id = ${result.insertId}`, function (err, new_user) {
                        console.log('new_user====>', new_user);
                        jwt.sign({
                            user_id: new_user[0].id,
                            user_name: new_user[0].name,
                            user_email: new_user[0].email,
                            user_phone: new_user[0].phone,
                        }, 'focus_secretkey', (err, token)=> {
                            if (!err) {
                                return resp.json({
                                    errcode: '0',
                                    errmsg: 'ok',
                                    data: {
                                        user_info: {
                                            user_id: new_user[0].id,
                                            user_name: new_user[0].name,
                                            user_email: new_user[0].email,
                                            user_phone: new_user[0].phone,
                                            role: 1,
                                        },
                                        token: token
                                    }
                                });
                            }
                        });
                    });
                }
            });
        }
    });
});


app.listen(4000);