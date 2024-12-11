<template>
   <div class="reset-password-page">
      <h2>비밀번호 초기화</h2>
      <ModalComponent
         :is-visible="modalVisible"
         :title="modalTitle"
         :message="modalMessage"
         @close="modalVisible = false"
      />
      <div v-if="isError" class="error">
         <p><a href="/find-password">다시 비밀번호 초기화</a></p>
      </div>
   </div>
</template>

<script>
import axios from 'axios';
import { API_URL } from '@/constants';
import ModalComponent from '@/components/Modal.vue';
import router from '@/routes';

export default {
   name: 'ResetPassword',
   components: {
      ModalComponent,
   },
   data() {
      return {
         isError: false,
         // modal
         modalVisible: false,
         modalTitle: '',
         modalMessage: '',
      };
   },
   mounted() {
      const params = new URLSearchParams(window.location.search);
      const username = params.get('username');
      const verificationCode = params.get('verificationCode');

      if (!username || !verificationCode) {
         this.showModal('비밀번호 초기화 실패', '잘못된 요청입니다.');
         return;
      }

      this.verifyResetLink(username, verificationCode);
   },
   methods: {
      showModal(title, message) {
         this.modalTitle = title;
         this.modalMessage = message;
         this.modalVisible = true;
      },
      async verifyResetLink(username, verificationCode) {
         try {
            const response = await axios.patch(
               `${API_URL}/user/reset-password?username=${username}&verificationCode=${verificationCode}`,
            );
            if (response.status === 200) {
               this.showModal(
                  '비밀번호 초기화 성공',
                  '비밀번호 초기화가 완료되었습니다.<br>초기화된 비밀번호를 이메일로 보내드렸습니다.<br>5초 뒤 로그인 페이지로 이동합니다.',
               );

               setTimeout(() => {
                  return router.push('/login');
               }, 5000);
            } else if (response.status === 403) {
               this.showModal('비밀번호 초기화 실패', '유효시간이 만료되었습니다.');
               this.isError = true;
            } else {
               this.showModal('비밀번호 초기화 실패', '알 수 없는 이유로 실패하였습니다.');
               this.isError = true;
            }
         } catch (error) {
            this.showModal('비밀번호 초기화 실패', '알 수 없는 이유로 실패하였습니다.');
            this.isError = true;
         }
      },
   },
};
</script>

<style scoped>
.reset-password-page {
   text-align: center;
   padding: 2rem;
}
.success {
   color: green;
   font-weight: bold;
}
.error {
   color: red;
   font-weight: bold;
}
</style>
