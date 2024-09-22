<template>
  <footer class="site-footer">
    <p>©2024 <a :href="'mailto:'+email">Youngjin Mo</a> All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  data() {
    return {
      email: 'dev.youngjinmo@gmail.com',
    };
  },
};
</script>

<style scoped>
.site-footer {
  text-align: center;
  padding: 1rem;
  background-color: #f8f8f8;
  border-top: 1px solid #ddd;
  margin-top: 2rem;
}

.site-footer p {
  margin: 0.5rem 0;
}

.site-footer a {
  color: #42b983;
  text-decoration: none;
}

.site-footer a:hover {
  text-decoration: underline;
}
</style>
