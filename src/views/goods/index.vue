<template>
<!-- 商品详情 -->
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
       <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem :to="`/category/${goods.categories[1].id}`">{{goods.categories[1].name}}</XtxBreadItem>
        <XtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{goods.categories[0].name}}</XtxBreadItem>
        <XtxBreadItem>{{goods.name}}</XtxBreadItem>
      </XtxBread>

      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <!-- goods.mainPictures获取图片 -->
          <GoodsImage :images="goods.mainPictures" />
          <!-- 销售 -->
          <GoodsSales />
        </div>
        <div class="spec">
          <!-- 商品名组件 -->
          <GoodsName :goods="goods" />
          <!-- sku规格组件 -->
          <GoodsSku :goods="goods" @change="changeSku" />
          <!-- 数量选择组件 -->
          <XtxNumbox label="数量" v-model="num" :max="goods.inventory"/>
          <!-- 按钮组件 -->
          <!--  @click="insertCart()" -->
          <XtxButton type="primary" style="margin-top:20px">加入购物车</XtxButton>
        </div>
      </div>

      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />

      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs :goods="goods" />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot />
          <GoodsHot :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsWarn from './components/goods-warn'
import GoodsHot from './components/goods-hot'
import GoodsTabs from './components/goods-tabs'
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image'
import GoodsSales from './components/goods-sales'
import GoodsName from './components/goods-name'
import GoodsSku from './components/goods-sku'
import { nextTick, provide, ref, watch } from 'vue'
import { findGoods } from '@/api/product'
import { useRoute } from 'vue-router'
export default {
  name: 'XtxGoodsPage',
  components: { 
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
    GoodsWarn
  },
  setup () {
    // 获取商品详情，进行渲染
    const goods = useGoods()
    // 监听是否能够收到值
    const changeSku = (sku) => {
      // 修改商品的现价原价库存信息
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }

    // 提供goods数据给后台组件使用，子孙组件注入goods数据，进行渲染展示
    provide('goods', goods)

    // 选择的数量
    const num = ref(1)

    return { goods, changeSku, num }
  }
}
// 获取商品详情(定义到该函数里，setup进行渲染)
const useGoods = () => {
  // 出现路由地址商品ID发生变化，但是不会重新初始化组件
  const goods = ref(null)
  const route = useRoute()
  watch(() => route.params.id, (newVal) => {
    if (newVal && `/product/${newVal}` === route.path) {
      findGoods(route.params.id).then(data => {
        // 让商品数据为null让后使用v-if的组件可以重新销毁和创建
        goods.value = null
        nextTick(() => {
          goods.value = data.result
        })
      })
    }
  }, { immediate: true })
  return goods
}
</script>

<style lang="less" scoped>
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 100px;
  }
}
// .goods-tabs {
//   min-height: 600px;
//   background: #fff;
// }
// .goods-warn {
//   min-height: 600px;
//   background: #fff;
//   margin-top: 20px;
// }
</style>