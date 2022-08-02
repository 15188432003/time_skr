import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
    path: '*',
    component: () => import('@/components/common/404/Global.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/',
    redirect: '/home',
  }, {
    path: '/home', //主页
    name: 'Home',
    component: () => import('@/views/home/Home.vue'),
    meta: {
      title: '主页'
    }
  },{
    path: '/details/:id', //主页
    name: 'Details',
    component: () => import('@/views/details/Details.vue')
  },
  {
    path: '/regester',
    name: "Regerter",
    component: () => import('@/views/regester/Regester.vue'),
    meta: {
      title: '注册'
    }
  }, {
    path: '/login',
    name: "Login",
    component: () => import('@/views/login/Login.vue'),
    meta: {
      title: '登录'
    }
  }, {
    path: '/shopcar',
    name: "ShopCar",
    component: () => import('@/views/shopcar/ShopCar.vue'),
    meta: {
      title: '购物车'
    }
  }, {
    path: '/mycenter',
    name: "MyCenter",
    component: () => import('@/views/mycenter/MyCenter.vue'),
    meta: {
      title: '个人中心'
    }
  },
  {
    path: '/primary/:parent_name',
    name: 'Primary',
    component: () => import('@/views/primary/primary.vue'),

  }, {
    path: '/secondary/:name',
    name: 'Secondary',
    component: () => import('@/views/secondary/Secondary.vue'),
  }, {
    path: '/wdna',
    name: 'Wdna',
    component: () => import('@/views/wdna/Wdna.vue'),
    meta: {
      title: 'WDNA'
    }
  }, {
    path: '/exclusive',
    name: 'Exclusive',
    component: () => import('@/views/exclusive/Exclusive.vue'),
    meta: {
      title: 'EXCLUSIVE'
    }
  }, {
    path: '/event',
    name: 'Event',
    component: () => import('@/views/event/Event.vue'),
    meta: {
      title: 'EVENT'
    }
  }, {
    path: '/best',
    name: 'Best',
    component: () => import('@/views/best/Best.vue'),
    meta: {
      title: 'BEST'
    }
  }, {
    path: '/paytotal',
    name: 'PayTotal',
    component: () => import('@/views/paytotal/PayTotal.vue'),
    meta: {
      title: '结算'
    }
  }, {
    path: '/paysuccess',
    name: 'PaySuccess',
    component: () => import('@/components/common/paysuccess/PaySuccess.vue'),
    meta: {
      title: '结算'
    }
  }, {
    path: '/search',
    name: 'Search',
    component: () => import('@/views/search/Search.vue'),
    children: [{
        path: '/search/pro',
        name: 'Pro',
        component: () => import('@/views/search/children/Pro.vue')
      },
      {
        path: '/search/active',
        name: 'Active',
        component: () => import('@/views/search/children/Active.vue')
      },
      {
        path: '/search/show',
        name: 'Show',
        component: () => import('@/views/search/children/Show.vue')
      }
    ]
  }, {
    path: "/orderdetail/:status/:order_id",
    name: 'OrderDetail',
    component: () => import('@/views/orderdetail/OrderDetail.vue'),
    meta: {
      title: '订单详情'
    }
  }, {
    path: '/about', //关于我们
    name: 'About',
    component: () => import('@/components/common/following/About.vue'),
    meta: {
      title: '关于我们'
    }
  }, {
    path: '/consultancy', //咨询服务
    name: 'Aonsultancy',
    component: () => import('@/components/common/following/ConsulTancy.vue'),
    meta: {
      title: '咨询服务'
    }
  }, {
    path: '/partners', //合租伙伴查询
    name: 'Partners',
    component: () => import('@/components/common/following/Partners.vue'),
    meta: {
      title: '合租伙伴查询'
    }
  }, {
    path: '/tos', //服务条款
    name: 'Tos',
    component: () => import('@/components/common/following/Tos.vue'),
    meta: {
      title: '服务条款'
    }
  }, {
    path: '/privacy', //隐私政策
    name: 'Privacy',
    component: () => import('@/components/common/following/Privacy.vue'),
    meta: {
      title: '隐私政策'
    }
  }, {
    path: '/service', //服务中心
    name: 'Service',
    component: () => import('@/components/common/following/Service.vue'),
    meta: {
      title: '服务中心'
    }
  }, {
    path: '/joinus', //招聘信息
    name: 'Joinus',
    component: () => import('@/components/common/following/Joinus.vue'),
    meta: {
      title: '招聘信息'
    }
  }, {
    path: '/global', //全球的
    name: 'Global',
    component: () => import('@/components/common/404/Global.vue'),
    meta: {
      title: '404'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) { // 解决vue页面跳转只有页面不是在顶部的问题

    // savedPosition 会在你使用浏览器前进或后退按钮时候生效
    if (savedPosition) {
      return {
        // behavior: 'smooth', //平滑滚动效果
        selector: savedPosition
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
    // console.log(to.hash,from.path,savedPosition);

  }
})

export default router