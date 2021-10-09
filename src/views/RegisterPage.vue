<template>
  <div>
    <div class="register-container">
      <div class="header">
        <img class="logo" src="../assets/logo.jpeg" alt="">
      </div>
      <div class="input-wrap">
        <el-tooltip class="item" effect="dark" content="用户名格式：5-16字节，允许字母、数字、下划线、@、." placement="top-start">
          <el-input class="input" v-model="username" placeholder="用户名"></el-input>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="密码格式：8-16字节，必须包含大小写字母、数字，可以使用特殊字符" placement="top-start">
        <el-input class="input" v-model="password" placeholder="密码" show-password></el-input>
        </el-tooltip>
        <el-input class="input" v-model="password2" placeholder="再次输入密码" show-password></el-input>
      </div>
      <div class="buttons">
        <el-button @click="register">注册</el-button>
        <router-link class="back-link" to="/login">返回</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {pop} from "@/utils/utils";

export default {
  name: "RegisterPage",
  data() {
    return {
      username:"",
      password:"",
      password2:""
    }
  },
  methods: {
    register() {
      if(this.password===this.password2){
        this.$axios.post('/register',{
          username:this.username,
          password:this.password
        }).then( res =>{
          pop(res.data.msg,res.data.err===0 ? 'success' : 'error')
          if(res.data.err===0){
            // 注册后直接跳转到登录页面，填好账号密码
            sessionStorage.setItem('username',this.username);
            sessionStorage.setItem('password',this.password)
            this.$router.push('./login')
          }
        })
      }else{
        pop('两次输入的密码不一致','error')
      }
    }
  }
}
</script>

<style scoped lang="less">

.register-container {
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

  .buttons {
    text-align: center;
    position: relative;
    margin-bottom: .4rem;

    .back-link {
      position: absolute;
      right: .3rem;
      bottom: 0;
    }
  }
}


</style>
