export default defineEventHandler(async (event) => {
  const { id } =  getRouterParams(event);
  const { date } = getQuery(event);
  return {
    id: 1,
    name: `John Doe ${id}`,
    phone: "123-456-7890",
    date: date,
    image:
      "https://cdn3d.iconscout.com/3d/premium/thumb/boy-avatar-3d-icon-download-in-png-blend-fbx-gltf-file-formats--boys-male-man-pack-avatars-icons-5187865.png?f=webp",
  };
});
