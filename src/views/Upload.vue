<script setup lang="ts">
import {ref} from "vue";
import type {ExportDTO} from "@/models/export.ts";
import axios from "axios";
import {useRouter} from "vue-router";


const router = useRouter()
const errorMessage = ref<string>('')
const uploadCsv = ref<ExportDTO>(
    {
      font_size: null,
      padding: null,
      file: undefined,
      title: ""
    }
)

const submitUpload = async () => {

  const formData = new FormData();
  formData.append('file', uploadCsv.value.file);
  formData.append('title', uploadCsv.value.title);
  formData.append('font_size', uploadCsv.value.font_size || null)
  formData.append('padding', uploadCsv.value.padding || null)
  try{
      const data = await axios.post(`${import.meta.env.VITE_API_URL}/exports`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`
          'ngrok-skip-browser-warning': 'true',
        }

      } )

    await router.push("/")
  }catch(error){
    errorMessage.value = error.response.data
  }
}

const onFileChange = (event) => {
  uploadCsv.value.file = event.target.files[0]
}

</script>

<template>
  <div class="d-flex justify-content-center">
  <form @submit.prevent="submitUpload" class="w-30"
  >
    <div class="form-group">
    <h2>Create an export:</h2>
    <label style="font-weight: bold;" for="file">Choose a CSV</label>
    <input class="form-control" @change="onFileChange" type="file" id="file" name="file" required/><br/><br/>
    <label style="font-weight: bold;" for="title">Title:</label>
    <input v-model="uploadCsv.title" class="form-control" type="text" id="title" name="title" required/><br/><br/>
    <label style="font-weight: bold;" for="font_size">Font size:</label><span style="font-style: italic">Recommend values 8 - 14</span>
    <input v-model="uploadCsv.font_size" class="form-control" type="text" id="font_size" name="font_size" required/><br/><br/>
      <br/>
    <label style="font-weight: bold;" for="padding">Padding: </label><span style="font-style: italic">Recommend values 0.5 - 2</span>
    <input v-model="uploadCsv.padding"  class="form-control"type="text" id="padding" name="padding" required/><br/><br/>
     <span v-if="errorMessage" class="text-danger">{{errorMessage}}<br/></span>
    <button type="submit" class="btn btn-primary">Upload</button>
    </div>
  </form>
  </div>

</template>

<style scoped>

</style>