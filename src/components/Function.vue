<template>
  <div class="function">
    <div class="detail-wrapper" @click="jump">
      <i :class="this.iconName" id="icon"></i>
      <div class="title">{{ this.title }}</div>
      <div class="en-title">{{ this.enTitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Function",
  props: ['title','enTitle','iconName','linkTo'],
  methods: {
    jump() {
      this.$router.push(this.linkTo)
    }
  }
}
</script>

<style scoped lang="less">
.function {
  width: 33%;
  box-sizing: border-box;
  padding: .15rem .15rem;
  display: inline-block;

  .detail-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: .3rem 0;
    border: 1px solid black;
    border-radius: .2rem;

    #icon {
      font-size: .6rem;
    }

    .title{
      font-size: .3rem;
      font-weight: bold;
    }

    .en-title {
      font-size: .2rem;
      font-style: italic;
      font-weight: 300;
    }
  }

}
</style>