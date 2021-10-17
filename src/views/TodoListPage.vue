<template>
  <div>
    <NavBar :title="'待办事项'" :showHelp="true">
      <template v-slot:help>
        <div style="margin: .1rem .2rem">
          <h3 style="margin: 0;color: black">帮助：</h3>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;在输入框中输入内容后，pc端按回车，手机端按输入法右下角的键（可能叫前往，确定等），即可添加提醒事项</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;已添加的提醒事项单击内容即可修改</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;进行增加、修改、删除操作后，点击保存，出现保存成功字样，提醒事项才可以同步到服务器哦</p>
          <p style="color: red">&nbsp;&nbsp;&nbsp;&nbsp;注意：请不要存储重要数据，例如银行卡账号密码等</p>
        </div>
      </template>
    </NavBar>
    <div class="todolist-container">
      <el-input v-model="text" placeholder="写点什么吧" @keyup.enter.native="submit" clearable></el-input>
      <div class="content-container">
        <div v-for="(item,index) in todo_items_list" :key="index">
          <TodoContent :item.sync="item" @blur-event="save"></TodoContent>
        </div>
      </div>
      <div class="buttons">
        <el-button v-show="atLeastOneChecked" @click="clear" type="primary" size="mini">清除已完成的</el-button>
        <el-button @click="save(true)" type="primary" size="mini">保存</el-button>
        <el-checkbox v-show="this.todo_items_list.length" v-model="allChecked" class="select-all"></el-checkbox>
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
      text: "", // input框的v-model
      todo_items_list: [],  // 保存所有提醒事项
      ws: null,   // websocket连接
    }
  },
  computed: {
    atLeastOneChecked() {
      return this.todo_items_list.some(item => item.checked)
    },
    allChecked: {
      get: function () {
        return this.todo_items_list.every(item => item.checked)
      },
      set: function () {
        if (this.allChecked) {
          for (let item of this.todo_items_list) {
            item.checked = false
          }
        } else {
          for (let item of this.todo_items_list) {
            item.checked = true
          }
        }
      }
    }
  },
  methods: {
    establishWebSocketConnection() {
      if (!this.ws) {
        try {
          const session = Date.now()
          this.ws = new WebSocket(`ws://${this.$baseURL}/socket/todolist?session=${session}&token=${localStorage.getItem('token')}`)
          this.ws.onopen = () => {
            console.log(`已请求建立ws连接，等待服务器响应,session:${session}`)
          }
          this.ws.onmessage = msg => {
            const response = JSON.parse(msg.data)
            if (response.status_code === 0) {
              this.todo_items_list = response.data
            } else {
              console.log(response.msg)
            }
          };
          this.ws.onclose = () => {
            console.log("连接已关闭");
          };
        } catch (e) {
          console.log('连接建立失败')
          console.log(e)
        }
      } else {
        console.log('连接已建立，无需重复建立')
      }
    },
    submit() {
      if (this.text !== "") {
        this.todo_items_list.push({
          content: this.text,
          checked: false
        })
        this.text = ""
        this.save()
      }
    },
    clear() {
      this.todo_items_list = this.todo_items_list.filter(item => item.checked !== true)
      this.save()
    },
    save(showMessage = false) {
      if (this.ws) {
        this.ws.send(JSON.stringify(this.todo_items_list))
        if(showMessage){
          pop("保存成功！","success")
        }
      } else {
        console.log('websocket连接不存在，无法发送数据！')
      }
    },
  },
  created() {
    this.establishWebSocketConnection()
  },
  deactivated() {
    this.save();
  },
  beforeDestroy() {
    this.save();
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
    border: 1px solid #DCDFE6;
    min-height: .5rem;
  }

  .buttons {
    display: flex;
    justify-content: center;
    margin-top: .5rem;
    position: relative;

    .select-all {
      position: absolute;
      top: .1rem;
      right: .2rem;
    }
  }
}
</style>
