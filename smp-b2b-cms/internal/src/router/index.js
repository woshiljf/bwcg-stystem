import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
// 无权限页面

const Purchase = resolve => require(['@/views/purchase/index.vue'], resolve)
const PurchaseList = resolve => require(['@/views/purchase/list/index.vue'], resolve)
const AddPurchase = resolve => require(['@/views/purchase/add/index.vue'], resolve)
const PurchaseDetail = resolve => require(['@/views/purchase/detail/index.vue'], resolve)
const DownloadPurchase = resolve => require(['@/views/purchase/download/index.vue'], resolve)
// 库存批量导入结果下载页
const DownloadStock = resolve => require(['@/views/stock/download/index.vue'], resolve)
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    name: 'Dashboard',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        // component: () => import('@/views/dashboard/dashboard'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
      }
    ]
  }
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // }
]

const router = new Router({
  // mode: 'history', // require service support   //  routers
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
router.beforeEach((to, from, next) => {
  // 全局路由判断跳转非登录页定时返回登录
  const app = document.getElementById('app')
  app.click()
  if (window._hmt) {
    if (to.path) {
      window._hmt.push(['_trackPageview', '/#' + (to.fullPath.split('?')[0] || to.fullPath)])
    }
  }
  next()
})
export const asyncRouterMap = [
  {
    path: '/user',
    component: Layout,
    name: 'User',
    meta: {
      title: '权限管理', icon: 'user', roles: ['AuthorizationManage']
    },
    children: [
      {
        path: '/internal/list',
        component: () => import('@/views/user/internal/list'),
        name: 'InternalUser',
        meta: { title: '用户管理-内部' }
      },
      {
        path: '/external/list',
        component: () => import('@/views/user/external/list'),
        name: 'ExternalUser',
        meta: { title: 'externalUser' },
        hidden: true
      },
      {
        path: '/role/internal/newList',
        component: () => import('@/views/role/internal/newList'),
        name: 'NewList',
        meta: { title: '角色管理-权限设置' }
      },
      {
        path: '/role/internal/newResourceList',
        component: () => import('@/views/role/internal/newResourceList'),
        name: 'NewResourceList',
        meta: { title: '新增资源' }
      },
      {
        path: '/external/changepassword',
        component: () => import('@/views/user/external/changePassword'),
        name: 'ChangePassword',
        meta: { title: 'changePassword', noCache: true },
        hidden: true
      },
      {
        path: '/role/internal/list',
        component: () => import('@/views/role/internal/list'),
        name: 'internalRoleList',
        meta: { title: 'internalRoleList' },
        hidden: true
      }
    ]
  },
  {
    path: '/TradingPlatform',
    component: Layout,
    redirect: '/TradingPlatform/orderList',
    name: 'TradingPlatform',
    meta: {
      title: 'B2B交易管理',
      roles: ['B2B_Transaction'],
      icon: 'form'
    },
    children: [
      {
        path: '/TradingPlatform/orderList',
        component: () => import('@/views/tradingPlatform/orderList/List'),
        name: 'OrderList',
        meta: { title: '订单列表', roles: ['B2B_Sales_List'] }
      },
      {
        path: '/TradingPlatform/returnList',
        component: () => import('@/views/tradingPlatform/returnList/List'),
        name: 'ReturnList',
        meta: { title: '退货单列表', roles: ['B2B_Return_List'] }
      },
      {
        path: '/TradingPlatform/List/ListDetail/:id?',
        component: () => import('@/views/tradingPlatform/ListDetail/Detail'),
        name: 'ListDetail',
        meta: { title: '订单详情', noCache: true },
        hidden: true
      },
      {
        path: '/TradingPlatform/List/ListDetail/EditOrder/:id?',
        component: () => import('@/views/tradingPlatform/ListDetail/EditOrder'),
        name: 'EditOrder',
        meta: { title: '修改订单', noCache: true },
        hidden: true
      },
      {
        path: '/TradingPlatform/returnList/creditDetail/:id?',
        component: () => import('@/views/tradingPlatform/returnList/creditDetail'),
        name: 'CreditDetail',
        meta: { title: '销售退货单详情', noCache: true },
        hidden: true
      }, {
        path: '/TradingPlatform/UserMessage/HistoryDiscount',
        component: () => import('@/views/tradingPlatform/ListDetail/HistoryDiscount'),
        name: 'HistoryDiscount',
        meta: { title: '历史折扣详情', noCache: true },
        hidden: true
      },
      {
        path: '/TradingPlatform/userMessage',
        component: () => import('@/views/tradingPlatform/UserMessage/UserMessage'),
        name: 'UserMessage',
        meta: { title: '客户信息页', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/OMS',
    component: Layout,
    name: 'OMS',
    // hidden: true,
    meta: {
      title: '线上订单管理', roles: ['Online_Order_Manage'], icon: 'shopping'
    },
    children: [
      {
        path: '/OMS/OrderList',
        component: () => import('@/views/OMS/orderList/orderList'),
        name: 'OmsOrderList',
        meta: { title: '交易单列表', roles: ['Transaction_List'] }
      },
      {
        path: '/OMS/OrderDetail/:No?/:id?',
        component: () => import('@/views/OMS/orderList/orderDetail'),
        name: 'OmsOrderDetail',
        meta: { title: '交易单详情', noCache: true },
        hidden: true
      },
      {
        path: '/OMS/ReceiveList',
        component: () => import('@/views/OMS/receiveList/receiveList'),
        name: 'OmsReceiveList',
        meta: { title: '售后单列表', roles: ['After_Sale_Bill_List'] }
      },
      {
        path: '/OMS/ReceiveDetail/:No?/:id?',
        component: () => import('@/views/OMS/receiveList/receiveDetail'),
        name: 'OmsReceiveDetail',
        meta: { title: '售后单详情', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/ODS',
    component: Layout,
    redirect: '/ODS/DeliveryList',
    name: 'ODS',
    meta: {
      title: '收发货管理',
      roles: ['Receive_And_Deliver_Manage'],
      icon: 'table'
    },
    children: [
      {
        path: '/ODS/DeliveryList',
        component: () => import('@/views/ODS/DeliveryList/DeliveryList'),
        name: 'DeliveryList',
        meta: { title: '发货单列表', roles: ['Dispatch_Bill_List'] }
      },
      {
        path: '/ODS/ReceiveList',
        component: () => import('@/views/ODS/ReceiveList/ReceiveList'),
        name: 'ReceiveList',
        meta: { title: '收货单列表', roles: ['Receive_Bill_List'] }
      },
      {
        path: '/ODS/DeliveryList/DeliveryDetail/:id?',
        component: () => import('@/views/ODS/DeliveryList/DeliveryDetail'),
        name: 'DeliveryDetail',
        meta: { title: '发货详情', noCache: true },
        hidden: true
      },
      {
        path: '/ODS/ReceiveList/ReceiveDetail/:id?',
        component: () => import('@/views/ODS/ReceiveList/ReceiveDetail'),
        name: 'ReceiveDetail',
        meta: { title: '收货详情', noCache: true },
        hidden: true
      }
    ]
  },
  {
    path: '/statement',
    component: Layout,
    redirect: '/statement/jit/list',
    name: 'Statement',
    meta: {
      title: '财务管理',
      roles: ['Financial_Manage'],
      icon: 'money'
    },
    children: [
      {
        path: '/jit/list',
        component: () => import('@/views/statement/jit/list'),
        name: 'StatementJit',
        meta: { title: 'statementJit', roles: ['JIT_Financial_Sheet'], icon: 'table' }
      }
    ]
  },
  {
    path: '/goods',
    component: Layout,
    redirect: '/goods/list',
    name: 'Goods',
    meta: {
      title: '基础档案管理',
      roles: ['Archive_Manage'],
      icon: 'component'
    },
    children: [
      {
        path: '/goods/detail/:id?',
        component: () => import('@/views/goods/detail'),
        name: 'GoodsDetail',
        meta: { title: '货品详情' },
        hidden: true
      },
      {
        path: '/goods/list',
        component: () => import('@/views/goods/list'),
        name: 'GoodsList',
        meta: { title: '商品管理', roles: ['Commodity_Manage'] }
      },
      {
        path: '/warehouseManage/list',
        component: () => import('@/views/warehouseManage/list'),
        name: 'WareHoseList',
        meta: { title: '仓库管理', roles: ['Store_Manage'] },
        hidden: true
      }
    ]
  },
  {
    path: '/stock',
    component: Layout,
    name: 'Stock',
    meta: {
      title: '供应链管理',
      roles: ['Supply_Chain_Mange'],
      icon: 'eye-open'
    },
    children: [
      {
        path: '/stock/index',
        component: () => import('@/views/stock/index'),
        name: 'StockSearch',
        meta: { title: '库存管理', roles: ['Inventory_Allocation'] },
        children: [
          {
            path: '/stock/PhysicalSearch',
            component: () => import('@/views/stock/PhysicalSearch'),
            name: 'PhysicalSearch',
            meta: { title: '实物库存查询', roles: ['Physical_Inventory_Query'] }
          },
          {
            path: '/stock/PhysicalAllocation',
            component: () => import('@/views/stock/PhysicalAllocation'),
            name: 'PhysicalAllocation',
            meta: { title: '实物库存管理', roles: ['Physical_Inventory_Allocation'] }
            // hidden: true
          },
          {
            path: '/stock/ChannelAllocation',
            component: () => import('@/views/stock/ChannelAllocation'),
            name: 'ChannelAllocation',
            meta: { title: '渠道库存管理', roles: ['Channel_Inventory_Allocation'] }
          },
          {
            path: '/stock/ChannelAllocationB2C',
            component: () => import('@/views/stock/ChannelAllocationB2C'),
            name: 'ChannelAllocationB2C',
            meta: { title: '渠道库存管理-B2C', roles: ['Channel_Inventory_Allocation_B2C'] }
          },
          {
            path: '/stock/ChannelAllocationBBC',
            component: () => import('@/views/stock/ChannelAllocationBBC'),
            name: 'ChannelAllocationBBC',
            meta: { title: '渠道库存管理-BBC', roles: ['Channel_Inventory_Allocation_BBC'] }
          },
          {
            path: '/stock/ChannelAllocationJIT',
            component: () => import('@/views/stock/ChannelAllocationJIT'),
            name: 'ChannelAllocationJIT',
            meta: { title: '渠道库存管理-JIT', roles: ['Channel_Inventory_Allocation_JIT'] }
          },
          {
            path: '/stock/download',
            component: DownloadStock,
            name: 'DownloadStock',
            meta: { title: '采购单据明细下载' },
            hidden: true
          }
        ]
      },
      {
        path: '/transfer',
        component: () => import('@/views/scm/index'),
        name: '调拨管理',
        // hidden: true,
        meta: {
          title: '调拨管理', roles: ['Allocate_Mange']
        },
        children: [
          {
            path: '/scm/list',
            component: () => import('@/views/scm/list'),
            name: 'ScmList',
            meta: { title: '调拨申请单列表', roles: ['Apply_Allocate_Bill_List'] }
            // hidden: true
          },
          {
            path: '/scm/detail/:id?',
            component: () => import('@/views/scm/detail'),
            name: 'ScmDetail',
            meta: { title: '调拨申请单-明细信息', noCache: true },
            hidden: true
          }
        ]
      },
      // 采购管理系统
      {
        path: 'Purchase',
        component: Purchase,
        name: 'Purchase',
        meta: { title: '采购管理' },
        children: [
          {
            path: '/Purchase/PurchaseList',
            component: PurchaseList,
            name: 'PurchaseList',
            meta: { title: '采购单据列表', noCache: false }
            // hidden: true
          },
          // {
          //   path: '/Purchase/PurchaseDetail/:id?',
          //   component: PurchaseDetail,
          //   name: 'PurchaseDetail',
          //   meta: { title: '采购单据明细' },
          //   hidden: true
          // },
          {
            path: '/purchase/download',
            component: DownloadPurchase,
            name: 'DownloadPurchase',
            meta: { title: '采购单据明细下载' },
            hidden: true
          }
        ]
      },
      {
        path: '/Purchase/AddPurchase',
        component: AddPurchase,
        name: 'AddPurchase',
        meta: { title: '新增采购单', noCache: true },
        hidden: true
      },
      {
        path: '/Purchase/PurchaseDetail/:id?',
        component: PurchaseDetail,
        name: 'PurchaseDetail',
        meta: { title: '采购单据明细', noCache: true },
        hidden: true
      },
      {
        path: '/transfer',
        component: () => import('@/views/scm/index1'),
        name: 'Transfer1',
        meta: { title: '调拨管理', roles: ['Allocate_Mange'], noCache: true },
        hidden: true,
        children: [
          {
            path: '/scm/add',
            component: () => import('@/views/scm/add'),
            name: 'ScmAdd',
            meta: { title: '调拨申请单-新增', noCache: true },
            hidden: true
          }
        ]
      }
    ]
  },
  {
    path: '/listNew',
    component: Layout,
    name: 'listNew',
    hidden: true,
    meta: {
      title: '订单管理', icon: 'table'
    },
    children: [
    ]
  },
  {
    path: '/sysmLog',
    component: Layout,
    name: 'sysmLog',
    hidden: true,
    meta: {
      title: '系统日志', icon: 'excel', roles: ['sysmLog']
    },
    children: [
      {
        path: '/sysmLog/log',
        component: () => import('@/views/sysmLog/index'),
        name: 'SysmLogQuery',
        meta: { title: '日志管理' }
        // hidden: true
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    alwaysShow: true, // will always show the root menu
    hidden: true,
    meta: {
      title: 'permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'directivePermission'
          // if do not set roles, means: this page does not require permission
        }
      }
    ]
  },

  /** When your routing table is too long, you can split it into small modules**/
  //  无完全遮罩
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    hidden: true,
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },

  { path: '*', redirect: '/error/404', hidden: true }
]
export default router
