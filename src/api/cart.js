// 封装购物车相关的API函数
import request from "@/utils/request";

/**
 * 获取商品的 最新价格 库存 是否有效
 * @param {*} skuId - SKU id
 */
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}

/**
 * 获取商品对应的sku数据
 * @param {string} skuId SKU id
 */
export const getGoodsSku = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}

/**
 * 合并购物车
 * @param {Array<object>} cartList -本地购物车数组
 * @param {String} item.skuId -商品SKUID
 * @param {Boolean} item.selected -是否选中
 * @param {Integer} item.count -数量 
 */
export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}