// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { LOGIN_SESSION_KEY } from '@/constants';
import WelcomeHome from '@/components/Home.vue';
import LoginForm from '@/components/Login.vue';
import SignUpForm from '@/components/Signup.vue';
import ResetPassword from '@/components/ResetPassword.vue';
import FindPassword from '@/components/FindPassword.vue';

// 라우트 설정
const routes = [
   {
      path: '/',
      name: 'WelcomeHome',
      component: WelcomeHome,
   },
   {
      path: '/index',
      name: 'WelcomeHome',
      component: WelcomeHome,
   },
   {
      path: '/login',
      name: 'Login',
      component: LoginForm,
      meta: { showAvailableToGuest: true },
   },
   {
      path: '/signup',
      name: 'SignUp',
      component: SignUpForm,
      meta: { showAvailableToGuest: true },
   },
   {
      path: '/find-password',
      name: 'FindPassword',
      component: FindPassword,
      meta: { showAvailableToGuest: true },
   },
   {
      path: '/reset-password',
      name: 'ResetPassword',
      component: ResetPassword,
      meta: { showAvailableToGuest: true },
   },
];

// 라우터 생성
const router = createRouter({
   history: createWebHistory(process.env.BASE_URL),
   routes,
});

router.beforeEach((to, from, next) => {
   const isLoggined = !!localStorage.getItem(LOGIN_SESSION_KEY);
   if (['/login', '/signup'].includes(to.path) && isLoggined) {
      next('/');
   } else {
      next();
   }
});

export default router;
