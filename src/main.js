import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'
import 'font-awesome/css/font-awesome.css'


Vue.config.productionTip = false;

Vue.use(VueResource);

// Vue.http.options.xhr = { withCredentials: true }
// Vue.http.options.emulateJSON = true

/*将App组件渲染到index.html里面的 <div id="root"></div>*/
new Vue({
  el: '#root',
  router,
  template: '<App/>',
  components: {
    App,
  }
})
