// 购物车模块
import { getNewCartGoods } from '@/api/cart'
// 购物车状态
import { mergeCart } from '@/api/cart'
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
    },
    // 修改购物车商品
    updateCart (state, goods) {
      // goods 商品信息：nowPrice stock isEffective
      // goods 商品对象的字段不固定，对象中有哪些字段就改哪些字段
      // goods 商品对象 必须有SKUID
      const updateGoods = state.list.find(item => item.skuId === goods.skuId)
      for (const key in goods) {
        if (goods[key] !== undefined && goods[key] !== null && goods[key] !== '') {
          updateGoods[key] = goods[key]
        } 
      }
    },
    // 删除购物车商品
    deleteCart (state, skuId) {
      const index = state.list.findIndex(item => item.skuId === skuId)
      state.list.splice(index, 1)
    },
    // 设置购物车列表
    setCart(state, payload) {
      // payload 为空数组，清空。 为有值数组，设置。
      state.list = payload
    }
  },
  actions: {
    // 合并购物车
    async mergeCart (ctx) {
      // 准备合并的参数
      const cartList = ctx.state.list.map(goods => {
        return {
          skuId: goods.skuId,
          selected: goods.selected,
          count: goods.count
        }
      })
      await mergeCart(cartList)
      // 合并成功，清空本地购物车
      ctx.commit('setCart', [])
    },
    // 修改规格
    updateCartSku (ctx, {oldSkuId, newSku}) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // 已登录
        } else {
          // 未登录(本地)
          // 但你修改了sku的时候其实skuId需要更改，相当于把原来的信息移出，创建一条新的商品信息。  
          // 1.获取旧的商品信息
          const oldGoods = ctx.state.list.find(item => item.skuId === oldSkuId)
          // 2.删除旧的商品数据
          ctx.commit('deleteCart', oldSkuId)
          // 3.根据新的sku信息和旧的商品信息，合并成一条新的购物车商品数据
          const { skuId, price:nowPrice, specsText:attrsText, inventory:stock } = newSku
          const newGoods = {...oldGoods, skuId, nowPrice, attrsText, stock}
          // 4.添加新的商品
          ctx.commit('insertCart', newGoods)
          resolve()
        }
      })
    },
    // 批量删除
    batchDeleteCart (ctx, isClear) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          // 找出选中的商品列表，遍历调用删除的mutations
          // isClear 为 true 删除失效商品列表，否则是选中的商品列表
          ctx.getters[isClear ? 'invalidList' : 'selectedList'].forEach(item => {
            ctx.commit('deleteCart', item.skuId)
          })
          resolve()
        }
      })
    },
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
    },
    // 获取商品列表
    findCart (ctx) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          // 同时发送请求（与几个商品发几个请求）等所有请求成功，一并去修改本地数据
          // promise.all([promise数组]).then((dataList)=> {}) 同时发送请求，所有请求成功，得到所有成功结果
          // Promise提供的方法：
          // Promise.resolve() Promise.reject() new Promise()
          // Promise.race(promise数组).then((data)=> {})同时发请求，最快的请求成功，得到成功结果 
          const promiseArr = ctx.state.list.map(goods => {
            return getNewCartGoods(goods.skuId)
          })
          // dataList 成功结果的集合，数据顺序和promiseArr顺序一致，它又是根据state.list而来
          Promise.all(promiseArr).then(dataList => {
            // 更新本地购物车
            dataList.forEach((data, i) => {
              ctx.commit('updateCart', { skuId: ctx.state.list[i].skuId, ...data.result })
            })
            // 调用resolve代表操作成功
            resolve()
          })
        }
      })
    },
    // 删除购物车
    deleteCart (ctx, payload) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录

        } else {
          // 未登录
          // 单条删除 payload 现在 就是skuId
          ctx.commit('deleteCart', payload)
          resolve()
        }
      })
    },
    // 修改购物车（选中状态，数量）
    updataCart (ctx, paylod) {
      // paylod 需要：必需有skuId 可能：selected count
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.commit('updateCart', paylod)
          resolve()
        }
      })
    },
    // 全选与取消全选
    checkAllCart (ctx, selected) {
      return new Promise((resolve, reject) => {
        if (ctx.rootState.user.profile.token) {
          // TODO 已登录
        } else {
          // 未登录
          ctx.getters.validList.forEach(goods => {
            ctx.commit('updateCart', { skuId: goods.skuId, selected })
          })
          resolve()
        }
      })
    }
  },
  getters: {
    // 有效商品列表
    validList (state) {
      // 有效商品：库存大于0 -> stock, 商品有效标识为true -> isEffective
      return state.list.filter(goods => goods.stock > 0 && goods.isEffective)
    },
    // 有效商品总件数
    validTotal(state, getters) {// p 是上一个回调的结果  从0开始累加
      // reduce 累加
      return getters.validList.reduce((p,c) => p + c.count, 0)
    },
    // 有效商品总余额
    validAmount (state,getters) { // 件数*价格 , *100再/100是防止有浮点数
      // return getters.validList.reduce((p,c) => p + c.nowPrice * 100 * c.count, 0) / 100
      return getters.validList.reduce((p, c) => p + parseInt(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 无效商品列表
    invalidList (state) {
      return state.list.filter(goods => goods.stock <= 0 && !goods.isEffective) 
    },
    // 已选商品列表 (有效商品里面拿)
    selectedList (state, getters) { // 从有效商品列表中查已选择的列表
      return getters.validList.filter(item => item.selected)
    },
    // 已选商品总件数
    selectedTotal(state, getters) {// p 是上一个回调的结果  从0开始累加
      // reduce 累加
      return getters.selectedList.reduce((p, c) => p + c.count, 0)
    },
    // 已选商品总金额
    selectedAmount(state, getters) { // 件数*价格 , *100再/100是防止有浮点数 Math.round四舍五入
      return getters.selectedList.reduce((p, c) => p + Math.round(c.nowPrice * 100) * c.count, 0) / 100
    },
    // 是否全选
    isCheckAll (state, getters) {
      return getters.validList.length !== 0 && getters.selectedList.length === getters.validList.length
    } 
  }
}