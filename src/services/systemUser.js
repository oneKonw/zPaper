import request from '../utils/request';

const LOGIN_API = '/system';

// 拼接 '/system/login'
export async function doLogin(params) {
	console.log(params); // 传入userdate
	return request(`${LOGIN_API}/login`, { // 拼接字符串
		method: 'POST', // 网络方法
		body: JSON.stringify(params) // 将js对象转为字符串发送
	});
} //调用方法

export async function doLogup(params) {
	return request(`${LOGIN_API}/logup`, {
		method: 'POST',
		body: JSON.stringify(params)
	});
}

export async function doLogout() {
	return request(`${LOGIN_API}/logout`, {
		method: 'POST'
	});
}
