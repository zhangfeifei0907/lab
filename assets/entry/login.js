/**
 * Created by feifei on 2018/5/11.
 */
import React from 'react';
import {render} from 'react-dom';
import '../less/global.less';
import '../less/login.less';
import '../component/theme';

import Button from "antd/lib/button";
import Input from "antd/lib/input";
import Icon from "antd/lib/icon";
import message from "antd/lib/message";
import Loading from '../component/loading';

const api=require('../component/api').api;
import http from '../component/fetch_method';



class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:{
                email:'',
                password:'',
                t_password:''
            },
            loading:false,
            view:'sign',//register
        };
        this.submit=this.submit.bind(this);
        this.viewHandle=this.viewHandle.bind(this);
    }
    inputHandle(keyword,e){
        let val= e.target.value;
        //console.log('keyword',keyword,val);
        this.state.data[keyword]=val;
        this.forceUpdate();
    }
    submit(){
        //console.log(this.state);
        let {data,view}=this.state;
        let this_=this;
        //console.log('url',url);


        //register
        if(view=='register'){
            if(data.password!=data.t_password){
                message.error('两次输入的密码不一致，请重新输入',2);
                return false;
            }
            this.setState({
                loading:true
            });
            http.post(api.user_add,data).then((d)=>{
                console.log('fetch data',d);
                this_.setState({
                    loading:false
                });
                if(d.errcode!='0'){
                    message.error(d.errmsg);
                }
                else {
                    message.success('成功注册！');
                    localStorage.clear();
                    localStorage.setItem("user_info",JSON.stringify(d.data.user_info));
                    if(d.data.token!=undefined && d.data.token !=null){
                        localStorage.setItem("token",d.data.token);
                    }
                    window.location.href=window.location.href.replace(window.location.pathname,'/');
                }

            }).catch((err)=>{
                this_.setState({
                    loading:false
                });
                console.log('register err',err);
            });
        }

        //sign
        if(view=='sign'){
            this.setState({
                loading:true
            });


            http.post(api.user,data).then((d)=>{
                //console.log('fetch data',d);
                this_.setState({
                    loading:false
                });
                if(d.errcode!='0'){
                    message.error(d.errmsg);
                }
                else {
                    message.success('成功登录！');
                    localStorage.clear();
                    localStorage.setItem("user_info",JSON.stringify(d.data.user_info));
                    if(d.data.token!=undefined && d.data.token !=null){
                        localStorage.setItem("token",d.data.token);
                    }
                    window.location.href=window.location.href.replace(window.location.pathname,'/');
                }

            }).catch((err)=>{
                console.log('login err',err);
            });
        }




    }
    createHandle(){
        //this.se
    }
    viewHandle(){
        let view_text='';
        switch (this.state.view){
            case 'register':
                view_text='sign';
                break;
            case 'sign':
                view_text='register';
                break;
        }
        this.setState({
            view:view_text
        });
    }
    render(){
        let { data,loading,view }=this.state;
        //console.log('state',this.state);
        let view_text='';
        let sign_text='';
        let confirm_pwd=null;
        let loadingNode=null;
        if(loading){
            loadingNode=<Loading/>;
        }
        switch (view){
            case 'register':
                view_text='返回登录';
                sign_text='注册';
                confirm_pwd=<Input type="password" onChange={this.inputHandle.bind(this,'t_password')} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Confirm Password" />;
                break;
            case 'sign':
                view_text='注册';
                sign_text='登录';
                break;
        }

        return(
            <div>
                <div className="login_form">
                    <h1 className="green">Welcome Focus</h1>
                    <Input onChange={this.inputHandle.bind(this,'email')} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    <Input onChange={this.inputHandle.bind(this,'password')}type="password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" />
                    {confirm_pwd}
                    <div className="btn_container">
                        <Button className="login-form-button" onClick={this.viewHandle}>{view_text}</Button>
                        <Button type="primary" className="login-form-button" onClick={this.submit}>{sign_text}</Button>
                    </div>
                </div>
                {loadingNode}
            </div>
        );
    }
}

//export default Login;
render(<Login />, document.getElementById('app'));
