<template>
  <div>
    <div v-if="!isLoading" class="flex flex-col py-14">
      <div class="flex justify-between gap-4 px-14">
        <div class="flex flex-col gap-4">
          <div class="flex">
            <h1 class="font-extrabold text-2xl">
              {{ product?.title }}
            </h1>
            <Badge class="ml-2">{{ product?.category }}</Badge>
          </div>
          <span> ${{ product?.price }} </span>
          <span> ${{ product?.description }} </span>
        </div>
        <div class="flex border">
          <img
            :src="product?.thumbnail"
            alt="product"
            class="h-80 object-cover"
          />
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4">
        <div v-for="item in product?.reviews" :key="item">
          <Card>
            <CardHeader>
              <div class="flex">
                <span>
                  {{ item?.reviewerName }}
                </span>
                <Badge class="ml-2">{{ item.rating }}</Badge>
              </div>
            </CardHeader>
            <CardContent>
                {{ item?.comment }}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>

    <div v-else class="flex justify-center items-center h-96">
      <Loader />
    </div>
  </div>
</template>

<script lang="ts" setup>
const { getProductById, product, isLoading } = useProducts();
const route = useRoute();
const id = route.params.id as number;


await getProductById(id);
</script>

<style></style>
