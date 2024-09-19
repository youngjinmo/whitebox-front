<!-- src/components/SignUpForm.vue -->
<template>
  <div class="sign-up-form">
    <h2>회원 가입</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="email">Username</label>
        <input type="email" v-model="username" id="username" required />
      </div>

      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" id="password" required />
      </div>

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import router from "../routes";

export default {
  name: 'SignupForm',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    submitForm() {
      // 서버에 이메일 중복 여부 확인
      axios.get(`http://localhost:8080/api/user/check-username-available`, {
        params: { username: this.username }
      })
          .then((response) => {
            if (response.data) {
              alert(`${this.username}은 이미 사용중인 이메일입니다. 로그인을 해주세요.`);
              // redirect login component
              return router.push('/login');
            } else {
              console.debug("available to signup: ", this.username);
              // call signup api
              this.signup(this.username, this.password);
            }
          })
          .catch((err) => {
            console.error("failed to check is username duplicated", err);
            alert("이메일 중복여부 확인 중 알 수 없는 에러가 발생하였습니다.");
          });
    },
    signup(username, password) {
      axios.post(`http://localhost:8080/api/user/create`, {
        username: username, password: password
      })
          .then((response) => {
            console.debug(response);
            alert("환영합니다!");
            return router.push('/');
          })
          .catch((err) => {
            console.error("failed to create account", err);
            alert("회원가입 도중 에러가 발생하였습니다.");
          });
    }
  }
};
</script>

<style scoped>
.sign-up-form {
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
