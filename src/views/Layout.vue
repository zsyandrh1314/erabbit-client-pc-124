<template>
<!-- 顶部通栏 -->
<AppTopNav />
<!-- 头部通栏 -->
<AppHeader />
<!-- 内容容器 -->
<div class="main">
  <!-- 二级路由 -->
  <RouterView/>
</div>
<!-- 底部通栏 -->
<AppFooter />
</template>

<script>
import AppTopNav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
  export default {
    name:'Layout',
    components: {
      AppTopNav,
      AppHeader,
      AppFooter
    }
  }
</script>

<style lang="less" scoped>
.app-body {
  min-height: 600px;
}
</style>