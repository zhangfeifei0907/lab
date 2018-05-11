/**
 * Created by feifei on 2018/5/11.
 */
//const http=require('http');
const mysql=require('mysql');
const express=require('express');
const bodyParser = require('body-parser')
const API=require('../component/api').express_api;
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
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({ extended: true }) ); // to support URL-encoded bodies
app.use(bodyParser.text());
//requestHandle=(req,res)=>{
//    let json = JSON.stringify({
//        say:'hello world',
//        ss:req.method
//    });
//    console.log(req.method);
//    if (req.method === 'GET' && req.url === '/test1') {
//        // do something
//        json=JSON.stringify({say:'1'});
//    }
//
//    if (req.method === 'GET' && req.url === '/test2') {
//        // do something
//        json=JSON.stringify({say:'2'});
//
//    }
//
//    if (req.method === 'POST' && req.url === '/test3') {
//        // do something
//        json=JSON.stringify({say:'3'});
//
//    }
//
//
//    res.end(json);
//};
//
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
//
//app.post(API.user,function(req,resp){
//    //about mysql
//    console.log('http method:',req.method);
//    con.query('SELECT * FROM user',function(err,rows,fields){
//        if(!!err){
//            console.log('error in the query');
//        }
//        else {
//            console.log('success query');
//            console.log(rows);
//
//        }
//    });
//    let json=JSON.stringify({say:'2'});
//    //resp.end(json);
//});
app.post(API.user_add,function(req,resp){
    //about mysql
    //console.log('http req',req);
    console.log('http req body=======>',req.body);
    let d=req.body;
    //>insert into worker values(‘tom’,’tom@yahoo.com’),
    //let sql='INSERT INTO user ("id","name","email","phone","create_time","password") VALUES ('+null+','+ d.name+','+ d.email+','+ d.phone+','+ d.create_time+','+ d.password+')';
    //let sql='INSERT INTO user ("email","password") VALUES ('+d.email+','+ d.password+')';
    let sql='INSERT INTO user SET ?';
    let post={email:d.email,password:d.password};
    console.log('sql',sql,post);
    //sql='SELECT * FROM user';
    //INSERT INTO `focus`.`user` (`name`, `email`, `phone`) VALUES ('ddd', 'd@d.con', 'ss');
    con.query(sql,post,function(err,rows,fields){
        if(err){
            console.log('error in the query');
        }
        else {
            console.log('success query');
            //console.log(rows);

        }
    });
    let json=JSON.stringify({say:'success'});
    resp.end(json);
});
//con.end(function(err){
//    if(err){
//        return;
//    }
//    console.log('connection end success');
//});
app.listen(4000);