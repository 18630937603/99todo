import axios from "axios";
import { Notification } from "element-ui";

async function verifyToken() {
    let token = localStorage.getItem('token')
    if(token) {
        return axios.post('/verify',{token})
    }else {
        return Promise.resolve(false)
    }
}

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
    }else{
        Notification({
            message: message,
            duration: 2500,
            position: 'bottom-right'
        })
    }
}

export { verifyToken,pop }
