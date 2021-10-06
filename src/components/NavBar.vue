<template>
  <div class="nav-bar">
    <div class="nav-bar-container">
      <img v-if="isHome" class="logo" src="../assets/logo.jpeg" alt="">
      <div v-if="isHome" class="title">功能列表</div>
      <el-page-header v-if="!isHome" class="navbar-header" @back="gotoHome" :content="this.title"></el-page-header>
      <i class="el-icon-user" @click=""></i>
    </div>
    <div class="divider"></div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    title: String,
    isHome: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    gotoHome() {
      this.$router.push('/home');
    }
  }
}
</script>


<style scoped lang="less">
.nav-bar {
  .nav-bar-container {
    display: flex;
    align-items: center;
    padding: 0 .2rem;
    height: 1rem;

    .logo {
      height: .5rem;
      margin-right: .27rem;
      margin-bottom: .15rem;
    }

    .title {
      font-size: .35rem;
    }

    .el-icon-user {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      font-size: .45rem;
    }
  }

  .divider {
    height: 1px;
    background-color: #DCDFE6;
  }
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