<!-- src/components/SignUpForm.vue -->
<template>
  <div class="sign-up-form">
    <h2>회원 가입</h2>
    <form @submit.prevent="submitForm">
      <div id="username-form">
        <input type="email" v-model="username" placeholder="이메일을 입력하세요" required />
        <button id="sendEmailAuth" @click="sendEmailAuth">인증메일 발송하기</button>
        <input type="text" v-model="secretCode" v-if="isCodeSent" placeholder="인증코드를 입력하세요" required />
        <button v-if="isCodeSent" @click="verifyEmailAuth">인증하기</button>
      </div>

      <div id="password-form">
        <input type="password" v-model="password" id="password" placeholder="비밀번호를 입력하세요" required />
        <input type="password" v-model="passwordConfirm" id="password_confirm" placeholder="비밀번호를 한 번 더 입력하세요" required />
      </div>

      <button onsubmit="submitSignup()">Submit</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/routes';
import {API_URL} from "@/constants";

export default {
  name: 'SignupForm',
  data() {
    return {
      username: '',
      password: '',
      secretCode: '',
      isCodeSent: false,
    };
  },
  methods: {
    verifyEmailAuth() {
      axios.get(`${API_URL}/user/verify-email-auth?secretCode=${this.secretCode}`)
          .then(response => {
            console.log(response);
            if (response.data) {
              alert("가입할 수 있는 이메일입니다.");
            } else {
              alert("인증코드가 불일치합니다.");
            }
          }).catch((err)=>{
            console.error(err);
            alert("이메일 인증에 실패했습니다.")
      });
    },
    sendEmailAuth() {
      axios.post(`${API_URL}/user/send-email-auth?recipient=${this.username}`)
          .then(() => {
            alert("인증코드를 발송하였습니다.");
            this.isCodeSent = true;
          }).catch((err)=>{
            console.error("failed to sent auth", err.response);
            if (err?.response?.status === 403 && err?.response?.data.message === 'EMAIL DUPLICATED') {
              alert("이미 가입된 이메일입니다.");
            }
            console.error(err);
            alert("이메일 인증 코드 발송에 실패하였습니다.");
          });
    },
    submitSignup() {
      // 서버에 이메일 중복 여부 확인
      axios.get(`${API_URL}/user/verify-username-available`, {
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
              this.signupApi(this.username, this.password);
            }
          })
          .catch((err) => {
            console.error("failed to check is username duplicated", err);
            alert("이메일 중복여부 확인 중 알 수 없는 에러가 발생하였습니다.");
          });
    },
    signupApi(username, password) {
      axios.post(`${API_URL}/api/user/create`, {
        params: { username: username, password: password }
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
  margin-top: 10px;
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

#username-form {
  margin-bottom: 1rem;
}

button:hover {
  background-color: #36a673;
}
</style>
