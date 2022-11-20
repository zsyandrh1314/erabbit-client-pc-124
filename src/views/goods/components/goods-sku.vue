<template>
<!-- 规格组件 -->
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{item.name}}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{selected:val.selected}" @click="changeSku(item,val)" v-if="val.picture" :src="val.picture" :title="val.name">
          <span :class="{selected:val.selected}" @click="changeSku(item,val)" v-else>{{val.name}}</span>
        </template>
      </dd>
    </dl>
   
  </div>
</template>

<script>
import powerSet from '@/vender/power-set'
const spliter = '❤'
// 得到一个路径字典对象
const getPathMap = (skus) => {
  // 1.得到所有的sku集合,props.goods.skus
  // 2.从所有的sku中筛选出有效的sku
  // 3.根据有效的sku使用power-set算法得到子集
  // 4.根据子集往路径字典对象中存储key-value
  const pathMap = {}
  skus.forEach (sku => {
    // 1. 过滤出有库存有效的sku (inventory库存)
    if (sku.inventory > 0) {
    // 计算当前有库存的sku的子集
    // 例如：[1,2,3] ==> [[1],[2],[3],[1,2],[1,3],[2,3]]
    // 2. 得到sku属性值数组
    const valueArr = sku.specs.map(val => val.valueName)
    // 3. 得到sku属性值数组的子集
    const valueArrPowerSet = powerSet(valueArr)
     // 4. 设置给路径字典对象(遍历子集，往pathMap插入数据)
     valueArrPowerSet.forEach(arr => {
      // 根据arr得到字符串的key，约定key是['蓝色','美国'] ==> '蓝色'❤'美国'
      const key = arr.join(spliter)
      // 给pathMap设置数据
      if (pathMap[key]) {
        // 已经有key往数组追加
        pathMap[key].push(sku.id)
      } else {
        // 没有key设置一个数组
        pathMap[key] = [sku.id]
      }
     })
    }
  })
  return pathMap
}
  export default {
    name: 'GoodsSku',
    props: {
      goods: {
        type: Object,
        default: () => ({specs:[], skus:[]})
      }
    },
    setup(props) {
      const pathMap = getPathMap(props.goods.skus)
      console.log(pathMap);
      // 1.选中与取消选中的逻辑,约定在每一个按钮都拥有自己的选中状态数据：selected
        // 1.1 点击的是已选中，只需要取消当前的选中
        // 1.2 点击的是未选中，把同一个规格的按钮改成未选中，当前点击的改成选中
      const changeSku = (item, val) => {
        if (val.selected) {
          val.selected = false
        } else {
          item.values.forEach(valItem => {
            valItem.selected = false
          })
          val.selected = true
        }
      }
      return {changeSku}
    }
  }
</script>

<style lang="less" scoped>
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>