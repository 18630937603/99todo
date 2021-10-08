<template>
  <div class="page-with-footer">
    <div class="content-wrap">
      <slot></slot>
    </div>
    <div class="footer">
      <div class="divider"></div>
      <div class="footer-detail">
        <a href="https://beian.miit.gov.cn">津ICP备2021004586号-1</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PageWithFooter"
}
</script>

<style scoped lang="less">
@footer-height: .8rem;

.page-with-footer {
  position: relative;
  min-height: 100vh;
}

.content-wrap {
  padding-bottom: @footer-height;
}

.footer {
  position: absolute;
  bottom: 0;
  height: @footer-height;
  width: 100%;

  display: flex;
  flex-direction: column;

  .divider {
    height: 1px;
    background-color: #DCDFE6;
  }

  .footer-detail {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
