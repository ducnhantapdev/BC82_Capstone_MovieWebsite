import { listMovieAPI } from "@/apis/movie";
import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function Carousel() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log("movies", movies);

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      setLoading(true);
      const response = await listMovieAPI();
      console.log("danh sach:", response.items);
      setMovies(response.items);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {/* Movie Carousel */}
      <section className="px-8 mb-12">
        <h3 className="text-3xl mb-4 font-semibold">Phim đang chiếu</h3>
        <Swiper
          navigation={true}
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={5}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="mySwiper"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.maPhim}>
              <div className="hover:scale-105 transition-transform duration-300 cursor-pointer w-full">
                <img
                  src={movie.hinhAnh}
                  alt={movie.tenPhim}
                  className="rounded-lg shadow-lg w-full"
                  style={{
                    width: "100%",
                    height: "600px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
