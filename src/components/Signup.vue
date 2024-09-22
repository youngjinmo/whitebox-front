<!-- src/components/SignUpForm.vue -->
<template>
  <div class="sign-up-form">
    <h2>회원 가입</h2>
    <form @submit.prevent="submitForm">
      <div id="username-form">
        <input type="email" v-model="username" placeholder="이메일을 입력하세요" :disabled="isVerifiedEmail" required />
        <button id="sendEmailAuth" @click="sendEmailAuth">인증메일 발송하기</button>
        <input type="text" v-model="secretCode" v-if="isCodeSent" placeholder="인증코드를 입력하세요" required />
        <button v-if="isCodeSent" @click="verifyEmailAuth">인증하기</button>
      </div>

      <div id="password-form">
        <input type="password" v-model="password" placeholder="비밀번호를 입력하세요" required/>
        <input type="password" v-model="confirmPassword" @blur="isConfirmedPassword" placeholder="비밀번호를 한 번 더 입력하세요" required />
      </div>
      <button @click="submitSignup">가입하기</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/routes';
import { API_URL } from "@/constants";

export default {
  name: 'SignupForm',
  data() {
    return {
      username: '',
      isVerifiedEmail: false,
      isCodeSent: false,
      secretCode: '',
      password: '',
      confirmPassword: '',
      matchPassword: false
    };
  },
  methods: {
    isConfirmedPassword() {
      if (this.password.length < 8) {
        alert("비밀번호는 8자리 이상 입력해주세요.");
        return false;
      }
      if (this.password != '' && this.password === this.confirmPassword) {
        this.matchPassword = true;
        return true;
      } else {
        this.matchPassword = false;
        alert("비밀번호가 불일치합니다.");
        return false;
      }
    },
    verifyEmailAuth() {
      axios.get(`${API_URL}/user/verify-email-auth?secretCode=${this.secretCode}`)
          .then(response => {
            if (response.data) {
              this.isVerifiedEmail = true;
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
            this.isCodeSent = true;
            alert("인증코드를 발송하였습니다.");
          }).catch((err)=>{
            if (err?.response?.status === 403 && err?.response?.data.message === 'EMAIL DUPLICATED') {
              alert("이미 가입된 이메일입니다.");
              return;
            }
            console.error(err);
            alert("이메일 인증 코드 발송에 실패하였습니다.");
          });
    },
    submitSignup() {
      if (!this.isVerifiedEmail) {
        alert("이메일 인증이 필요합니다.");
        return;
      }
      if (!this.matchPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      axios.post(`${API_URL}/user/create`, {
        username: this.username, password: this.password
      })
          .then(() => {
            alert("환영합니다!");
            return router.push('/login');
          })
          .catch((err) => {
            console.error("failed to create account", err);
            alert("회원가입 도중 에러가 발생하였습니다.");
          });
    },
  }
};
</script>

<style scoped>
.match {
  border-color: blue;
  color: blue;
}

.mismatch {
  color: red;
}

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

#username-form {
  margin-bottom: 1rem;
}

button:hover {
  background-color: #36a673;
}
</style>
