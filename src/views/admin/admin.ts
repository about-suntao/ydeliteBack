import axios from '@/axios/http'

// 用户登录
export const GetInfo = (params: any) => {
    // 返回的数据格式可以和服务端约定
    return axios.get('/iconUser/queryByPage', params)
}

// 新增
export const addInfo = (params: any) => {
    return axios.post('/iconUser/add', params)
}

// 修改
export const editInfo = (params: any) => {
    return axios.put('/iconUser/edit', params)
}

// 删除
export const delInfo = (params: any) => {
    return axios.del('/iconUser/deleteById', params)
}
