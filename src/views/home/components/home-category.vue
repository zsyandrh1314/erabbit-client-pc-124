<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id">
        <!-- 一级类目 -->
        <RouterLink :to="`/category/${item.id}`">{{item.name}}</RouterLink>
        <!-- 二级类目 -->
        <template v-if="item.children">
          <RouterLink
            v-for="sub in item.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`">
            {{sub.name}}
          </RouterLink>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { reactive, computed } from 'vue'   
export default {
  name: 'HomeCategory',
  // 1. 获取vuex的一级分类，并且只需要两个二级分类
  // 2. 需要在组件内部，定义一个品牌数据
  // 3. 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据(9分类+1品牌)数组
  // 4. 进行渲染即可
  setup () {  
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-children', name: '品牌推荐' }]
    })
    
    const store = useStore()
    // 左侧分类菜单的列表 最终使用的数据 = 9个分类(包括2个子分类) + 1个品牌
    const menuList = computed(() => {
      // 得到9个分类且每个一级分类下的子分类只有两个
      const list = store.state.category.list.map(item => {
        return {
          // 一级分类的
          id: item.id,
          name: item.name,
          // 防止初始化没有children的时候调用slice函数报错
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })
    return { menuList }
  }
}
</script>

<style lang="less" scoped>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0,0,0,0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      &:hover {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
}
</style>