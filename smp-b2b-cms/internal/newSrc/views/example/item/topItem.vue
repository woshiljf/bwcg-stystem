<template>
  <div>{{ model.data.m }}</div>
</template>
<script>
import Model from '../model/data.js'
export default {
  data() {
    return {
      model: Model,
      isview: { a: 1 }// 随意定义字段
    }
  },
  beforeDestroy() {
    this.isview = null
  }
}
</script>
<style lang="css" scoped>
@import './../styles/top.css';
</style>
