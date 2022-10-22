<template>
<!-- 首页入口(左侧分类＋广告轮播图) -->
  <div class="page-home">
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory/>
        <!-- 轮播图 -->
      </div>
    </div>
  </div>

</template>
<script>
import HomeCategory from './components/home-category'
export default {
  name: 'HomePage',
  components: {HomeCategory}
}
</script>
<style lang="less" scoped>
.container {
 .hoverShadow();
 color:@xtxColor;
}
</style>