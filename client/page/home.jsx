import React,{Component} from 'react';
import { Layout,Input,Icon,Button,message,Spin } from 'antd';
import {connect} from 'react-redux';
import {homeReceive} from '../action';
import mkFetchFunc from '../common/fetchData';
import HomeDataItem from '../components/HomeDataItem';
import Login from '../components/Login';
import '../less/home.less';
import img from '../image/loading.gif';
const { Header, Content} = Layout;
const fetchApis = mkFetchFunc(homeReceive);
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            loginFlag:'none'
        }
    }
    
    componentWillMount(){
        console.log('react componentWillMount');
        let _this = this;
        let {data} = this.props.stateData.homeList;
        if(!data || !data.list || data.list.length<1){
            this.props.getData({
                api:'datalist',
                params:{},
                success(res){
                    console.log('首页数据请求成功');
                },
                error(e){
                    console.error(e);
                },
                disconnect(err){
                    console.log('断网',err);
                }
            })
        }
    }
    handleLoginClick(){
        this.setState({
            loginFlag:'block'
        });
    }
    closeLoginDialog(){
        this.setState({
            loginFlag:'none'
        });
    }

    render(){
        console.log('react render');
        let {getData,stateData} = this.props;
        let {requestPosts} = stateData;
        let flag = requestPosts === 'hide'?false:true;
        let {list} = stateData.homeList.data;
        console.log(stateData.homeList);
        let arr = [];
        let {loginFlag} = this.state;
        arr.push(list.map((e)=>{
            return (<HomeDataItem data={e}/>)
        }));
        return (
            <Layout className="home-page">
                <Header>
                    <h1>koa2+react同构直出测试项目</h1>
                    <a href="javascript:;" onClick={this.handleLoginClick.bind(this)}>请登录</a>
                    <Login flag={loginFlag} closeLoginDialog = {this.closeLoginDialog.bind(this)}/>
                </Header>
                <Spin tip="数据加载中..." spinning={flag}>
                    <Content className="main">
                        <Layout>
                            <Content className="home-center">
                                <h1>正在热映{list.length}个电影</h1>
                                <ul className="data-list">
                                    {arr}
                                </ul>
                            </Content>
                        </Layout>
                    </Content>
                </Spin>
            </Layout>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        stateData:state.reducer
    };
};

let mapDispatchToProps = (dispatch,ownProps)=>{
    return {
        // 获取数据
        getData(opt){
            dispatch(fetchApis(opt));
        }
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Home);