<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <h1>Shorten-url</h1>
  <div id = "app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link v-if="!isLoggined" to="/login">Login</router-link>
      <router-link v-if="!isLoggined" to="/signup">SignUp</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import LOGIN_SESSION_KEY from './constants';

export default {
  name: 'App',
  computed: {
    isLoggined() {
      return !!localStorage.getItem(LOGIN_SESSION_KEY);
    }
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
