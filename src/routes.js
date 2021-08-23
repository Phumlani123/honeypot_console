import Home from './components/Home';
import RecentAlerts from './components/RecentAlerts';
import Alerts from './components/Alerts';
import DeviceAlerts from './components/DeviceAlerts';
import AttackerAlerts from './components/AttackerAlerts';
import Welcome from './components/Welcome';
import AlertsByDevice from './components/AlertsByDevice';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        name: 'welcome',
        path: '/',
        component: Welcome
    },
    {
        path: '/dashboard',
        component: Home,
        children: [
            {
                path: '/',
                component: RecentAlerts
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
                path: 'all',
                component: Alerts
            },
            {
                path: 'view/:id/:name',
                component: AlertsByDevice
            },
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
  })
  
  export default router