import { createRouter, createWebHashHistory } from 'vue-router'

// 路由懒加载 布局容器
const Layout = () => import('@/views/Layout')
// 首页组件
const Home = () => import('@/views/home')

// 路由规则
const routes = [
  // 一级路由布局容器
  // 首页
  { 
    path: '/', 
    component: Layout, 
    children:[
      { path: '/', component: Home }
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
  routes
})

export default router
