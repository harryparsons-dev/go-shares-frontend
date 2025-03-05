<script setup lang="ts">
import {ref} from "vue";
import type {ExportDTO} from "@/models/export.ts";
import axios from "axios";
import {useRouter} from "vue-router";


const router = useRouter()
const errorMessage = ref<string>('')
const uploadCsv = ref<ExportDTO>(
    {
      file: undefined,
      title: "",
    }
)

const submitUpload = async () => {

  const formData = new FormData();
  formData.append('file', uploadCsv.value.file);
  formData.append('title', uploadCsv.value.title);
  formData.append('font_size', uploadCsv.value.font_size || "")
  formData.append('padding', uploadCsv.value.padding || "")
  try{
      const data = await axios.post("http://localhost:3000/exports", formData, {
        headers: { "Content-Type": "multipart/form-data" }
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
  <form @submit.prevent="submitUpload"
  >
    <div class="form-group w-25">
    <h2>Create an export:</h2>
    <label for="file">Choose a CSV</label>
    <input class="form-control" @change="onFileChange" type="file" id="file" name="file" required/><br/><br/>
    <label for="title">Title:</label>
    <input v-model="uploadCsv.title" class="form-control" type="text" id="title" name="title" required/><br/><br/>
    <label for="font_size">Font size:</label>
    <input v-model="uploadCsv.font_size" class="form-control" type="text" id="font_size" name="font_size" required/><br/><br/>
    <label for="padding">Padding</label>
    <input v-model="uploadCsv.padding"  class="form-control"type="text" id="padding" name="padding" required/><br/><br/>
     <span v-if="errorMessage" class="text-danger">{{errorMessage}}<br/></span>
    <button type="submit" class="btn btn-primary">Upload</button>
    </div>
  </form>

  <div id="response"></div>
</template>

<style scoped>

</style>