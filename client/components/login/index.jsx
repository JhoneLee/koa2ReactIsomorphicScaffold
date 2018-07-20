import React,{Component} from 'react';
import './login.less';
import {Form,Input,Button,Icon,Spin} from 'antd';
let FormItem = Form.Item;
class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            spinFlag:false
        }
    }
    componentWillMount(){

    }
    handleUserNameBlur(){

    }
    handlePassBlur(){

    }
    handleVerifyBlur(){

    }
    handleSubmit(){

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
const FormLogin = Form.create()(Login);
export default FormLogin;
