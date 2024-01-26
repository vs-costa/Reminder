import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import Calendario from '../views/Calendario/Calendario.vue'
import Concluidos from '../views/Concluidos/Concluidos.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },

    {
        path: '/concluidos',
        name: 'Concluidos',
        component: Concluidos
    },

    {
        path: '/calendario',
        name: 'Calendario',
        component: Calendario
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router