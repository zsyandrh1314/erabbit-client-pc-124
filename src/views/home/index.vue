<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
    <!-- 首页入口(左侧分类＋广告轮播图) -->
      <!-- 左侧分类 -->
      <HomeCategory/>
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
  </div>
  <!-- 新鲜好物 -->
  <HomeNew />
  <!-- 人气推荐 -->
  <HomeHot />
  <!-- 热门品牌 -->
  <HomeBrand />
  <!-- 商品区域 -->
  <HomeProduct />
  <!-- 最新专题 -->
  <HomeSpecial />

</template>
<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import HomeBrand from './components/home-brand'
import HomeProduct from './components/home-product'
import HomeSpecial from './components/home-special'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand,
    HomeProduct,
    HomeSpecial
  }
}
</script>
<style lang="less" scoped>
// .container {
//  .hoverShadow();
//  color:@xtxColor;
// }
// 使用Transition组件实现动画，一个元素或者组件的(显示|隐藏,创建|移除)

// 进入前 v-enter (v-enter-from)VUE3
// 进入中 v-enter-active
// 进入后 v-enter-to

// 离开前 v-leave (v-leave-from)VUE3
// 离开中 v-leave-active
// 离开后 v-leave-to

// 需求：一个盒子在显示隐藏的时候做淡入淡出动画
// 1.准备盒子
// 2.控制显示隐藏
// 3.加入动画
</style>