<template>
  <div class="todo-content">
    <el-input class="text" v-model="item.content" type="textarea" autosize @blur="emitBlurEvent"></el-input>
    <el-badge v-show="item.type!=='全部'" :value="badgeText" class="badge" type="primary"></el-badge>
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
  },
  computed: {
    badgeText() {
      return this.item.type.length <= 3 ? this.item.type : this.item.type.slice(0,2)+'...'
    }
  }
}
</script>

<style scoped>
.todo-content {
  border-bottom: 1px solid #DCDFE6;
  border-radius: 2px;
  min-height: .5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .1rem .2rem .1rem .1rem;
}

.badge {
  margin-top: .04rem;
  margin-right: .1rem;
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
