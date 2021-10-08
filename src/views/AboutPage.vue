<template>
  <PageWithFooter>
    <NavBar :title="'关于'"></NavBar>
    <div class="content">
      <h3>功能介绍：</h3>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;目前只有提醒事项功能，更多功能已经在开发完善中了</p>
      <h3>关于作者：</h3>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;我叫刘志昊，来自南开大学软件工程专业二学位班</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;为了解决手机提醒事项app不能跨iOS、Mac和Windows同步的问题，顺便学习编程，99todo在2021.10.6上线啦～</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;本项目前端使用Vue+element-ui搭建，后端使用nodejs+koa2+MongoDB</p>
      <h3>更新日志：</h3>
      <div style="white-space: pre-wrap">
        <p>{{ change_log }}</p>
      </div>

    </div>
  </PageWithFooter>
</template>

<script>
import NavBar from "@/components/NavBar";
import PageWithFooter from "@/components/PageWithFooter";

export default {
  name: "AboutPage",
  components: {
    NavBar,
    PageWithFooter
  },
  data() {
    return {
      change_log: `
v1.0.1，2021.10.8

    增加备案号
    将消息提示位置改为右下角，避免遮挡导航条按钮
    增加了登出功能
    增加了关于页面
    加入了todolist的使用帮助

    代码相关：
    全局路由守卫现在也会阻拦无效token

v1.0，2021.10.6

    99todo上线啦！支持注册，登录，提醒事项功能
    提醒事项功能可以进行提醒的添加、删除、修改、保存到服务器。
      `
    }
  }
}
</script>

<style scoped lang="less">
.content {
  margin: .3rem .3rem;
}

p {
  color: #797979;
}

</style>
