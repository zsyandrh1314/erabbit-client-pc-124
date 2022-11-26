<template>
<!-- 评价里的图片预览组件 -->
  <div class="goods-comment-image">
    <!-- 图片列表 -->
    <div class="list">
      <a 
        href="javascript:;"
        :class="{active:currImage === url}"
        @click="currImage=url"
        v-for="url in pictures"
        :key="url"
      >
        <img :src="url" alt="">
      </a>
    </div>

    <!-- 预览图片界面 -->
    <div class="preview" v-if="currImage">
      <img :src="currImage" alt="">
      <!-- 关闭图片预览 -->
      <i @click="currImage=null" class="iconfont icon-close-new"></i>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue-demi'
  export default {
    name: 'GoodsCommentImage',
    props: {
      pictures: {
        type: Array,
        default: () => []
      }
    },
    setup() {
      const currImage = ref(null)
      return { currImage }
    } 
  }
</script>

<style lang="less" scoped>
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain; // 图片保持原有尺寸比例(宽度铺满整个容器,高度等比缩放,超出则裁剪)
      }
      &.active {
        border-color: @xtxColor;
      }
    }
  }
  .preview {
    width: 480px;
    height: 480px;
    border: 1px solid #e4e4e4;
    background: #f8f8f8;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    i {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>