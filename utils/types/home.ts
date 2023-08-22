// 声明类型
// 咨询页
export interface questionType {
	id ?: number | string;
	question ?: string
}
export interface responceType {
	id : number;
	content : string;
	questionList ?: questionType[]
}