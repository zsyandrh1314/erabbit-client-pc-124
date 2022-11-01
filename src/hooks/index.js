// 提供复用逻辑的函数（钩子）
// hooks 封装逻辑，提供响应式数据
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

/**
 * 数据懒加载函数
 * @param {Element} target - Dom对象 
 * @param {Function} apiFn - API函数
 */
export const useLazyData = (apiFn) => {
  // 需要
  // 1. 被观察的对象
  // 2. 不同的API函数
  const target = ref(null)
  const result = ref([])
  // stop 停止观察
  const { stop } = useIntersectionObserver(
    // target 监听的目标元素
    target,
    ([{ isIntersecting }], observerElement) => {
      // isIntersecting 是否进入可视区域
      if (isIntersecting) {
        stop()
        // 调用API获取数据
        apiFn().then(data => {
          result.value = data.result
        })
      }
    },
    // 配置选项，相交的比例大于0就触发
    // 产品区域需要滚动比较多才能去加载数据 所以需要用到 threshold
    {
      threshold: 0
    }
  )
  // 返回--->数据（dom,后台数据）
  return { target, result }
}