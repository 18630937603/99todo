<template>
  <div>
    <NavBar :title="'待办事项'" :showHelp="true">
      <div style="margin: .1rem .2rem">
        <h3 style="margin: 0;color: black">帮助：</h3>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;在输入框中输入内容后，pc端按回车，手机端按输入法右下角的键（可能叫前往，确定等），即可添加提醒事项</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;已添加的提醒事项单击内容即可修改</p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;进行增加、修改、删除操作后，点击保存，出现保存成功字样，提醒事项才可以同步到服务器哦</p>
        <p style="color: red">&nbsp;&nbsp;&nbsp;&nbsp;注意：请不要存储重要数据，例如银行卡账号密码等</p>
      </div>
    </NavBar>
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
import {pop} from "@/utils/utils";

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
          pop(res.data.msg,res.data.err===0 ? 'success' : 'error')
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
