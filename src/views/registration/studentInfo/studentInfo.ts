import axios from '@/axios/http'
namespace IType {
    // 用户登录表单
    export interface StudentReqForm {
        pageNum: number
        pageSize: number
        name?: string
        sex?: string
        idCard?: string
        phone?: string
    }
}
// 用户登录
const GetStudentInfo = (params: IType.StudentReqForm) => {
    // 返回的数据格式可以和服务端约定
    return axios.get('/icon/PersonalDetails/queryByPage', params)
}

export default GetStudentInfo
