import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import Game1 from '../views/Game1.vue';
import Game2 from '../views/Game2.vue';
import Game3 from '../views/Game3.vue';

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
    },
    {
        path: '/game1',
        name: 'Game1',
        component: Game1,
    },
    {
        path: '/game2',
        name: 'Game2',
        component: Game2,
    },
    {
        path: '/game3',
        name: 'Game3',
        component: Game3,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router;