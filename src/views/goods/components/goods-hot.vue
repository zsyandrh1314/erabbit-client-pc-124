<template>
<!-- 热榜组件 -->
<!-- 大致步骤：
  定义一个组件，完成多个组件展现型态，根据传入组件的类型决定。
  1代表24小时热销榜 2代表周热销榜 3代表总热销榜
  获取数据，完成商品展示和标题样式的设置。 -->
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <div v-if="goodsList">
      <GoodsItem v-for="item in goodsList" :key="item.id" :goods="item" />
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { findHotGoods } from '@/api/product'
import GoodsItem from '../../category/components/goods-item'
  export default {
    name: 'GoodsHot',
    components: { GoodsItem },
    props: {
      type: {
        type: Number,
        default: 1
      },
      goodsId: {
        type: String
      }
    },
    setup(props) {
      // 处理标题
      const titleObj = {1:'24小时热销榜',2:'周热销榜',3:'总热销榜'}
      const title = computed(() => {
        return titleObj[props.type]
      })
      // 商品列表
      const goodsList = ref([])
      findHotGoods({ id: props.goodsId, type: props.type }).then(data => {
      goodsList.value = data.result.map(item => {
        item.tag = item.desc
        return item
      })
    })
      return { title, goodsList }
    }
  }
</script>

<style lang="less" scoped>
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>