<script setup lang="ts">

</script>

<template>
  <form
  >
    <h2>Create an export:</h2>
    <label for="file">Choose a CSV</label>
    <input type="file" id="file" name="file" required/><br/><br/>
    <label for="title">Title:</label>
    <input type="text" id="title" name="title" required/><br/><br/>
    <label for="font_size">Font size:</label>
    <input type="text" id="font_size" name="font_size" required/><br/><br/>
    <label for="padding">Padding</label>
    <input type="text" id="padding" name="padding" required/><br/><br/>
    <button type="submit">Upload</button>
  </form>

  <div id="response"></div>
</template>

<style scoped>

</style>