<template>
<!-- 顶部通栏 -->
<nav>顶部通栏</nav>
<!-- 头部通栏 -->
<header>头部通栏</header>
<!-- 内容容器 -->
<div class="main">
  <!-- 二级路由 -->
  <RouterView/>
</div>
<!-- 底部通栏 -->
<footer>底部通栏</footer>
</template>

<script>
  export default {
    name:'Layout'
  }
</script>

<style lang="less" scoped>

</style>