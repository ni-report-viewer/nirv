<template>
  <div class="col-full text-center">
    <h1>Not Found</h1>
    <p>You have navigated to a non-existent resource.</p>
    <router-link :to="{ name: 'Home' }"
      >Click here to go back to the NiRV home</router-link
    >
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
