import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyD9Sc0oJ7wi7oRTL3xc9kVyrSEeg13OyXo',
  projectId: 'test2-10991',
  authDomain: 'test2-10991.firebaseapp.com',
  databaseURL: 'https://test2-10991.firebaseio.com',
  storageBucket: 'test2-10991.appspot.com',
}

firebase.initializeApp(config);

export default firebase;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
