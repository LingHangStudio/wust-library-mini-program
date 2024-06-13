// 搜索接口
/**
 * 搜索的请求参数
 */
export interface ISearchReq {
	queryFieldList : ISearchWord[],
	sortType : string;
	sortField : string;
	indexName : string;
	collapseField : string;
	filterFieldList : [];
	page : number;
	pageSize : number;
}

export interface ISearchWord {
	logic : number;
	field : string;
	operator : string;
	values : any;
}

export interface ISearchRes {

}


//--------------------------
// 智能答疑 - 咨询页
// 请求参数
export interface requestQuestion {
	msg : string,
	userId : any,
}
// 准确查询的返回类型
export interface resConsultType {
	id : number;
	content : string;
	question ?: string,
	questionJieBa ?: string;
	answer ?: string;
	matchNum ?: number;
	weight ?: number;
	[k : string] : any;
}

//--------------------------
// 书籍的类型：一本的所有详细信息来自不同的接口
// infos接口下的内容
export interface IDetailInfo {
	baseInfo : baseInfoType;
	detailInfo : any;
	extraInfo : extraInfoType;
}

// 书籍详情返回内容的baseInfo
export interface baseInfoType {
	author ?: string;
	docType ?: string;
	isbn ?: string;
	title ?: string;
}

export interface extraInfoType {
	score ?: number;
	_clickCount ?: number;
	[k : string] : any;
}

//info接口下的内容
export interface otherInfoType {
	_id ?: string;
	catalog ?: string;
	content ?: string;
	imageUrl ?: string;
	authorInfo ?: string;
}



//已解决的传的类型
export interface feedBackList {
	userId : number;
	question : string;
	matched : string[];
}

//获取openid
export interface openIdList {
	appid : string;
	secret : string;
	js_code : string;
	grant_type : string;
}


// 请求参数
export interface botQuestion {
	query : string,
}