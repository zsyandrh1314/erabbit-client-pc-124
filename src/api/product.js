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
export const findRelevantGoods = ({id, limit = 16}) => {
  return request('/goods/relevant', 'get', { id, limit })
}
/**
 * 获取热榜商品数据
 * @param {String} id - 商品ID
 * @param {Integer} limit - 商品数量
 * @param {Integer} type - 热销类型：1代表24小时热销榜 2代表周热销榜 3代表总热销榜 默认为1
 */
export const findHotGoods = ({ id, limit = 3, type = 1}) => {
  return request('/goods/hot', 'get', { id, limit, type })
}
/**
 * 查询商品评价信息
 * @param {String} id - 商品ID
 * @returns
 */
export const findGoodsCommentInfo = (id) => {
  // return request(`/goods/${id}/evaluate`, 'get')
  // axios 遇见 http https 开头的地址，不会加上基准地址
  return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}