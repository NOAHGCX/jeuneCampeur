import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";

type  CarrousselProductProps = {
  product?: any
}
const CarrousselProduct = (props: CarrousselProductProps) => {

  return (

<div className="swiper">
<Swiper navigation={true} modules={[Navigation]} className="mySwiper h-300 w-400">
  {props.product.pictures.map((image, index) => (
    <SwiperSlide key={index} className="flex items-center justify-center">
      <div className="w-full h-full">
        <img src="/banniere.jpg" alt="Description de l'image" className="object-cover w-full h-full" />
      </div>
    </SwiperSlide>
  ))}
</Swiper>
</div>

  );
};

export default CarrousselProduct;
