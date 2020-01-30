/* */

import Vue from 'vue';
import App from './App.vue'; //kazemo vue da zelimo koristiti app kao pocetnu stranicu
import VueRouter from 'vue-router';
import router from './router/index';
import store from '@/store/store'


import Menu from './components/Menu.vue'; //globalno


Vue.component('MenuComp',Menu) //globalno

Vue.use(VueRouter);

new Vue({
    el:'#app',
    router,
    store,
    render: h => h(App) // h mozemo promjeniti - render funkcija vraca kod koji se nalazi u app.vue
});