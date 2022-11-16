import { createRouter, createWebHashHistory } from 'vue-router'

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
      { path: '/product/:id', component: Goods}
    ] 
  }
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

export default router
