// 咨询页
export interface requestQuestion {
	msg : string,
	userId : number | string,
}

export interface questionItem {
	id ?: number | string;
	question ?: string
}

export interface resConsultType {
	id : number;
	content : string;
	questionList ?: questionItem[]
}

// 书籍的类型
// infos接口下的内容
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