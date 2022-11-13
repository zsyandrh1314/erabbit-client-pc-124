<template>
  <!-- 顶级分类-基础布局搭建
   完成顶级分类的，面包屑+轮播图+所属全部子级分类展示 -->
  <div class="top-category">
    <!-- 一级类目 -->
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
          <XtxBreadItem :key="topCategory.id">{{topCategory.name}}</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height:500px" /> 
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <a href="javascript:;">
              <img :src="sub.picture" >
              <p>{{sub.name}}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 各个分类推荐商品 不同分类商品 -->
      <!-- 分类关联商品 -->
       <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{sub.name}} -</h3>
          <!-- <p class="tag">{{sub.desc}}</p> -->
          <p class="tag">温暖柔软，品质优选</p>
          <XtxMore :path="`/category/sub/${sub.id}`"/>
        </div>
        <div class="body">
          <!-- goods 商品集合 api文档里最大数量：5 -->
          <GoodsItem v-for="goods in sub.goods" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>

<script> 
// 从vuex获取分类数据，进行渲染
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { computed,ref, watch } from 'vue'
import { findBanner } from '@/api/home'
import GoodsItem from './components/goods-item'
import { findTopCategory } from '@/api/category'

export default {
    name: 'TopCategory',
    components: {
      GoodsItem
    },
    setup() {
      // 轮播图
      const sliders = ref([])
      findBanner().then(data => {
        sliders.value = data.result
      })

       // 面包屑+所有子分类 ===> 都在vuex里
      const store = useStore()
      const route = useRoute()
      const topCategory = computed(() => {
        // 当前顶级分类 === 根据路由上的ID去vuex中category模块的list中查找
        let cate = {}
        const item = store.state.category.list.find(item => {
          return item.id === route.params.id
        })
        if (item) cate = item
        return cate

      })

      // 使用watch加载数据
      // 获取各个子类目推荐商品
      const subList = ref([])
      const getSubList = () => {
        findTopCategory(route.params.id).then(data => {
          subList.value = data.result.children
        })
      }
      //  immediate: true可让watch初始化的时候主动触发一次
      watch(() => route.params.id, (newVal) => {
        // newVal && getSubList() 加上一个严谨判断，在顶级类名下才发请求
        if(newVal && `/category/${newVal}` === route.path) getSubList()
      }, { immediate: true })

      return {
        sliders,
        topCategory,
        subList
      }
    } 
  }
</script>

<style lang="less" scoped>
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
   background-color: #fff;
   margin-top: 20px;
   position: relative;
   .head {
     .xtx-more {
       position: absolute;
       top: 20px;
       right: 20px;
     }
     .tag {
       text-align: center;
       color: #999;
       font-size: 20px;
       position: relative;
       top: -20px;
     }
   }
   .body {
     display: flex;
     justify-content: flex-start;
     flex-wrap: wrap;
     padding: 0 65px 30px;
   }
  }
}
</style>