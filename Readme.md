# 图书馆小程序项目体系

*武汉科技大学图书馆微信小程序*

## 支撑技术

vue3 +  + pinia +  + scss + typescript

使用HBuild开发uni-app，生成微信小程序

## 完成内容

#### 导航栏

服务大厅（主页），活动大厅，消息资源，个人中心

#### 主页

时间点，搜索框，轮播图，热门服务，智能答疑
其他服务（读者指南，关于本馆，机构设置，文献资源……）
推荐阅读

#### 活动，消息资源

通知公告，最新资源，活动日历

#### 个人中心

登录/绑定账号，用户信息，关于，意见反馈，借阅记录
年度总结-海报(未完成)

## 接口详情

*接口是从浏览器上查看的，没有文档*
*每个接口，对应于一个功能*

后台地址：
汇文接口地址: https://libsys.wust.edu.cn
统一登录接口 https://auth.wust.edu.cn

### tsg接口

#### 登录相关

登录接口1

 ```javascript
/**
* 登录接口1 POST /lyuapServer/v1/tickets
* 
* @prarm username 学号
* @prarm password rsa加密后的密码
* @prarm service 浏览器跳转的去向
* @prarm loginType ''
* @return 一段字符串
*/
 ```

登录接口2

```javascript
/**
* 登录接口2 POST  /lyuapServer/v1/tickets
* @prarm 上一个接口的返回值，拼接在url后面
* @return 还是一段字符串
*/
```

### 汇文接口

#### 登录相关

*请求头添加Cookie*

获取用户信息:Cookie来自后端接口的返回值

```javascript
/*
* 获取用户信息 GET /meta-local/opac/users/info
* @prarm isPlaintext false
* @header
* 
*/
```

借阅统计（总览）

```javascript
/*
* 借阅状态 GET /meta-local/opac/users/stats
*/
```

借阅列表

```javascript
/*
* 借阅列表 GET /meta-local/opac/users/loans
* @param page 当前页数
* @param pageSize 每页大小
* @return [] 列表
*/
```

借阅类型分布

```javascript
/**
* 借阅分布 GET /meta-local/opac/users/loan_dcp_dist
* @return [] 用于画饼图
*/
```

借阅时间分布

```javascript
/**
* 借阅时间分布 GET /meta-local/opac/users/loan_range_dist
* @return {} 用于画柱状图
*/
```

借阅历史

```javascript
/*
* 借阅历史 GET /meta-local/opac/users/loan_hists
* @prarm page 当前页数
* @prarm pagesize 每页大小
*/
```

欠费列表

```javascript
/**
*
*
*/
```

#### 搜索相关

*主要是主页的搜索*

搜索

```javascript
/*
* 搜索 POST /meta-local/opac/search
* 
* 请求参数示例：queryFieldList: [	{
					logic: 0,
					field: 用户选择的类型,
					operator: "*",
					values: [用户输入的内容]
				}],
   	sortType: "desc",
	sortField: "relevance",
	indexName: "idx.opac",
	collapseField: "groupId",
	filterFieldList: [],
	page: pagination.currentPage,
	pageSize: pagination.pageNum
* 
*/
```

热门检索词

```javascript
/*
* 热门检索 GET /meta-local/opac/commend/top_search_trend
* @prarm count 返回数量
*/
```

推荐搜索，热门图书

```javascript
/*
* 推荐-热门图书 GET /meta-local/opac/commend/hot1
* @prarm count 返回数量
*/
```

书籍的详情

```javascript
/**/
```





https://libsys.wust.edu.cn/meta-local/opac/commend/hot1?count=20

### 自己的后台接口（基于node）

登录接口3

```javascript
/**
* 登录的第三个接口 从后端获取cookie(来自汇文，有后端拦截)
* 参数来自于接口2返回的字符串
* 拼接到url后面
* /meta-local/opac/cas/rosetta?ticket=
*/
```



### 小程序全局登录逻辑

使用登录的页面：登录页，主页（启动时，检测是否已经登录）

#### 密码加密算法

RSA加密

#### 登录接口

登录一共涉及到2个地址，3个接口
最终目的：获取到**Cookie**

| 序号 | 接口名称  | 请求源 | 接口地址                             | 返回值      |      |
| ---- | --------- | ------ | ------------------------------------ | ----------- | ---- |
| 1    | 登录接口1 | tsg    | /lyuapServer/v1/tickets              | 一段字符串1 |      |
| 2    | 登录接口2 | tsg    | /lyuapServer/v1/tickets/+一段字符串1 | 一段字符串2 |      |
| 3    | 登录接口3 | 后台   | /get-cookie                          | Cookie      |      |

当获取到Cookie后，需要激活Cookie




## 目录结构

- 主包
  home,sevice,center

- 主页 page-home
  - 搜索
  - 我的借阅
  - 自动答疑
  - 
  - 关于 /
- 活动 page-sevice
- 资源 page-sevice
- 个人中心 page-center
  - 登录 /login
  - 个人信息 /
  - 我的借阅 /
  - 



## 组件

###  组件封装

*封装组件：Empty,List,ListSkeleton*

#### Empty

| 参数        |    定义    | 类型           | 备注           |
| ----------- | :--------: | -------------- | -------------- |
| description |  空白描述  | string         | 默认为暂无数据 |
| width       |    宽度    | string         | 默认320px      |
| height      |  每页数量  | string         | 默认240px      |
| image       |  获取更多  | string \| solt | 默认为'empty'  |
| imageStyle  | 图片的样式 | ()=>{}         |                |


#### List

| 参数       |   定义   | 类型   | 备注           |
| ---------- | :------: | ------ | -------------- |
| listLength | 表单标题 | string | 默认为0,显示空 |
| page       |  当前页  | number | 默认1          |
| pageSize   | 每页数量 | number | 默认20         |
| getMore    | 获取更多 | ()=>{} | 页数+1         |

```html
<List @getMore="search(paginations.currentPage+1,paginations.pageNum)" :listLength="searchList.length"
		:page="paginations.currentPage" 	:pageSize="paginations.pageNum">
	<!-- key必须使用id，不能使用index -->
	<view v-for="item in list" :key="item.id">
    	<!-- 你的内容 -->
    </view>
</List>
```

#### ListSkeleton骨架屏

| 参数     |      定义      | 类型    | 默认  | 是否必须 |
| :------- | :------------: | :------ | ----- | :------- |
| isShow   |    是否展示    | boolean | true  | 否       |
| hasImage |  是否包含图片  | boolean | false | 否       |
| rows     |   一轮多少行   | number  | 4     | 否       |
| loop     |     多少轮     | number  | 1     | 否       |
| display  | 一条的排列方式 | string  | block | 否       |
| width    |                | string  | 100vw | 否       |

#### ListNavBar

*列表顶部导航栏，和系统导航栏一样，自定义样式*

| 参数            |    定义    | 类型   | 默认          |
| --------------- | :--------: | ------ | ------------- |
| title           | 导航栏标题 | string | ''            |
| color           |  字体颜色  | string | #fff          |
| backgroundColor |  背景颜色  | string | #142d88主题色 |



## 其他

主题色：#142d88   



