<template>
  <div class="grid grid-cols-4 gap-2 p-8">
   <div v-for="item in lines" :key="item.id" >
      <LineItem :line="item" />
   </div>
  </div>
</template>

<script lang="ts" setup>
interface Line {
  id: number;
  user?: {
    name: string;
    image: string;
    phone: string;
  };
  cteis: string[];
  form: string;
  to: string;
  price: number;
}
const props = defineProps<{
  lines: Line[];
}>()
</script>

<style>

</style>