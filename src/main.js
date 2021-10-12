import Vue from 'vue';
import VTooltip from 'v-tooltip';
import VueParticles from 'vue-particles';
import App from './App.vue';

Vue.use(VTooltip);
Vue.use(VueParticles);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
