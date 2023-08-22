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