<template>
  <div>
    <div class="nav-bar-container">
      <img v-if="isHome" class="logo" src="../assets/logo.jpeg" alt="">
      <div v-if="isHome" class="title">功能列表</div>
      <el-page-header v-if="!isHome" class="navbar-header" @back="gotoHome" :content="this.title"></el-page-header>
      <div class="popover-icons">
        <el-popover v-if="showHelp">
          <slot></slot>
          <i class="el-icon-question icon" slot="reference"></i>
        </el-popover>
        <el-popover>
          <div>当前用户：</div>
          <div>{{ username }}</div>
          <el-button @click="logout" size="mini" type="primary">登出</el-button>
          <i class="el-icon-user-solid icon" slot="reference"></i>
        </el-popover>
      </div>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
import { decode } from 'js-base64'

export default {
  name: "NavBar",
  props: {
    title: String,
    isHome: {
      type: Boolean,
      default: false
    },
    showHelp: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    gotoHome() {
      this.$router.push('/home');
    },
    logout() {
      localStorage.removeItem('token')
      this.$router.push('/login')
    }
  },
  data(){
    return {
      username: ""
    }
  },
  created() {
    let token = localStorage.getItem('token').split('.')[1];
    this.username = JSON.parse(decode(token)).username
  }
}
</script>


<style scoped lang="less">
.nav-bar-container {
  display: flex;
  align-items: center;
  margin: .1rem .2rem;
  min-height: .7rem;
  position: relative;

  .logo {
    height: .5rem;
    margin-right: .27rem;
    margin-bottom: .15rem;
  }

  .title {
    font-size: .35rem;
  }

  .popover-icons {
    position: absolute;
    right: 0;

    .icon {
      margin-left: .1rem;
      font-size: .45rem;
    }
  }
}

.divider {
  height: 1px;
  background-color: #DCDFE6;
}
</style>

<style lang="less">
.nav-bar {
  .nav-bar-container {
    .navbar-header {
      .el-page-header__title {
        font-size: .25rem;
      }

      .el-page-header__content {
        font-size: .35rem;
      }
    }
  }
}

</style>
