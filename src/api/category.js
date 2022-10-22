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