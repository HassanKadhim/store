<template>
  <div class="flex flex-col">
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
        <CardDescription>
          Used to identify your store in the marketplace.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form class="flex flex-col gap-4">
          <Input v-model="form.title" placeholder="title" />
          <Input v-model="form.price" placeholder="price" />
          <Input v-model="form.description" placeholder="description" />
          <Input v-model="form.category" placeholder="category" />
        </form>
      </CardContent>
      <CardFooter class="border-t px-6 py-4">
        <Button @click="createProduct()">Save</Button>
      </CardFooter>
    </Card>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth",
  layout: "dashboard",
});

const form = ref({
  title: "",
  price: "",
  description: "",
  category: "",
});

const createProduct = async ()  => {
  const res = await $fetch("https://dummyjson.com/products/add", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value),
  });
  if(res){
    alert('Product created successfully');
  }
};
</script>

<style></style>
