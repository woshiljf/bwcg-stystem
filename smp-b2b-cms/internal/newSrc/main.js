// 本页面待整理

// import Vue from 'vue'

// import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// import 'vue-directive-image-previewer/dist/assets/style.css' // image_view css
// import 'element-ui/lib/theme-chalk/index.css'
// import '@/styles/index.scss' // global css

// import Element from 'element-ui'
// import Cookies from 'js-cookie'
// import App from './App'
// import router from './router'
// import store from './store'
// import VueDirectiveImagePreviewer from 'vue-directive-image-previewer' // image_view
// import i18n from './lang' // Internationalization
// import './icons' // icon
// import './errorLog' // error log
// import './permission' // permission control
// import './mock' // simulation data
// import * as filters from './filters' // global filters
// import api from './api/API'
// import AFTableColumn from 'af-table-column'
// import { getparams, TryThrow, pvuv } from './utils/globalFunction/index'

// // 按钮防重复点击指令
// let forbidClick = null
// Vue.directive('preventReClick', {
//   bind(e) {
//     const el = e
//     const str = el.innerText
//     forbidClick = () => {
//       el.disabled = true
//       el.innerText = '请求中...'
//       el.classList.add('is-disabled')
//       setTimeout(() => {
//         el.disabled = false
//         el.innerText = str
//         el.classList.remove('is-disabled')
//       }, 500)
//     }
//     el.addEventListener('click', forbidClick)
//   },
//   unbind() {
//     document.removeEventListener('click', forbidClick)
//   }
// })

// Vue.use(AFTableColumn)

// // 流量统计函数
// pvuv()

// // 空参过滤
// Vue.prototype.getParams = getparams
// // tryCatch统一处理函数
// Vue.prototype.tryThrow = TryThrow

// Vue.use(VueDirectiveImagePreviewer)
// Vue.use(Element, {
//   size: Cookies.get('size') || 'mini', // set element-ui default size
//   i18n: (key, value) => i18n.t(key, value)
// })
// Vue.prototype.$api = api
// // register global utility filters.
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

// Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   router,
//   store,
//   VueDirectiveImagePreviewer,
//   i18n,
//   api,
//   render: h => h(App)
// })
