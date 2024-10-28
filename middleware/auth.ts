export default defineNuxtRouteMiddleware((to, from) => {
  const user = useCookie("user");
  if (!user.value) {
    setPageLayout('dashboard');
    return navigateTo("/auth/login");
  }
});
