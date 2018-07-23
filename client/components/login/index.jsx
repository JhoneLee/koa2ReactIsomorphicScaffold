import React,{Component} from 'react';
import './login.less';
import {Form,Input,Button,Icon,Spin,message} from 'antd';
import {simpleFetch} from '../../common/fetchData';
import ut from '../../util/md5';
import {md5String} from '../../util/tools';
let FormItem = Form.Item;
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinFlag:false,
            username:'',
            password:''
        }
    }
    componentWillMount(){

    }
    handleUserNameBlur(){
        let e = this.refs.username.input.value;
        if(e){
            this.setState({
                username:e
            })
        }

    }
    handlePassBlur(){
        let e = this.refs.password.input.value;
        if(e){
            this.setState({
                password:e
            })
        }
    }
    handleVerifyBlur(){

    }
    handleSubmit(){
        // 粗略写一下登录，校验问题自己搞
        submitLogin(this);
    }
    render(){
        let {flag,closeLoginDialog} = this.props;
        let {spinFlag} = this.state;
        return (
            <div className="login-dialog" style={{"display":flag}}>
                <Spin tip={'登录中...'} spinning={spinFlag}>
                    <Icon className="login-close" type="close" onClick={closeLoginDialog}/>
                    <h4>账号登陆</h4>
                    <div className="error-place"></div>
                    <Form>
                        <FormItem>
                            <Input ref="username" className={'normal-input'} onBlur={this.handleUserNameBlur.bind(this)} placeholder="请输入用户名" />
                        </FormItem>
                        <FormItem>
                            <Input ref="password" type="password" className={'normal-input'} onBlur={this.handlePassBlur.bind(this)} placeholder="请输入密码" />
                        </FormItem>
                        <FormItem>
                            <Button className="login-btn" onClick={this.handleSubmit.bind(this)} type="primary">登陆</Button>
                        </FormItem>
                    </Form>
                </Spin>
            </div>
        );
    }

}


function submitLogin(_this){
    let {username,password} = _this.state;
    let {resumeHash,closeLoginDialog} = _this.props;
    password = ut.md5(encodeURIComponent(password));
    username = encodeURIComponent(username);
    let arr = [{username},{password}];
    let str = md5String(arr);
    console.log('md5 string',str);
    let sign = ut.md5(str);
    let config = {
        api:'login',
        params:{
            username,
            sign
        },
        method:'post',
        success(res){
            let errMsg = res.data.errMsg;
            if(errMsg && errMsg != '0'){
                message.error('用户名密码错误，请重新输入');
            } else {
                let uname = res.data.username;
                closeLoginDialog({},uname);
                if(resumeHash){
                    resumeHash();
                }
            }
        },
        error(e){
            _this.setState({
                spinFlag:false
            });
            message.error('登陆失败');
        }
    };
    simpleFetch(config);
}

const FormLogin = Form.create()(Login);
export default FormLogin;
