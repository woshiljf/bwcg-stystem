<template>
  <transition>
    <div v-loading="isShow" v-show="isShow" element-loading-background="rgba(0, 0, 0, 0.4)" class="loading"/>
  </transition>
</template>
<script>
import Vue from 'vue'
import { Loading } from 'element-ui'
Vue.use(Loading)
export default {
  name: 'Loading',
  data() {
    return {
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  }
}
</script>
<style lang="scss">
.loading {
  position: fixed;
  top: 36px;
  left: 180px;
  z-index: 111;
  width: calc(100vw - 180px);
  height: calc(100vh - 36px);
  text-align: center;
}
</style>
