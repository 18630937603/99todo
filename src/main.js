import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from "axios";

Vue.config.productionTip = false


// const baseURL = "192.168.0.103:8081"  // 开发环境
const baseURL = "localhost:8081"  // 开发环境
// const baseURL = "www.lzh0129.top:8081"  // 生产环境

Vue.prototype.$axios = axios
Vue.prototype.$baseURL = baseURL
axios.defaults.baseURL=`http://${baseURL}`

Vue.use(ElementUI)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')



// rem适配
// todo:设备方向改变了怎么办？
const MIN_WIDTH = 350;
const MAX_WIDTH = 500;
function recalculate() {
  let clientWid = document.documentElement.clientWidth;
  if(clientWid > MAX_WIDTH) {
    document.documentElement.style.fontSize = 50 * ( MAX_WIDTH / 360) + 'px';
  }else if(clientWid < MIN_WIDTH) {
    document.documentElement.style.fontSize = 50 * ( MIN_WIDTH / 360) + 'px';
  }else {
    document.documentElement.style.fontSize = 50 * ( clientWid / 360) + 'px';
  }
}
recalculate();
window.addEventListener('resize',recalculate);
