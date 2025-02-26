<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>

      <div class="navbar-nav">
        <RouterLink to="/" class="nav-item">Exports</RouterLink>
        <RouterLink to="/upload">Upload</RouterLink>
      </div>

  <RouterView />
</template>

<style scoped></style>
