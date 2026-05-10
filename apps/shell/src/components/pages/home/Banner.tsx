import { useAuthStore } from "@superapp/shared-store";

const Banner = () => {
  const { user } = useAuthStore();
  console.log(user);
  

  return (
    <div className="rounded-md bg-gradient-to-br from-[#9945FF] to-[#14F195] p-1">
      <div className="bg-white h-28">{user?.name}</div>
    </div>
  );
};

export default Banner;
