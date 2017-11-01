import Vue from 'vue'
import App from './App'
import routes from './routes'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
if (module.hot) {
  module.hot.accept();
}

const router = new VueRouter({
  routes
})

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')