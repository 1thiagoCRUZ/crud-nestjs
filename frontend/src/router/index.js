import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import LoginView from '../views/LoginView.vue';
import FeedView from '../views/FeedView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginView
        },
        {
            path: '/feed',
            name: 'feed',
            component: FeedView,
            meta: { requiresAuth: true } // Marca essa rota como protegida
        }
    ]
});

// GUARDA DE ROTAS (Segurança no Front)
router.beforeEach((to, from, next) => {
    const auth = useAuthStore();

    // Se a rota precisa de auth e o cara NÃO tem token...
    if (to.meta.requiresAuth && !auth.token) {
        next('/'); // ...manda pro login
    } else {
        next(); // ...pode passar
    }
});

export default router;