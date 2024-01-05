import axios from '@/axios/index'
namespace ILogin {
    // 用户登录表单
    export interface LoginReqForm {
        phone: string
        password: string
    }
    // 登录成功后返回的token
    export interface LoginResData {
        token: string
    }
}
// 用户登录
const Login = (params: ILogin.LoginReqForm) => {
    // 返回的数据格式可以和服务端约定
    return axios.post<ILogin.LoginResData>('/icon/login', params)
}

export default Login
