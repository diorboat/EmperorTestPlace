import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import BaiduMap from 'vue-baidu-map'
import vuePlugin from './vuePlugin'
import VueCookies from 'vue-cookies'
import countUp from './vuePlugin/countUp.js'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.$ELEMENT = { size: 'small' }
Vue.use(ElementUI)

import vueScrollLock from 'vue-scroll-lock'
Vue.use(vueScrollLock)


Vue.prototype.m_countUp = countUp
Vue.config.productionTip = false
import '@/components'
// Vue.use(Print)
Vue.use(BaiduMap, {
  ak: 'jCp9AXG6GceZO2UAiN7zY2TUtVrYZc9f'
})

Vue.directive('resize', {
  bind(el, binding) {
    let width = '',
      height = ''
    function get() {
      const style = document.defaultView.getComputedStyle(el)
      if (width !== style.width || height !== style.height) {
        binding.value({ width, height })
      }
      width = style.width
      height = style.height
    }

    el.__vueReize__ = setInterval(get, 200)
  },
  unbind(el) {
    clearInterval(el.__vueReize__)
  }
})

Vue.use(VueCookies)
Vue.use(vuePlugin)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
