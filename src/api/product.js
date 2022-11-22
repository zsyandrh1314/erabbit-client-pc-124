// 提供商品相关的API函数 
import request from '@/utils/request'

/**
 * 获取商品详情
 * @param {String} id - 商品ID
 */
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
/**
 * 获取相关推荐商品 | 猜你喜欢
 * @param {String} id 商品ID -传入相关推荐，不传为猜你喜欢
 * @param {Integer} limit 获取商品数量
 */
export const findRelevantGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit })
}
