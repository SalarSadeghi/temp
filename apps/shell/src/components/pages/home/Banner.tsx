import { CustomCarousel } from "@superapp/ui";
import adm from "@assets/ADM_banner.jpg";
import hse from "@assets/HSE_banner.jpg";
import soe from "@assets/SOE_banner.jpg";

const Banner = () => {
  const items = [
    { title: "Slide 1", image: adm },
    { title: "Slide 2", image: hse },
    { title: "Slide 3", image: soe },
  ];
  return (
    <div className="rounded-md bg-gradient-to-l from-[#432b6f] to-[#00807e] p-1">
      <div className="bg-white h-28">
        <CustomCarousel
          dotSx={{ bottom: 0 }}
          sx={{ height: "100%", width: "100%" }}
          settings={{
            slidesToShow: 1,
            spacing: 0,
            autoplay: true,
            showArrows: false,
            showDots: false,
            infinite: true,
          }}
        >
          {items?.map((i) => {
            return (
              <div className="h-28 w-full p-1 flex justify-center items-center">
                <img src={i.image}/>
              </div>
            );
          })}
        </CustomCarousel>
      </div>
    </div>
  );
};

export default Banner;
