<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {Exports} from "@/models/export.ts";

const pdfExports = ref<Exports[]>([])

const fetchExports = async () => {
  try {
    const {data} = await axios.get("http://localhost:3000/exports", {
      headers: {
        "Content-Type": "application/json"
      }
    });

    pdfExports.value =data
    console.log(pdfExports.value)

  }catch(e){
    console.log(e)
  }
};

const downloadExport = async (id, title) => {
  try{
    const response = await axios.get(`http://localhost:3000/exports/download/${id}`, {
      responseType: "blob", // Important: Ensures the file is treated as binary data
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], { type: response.headers["content-type"] });

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${title}.csv`); // Set filename
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch(error){
    console.log(error)
  }
}



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
      <tr v-for="(Export, i) in pdfExports">
        <td>{{Export.id}}</td>
        <td>{{Export.title}}</td>
        <td>{{Export.created_at}}</td>
        <td>{{Export.file_size}}</td>
        <td>{{Export.status}}</td>
        <td>{{Export.source_file_path}}</td>
        <td>{{Export.export_file_path}}</td>
        <td >
          <button v-if="Export.status ==='Completed'" @click="downloadExport(Export.id, Export.title)">Download</button>
          <span v-else></span>
        </td>
        <td>{{Export.meta}}</td>

      </tr>
    </tbody>
  </table>
</template>
