<template>
 <div>APP组件</div>
 <ul>
   <li v-for="item in $store.getters.boys" :key="item.id">{{item.name}}</li>
 </ul>
 <!-- 使用模块A的username -->
 <p>A的username --- {{$store.state.a.username}}</p>
 <p>A的changeName --- {{$store.getters.changeName}}</p>
 <hr>
 <p>B的username --- {{$store.state.b.username}}</p>
 <p>B的changeName --- {{$store.getters['b/changeName']}}</p>
 <button @click="$store.commit('b/update')">修改username</button>
 <button @click="$store.dispatch('b/update')">异步修改username</button>
</template>
<script>
// import { useStore } from 'vuex';
export default {
  name:'App',
  setup() {
    // const store = useStore()
    // const mutationsFn = () => {
    //   // 2.3 提交B模块的修改
    //   store.commit('b/updateName')
    // }
    // const actionFn = () => {
    //   // 2.4 调用B模块的actions
    //   store.dispatch('b/updateName')
    // }
    // return {
    //   mutationsFn,
    //   actionFn
    // }
  }
}
</script>