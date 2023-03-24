// 定义函数
import { createVNode, render } from 'vue'
import XtxConfirm from './xtx-confirm.vue'

// 准备一个DOM  div
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

// 该函数渲染XtxConfirm组件，标题和文本
// 函数的返回值是promise对象，点取消销毁组件,点确认销毁组件
export default ({ title, text }) => {
  // 1. 导入被创建的组件
  // 2. 使用createVNode创建虚拟节点
  // 3. 准备一个dom容器装载组件
  // 4. 使用render函数渲染组件到容器
  return new Promise((resolve, reject) => {
    // 点击确认触发的函数
    const submitCallback = () => {
      render(null, div)
      resolve()
    }
    // 点击取消触发的函数 
    const cancelCallback = () => {
      render(null, div)
      reject(new Error('点击取消'))
    }
    // 1. 渲染组件
    // 2. 点击确认按钮，触发resolve同时销毁组件
    // 3. 点击取消按钮，触发reject同时销毁组件
    const vn = createVNode(XtxConfirm, { title, text, submitCallback, cancelCallback })
    render(vn, div)
  })
}