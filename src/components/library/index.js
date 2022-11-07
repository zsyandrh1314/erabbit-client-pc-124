// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import defaultImg from '@/assets/images/200.png'
import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import XtxBread from './xtx-bread.vue'
import XtxBreadItem from './xtx-bread-item.vue'

export default {
  install(app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    // 全局注册轮播图
    app.component(XtxCarousel.name,XtxCarousel)
    // 全局注册查看更多组件
    app.component(XtxMore.name, XtxMore)
    // 注册顶级类目面包屑组件
    app.component(XtxBread.name, XtxBread)
    app.component(XtxBreadItem.name, XtxBread)

    // 定义指令
    defineDirective(app)
  }
}

// 定义指令
const defineDirective = (app) => {
  // 1.图片懒加载指令 v-lazy
  // 原理：先存储图片地址不能在src上，当图片进入可视区，将你存储图片的地址设置给图片元素即可(操作dom)
  app.directive('lazy', {
    // vue2.0 监听使用指令的DOM是否创建好，钩子函数:inserted
    // vue3.0 的指令拥有的钩子函数和组件一样，使用指令的DOM是否创建好，钩子函数:mounted
    mounted (el, binding) {
      // console.log('mounted');
      // 2.创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        // isIntersecting 来判断是否进入可视区
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 3.把指令的值设置给el的src属性 binding.value 就是指令的值
          // 4.处理图片加载失败 error图片加载失败事件 load 图片加载成功
          el.onerror = () => {
            // 加载失败，设置默认图片
            el.src = defaultImg
          }
          el.src = binding.value
          // console.log('进入可视区', el);
        }
      }, {
        threshold: 0.01
      })
      observe.observe(el)
    }
  })
}