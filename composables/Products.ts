import type { IProduct } from "~/types/Product";

export const useProducts = () => {
  const products = useState<IProduct[]>("products", () => []);
  const product = useState<IProduct>("product", () => {});
  const isLoading = useState<boolean>("isLoading", () => false);
  const q = useState<string>("q", () => "");
  const api = ref(
    q.value
      ? `https://dummyjson.com/products/search?q=${q.value}`
      : "https://dummyjson.com/products"
  );
  async function getProducts() {
    isLoading.value = true;
    try {
      const res = await $fetch<any>(api.value, {
        method: "GET",
      });
      products.value = res;
      
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }

  async function getProductById(id: number) {
    isLoading.value = true;
    try {
      const res = await $fetch<any>(`https://dummyjson.com/products/${id}`, {
        method: "GET",
      });
      product.value = res;
    } catch (e) {
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  }
  return { products, getProducts, isLoading, getProductById, product, q };
};
