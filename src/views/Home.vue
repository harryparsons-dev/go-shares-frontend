<script setup lang="ts">
import {onMounted, ref} from "vue";
import axios from "axios";
import {Exports} from "@/models/export.ts";


const pdfExports = ref<Exports[]>([])

const fetchExports = async () => {
  try {
    const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/exports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "ngrok-skip-browser-warning": "true",
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
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/exports/download/${id}`, {
      responseType: "blob", // Important: Ensures the file is treated as binary data
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        "ngrok-skip-browser-warning": "true",
      }
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], { type: response.headers["content-type"] });

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${title}.pdf`); 
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch(error){
    console.log(error)
  }
}

const downloadPieChart = async (id, title) => {
  try{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/exports/pie/download/${id}`, {
      responseType: "blob", 
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        'ngrok-skip-browser-warning': 'true',
      }
    });

    // Create a Blob from the response data
    const blob = new Blob([response.data], { type: response.headers["content-type"] });

    // Create a temporary link element
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `${title}-pie-chart.pdf`); 
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } catch(error){
    console.log(error)
  }
}

const formatDate= (date: Date) => {
  let newDate = new Date(date)
  return newDate.toDateString()
}

const deleteExport = async (exp: Exports) =>{
  const result = confirm("Are you sure you want to delete?")
  if (result) {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/exports/${exp.id}`, {
        responseType: "blob", // Important: Ensures the file is treated as binary data
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          'ngrok-skip-browser-warning': 'true',
        }
      })
      await fetchExports()
    } catch (error) {
      console.log(error)
    }
  }

}

function formatBytes(bytes, decimals = 2) {
  if (bytes < 1024) return `${bytes} Bytes`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(decimals)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(decimals)} MB`;
}


onMounted(async () => {
  await fetchExports();
});


</script>
<template>
  <div class="w-100 overflow-auto">
  <table class="table table-striped" v-if="pdfExports">
    <thead>
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Title</th>
        <th scope="col">Date</th>
        <th scope="col">Upload FileSize</th>
        <th scope="col">Status</th>
        <th scope="col">Font Size</th>
        <th scope="col">Padding</th>
        <th scope="col">PDF</th>
        <th scope="col">Pie</th>
        <th scope="col">Delete</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(Export, i) in pdfExports">
        <td>{{Export.id}}</td>
        <td>{{Export.title}}</td>
        <td>{{formatDate(Export.created_at)}}</td>
        <td>{{formatBytes(Export.file_size)}}</td>
        <td>{{Export.status}}</td>
        <td>{{Export.font_size}}</td>
        <td>{{Export.padding}}</td>
        <td >
          <button v-if="Export.status ==='Completed'" class="btn btn-success" @click="downloadExport(Export.id, Export.title)">Download PDF</button>

          <span v-else></span>
        </td>
        <td>
        <button v-if="Export.status ==='Completed'" class="btn btn-success" @click="downloadPieChart(Export.id, Export.title)">Download Pie Chart</button>
        </td>

        <td><button class="btn btn-danger" @click="deleteExport(Export)">Delete</button></td>

      </tr>
    </tbody>
  </table>
  </div>
</template>
