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
      :class="{ active: activeName === 'GoodsDetail' }"
      @click="activeName = 'GoodsDetail'"
      >商品详情</a>
      <a
      href="javascript:;"
      :class="{active:activeName === 'GoodsComment'}"
      @click="activeName = 'GoodsComment'"
      >商品评价
      <!-- 参考api文档 商品详情里面 -->
      <span>({{goods.commentCount}})</span>
      </a>
    </nav>
    <!-- 切换内容的地方 其实是两个组件-->
    <!-- 在vue中动态的切换组件其实可以使用动态组件的component组件 -->
    <!-- is属性用来决定component动态组件渲染为哪个组件 -->
    <!-- 这个位置显示对应的组件 GoodsDetail 或者 GoodsComment -->
    <!-- <GoodsDetial v-if="activeName === 'GoodsDetial'" />
    <GoodsComment v-if="activeName === 'GoodsComment'" /> -->
    <component :is="activeName" />

  </div>
</template>

<script>
import { inject, ref } from 'vue'
import GoodsDetail from './goods-detail'
import GoodsComment from './goods-comment'
  export default {
    name: 'GoodsTabs',
    components: {
      GoodsDetail,
      GoodsComment
    },
    setup() {
      // activeName的值：GoodsDetial  GoodsComment
      const activeName = ref('GoodsDetail')
      // goods 详情数据
      const goods = inject('goods')
      return { activeName, goods }
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