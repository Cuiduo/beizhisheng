<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container" :class="classObj"></sidebar>
    <div class="main-container">
      <app-main></app-main>
    </div>
    <app-footer :class="classObj"></app-footer>
  </div>
</template>

<script>
import { Sidebar, AppMain, AppFooter } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Sidebar,
    AppMain,
    AppFooter
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    isPrint() {
      return this.$store.state.app.isPrint
    },
    classObj() {
      return {
        isPrint: this.isPrint
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
