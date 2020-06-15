import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)
const FileList = ['../views/main']
const componentsContext = require.context('../views/main', true, /.vue$/)

let main = componentsContext.keys().map(item=>{
  let a = item.split('/')
  let [z,...pathArr] = a
  let path = pathArr.join('/')
  //vue叫啥name就是啥
  let name = a[a.length-1].split('.vue')[0]
  
  let b = item.substring(2,item.length-4)
  let c = `../views/main/${b}.vue`
  let d = '../views/main/AAA/AAA.vue'
  //let musicobj = require(`../views/main/${b}.vue`)
  //let sk = ()=>import(`../views/main/${b}.vue`).then(items => {console.log(items)})
  // return{
  //   path: '/'+a[a.length - 1],
  //   name: name,
  //      // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ `../views/main/${b}.vue`)
  // }
  return{
    path: '/'+name,
    name: name,
    meta:{
      level:pathArr.length,
    },
    
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ `../views/main/${b}.vue`)
  }
})
console.log(main)
let routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/404',
    name: '404',
    // route level code-splitting
    // this generates a separate chunk (about.[hamain].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/components/404/404.vue')
  },
  {
    path: '/垃圾/关心天气.vue',
    name: 'AAA',
    // route level code-splitting
    // this generates a separate chunk (about.[hamain].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/main/垃圾/关心天气.vue')
  },
  ...main
]
let map = routes.map(item=>{let {component,...res}=item;return res})
store.commit('edit',{name:'map',value:map})
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
