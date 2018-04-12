import Vue from 'vue'
import App from '../container/index.vue'
if (module.hot) {
  module.hot.accept();
}
new Vue({
  render: h => h(App)
}).$mount('#app')