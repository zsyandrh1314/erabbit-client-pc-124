<template>
<!-- 商品详情组件 -->
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <!-- 参考api文档 -->
      <li v-for="item in goods.details.properties" :key="item.value">
        <span class="dt">{{item.name}}</span>
        <span class="dd">{{item.value}}</span>
      </li>
    </ul>
    <!-- 图片 -->
    <img v-for="item in goods.details" :key="item" :src="item" alt="">
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  name: 'GoodsDetail',
  // 接收数据
  setup() {
    // 使用父组件传递的goods数据，展示评价数量
    const goods = inject('goods')
    return { goods }
  }
}
</script>
<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>