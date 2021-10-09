import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "@/views/LoginPage";
import RegisterPage from "@/views/RegisterPage";
import HomePage from "@/views/HomePage";
import TodoListPage from "@/views/TodoListPage";
import AboutPage from "@/views/AboutPage";
import ChangePwdPage from "@/views/ChangePwdPage";

import { verifyToken } from "@/utils/utils";

//解决vue路由重复导航错误
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: LoginPage,
    alias: '/'
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/home',
    component: HomePage
  },
  {
    path: '/todolist',
    component: TodoListPage,
  },
  {
    path: '/about',
    component: AboutPage
  },
  {
    path: '/changepwd',
    component: ChangePwdPage
  }
]

const router = new VueRouter({
  routes
})

// 全局路由守卫，作用是在没有登录的时候访问其他页面自动跳转到登录
// 若没有token，回到登录页面
router.beforeEach((to, from, next) => {
  //to 要去的路由配置
  //from 当前的路由配置

  if (to.path === '/login' || to.path === '/register' || to.path === '/changepwd') return next();
  const token = localStorage.getItem('token');
  if (token) {
    next();
    verifyToken().then(r => {
      if(r.data.err!==0){
        localStorage.removeItem('token')
        router.replace('/login')
      }
    })
  }else{
    router.replace('/login')
  }
});



export default router
