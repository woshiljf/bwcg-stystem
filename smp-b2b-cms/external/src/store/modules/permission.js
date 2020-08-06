import { asyncRouterMap, constantRouterMap } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, resource) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(resource, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, resource)
      }
      res.push(tmp)
    }
  })

  return res
}

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    // 生成资源路由
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { resource } = data
        let accessedRouters
        // console.log(roles, 'cccccc')
        if (resource.includes('admin')) {
          accessedRouters = asyncRouterMap
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, resource)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
