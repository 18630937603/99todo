<template>
  <div>
    <div class="login-container">
      <div class="header">
        <img class="logo" src="../assets/logo.jpeg" alt="">
      </div>
      <div class="input-wrap">
        <el-input class="input" v-model="username" placeholder="请输入用户名"></el-input>
        <el-input class="input" v-model="password" placeholder="请输入密码" show-password></el-input>
      </div>
      <div class="login">
        <el-button class="login-button" @click="login">登录</el-button>
        <router-link class="register-link" to="/register">注册</router-link>
        <router-link class="changepwd-link" to="/changepwd">修改密码</router-link>
      </div>
      <div class="quote">耽误太多时间，事情可就做不完了</div>
      <div class="quote-author">-- 玉衡星 刻晴</div>
    </div>
  </div>
</template>

<script>
import { verifyToken,pop } from '@/utils/utils'


export default {
  name: 'LoginPage',
  data() {
    return {
      username: sessionStorage.getItem('username'),
      password: sessionStorage.getItem('password')
    }
  },
  // todo:methods第二个初始化为什么可以调用data的数据？
  methods: {
    login() {
      localStorage.removeItem('token')
      this.$axios.post('/login',{
        username:this.username,
        password:this.password
      }).then( res =>{
        pop(res.data.msg,res.data.err===0 ? 'success' : 'error')
        if(res.data.err===0){
          localStorage.setItem('token',res.data.token)
          this.$router.replace('./home')
        }
      })
    }
  },
  beforeCreate() {
    // 如果有token且token有效，直接跳转到应用主页
    verifyToken().then(res=>{
      if(res.data?.err===0){
        this.$router.replace('./home')
      }
    })
  }
}
</script>

<style scoped lang="less">

.login-container {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #DCDFE6;
  border-radius: 4px;
  margin: 1rem .3rem;


  .header {

    margin-top: .3rem;
    text-align: center;
    font-size: .4rem;

    .logo {
      height: .6rem;
      left: .3rem;
    }
  }
  .input-wrap {
    margin: .2rem .3rem;
    .input {
      margin-top: .2rem;
      margin-bottom: .2rem;
    }
  }

  .login {
    text-align: center;
    position: relative;
    .register-link {
      position: absolute;
      right: .3rem;
      bottom: .4rem;
    }
    .changepwd-link {
      position: absolute;
      right: .3rem;
      bottom: 0;
    }
  }

  .quote {
    margin: .5rem 0;
    font-size: .3rem;
    text-align: center;
  }

  .quote-author {
    font-style: italic;
    text-align: right;
    color: #4f5152;
    margin: 0 .2rem .2rem 0;
  }
}


</style>
