<script setup lang="ts">

import {computed, ref} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";

const code = ref<string>("")
const router = useRouter()
const error = ref<string>("")

const login = async() => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {code: parseInt(code.value)}, {
      'ngrok-skip-browser-warning': 'true',
    });
    sessionStorage.setItem("token", response.data.token)
    console.log(response.data)

    await router.push("/")
    window.location.reload()
  } catch (err) {
    error.value = err
  }
}

const isAuthenticated = computed(() => {
  return sessionStorage.getItem("token")
})

</script>

<template>
  <div class="login-container" v-if="!isAuthenticated">
    <h2>Enter Access Code</h2>
    <input type="password" v-model="code" placeholder="Enter code" />
    <button @click="login">Submit</button>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
  <div v-else>
    You are logged in
  </div>
</template>

<style scoped>

</style>