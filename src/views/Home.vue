<script setup>
import {ref} from "vue";
import { onMounted } from "vue";
import axios from "axios";


const exports = ref([])

const fetchExports = async () => {
  try {
    const {data} = await axios.get("http://localhost:3000/exports", {
      headers: {
        "Content-Type": "application/json"
      }
    });

    exports.value =data
    console.log(exports.value)

  }catch(e){
    console.log(e)
  }
};

onMounted(async () => {
  await fetchExports();
});
</script>
<template>
  <h1>Shares Converter</h1>
  <table class="table table-striped">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Title</th>
        <th scope="col">Date</th>
        <th scope="col">FileSize</th>
        <th scope="col">Status</th>
        <th scope="col">Source file path</th>
        <th scope="col">Export file path</th>
        <th scope="col">Download</th>
        <th scope="col">Meta</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(Export, i) in exports">
        <td>{{Export.id}}</td>
        <td>{{Export.title}}</td>
        <td>{{Export.created_at}}</td>
        <td>{{Export.file_size}}</td>
        <td>{{Export.status}}</td>
        <td>{{Export.source_file_path}}</td>
        <td>{{Export.export_file_path}}</td>
        <button><a :href="`/export/download/${Export.id}`" :download="Export.title" >Download</a></button>
        <td>{{Export.Meta}}</td>

      </tr>
    </tbody>
  </table>
</template>
