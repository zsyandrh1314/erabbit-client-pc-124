<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread />
      <!-- 筛选区 -->
      <SubFilter />
      <!-- 结果区域  商品面板（排序+列表）-->
      <div class="good-list">
        <!-- 排序 -->
        <SubSort />
        <!-- 列表 -->
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter'
import SubSort from './components/sub-sort';
import { ref } from 'vue'
  export default {
    name: 'SubCategory',
    setup() {
      const isAllChecked = ref(true)
      return {isAllChecked}
    },
    components: {
      SubBread,
      SubFilter,
      SubSort
    }
  }
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
}
</style>