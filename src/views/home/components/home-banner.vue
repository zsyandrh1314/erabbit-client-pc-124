<template>
<!-- 首页广告组件基础结构 -->
  <div class="home-banner">
    <!-- 轮播图组件 -->
    <XtxCarousel auto-play :sliders = "sliders" />
  </div>
</template>

<script>
import { ref } from 'vue-demi'
import { findBanner } from '@/api/home'
  export default {
    name: 'HomeBanner',
    setup() {
      const sliders = ref([]) // 轮播空数组
      // 广告组件获取数据，传播给轮播图
      findBanner().then(data => {
        sliders.value = data.result
      })
      return { sliders }
    }
  }
</script>

<style lang="less" scoped>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
// 覆盖轮播图组件样式
.xtx-carousel {
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
}
</style>