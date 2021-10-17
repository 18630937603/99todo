<template>
  <div class="todo-content">
    <el-input class="text" v-model="item.content" type="textarea" autosize @blur="emitBlurEvent"></el-input>
    <el-checkbox v-model="item.checked"></el-checkbox>
  </div>
</template>

<script>
export default {
  name: "TodoContent",
  props: ['item'],
  methods: {
    emitBlurEvent() {
      this.$emit('blur-event')
    }
  }
}
</script>

<style scoped lang="less">
.todo-content {
  border-bottom: 1px solid #DCDFE6;
  border-radius: 2px;
  min-height: .5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .1rem .2rem .1rem .1rem;

}
</style>

<style lang="less">
.todo-content {
  .text {
    .el-textarea__inner {
      resize: none;
      border: none;
    }
  }
}
</style>
