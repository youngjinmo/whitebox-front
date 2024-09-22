<!-- src/components/Login.vue -->
<template>
  <div class="login-form">
    <h2>로그인</h2>
    <form @submit.prevent="submitForm">
      <div>
        <input type="email" v-model="username" id="username" placeholder="이메일을 입력하세요" required />
      </div>

      <div>
        <input type="password" v-model="password" id="password" placeholder="비밀번호를 입력하세요" required />
      </div>

      <button @click="submitLogin">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/routes';
import { API_URL, LOGIN_SESSION_KEY } from '@/constants';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    submitLogin() {
      axios.post(`${API_URL}/user/login`, {
        username: this.username, password: this.password
      })
          .then((response) => {
            localStorage.setItem(LOGIN_SESSION_KEY, JSON.stringify(response.data));
            if (this.$route.name === '/' || this.$route.name === '') {
              window.location.reload();
            } else {
              router.push('/');
              window.location.reload();
            }
          })
          .catch((err) => {
            if (err.response.status === 401) {
              alert("이메일 또는 비밀번호가 정확하지 않습니다.")
              return;
            }
            console.error('login failed', err);
            alert("로그인에 실패하였습니다.")
          });
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 300px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  box-sizing: border-box;
}

button:hover {
  BACKGROUND-COLOR: #36A673;
}
</STYLE>
