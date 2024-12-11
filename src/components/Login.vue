<!-- src/components/Login.vue -->
<template>
   <div class="login-form">
      <h2>로그인</h2>
      <form @submit.prevent="submitLogin">
         <div>
            <input type="email" v-model="username" id="username" placeholder="이메일을 입력하세요" required />
         </div>

         <div>
            <input type="password" v-model="password" id="password" placeholder="비밀번호를 입력하세요" required />
         </div>

         <button @click="submitLogin">Login</button>
         <p><a href="/find-password">비밀번호 초기화</a></p>
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
import router from '@/routes';
import { API_URL, LOGIN_SESSION_KEY } from '@/constants';
import ModalComponent from '@/components/Modal.vue';
import { requestApi } from '@/utils/axios';

export default {
   name: 'LoginForm',
   components: { ModalComponent },
   data() {
      return {
         username: '',
         password: '',
         // modal
         modalVisible: false,
         modalTitle: '',
         modalMessage: '',
      };
   },
   methods: {
      submitLogin() {
         requestApi
            .post(`${API_URL}/user/login`, {
               username: this.username,
               password: this.password,
            })
            .then((response) => {
               localStorage.setItem(LOGIN_SESSION_KEY, JSON.stringify(response.data));
               if (['', '/', '/home'].includes(this.$route.name)) {
                  window.location.reload();
               } else {
                  router.push('/');
                  window.location.reload();
               }
            })
            .catch((err) => {
               if (err.response?.status === 401) {
                  if (err.response?.data?.message === 'INVALID USERNAME') {
                     this.showModal('로그인 오류', '이메일이 올바르지 않습니다.');
                     return;
                  } else if (err.response?.data?.message === 'INVALID PASSWORD') {
                     this.showModal('로그인 오류', '비밀번호가 올바르지 않습니다.');
                     return;
                  }
               }
               console.error('login failed', err);
               this.showModal('로그인 오류', '로그인에 실패하였습니다.');
            });
      },
      showModal(title, message) {
         this.modalTitle = title;
         this.modalMessage = message;
         this.modalVisible = true;
      },
   },
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
   background-color: #36a673;
}
</style>
