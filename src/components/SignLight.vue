
<template>
  <!--指示灯组件-->
  <div style="position: relative;height: 12px;width: 12px">
    <div class="status-green" v-show="color==='green'" :class="glowing ? 'glowing' : ''"></div>
    <div class="status-green-glow" v-show="color==='green' && glowing"></div>
    <div class="status-red" v-show="color==='red'" :class="glowing ? 'glowing' : ''"></div>
    <div class="status-red-glow" v-show="color==='red' && glowing"></div>
  </div>
</template>

<script>
export default {
  name: "SignLight",
  data() {
    return {
      disabled: false,
      glowing: false,
      color: 'green'
    }
  },
  methods: {
    glow() {
      if(!this.disabled){
        this.glowing = true;
        setTimeout(() => {
          this.glowing = false;
        }, 200)
      }
    },
    disable() {
      this.glowing = true;
      this.color = 'red'
      this.disabled = true
    }
  }
}
</script>

<style scoped lang="less">
.status-green {
  position: absolute;
  border-style: solid;
  border-width: 1px;
  border-color: #099c6b;
  background-color: #47dcb2;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: inset -0.6px -1.9px 4px 0 rgba(21, 139, 100, 0.8);

  &.glowing {
    border-color: #0b7e26;
    background-color: #0aff00;
    box-shadow: inset -0.6px -1.9px 4px 0 rgba(16, 183, 56, 0.8);
  }
}

.status-green-glow {
  z-index: -1;
  position: absolute;
  background-color: #2f343a;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 0 0 8px 1px rgba(21, 139, 100, 0.7);
}

.status-red {
  z-index: 1000;
  position: absolute;
  border-style: solid;
  border-width: 1px;
  border-color: #9c0909;
  background-color: #dc1847;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: inset -0.6px -1.9px 4px 0px rgba(139, 21, 21, 0.8);

  &.glowing {
    border-color: rgba(222, 28, 28, 0.5);
    background-color: rgba(255, 90, 90, 1);
    box-shadow: inset -0.6px -1.9px 4px 0px rgba(200, 0, 0, 0.8);
  }
}

.status-red-glow {
  z-index: 999;
  position: absolute;
  background-color: #2f343a;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  box-sizing: border-box;
  box-shadow: 0 0 8px 1px rgba(139, 21, 21, 0.7);
}
</style>
