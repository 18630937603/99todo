<template>
  <div class="todolist-page">
    <NavBar :isHome="false" :title="'待办事项'"></NavBar>
    <div class="todolist-container">
      <el-input v-model="text" placeholder="写点什么吧" @keyup.enter.native="submit" clearable></el-input>
      <div class="content-container">
        <div v-for="(item,index) in todo_items_list" :key="index">
          <TodoContent :item.sync="item"></TodoContent>
        </div>
      </div>
      <div class="buttons">
        <el-button v-show="atLeastOneChecked" @click="clear" type="primary" size="mini">清除已完成的</el-button>
        <el-button @click="save(true)" type="primary" size="mini">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import TodoContent from "@/components/TodoContent";

export default {
  name: "TodoListPage",
  components: {
    NavBar,
    TodoContent
  },
  data() {
    return {
      todolist_from_server: null,
      text: "",
      todo_items_list: []
    }
  },
  computed: {
    atLeastOneChecked() {
      return this.todo_items_list.filter(item => item.checked).length
    }
  },
  methods: {
    initData() {
      this.$axios.get('/todolist', {
        params: {
          token: localStorage.getItem('token')
        }
      }).then(res => {
        // console.log('todolist mounted，服务端返回数据',res.data.todolist)
        this.todo_items_list = res.data.todolist.items;
      })
    },
    submit() {
      if (this.text !== "") {
        this.todo_items_list.push({
          content: this.text,
          checked: false
        })
        this.text = ""
      }
    },
    clear() {
      this.todo_items_list = this.todo_items_list.filter(item => item.checked !== true)
    },
    save(showMessage = false) {
      this.$axios.post('/save', {
        token: localStorage.getItem('token'),
        items: this.todo_items_list
      }).then(res => {
        if (showMessage) {
          this.$message({
            message: res.data.msg,
            type: res.data.err === 0 ? 'success' : 'error'
          })
        }
      })
    },
  },
  created() {
    this.initData();
  },
  activated() {
    this.initData();
  },
  deactivated() {
    // this.save();
  }
}
</script>

<style scoped lang="less">
.todolist-container {
  border-radius: .1rem;
  margin: .3rem .15rem 0;

  .el-input {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    margin-bottom: .3rem;
  }

  .content-container {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-top: 1px solid #DCDFE6;
    border-left: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: .5rem;
  }
}
</style>