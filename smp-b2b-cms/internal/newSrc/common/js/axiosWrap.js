import Vue from 'vue'
import axiosWrap from 'axios'

axiosWrap.defaults.timeout = 5000
axiosWrap.interceptors.request.use(function(config) {
  Vue.prototype.$mloading.show()
  return config
}, function(error) {
  return Promise.reject(error)
})
axiosWrap.interceptors.response.use(function(response) {
  Vue.prototype.$mloading.hide()
  if (typeof response.data === 'string') {
    try {
      response.data = JSON.parse(response.data)
    } catch (e) {
      console.log(e)
    }
  }
  return response
}, function(error) {
  Vue.prototype.$mloading.hide()
  return Promise.reject(error)
})

export default axiosWrap
