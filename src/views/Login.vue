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
      "ngrok-skip-browser-warning": "true",
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
  <div class="login-container d-flex justify-content-center" style="height: 100vh;" v-if="!isAuthenticated">
    <div class="container">
      <div class="row justify-content-center">
        <!-- Responsive column: full width on mobile (col-12), 30% width on medium and larger screens (col-md-4) -->
        <div class="col-12 col-md-4">
          <div class="bg-light p-4 rounded shadow">
            <h2 class="text-center">Enter Access Code</h2>
            <input type="password" class="form-control mb-2" v-model="code" placeholder="Enter code" />
            <button class="btn btn-primary mb-3 w-100" @click="login">Submit</button>
            <p v-if="error" class="error text-danger">Incorrect code, please try again.</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-else>
    You are logged in
  </div>
</template>
<style scoped>

</style>