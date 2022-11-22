<template>
<!-- 标签页组件 -->
<!-- 步骤
  完成基础的tab的导航布局
  完成tab标签页的切换样式效果
  使用动态组件完成可切换 详情 和 评论 组件
 -->
  <div class="goods-tabs">
    <nav>
      <a 
      href="javascript:;" 
      :class="{active:activeName === 'detail'}"
      @click="clickTab('detail')"
      >商品详情</a>
      <a
      href="javascript:;"
      :class="{active:activeName === 'comment'}"
      @click="clickTab('comment')"
      >商品评价<span>(500+)</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <!-- 这个位置显示对应的组件 GoodsDetail 或者 GoodsComment -->
    <component :is="'goods' + activeName" />

  </div>
</template>

<script>
import { ref } from 'vue'
import GoodsDetail from './goods-detail'
import GoodsComment from './goods-comment'
  export default {
    name: 'GoodsTabs',
    components: {
      GoodsDetail,
      GoodsComment
    },
    setup() {
      // detail-->详情   comment-->评价
      const activeName = ref('detail')
      const clickTab = (name) => {
        activeName.value = name
      }
      return { activeName, clickTab }
    }
  }
</script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>