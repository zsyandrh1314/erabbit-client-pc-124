<template>
    <!-- 二级类目-展示面包屑-->
    <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem :key="category.top.id" v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</XtxBreadItem>
      <XtxBreadItem :key="category.sub.id" v-if="category.sub">{{category.sub.name}}</XtxBreadItem>
  </XtxBread>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
export default {
  name: 'SubBread',
  setup () {
      // 通过计算属性从vuex获取顶级和二级类目信息
      // 数据对象： {top:{id,name},sub:{id:name}}
      // 1.获取二级分类的ID，地址在路由中
      const route = useRoute() 
      // 2.获取vuex中的类目数据
      const store = useStore()
      // 3.通过计算属性得到，二级类目的名称和ID，一级类目的名称和ID
      const category = computed(() => {
        const cate = {}
        // 完成获取数据逻辑
        store.state.category.list.forEach(top => {
        if (top.children) {
          const sub = top.children.find(sub => sub.id === route.params.id)
          if (sub) {
              // 设置一级类目
              cate.top = { id: top.id, name: top.name }
              // 设置二级类目
              cate.sub = { id: sub.id, name: sub.name }
            }
          }
        })
        return cate
      })
      // 模板需要使用的东西需要setup返回
      return { category }
    }
  }
</script>

<style lang="less" scoped>

</style>