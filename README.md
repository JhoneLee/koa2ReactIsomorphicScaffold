# koa2 react同构直出脚手架

> 在构建前请用 es-checker 检测node版本针对es6的支持情况，并选择合适的babel插件

------------

## 安装步骤

npm install

------
## 运行


> * 开发环境 npm run dev
> * 生产环境 npm run prod

------
## 脚手架说明
> * 使用antd作为界面
> * 开发时前后端分离
> * 引入redux 及 react-router
> * 使用 fetch 请求数据
> * 使用 mysql 进行数据存储及接口数据源
> * 使用 redis 进行session管理,用户持久性数据存储于mysql
------
## demo的简单表结构[^code]

### 最新上映表
```SQL
CREATE TABLE `current_show` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL COMMENT '电影id',
  `date` bigint(20) NOT NULL,
  `m_cc` int(11) NOT NULL COMMENT '今日上映该电影的影院数量',
  `m_sc` int(11) NOT NULL COMMENT '累计放映数量',
  `m_record` float NOT NULL COMMENT '电影评分',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=403 DEFAULT CHARSET=utf8;
```
### 电影详情表
```sql
CREATE TABLE `movie_detail` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `m_id` int(11) NOT NULL COMMENT '电影id',
  `m_record` float NOT NULL COMMENT '电影评分',
  `m_name` varchar(50) NOT NULL COMMENT '电影名称',
  `m_an1` varchar(20) NOT NULL COMMENT '一号演员',
  `m_an2` varchar(20) DEFAULT NULL COMMENT '二号演员',
  `m_desc` varchar(200) DEFAULT NULL,
  `m_dn` varchar(20) NOT NULL COMMENT '电影导演',
  `m_type` varchar(200) NOT NULL COMMENT '电影类型',
  `m_img` varchar(200) NOT NULL COMMENT '电影海报',
  `m_is3d` tinyint(4) DEFAULT NULL COMMENT '是否3d',
  `m_date` varchar(8) NOT NULL COMMENT '上映日期',
  `m_ename` varchar(50) DEFAULT NULL COMMENT '英文名称',
  `m_year` varchar(4) NOT NULL COMMENT '上映年份',
  `m_actors` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `m_id` (`m_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1776 DEFAULT CHARSET=utf8;
```


### 用户表
```sql
CREATE TABLE `user` (
  `user_id` bigint(15) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `user_name` varchar(128) NOT NULL COMMENT '用户名称',
  `name` varchar(128) NOT NULL COMMENT '真实姓名',
  `user_type` smallint(2) NOT NULL COMMENT '用户类型 0普通用户 1vip用户',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `last_access_time` bigint(15) NOT NULL DEFAULT '0' COMMENT '最后登录时间',
  `token` varchar(32) NOT NULL DEFAULT '0' COMMENT '登录凭证',
  `openid` varchar(50) NOT NULL COMMENT '唯一标识',
  PRIMARY KEY (`user_id`),
  KEY `user_name_index` (`user_name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='用户表';
```


## 各项依赖版本

|依赖包|版本|
|-----|----|
|react|15.x|
|webpack|3.4.1|
|antd|3.x|
|mysql|2.15|
|ioredis|3.2.2|


