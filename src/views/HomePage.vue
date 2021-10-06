<template>
  <div class="home-page">
    <NavBar :isHome="true"></NavBar>
    <!--    todo:做登出功能-->
    <Function :title="'待办事项'" :enTitle="'TodoList'" :iconName="'el-icon-s-order'" :linkTo="'/todolist'"></Function>

  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Function from "@/components/Function";

export default {
  name: "HomePage",
  components: {
    NavBar,
    Function
  }
}
</script>

<style scoped lang="less">

</style>