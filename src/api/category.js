// 定义分类相关的API接口函数
// 调用后台的接口 需要一个请求工具类
import request from '@/utils/request'

/**
 * 获取所有分类 (顶级，二级，对应的商品推荐数据)
 * @returns Promise
 */ 
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
/**
 * 获取单个顶级分类信息（children属性就是各个子分类）
 * @param {String} id - 顶级分类ID
 */
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
/**
 * 获取二级分类筛选条件数据
 * @param {String} id - 二级分类ID
 * @returns 
 */
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}
/**
 * 获取分类下的商品(带筛选条件)
 * @param {Object} params -可参考接口文档 
 */
export const findSubCategoryGoods = (params) => {
  return request('/category/goods/temporary', 'post', params)
}