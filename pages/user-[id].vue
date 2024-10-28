<template>
  <div class="flex flex-col items-center">
      <img class="w-20 h-20 rounded-full" :src="data?.image" alt="user image">
      <h1 class="text-2xl font-bold">{{ data?.name }}</h1>
      <p class="text-lg text-gray-500">{{ data?.phone }}</p>
      <p class="text-lg text-gray-500">{{ data?.date }}</p>
      
  </div>
</template>

<script lang="ts" setup>
 const router = useRoute();
 const { data, status ,execute } = useFetch(`/api/lines/${router?.params?.id}/getUser?date=${new Date()}`);
  console.log(router?.params);
</script>

<style>

</style>