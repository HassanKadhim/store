<template>
  <div class="py-2">
    <Button @click="add()">Add</Button>
    <LineList v-if="status == 'success'" :lines="lines" />
    <div v-else>
      Loading...
    </div>
  </div>
</template>

<script lang="ts" setup>
const { data, status ,execute } = useFetch("/api/lines");
const lines = ref<any[]>([]);
onMounted(() => {
  lines.value = data.value;
});

const add = () => {
  lines.value.push({
      id: 1,
      user: {
        id: 1,
        name: 'Doe',
        phone: '123-456-7890',
        image: 'https://cdn3d.iconscout.com/3d/premium/thumb/boy-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--boys-male-man-pack-avatars-icons-5187865.png?f=webp'
      },
      form:'Basra',
      to:'Baghdad',
      price: 10,
      passCount: 5,
      availableSeats: 10,
      cities : ['Basra','Najaf','Karbala','Baghdad'],
    },);

  execute();
};
</script>

<style></style>
