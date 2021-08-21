import Home from './components/Home';
import Alerts from './components/Alerts';
import DeviceAlerts from './components/DeviceAlerts';
import AttackerAlerts from './components/AttackerAlerts';
import RecentAlerts from './components/RecentAlerts';
import Welcome from './components/Welcome';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
    {
        name: 'welcome',
        path: '/',
        component: Welcome
    },
    {
        name: 'home',
        path: '/dashboard',
        component: Home,
        children: [
            {
                path: '',
                component: Alerts
            },
            {
                path: 'device',
                component: DeviceAlerts
            },
            {
                path: 'attacker',
                component: AttackerAlerts
            },
            {
                path: 'recent',
                component: RecentAlerts
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
  })
  
  export default router