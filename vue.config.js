// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   //关闭eslint校验
//   // lintOnSave: false
//   transpileDependencies: true,

//   pluginOptions: {
//     'style-resources-loader': {
//       preProcessor: 'less',
//       // 哪些文件自动引入，使用绝对路径
//       // 需要是path.join来拼接完整路径
//       patterns: []
//     }
//   }
// })
const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // 哪些文件自动引入，使用绝对路径
        // 需要是path.join来拼接完整路径
        path.join(__dirname, './src/assets/styles/variables.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  }
}
