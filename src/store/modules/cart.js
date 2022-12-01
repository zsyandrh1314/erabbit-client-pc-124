// 购物车模块
export default {
  namespaced: true,
  state: () => {
    return {
      // 购物车商品列表
      list: []
    }
  },
  mutations: {
    // 约定加入购物车字段必须和后端保持一致 payload对象 的字段
    // 字段有： id(商品的ID) skuId(SKUID真正确定有没有商品库存的是这个) name(商品名称) attrsText(属性文字，例如“颜色:瓷白色 尺寸：8寸”) 
    // picture(商品图片) price(加入时价格) nowPrice(当前的价格) selected(是否选中) stock(库存) count(数量) isEffective(是否为有效商品)
    // 插入数据规则：
    // 1.先找下是否有相同商品
    // 2.如果有相同的商品，查询它的数量，累加到payload上，再保存最新位置上，原来商品需要删除
    // 3.如果没有相同商品，保存在最新位置即可
    // 加入购物车
    insertCart (state, paylod) {
      const sameIndex = state.list.findIndex(goods => goods.skuId === paylod.skuId)
      // 商品没找到就为-1， >-1就是找到相同商品
      if (sameIndex > -1) {
        // 原有商品的数量
        const count = state.list[sameIndex].count
        // paylod 就是要添加的商品
        paylod.count += count
        // 删除原有商品
        state.list.splice(sameIndex, 1)
      }
      // 追加新的 unshift往最新位置上添加
      state.list.unshift(paylod)
    }
  },
  actions: {
    // 加入购物车
    // ctx 执行上下文
    insertCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录

        } else {
          // 未登录
          ctx.commit('insertCart', payload)
          resolve()
        }
      })
    }
  }
}