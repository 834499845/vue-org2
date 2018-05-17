
import Vue from 'vue'
import App from './App'
import store from './store/'
import routerMap from './router'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.http.options.emulateJSON = true

// 并且配置路由规则
const router = new VueRouter({
    // mode: 'hash',
    mode: 'history',
    base: __dirname,
    routes: routerMap
})
window.drag = new Vue();
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')

