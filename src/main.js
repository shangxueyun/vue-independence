// import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import routesS from './routes'
import 'font-awesome/css/font-awesome.min.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css' 
import 'quill/dist/quill.snow.css' 
import 'quill/dist/quill.bubble.css'


Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(preview)
Vue.use(VueQuillEditor)
//NProgress.configure({ showSpinner: false });
let routes = routesS.routes
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('newRoutes');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
  console.log(JSON.parse(sessionStorage.getItem('newRoutes')))
})

//router.afterEach(transition => {
//NProgress.done();
//});

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

