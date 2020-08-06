import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start() // start progress bar
  if (getToken()) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (!store.getters.name) { // 判断当前用户是否已拉取完user_info信息
        let menuList = []
        if (sessionStorage.getItem('menuList')) {
          menuList = JSON.parse(sessionStorage.getItem('menuList'))
        }
        store.dispatch('GetUserInfo').then(async res => { // 拉取user_info
          const resource = [...res.data.resourceCode, ...res.data.roleCodes, ...menuList] // note: roles must be a array! such as: ['editor','develop']
          // console.log(resource, 'cccccc.permission')
          // const roles = [...res.data.roleCodes] // note: roles must be a array! such as: ['editor','develop']
          await store.dispatch('GenerateRoutes', { resource }).then(() => { // 根据roles权限生成可访问的路由表
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch((err) => {
          store.dispatch('FedLogOut').then(() => {
            Message.error(err)
            next({ path: '/' })
          })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission([...store.getters.resourceCode, ...store.getters.roles, ...store.getters.menuList], to.meta.roles)) {
          console.log('金哲丽', ...store.getters.menuList)
          next()
        } else {
          next({ path: '/error/401', replace: true, query: { noGoBack: true }})
        }
        // 可删 ↑
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      const geturl = location.href.split('#/')[1]
      next(`/login?redirect=${geturl}`) // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
