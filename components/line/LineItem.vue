<template>
  <div>
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <Avatar>
            <AvatarImage :src="line?.user?.image" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <NuxtLink :to="`user-${line.user.id}?date=${new Date()}`">
            {{ line?.user?.name }}
          </NuxtLink>
        </CardTitle>
        <CardDescription class="flex gap-2">
          <div v-for="item in line.cteis" :key="item">
            <badge>
              {{ item }}
            </badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span> from: {{ line.form }} -> to: {{ line.to }} </span>
      </CardContent>
      <CardFooter>
        <div class="flex justify-between gap-14">
          <div class="flex">
            <Phone />
            {{ line?.user?.phone ?? "N/A" }}
          </div>

          <div>{{ line.price }} €</div>
        </div>

        <div>
          {{ line?.car?.name ?? "N/A" }}
        </div>
        
      </CardFooter>
    </Card>
  </div>
</template>

<script lang="ts" setup>
import { Phone } from "lucide-vue-next";
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
  line: Line;
}>();
</script>

<style></style>
