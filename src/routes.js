// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import WelcomeHome from './components/Home.vue';
import LoginForm from './components/LoginForm.vue';
import SignUpForm from './components/SignupForm.vue';

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
        component: LoginForm
    },
    {
        path: '/signup',
        name: 'SignUp',
        component: SignUpForm
    }
];

// 라우터 생성
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
