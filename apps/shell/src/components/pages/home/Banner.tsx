import { useAuthStore } from "@superapp/shared-store";

const Banner = () => {
  const { user } = useAuthStore();

  return (
    <div className="rounded-md bg-gradient-to-l from-[#432b6f] to-[#00807e]  p-1">
      <div className="bg-white h-28">{user?.name}</div>
    </div>
  );
};

export default Banner;
