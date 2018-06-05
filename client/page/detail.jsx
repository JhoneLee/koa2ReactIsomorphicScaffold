import React,{Component} from 'react';
import { Layout,Input,Icon,Button,message,Spin } from 'antd';
import {connect} from 'react-redux';
import {detailReceive} from '../action';
import mkFetchFunc from '../common/fetchData';
import '../less/detail.less';
import img from '../image/loading.gif';
const { Header, Content} = Layout;
const fetchApis = mkFetchFunc(detailReceive);
class Detail extends Component{
    constructor(props){
        super(props);
    }
    
    componentWillMount(){
        let _this = this;
        let {id} = this.props.match.params;
        let {data} = this.props.stateData.movieDetail;
        if(!data || id!=data.id){
            this.props.getData({
                api:`detail`,
                params:{},
                pathParams:[id],
                success(res){
                    message.success('详情请求成功');
                    console.log(res);
                },
                error(e){
                    console.error(e);
                },
                disconnect(err){
                    console.log('断网',err);
                }
            });
        }
    }
    
    render(){
        let {getData,stateData} = this.props;
        let {requestPosts,movieDetail} = stateData;
        console.log(stateData);
        let flag = requestPosts === 'hide'?false:true;
        let title = movieDetail.data && movieDetail.data.title || ''
        return (
            <Layout className="detail-page">
                <Spin tip="数据加载中..." spinning={flag}>
                    <Content className="main">
                        <Layout>
                            <Content>
                                <h2>电影《{title}》详情</h2>
                                <div className="test-class"></div>
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
export default connect(mapStateToProps,mapDispatchToProps)(Detail);