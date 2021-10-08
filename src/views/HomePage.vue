<template>
  <div>
    <NavBar :isHome="true"></NavBar>
    <!--    todo:做登出功能-->
    <Function :title="'待办事项'" :enTitle="'TodoList'" :iconName="'el-icon-s-order'" :linkTo="'/todolist'"></Function>
    <Function :title="'关于'" :enTitle="'About'" :iconName="'el-icon-info'" :linkTo="'/about'"></Function>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import Function from "@/components/Function";
import PageWithFooter from "@/components/PageWithFooter";

export default {
  name: "HomePage",
  components: {
    NavBar,
    Function,
    PageWithFooter
  }
}
</script>

<style scoped lang="less">

</style>
