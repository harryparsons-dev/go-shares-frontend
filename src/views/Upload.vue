<script setup lang="ts">
import {ref} from "vue";
import type {ExportDTO} from "@/models/export.ts";
import axios from "axios";


const uploadCsv = ref<ExportDTO>(
    {
      file: undefined,
      title: "",
    }
)

const submitUpload = () => {

  const formData = new FormData();
  formData.append('file', uploadCsv.value.file);
  formData.append('title', uploadCsv.value.title);
  formData.append('font_size', uploadCsv.value.font_size || "")
  formData.append('padding', uploadCsv.value.padding || "")
  try{
      const data = axios.post("http://localhost:3000/exports", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      } )
  }catch(error){
    console.log(error)
  }
}

const onFileChange = (event) => {
  uploadCsv.value.file = event.target.files[0]
}

</script>

<template>
  <form @submit.prevent="submitUpload"
  >
    <h2>Create an export:</h2>
    <label for="file">Choose a CSV</label>
    <input @change="onFileChange" type="file" id="file" name="file" required/><br/><br/>
    <label for="title">Title:</label>
    <input v-model="uploadCsv.title" type="text" id="title" name="title" required/><br/><br/>
    <label for="font_size">Font size:</label>
    <input v-model="uploadCsv.font_size" type="text" id="font_size" name="font_size" required/><br/><br/>
    <label for="padding">Padding</label>
    <input v-model="uploadCsv.padding" type="text" id="padding" name="padding" required/><br/><br/>
    <button type="submit">Upload</button>
  </form>

  <div id="response"></div>
</template>

<style scoped>

</style>