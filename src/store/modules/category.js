// vuex在category模块，来存储分类数据，提供修改和获取的函数
// 分类模块
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
export default {
  namespaced: true,
  state: () => {
    return {
      // 如果默认是[]数组，看不见默认的9个分类，等你数据加载完毕才会看到。
      // 所以：根据常量数据来生成一个默认的顶级分类数据，不会出现空白（没数据的情况）
      // 分类信息集合,依赖topCategory重新设置，保证初始化就要数据，不至于白屏
      list: topCategory.map(item => ({ name: item }))
    }
  },
  // 加载数据成功后需要修改list所以需要mutations函数
  // 修改分类函数
  mutations: {
    // payload 所有的分类集合
    setList (state, payload) {
      state.list = payload
    },
    // 定义show和hide函数，控制当前分类的二级分类显示和隐藏
    // 修改当前一级分类下的open数据为true
    show (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = true
    },
    // 修改当前一级分类下的open数据为false
    hide (state, id) {
      const currCategory = state.list.find(item => item.id === id)
      currCategory.open = false
    }
  },
  // 需要向后台加载数据，所以需要actions函数获取数据
  // 获取分类函数
  actions: {
    async getList ({ commit }) {
      // 获取分类数据
      const data = await findAllCategory() 
      // 给一级分类加上一个控制二级分类显示隐藏的数据open
      data.result.forEach(top => {
        top.open = false
      })
      // 获取数据成功，提交mutations进行数据修改
      // 修改分类数据
      commit('setList',data.result)
    }
  }
}