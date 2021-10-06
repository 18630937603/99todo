<template>
  <div id="app">
<!--    <div id="cover">请用手机（宽度小于500px的设备）查看该页面</div>-->
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  mounted() {

  }
}
</script>

<style lang="less">
//todo：怎么做到懒加载字体？
@font-face {
  font-family: "hanyiwenhei";
  src: url("./assets/hanyiwenhei.ttf");
}

body {
  margin: 0 auto;
  font-family: "hanyiwenhei","Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size: .25rem;
  box-sizing: border-box;
}

#cover {
  display: none;
  text-align: center;
  line-height: 100vh;
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #FFFFFF;
  z-index: 999999;
  @media screen and (min-width: 500px) {
    display: block;
  }
}
</style>
