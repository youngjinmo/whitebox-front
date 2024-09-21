<!-- src/components/LoginForm.vue -->
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

      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/routes';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      axios.post(`http://localhost:8080/api/user/login`, {
        username: this.username, password: this.password
      })
          .then(() => {
            console.debug('login success');
            alert("환영합니다!");
            return router.push('/');
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
}

button {
  width: 100%;
  padding: 0.5rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #36a673;
}
</style>
