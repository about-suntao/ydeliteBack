// 获取assets静态资源
const getToken = () => {
    const token = localStorage.getItem('token')
    return token
}
export default getToken
