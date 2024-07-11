import request from "@/api/request"
const API = "https://auth.wust.edu.cn"

// 登陆接口loginWust返回数据
// interface logindata{
// cookies:'没有数据别看了'
// 	data{
// 		content{
// 			code:"0"
// 			message:"认证成功"
// 		}
// 	}
// errMsg: "request:ok"
// header:"太长了自己看网络接口"
// statusCode: 200
// }
interface loginParams {
	appid : string,
	username : string,
	secret : string,
	password : string,
}

//网络中心登陆接口{urlEnd要拼接了放上去，至于为什么，问学校网络中心}
export async function loginWust(data : loginParams, urlEnd : string) {
	try {
		const res = await request({
			url: `${API}/lyuapServer/checkPwd` + urlEnd,
			method: "POST",
			data,
		})
		// 看上面返回数据
		return res.data.content
	} catch (err) {
		console.log("err", err)
	}
}