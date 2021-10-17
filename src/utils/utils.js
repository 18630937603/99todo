import axios from "axios";
import { Notification } from "element-ui";

// 向服务器发起验证token请求，返回一个Promise
async function verifyToken() {
    let token = localStorage.getItem('token')
    if(token) {
        return axios.post('/verify',{token})
    }else {
        return Promise.resolve(false)
    }
}

// 封装弹框消息
function pop(message,type) {
    if(type==='success'){
        Notification({
            message: message,
            duration: 2500,
            position: 'bottom-right',
            type: 'success'
        })
    }else if(type==='error'){
        Notification.error({
            message: message,
            duration: 2500,
            position: 'bottom-right'
        })
    }else if(type==='warning'){
        Notification({
            message: message,
            duration: 2500,
            position: 'bottom-right',
            type: 'warning'
        })
    }else{
        Notification({
            message: message,
            duration: 2500,
            position: 'bottom-right'
        })
    }
}

export { verifyToken,pop }
