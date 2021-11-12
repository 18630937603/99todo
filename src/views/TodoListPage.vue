<template>
  <div class="todolist-page">
    <NavBar :title="'待办事项'">
      <template v-slot:help>
        <div style="margin: .1rem .2rem">
          <h3 style="margin: 0;color: black">帮助：</h3>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;在输入框中输入内容后，pc端按回车，手机端按输入法右下角的键（可能叫前往，确定等），即可添加提醒事项</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;已添加的提醒事项单击内容即可修改</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;保存指示灯亮起时会将数据同步到服务器，并自动同步到当前登录的其他浏览器窗口</p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;保存指示灯为红色时，说明已经与服务器断开连接，此时任何操作都不会保存，请刷新页面</p>
          <p style="color: red">&nbsp;&nbsp;&nbsp;&nbsp;注意：请不要存储重要隐私数据</p>
        </div>
      </template>
    </NavBar>
    <div class="tabs-container">


      <div v-show="showTabNameInput" class="tabname-inputer">
        <el-input v-model="new_tab_name" placeholder="请输入要添加的标签名称" @keyup.enter.native="addNewTab(new_tab_name)"></el-input>
        &nbsp;&nbsp;
        <el-button icon="el-icon-plus" @click="addNewTab(new_tab_name)"></el-button>
      </div>

      <el-tabs v-model="activeTab" type="card" addable @tab-add="handleAddTabClick" @tab-remove="removeTab">
        <el-tab-pane
            v-for="(title, index) in categories"
            :closable="title!=='全部'"
            :name="title"
            :key="index"
            :label="title"
        >
        </el-tab-pane>
      </el-tabs>




      <div class="todolist-container">
        <el-input v-model="text" placeholder="写点什么吧" @keyup.enter.native="submit" clearable></el-input>
        <div class="content-container">
          <div class="content-header">
            <div style="display: flex;align-items: center">
              保存指示灯&nbsp;&nbsp;
              <SignLight ref="sign"></SignLight>
            </div>
            <div v-show="this.todo_items_list.length" style="display: flex;align-items: center">
              全选&nbsp;&nbsp;
              <el-checkbox v-model="allChecked"></el-checkbox>
            </div>
          </div>
          <div v-for="(item,index) in todo_items_list" :key="index">
            <TodoContent v-show="activeTab==='全部' || item.type===activeTab" :item.sync="item" @blur-event="save"></TodoContent>
          </div>
        </div>
        <div class="buttons">
          <el-button v-show="atLeastOneChecked" @click="clear" type="primary" size="mini">清除已完成的</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import TodoContent from "@/components/TodoContent";
import SignLight from "@/components/SignLight";
import {pop} from "@/utils/utils";

export default {
  name: "TodoListPage",
  components: {
    NavBar,
    TodoContent,
    SignLight
  },
  data() {
    return {
      text: "", // input框的v-model
      todo_items_list: [],  // 保存所有提醒事项item
      ws: null,   // websocket连接

      new_tab_name: '',   // 待添加的标签名称
      showTabNameInput: false,
      activeTab: '全部',   //  当前激活的标签名称
      categories: ['全部','工作','学习'],  // 当前所有的标签名称

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
              if(response.msg==='保存成功！'){
                this.$refs.sign.glow()
              }
            }
          };
          this.ws.onclose = () => {
            this.$refs.sign.disable()
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
      if (!this.text.match(/^[ ]*$/)) {
        this.todo_items_list.push({
          content: this.text,
          checked: false,
          type: this.activeTab
        })
        this.text = ""
        this.save()
      }
    },
    clear() {
      this.todo_items_list = this.todo_items_list.filter(item => item.checked !== true)
      this.save()
    },
    save() {
      if (this.ws) {
        this.ws.send(JSON.stringify(this.todo_items_list))
      } else {
        console.log('websocket连接不存在，无法发送数据！')
      }
    },



    handleAddTabClick() {
      this.new_tab_name = ''
      this.showTabNameInput = !this.showTabNameInput
    },
    addNewTab(newTabName){
      if(newTabName===''){
        pop('不能新建名称为空的标签！','error')
      }else{
        if(this.categories.includes(newTabName)){
          pop('名称已存在，请重试！','error')
        }else{
          this.categories.push(newTabName);
          this.activeTab = newTabName;
          this.showTabNameInput = false
        }
      }
    },
    removeTab(targetName) {
      // 找到关闭tab后下一个激活的应该在哪里（相邻的）
      let tabs = this.categories;
      let activeName = this.activeTab;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab;
            }
          }
        });
      }
      this.activeTab = activeName;
      this.categories = tabs.filter(tab => tab !== targetName);
    }









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

<style lang="less">
.todolist-page {
  .el-tabs__header {
    margin: 0;
  }
}
</style>

<style scoped lang="less">


.tabs-container {
  padding: .2rem .1rem 0;

  .tabname-inputer {
    display: flex;
    margin: .2rem 0;

    el-button {
      flex: 1;
    }
  }

  .todolist-container {
    border-left: 1px solid #DCDFE6;
    border-right: 1px solid #DCDFE6;
    border-bottom: 1px solid #DCDFE6;
    padding: .3rem .15rem .3rem;


    .el-input {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin-bottom: .3rem;
    }

    .content-container {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #DCDFE6;
      min-height: .5rem;

      .content-header {
        border-bottom: 1px solid #DCDFE6;
        min-height: .5rem;
        padding: .1rem .2rem .1rem 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: .22rem;
      }
    }

    .buttons {
      display: flex;
      justify-content: center;
      margin-top: .5rem;
      position: relative;
    }
  }
}




</style>
