<template>
   <div class="create-short-url-form">
      <form @submit.prevent="createShortenUrl">
         <button @click="createShortenUrl">숏 URL 생성하기</button>
         <div>
            <input type="url" v-model="targetUrl" placeholder="줄이고 싶은 url을 입력하세요" required />
            <h3 v-if="isCreated" id="shortenUrl"><a href=""></a></h3>
         </div>
      </form>
   </div>
</template>
<script>
import axios from 'axios';
import { API_URL, URL_PATTERN } from '@/constants';

export default {
   name: 'MainHome',
   data() {
      return {
         isCreated: false,
         shortenUrl: '',
         targetUrl: '',
      };
   },
   methods: {
      createShortenUrl() {
         if (this.targetUrl.length < 1) {
            alert('url을 입력해주세요');
            return;
         } else if (!URL_PATTERN.test(this.targetUrl)) {
            alert('url 형식을 확인해주세요');
            return;
         }
         axios
            .post(`${API_URL}/link/create`, {
               redirectionUrl: this.targetUrl,
               userId: 153, // GUEST ID
            })
            .then((response) => {
               this.shortenUrl = response.data;
               this.isCreated = true;
            })
            .catch((err) => {
               console.error(err);
               alert('url 생성에 실패하였습니다.');
            });
      },
   },
};
</script>

<style scoped>
.create-short-url-form {
   max-width: 300px;
   margin: 0 auto;
   padding: 1rem;
   border-radius: 5px;
}
input {
   width: 100%;
}
button {
   padding: 0.3rem;
   margin: 1rem;
}
</style>
