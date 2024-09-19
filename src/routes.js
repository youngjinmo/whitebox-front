// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import WelcomeHome from './components/Home.vue';
import LoginForm from './components/Login.vue';
import SignUpForm from './components/Signup.vue';
import LOGIN_SESSION_KEY from './constants';

// 라우트 설정
const routes = [
    {
        path: '/',
        name: 'WelcomeHome',
        component: WelcomeHome
    },
    {
        path: '/index',
        name: 'WelcomeHome',
        component: WelcomeHome
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginForm,
        meta: { showAvailableToGuest: true }
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUpForm,
        meta: { showAvailableToGuest: true }
    }
];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const isLoggined = !!localStorage.getItem(LOGIN_SESSION_KEY);
    if (['/login', '/signup'].includes(to.path) && isLoggined) {
        next('/');
    } else {
        next();
    }
})

export default router;
