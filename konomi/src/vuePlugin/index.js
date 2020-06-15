import Vue from 'vue'
//import store from '@/store'
//import { mapGetters, mapMutations } from 'vuex'
//import { loginRcs } from '@/api/login'
//import RSA from '@/utils/RSA'

const vuePlugin = () => {
  Vue.mixin({
    data(){
      return{
        ITELLYOU:"THISISMIXIN"
      }
    },
    computed: {
      //...mapGetters(['themeColor', 'userId', 'menuList', 'colorSelectV'])
    },
    methods:{
      // ...mapMutations({
      //   setMenuRouterData: 'SET_MENUROUTERDATA',
      //   setToken: 'SET_TOKEN',
      //   setAppid: 'SET_APPID',
      //   setUserid: 'SET_USERID',
      //   setThemeColor: 'SET_THEMECOLOR',
      //   setKeepAliveArr: 'SET_KEEPALIVEARR',
      //   setColorSelectV: 'SET_COLORSELECTV'
      // }),
      /**
       * api请求 (适用于类似操作)
       * @param {api} 方法
       * @param {params} 参数
       * @param {message} 回调提示信息
       */
      // m_apiFn(api,params,message){
      //   return new Promise((resolve)=>{
      //     api(params).then((data)=>{
      //       if(data.statusCode == '200'){
      //         message&&this.$message.success(message)
      //         resolve(data)
      //       }else if(data.statusCode == '708') {
      //         message&&this.$message.warning(data.message)
      //         resolve(data)
      //       }
      //     })
      //   })
      // },
      /**
       *加密
       */
      // m_loginRcs() {
      //   return new Promise((resolve)=>{
      //     return this.m_apiFn(loginRcs).then((data)=>{
      //       RSA.setMaxDigits(130)
      //       const { publicExponent, publicModulus } = data.result
      //       const key = new RSA.RSAKeyPair(publicExponent, '', publicModulus)
      //       resolve(key)
      //       return key
      //     })
      //   })
      // },
      /**
       * 深拷贝
       * @param {*} formName 
       */
      m_rolColor(){
        let r = ()=>Math.floor(Math.random()*156)
        return `rgb(${r()}, ${r()}, ${r()});`
      },
      m_copy(v) {
        return JSON.parse(JSON.stringify(v))
      },
      /**
       * 重置表单操作
       * @param {formName} 表单ref名 
       */
      m_restform(formName) {
        const ref = this.$refs[formName]
        ref.resetFields()
        ref.clearValidate()
      },
      // 设置cookie
      m_setCookies(obj){
        this.$cookies.set(obj.keyName, obj.value, obj.time)
      },
      // 取cookie
      m_getCookies(key) {
        return this.$cookies.get(key)
      },
      // 删除cookie
      m_removeCookies(key) {
        this.$cookies.remove(key)
      },
      /**
       * 缓存页面
       * @param {e} 参数e: 将要缓存页面的name名，例如：{to.name}
       */
      // m_setPagesCache(e) {
      //   let deepKeepAliveArr = this.m_copy(store.state.keepAliveArr)
      //   deepKeepAliveArr[e].keepAlive = deepKeepAliveArr[e].closeTabs
      //   setTimeout(()=>{ this.setKeepAliveArr(deepKeepAliveArr) }, 0)
      // },
      /**
       * 取消页面缓存
       * @param {e} 参数e: 取消缓存页面的name名
       */
      // m_removePagesCache(e) {
      //   let deepKeepAliveArr = this.m_copy(store.state.keepAliveArr)
      //   deepKeepAliveArr[e].keepAlive = false
      //   this.setKeepAliveArr(deepKeepAliveArr)
      // }
    },
    beforeRouteEnter(to,from,next) {
      // if(store.state.keepAliveArr[to.name]){
      //   to.meta.keepAlive = store.state.keepAliveArr[to.name].keepAlive
      // }
      next()
    }
  })
}

export default vuePlugin
