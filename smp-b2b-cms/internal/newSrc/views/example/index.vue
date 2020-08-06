<template>
  <div>
    <topItem />
    <middleItem />
    <bottomItem />
  </div>
</template>
<script>
import topItem from './item/topItem'
import middleItem from './item/middleItem'
import bottomItem from './item/bottomItem'
import Model from '../model/data.js'
// 没用到的生命周期可不写
export default {
  name: 'Example',
  components: {
    topItem, middleItem, bottomItem
  },
  props: {},
  data() {
    return {
      model: Model, // 模型数据
      isview: { a: 1 }, // 随意定义字段
      timer: null // 定时器用完及时销毁
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.timer = setTimeout(() => {
      console.log('1111')
      clearInterval(this.timer)
    }, 3000)
  },
  beforeDestroy() {
    this.isview = null
  },
  methods: {}
}
</script>
<style lang="css" scoped>

</style>
