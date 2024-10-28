<template>
  <div class="flex flex-col py-6">
    <h1 class="text-3xl font-semibold text-center mt-4">
      Products ({{ products.total }}) 
    </h1>
    <div v-if="!isLoading" class="grid grid-cols-4 gap-2">
      <div v-for="item in products?.products" :key="item" class="p-4 w-full">
        <Card class="p-0">
          <CardHeader class="flex flex-col p-0">
            <img
              :src="item.thumbnail"
              alt="product"
              class="h-48 object-cover"
            />
          </CardHeader>
          <CardDescription class="p-4">
            <NuxtLink :to="`/products/${item.id}/product`">
              <h1 class="text-xl font-semibold">
                {{ item.title }} - ${{ item.price }}
              </h1>
            </NuxtLink>
            <p class="text-gray-500">
              {{ item.description }}
            </p>
          </CardDescription>
          <CardFooter class="flex items-center p-4">
            <div v-for="tag in item.tags" :key="tag" class="flex">
              <Badge class="mr-2">{{ tag }}</Badge>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
    <div v-else class="flex justify-center items-center h-96">
      <Loader />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { getProducts, products, isLoading , q } = useProducts();

await getProducts();

watch(() => q.value, async () => {
  await getProducts();
});
</script>

<style></style>
