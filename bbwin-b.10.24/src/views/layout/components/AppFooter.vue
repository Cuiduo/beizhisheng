<template>
  <section class="app-footer">
     <el-footer class="footer" height="50px;">Copyright  All Right Reserved by 协顺祥(2018)  <span style="padding-left: 5px;">京ICP备17051522号-1</span></el-footer>
  </section>
</template>

<script>
export default {
  name: 'AppFooter',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
<style>
  .footer {
    background-color: #264167;
    color: #fff;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
  }
</style>
