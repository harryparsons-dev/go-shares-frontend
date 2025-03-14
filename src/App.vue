<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import {computed} from "vue";

const isAuthenticated = computed(() => {
  return sessionStorage.getItem("token")
})

const logout = () => {
  sessionStorage.removeItem('token')
  window.location.reload()
}

</script>

<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Shares to PDF</RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Exports</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/upload">Upload</RouterLink>
          </li>
          <li class="nav-item" v-if="!isAuthenticated">
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
          </li>
          <li class="nav-item" v-else>
            <Button class="nav-link" @click="logout">Logout</Button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<style scoped></style>
