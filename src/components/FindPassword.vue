<template>
   <div class="find-password-form">
      <h2>비밀번호 찾기</h2>
      <form @submit.prevent="submitFindPassword">
         <div>
            <input type="email" v-model="username" placeholder="이메일을 입력하세요" required />
         </div>
         <button type="submit">비밀번호 찾기</button>
      </form>

      <!-- 모달 컴포넌트 -->
      <ModalComponent
         :is-visible="modalVisible"
         :title="modalTitle"
         :message="modalMessage"
         @close="modalVisible = false"
      />
   </div>
</template>

<script>
import { API_URL, EMAIL_PATTERN } from '@/constants';
import ModalComponent from '@/components/Modal.vue';
import { requestApi } from '@/utils/axios';

export default {
   name: 'FindPassword',
   components: {
      ModalComponent,
   },
   data() {
      return {
         username: '',
         modalVisible: false,
         modalTitle: '',
         modalMessage: '',
      };
   },
   methods: {
      submitFindPassword() {
         if (!this.username && !EMAIL_PATTERN.test(this.username)) {
            this.showModal('오류', '이메일을 올바르게 입력해주세요.');
            return;
         }

         requestApi
            .post(`${API_URL}/user/find-password`, this.username)
            .then((response) => {
               this.showModal('성공', '비밀번호 초기화 링크를 이메일로 전송하였습니다.');
               if (response.status !== 200) {
                  throw new Error(response.statusText);
               }
            })
            .catch((error) => {
               if ([401, 404].includes(error.response?.status)) {
                  this.showModal('인증 실패', '등록된 이메일이 아닙니다.');
               } else if (error.response?.status === 403) {
                  this.showModal(
                     '전송 실패',
                     '이미 해당 이메일로 인증코드를 발송하였습니다.<br>이메일을 확인해주세요.',
                  );
               } else {
                  console.error('Password reset failed', error);
                  this.showModal('오류', '비밀번호 초기화에 실패하였습니다. 이메일을 확인해주세요.');
               }
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
.find-password-form {
   max-width: 300px;
   margin: 0 auto;
   padding: 1rem;
   border: 1px solid #ddd;
   border-radius: 5px;
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
}

button:hover {
   background-color: #36a673;
}
</style>
