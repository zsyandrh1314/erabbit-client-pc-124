<template>
<!-- 顶部通栏 -->
<AppTopNav />
<!-- 头部通栏 -->
<AppHeader />
<!-- 吸顶头部组件 -->
<AppHeaderSticky />
<!-- 内容容器 -->
<main class="app-body">
  <!-- 二级路由 -->
  <RouterView/>
</main>
<!-- 底部通栏 -->
<AppFooter />
</template>

<script>
import AppTopNav from '@/components/app-navbar'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky'
import { useStore } from 'vuex'
 export default {
    name:'Layout',
    components: {
      AppTopNav,
      AppHeader,
      AppFooter,
      AppHeaderSticky
    },
    // 获取下分类数据
    setup() {
      const store = useStore()
      // 调用api
      store.dispatch('category/getList')
    }
  }
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>