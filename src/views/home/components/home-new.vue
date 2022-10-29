<template>
  <!-- 新鲜好物 -->
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
        <!-- <div style="position:relative;height:406px"> -->
          <Transition name="fade">
            <!-- 面板内容 -->
            <ul v-if="goods.length" ref="pannel" class="goods-list">
              <li v-for="item in goods" :key="item.id">
                <!-- 新鲜好物跳转 -->
                <RouterLink to="`/product/${item.id}`">
                  <img :src="item.picture" alt="">
                  <p class="name ellipsis">{{item.name}}</p>
                  <!-- &yen;人民币书写格式 -->
                  <p class="price">&yen;{{item.price}}</p>
                </RouterLink>
              </li>
            </ul>
            <!-- 如果没有数据时就显示骨架效果 -->
            <HomeSkeleton bg="#f0f9f4" v-else />
          </Transition>
        <!-- </div> -->
    </HomePanel>
  </div>
</template>

<script>
import { ref } from 'vue'
import HomePanel from './home-panel'
import HomeSkeleton from './home-skeleton'
import { findNew } from '@/api/home'
export default {
  name: 'HomeNew',
  components: { HomePanel,HomeSkeleton },
  setup () {
    const goods = ref([])
    findNew().then(data => {
      goods.value = data.result
    })
    return { goods }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>