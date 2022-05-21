import Vue from 'vue'
import App from './App.vue'// импортируем начальную страницу
import router from './router'// позволяет навигацию
import store from './store'// внутреннее хранилище данных
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  // создание приложения
  router,

  store,
  vuetify,

  //передаем начальную страницу
  render: function (h) { return h(App) }
}).$mount('#app')//монтируем в id = app
//этот скрипт точка входа в приложение 
