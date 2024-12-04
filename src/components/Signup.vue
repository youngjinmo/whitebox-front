<!-- src/components/SignUpForm.vue -->
<template>
  <div class="sign-up-form">
    <h2>회원 가입</h2>
    <form @submit.prevent="submitSignup">
      <div id="username-form">
        <input type="email" v-model="username" placeholder="이메일을 입력하세요" :disabled="isVerifiedEmail" required />
        <button type="button" id="sendEmailAuth" @click="sendEmailAuth">인증메일 발송하기</button>
        <input type="text" v-model="secretCode" v-if="isCodeSent" placeholder="인증코드를 입력하세요" required />
        <button type="button" v-if="isCodeSent" @click="verifyEmailAuth">인증하기</button>
      </div>

      <div v-if="isVerifiedEmail" id="password-form">
        <input type="password" v-model="password" placeholder="비밀번호를 입력하세요" required/>
        <input type="password" v-model="confirmPassword" placeholder="비밀번호를 한 번 더 입력하세요" required />
        <button type="submit">가입하기</button>
      </div>
    </form>
    <ModalComponent
        :is-visible="modalVisible"
        :title="modalTitle"
        :message="modalMessage"
        @close="modalVisible = false"
    />
  </div>
</template>

<script>
import axios from 'axios';
import router from '@/routes';
import { API_URL, EMAIL_PATTERN } from "@/constants";
import ModalComponent from "@/components/Modal.vue";

export default {
  name: 'SignupForm',
  components: {
    ModalComponent
  },
  data() {
    return {
      username: '',
      isVerifiedEmail: false,
      isCodeSent: false,
      secretCode: '',
      password: '',
      confirmPassword: '',
      matchPassword: false,
      // modal
      modalVisible: false,
      modalTitle: "",
      modalMessage: "",
    };
  },
  methods: {
    isValidPassword() {
      if (this.password.length < 8) {
        this.showModal("회원가입 오류", "비밀번호는 8자리 이상 입력해주세요.");
        return false;
      }
      if (this.password != '' && this.password === this.confirmPassword) {
        this.matchPassword = true;
        return true;
      } else {
        this.matchPassword = false;
        this.showModal("회원가입 오류", "비밀번호가 불일치합니다.");
        return false;
      }
    },
    async verifyEmailAuth() {
      await axios.post(`${API_URL}/user/verify/email?verificationCode=${this.secretCode}`, { recipient: this.username })
          .then(response => {
            if (response.status === 200 && response.data === "verified") {
              this.isVerifiedEmail = true;
              this.showModal("이메일 인증", "가입할 수 있는 이메일입니다.");
            } else {
              this.showModal("이메일 인증 오류", "인증코드가 불일치합니다.");
            }
          }).catch((err)=>{
            console.error(err);
            this.showModal("이메일 인증 오류", "이메일 인증에 실패했습니다.")
      });
    },
    async sendEmailAuth() {
      if (!EMAIL_PATTERN.test(this.username)) {
        this.showModal("이메일 인증 오류", "올바른 형식의 이메일을 입력해주세요.");
      }

      await axios.post(`${API_URL}/user/email-verification-code`, { recipient: this.username })
          .then(() => {
            this.isCodeSent = true;
            this.showModal(null, "인증코드를 발송하였습니다.");
          }).catch((err)=>{
            if (err?.response?.status === 403 && err?.response?.data.message === 'EMAIL DUPLICATED') {
              this.showModal("이메일 인증 오류", "이미 가입된 이메일입니다.");
              return;
            }
            console.error(err);
            this.showModal("이메일 인증 오류", "이메일 인증 코드 발송에 실패하였습니다.");
          });
    },
    async submitSignup() {
      if (!this.isVerifiedEmail) {
        this.showModal("회원가입 오류", "이메일 인증이 필요합니다.");
        return;
      }
      if (!this.isValidPassword()) {
        return;
      }
      await axios.post(`${API_URL}/user/create`, {
        username: this.username, password: this.password
      })
          .then(() => {
            this.showModal("환영합니다!");
            return router.push('/login');
          })
          .catch((err) => {
            console.error("failed to create account", err);
            this.showModal("회원가입 도중 에러가 발생하였습니다.");
          });
    },
    showModal(title, message) {
      this.modalTitle = title;
      this.modalMessage = message;
      this.modalVisible = true;
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
