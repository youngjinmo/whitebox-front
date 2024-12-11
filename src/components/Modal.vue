<template>
   <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
         <h3>{{ title }}</h3>
         <p v-html="message"></p>
         <button @click="closeModal">Close</button>
      </div>
   </div>
</template>

<script>
export default {
   name: 'ModalComponent',
   props: {
      isVisible: {
         type: Boolean,
         default: false,
      },
      title: {
         type: String,
         default: '알림',
      },
      message: {
         type: String,
         default: '',
      },
   },
   methods: {
      closeModal() {
         this.$emit('close');
      },
   },
};
</script>

<style scoped>
.modal-overlay {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
}

.modal-content {
   background: white;
   padding: 20px;
   border-radius: 5px;
   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
