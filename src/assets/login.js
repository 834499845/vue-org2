// 登陆
import Vue from 'vue'
const exam = {
    // 登陆
    apipassportuserloginpwd: function apipassportuserloginpwd(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    },
    // 上传
    fileuploadPic: function fileuploadPic(ip, postdata) {
        return Vue.http.post(ip, postdata).then(response => {
            if (response.status === 200) {
                return Promise.resolve(response.body)
            } else {
                return Promise.reject(response.data.message)
            }
        })
    }
}
export default exam