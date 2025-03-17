import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const images = [
  {
    src: "https://static.nationalgeographicbrasil.com/files/styles/image_3200/public/01-Cats.webp?w=1600&h=900",
    text1: "landing_carousel.slide01_title",
    text2: "landing_carousel.description01",
    link: "/about",
  },
  {
    src: "https://www.patasdacasa.com.br/sites/default/files/styles/article_detail_1200/public/2024-09/gato-preto.jpg.webp?itok=VI-YbRBa",
    text1: "landing_carousel.slide02_title",
    text2: "landing_carousel.description02",
    link: "#",
  },
  {
    src: "https://jpimg.com.br/uploads/2023/06/10-dicas-para-cuidar-de-um-gato-filhote.jpg",
    text1: "landing_carousel.slide03_title",
    text2: "landing_carousel.description03",
    link: "/adoption"
  },
];

const maxSlides = 3;

function LandingCarousel() {
  const { t } = useTranslation();
  return (
    <div className="relative w-full p-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{clickable: true}}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={20}
        slidesPerView='auto'
        className="shadow-lg"
      >
        {images.slice(0, maxSlides).map((item, index) => (
          <SwiperSlide key={index} className="relative w-full">
            <Link to={item.link} className="block w-full h-full">
            <img
              src={item.src}
              alt={`Gato ${index + 1}`}
              className="w-full h-[500px] object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-black/70 rounded-2xl z-10"></div>
            <div className="absolute bottom-10 left-10 text-white z-20">
              <p className="font-tiny text-[3vw]">{t(item.text1)}</p>
              <p className="font-afacad text-[1vw]">{t(item.text2)}</p>
            </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination !absolute bottom-4 flex justify-center space-x-2 bg-amber-50"></div>
    </div>
    
  );
}

export default LandingCarousel;
