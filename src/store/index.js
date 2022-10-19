import { createStore } from 'vuex'
// 使用vuex-persistedstate插件来进行持久化
import createPersistedstate from 'vuex-persistedstate'

// 三个模块
import user from './modules/user'
import cart from './modules/cart'
import category from './modules/category'

export default createStore({
  modules: {
    user,
    cart,
    category
  },
  // 配置插件
  plugins: [
    // 默认存储在localStorage上
    createPersistedstate({
      // key是本地存储名字
      key: 'erabbit-client-pc-124-store',
      // paths是存储state中的那些数据，如果是模块下具体的数据需要加上模块名称，如user.token
      // 指定需要存储的模块
      paths: ['user','cart']
      // 修改state后触发才可以看到本地存储数据的的变化
    })
  ]
})