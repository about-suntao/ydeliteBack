import axios from '@/axios/http'

// 用户登录
export const GetNoteInfo = (params: any) => {
    // 返回的数据格式可以和服务端约定
    return axios.get('/icon/phone/queryByPage', params)
}

// 新增
export const addNoteInfo = (params: any) => {
    return axios.post('/icon/phone/add', params)
}

// 修改
export const editNoteInfo = (params: any) => {
    return axios.put('/icon/phone/edit', params)
}

// 删除
export const delNoteInfo = (params: any) => {
    return axios.del('/icon/phone/deleteById', params)
}
