//引入路由
import router from '@/router/index'
//引入路由跳转进度条
import NgProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from "@/store/index"


router.beforeEach((to, from, next) => {
    NgProgress.start()
    let token = store.state.user.token
    if (!token) {
        if (to.path == '/shopcar') {
            console.log(111);
            next('/login')
        } 
        next()
    } else {
        store.commit('user/TOPBAR_CHANGE', true)
        next()
    }
})

router.afterEach((to, from, failure) => {
    if (JSON.stringify(to.params) !== '{}') {
        if (to.params.parent_name || to.params.name) {
            document.title = (to.params.parent_name || to.params.name) + '-skr'
        } else if (to.name == 'Details') {
            document.title = '商品详情-skr'
        } else {
            document.title = to.meta.title + '-skr'
        }
    } else {
        if (to.name == 'Search') {
            document.title = '搜索-skr'
        } else {
            document.title = to.meta.title + '-skr'
        }
    }
    NgProgress.done()
})