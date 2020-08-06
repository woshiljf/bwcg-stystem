<template>
  <div id="app" @mousemove="moveEvent" @click="moveEvent">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default{
  name: 'App',
  data() {
    return {
      isRouterAlive: true,
      timmer: null
    }
  },
  created() {
    this.moveEvent()
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    },
    moveEvent() {
      // console.log("清除了定时器！！！！！")
      const path = ['/login']
      if (document.URL.indexOf(path) === -1) {
        // 如果不是登录页面的话页面停止进行30分钟后清空session
        clearTimeout(this.timmer)
        this.init()
      }
    },
    init() {
      this.timmer = setTimeout(() => {
        // 清除session
        sessionStorage.removeItem('sessionData')
        sessionStorage.clear()
        // 跳往登录页面
        this.$store.dispatch('LogOut').then(() => {
          this.$router.push('/login')
          this.$notify({
            title: '错误',
            message: '登录超时,请重新登录',
            type: 'error',
            duration: 2000
          })
        })
      }, 60 * 60 * 1000) // 设置半小时清空session进入屏保
    }
  }
}
</script>
<style>
 *{
   margin: 0;
   padding: 0
 }
 .order-box{
  /* box-shadow: 0 3px 10px rgba(46, 8, 8, 0.1); */
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);;
  background: white;
  border: 1px solid rgb(204, 204, 204);
  height: 100%;
 }
 .searchBox {
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 15px 15px 10px 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  box-shadow: 0 3px 10px rgba(46, 8, 8, 0.1);
}
</style>
