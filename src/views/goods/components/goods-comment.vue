<template>
<!-- 评价组件 -->
  <div class="goods-comment">
    <!-- 如果commentInfo有数据就渲染 -->
    <div class="head" v-if="commentInfo">
      <div class="data">
        <p>
          <span>{{commentInfo.salesCount}}</span>
          <span>人购买</span>
        </p>
        <p>
          <span>{{commentInfo.praisePercent}}</span>
          <span>好评率</span>
        </p>
      </div>
      <!-- 标签 -->
      <div class="tags">
        <div class="dt">大家都在说：</div>
        <div class="dd">
          <a 
          v-for="(item,i) in commentInfo.tags"
          :key="item.title"
          href="javascript:;"
          :class="{active:currentTagIndex === i}"
          @click="changeTag(i)"
          >
          {{item.title}} （{{item.tagCount}}）
          </a>
        </div>
      </div>
    </div>
    <div class="sort">
      <span>排序：</span>
      <a href="javascript:;" class="active">默认</a>
      <a href="javascript:;">最新</a>
      <a href="javascript:;">最热</a>
    </div>
    <!-- 评价列表 -->
    <div class="list"></div>
  </div>
</template>
<script>
import { inject, ref } from 'vue'
import { findGoodsCommentInfo } from '@/api/product'
export default {
  name: 'GoodsComment',
  setup() {
    // 获取评价信息
    const commentInfo = ref(null)
    // 传入id 父组件provide的goods数据进行接收
    const goods = inject('goods')
    findGoodsCommentInfo(goods.value.id).then(data => {
      data.result.tags.unshift({
        title: '有图', 
        tagCount: data.result.hasPictureCount
      })
      data.result.tags.unshift({
        title:'全部评价', 
        tagCount: data.result.evaluateCount
      })
      // 设置数据之前，tags数组前需要追加  有图tag 和 全部评价tag
      commentInfo.value = data.result
    })
    // 激活tag标签 索引默认激活全部所以为0
    const currentTagIndex = ref(0)
    // 得到索引
    const changeTag = (i) => {
      currentTagIndex.value = i
    }
    return { commentInfo, currentTagIndex, changeTag }
  }
}
</script>
<style scoped lang="less">
.goods-comment {
  .head {
    display: flex;
    padding: 30px 0;
    .data {
      width:340px;
      display: flex;
      padding: 20px;
      p {
        flex: 1;
        text-align: center;
        span {
          display: block;
          &:first-child {
            font-size: 32px;
            color: @xtxColor;
          }
          &:last-child {
            color: #999;
          }
        }
      }
    }
    .tags {
      flex: 1; // flex为 1 平等分
      display: flex;
      border-left: 1px solid #f5f5f5;
      .dt {
        font-weight: bold;
        width: 100px;
        text-align: right;
        line-height: 42px;
      }
      .dd {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        > a {
          width: 132px;
          height: 42px;
          margin-left: 20px;
          margin-bottom: 20px;
          border-radius: 4px;
          border: 1px solid #e4e4e4;
          background: #f5f5f5;
          color: #999;
          text-align: center;
          line-height: 40px;
          &:hover {
            border-color: @xtxColor;
            background: lighten(@xtxColor,50%);
            color: @xtxColor;
          }
          &.active {
            border-color: @xtxColor;
            background: @xtxColor;
            color: #fff;
          }
        }
      }
    }
  }
  .sort {
    height: 60px;
    line-height: 60px;
    border-top: 1px solid #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    margin: 0 20px;
    color: #666;
    > span {
      margin-left: 20px;
    }
    > a {
      margin-left: 30px;
      &.active,&:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>