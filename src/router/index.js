import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
// import TopCategory from '@/views/category/index'
// import SubCategory from '@/views/category/sub'
// import SubCategory
// 路由懒加载 布局容器
const Layout = () => import('@/views/Layout')
// 首页组件
const Home = () => import('@/views/home')
// 一级分类
const TopCategory = () => import('@/views/category/index')
// 二级分类
const SubCategory = () => import('@/views/category/sub')
// 商品详情
const Goods = () => import('@/views/goods/index')
// 购物车
const Cart = () => import('@/views/cart/index')


// 登录
const Login = () => import('@/views/login/index')
// 回跳
const LoginCallback = () => import('@/views/login/callback')


// 跳转结算页面
const Checkout = () => import('@/views/member/pay/checkout')

// 路由规则
const routes = [
  // 一级路由布局容器
  // 首页
  { 
    path: '/', 
    component: Layout, 
    children:[
      { path: '/', component: Home },
      { path:'/category/:id', component: TopCategory },
      { path: '/category/sub/:id', component: SubCategory },
      { path: '/product/:id', component: Goods},
      { path: '/cart', component: Cart},
      { path: '/member/checkout', component: Checkout}
    ] 
  },
  // 登录
  { path: '/login',component: Login },
  // qq登录-回跳
  { path: '/login/callback', component: LoginCallback }
]
// 创建路由实例
// vue2.0 new VueRouter({}) 
// vue3.0 createRouter({}) 
const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(), 
  // 配置路由规则，写法和之前一样
  routes,
  // 每次切换路由的时候滚动到页面顶部
  scrollBehavior () {
    // vue2.0 x y 控制
    // vue3.0 left top 控制
    return { left:0, top:0 }
  }
})
// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 需要登录的路由：地址是以 /member 开头
  const { profile } = store.state.user
  if (!profile.token && to.path.startsWith('/member')) {
    return next('/login?redirectUrl=' + encodeURIComponent(to.fullPath))
  }
  next()
})

export default router
