<template>
   <img alt="Vue logo" src="./assets/logo.png" />
   <h1>Shorten-url</h1>
   <div id="app">
      <nav>
         <router-link to="/">Home</router-link>
         <router-link v-if="!isLoggined" to="/login">Login</router-link>
         <router-link v-if="!isLoggined" to="/signup">SignUp</router-link>
         <a v-if="isLoggined" href="#" @click.prevent="logout">Logout</a>
      </nav>
      <WelcomeHome />
      <router-view />
   </div>
   <Footer />
</template>

<script>
import router from '@/routes';
import { API_URL, LOGIN_SESSION_KEY } from '@/constants';
import Footer from '@/components/Footer.vue';
import WelcomeHome from '@/components/Home.vue';
import { requestApi } from '@/utils/axios';

export default {
   name: 'App',
   data() {
      return {
         isLoggined: !!localStorage.getItem(LOGIN_SESSION_KEY),
      };
   },
   components: {
      WelcomeHome,
      Footer,
   },
   methods: {
      logout() {
         localStorage.removeItem(LOGIN_SESSION_KEY);
         if (['', '/', '/home'].includes(this.$route.name)) {
            window.location.reload();
         } else {
            router.push('/');
            window.location.reload();
         }

         requestApi
            .delete(`${API_URL}/user/logout`, {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem(LOGIN_SESSION_KEY)}`,
               },
            })
            .catch((error) => {
               console.error('failed to logout, error={}', error);
            });
      },
   },
};
</script>

<style>
nav {
   padding: 1rem;
   background-color: #42b983;
}

nav a {
   margin-right: 1rem;
   color: white;
   text-decoration: none;
}

#app {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
   margin-top: 60px;
}
</style>
