import { getMovieById } from "@/apis/getMovieById";
import React, { useEffect, useState } from "react";

const movieInfo = {
  title: "Ký Sinh Trùng",
  description: "Một bộ phim đoạt giải Oscar về sự phân tầng xã hội...",
  director: "Bong Joon-ho",
  duration: "132 phút",
  genre: "Kịch tính, Hồi hộp",
  poster: "https://i.imgur.com/UYiroysl.jpg", // thay bằng link poster thật
};

const cinemas = [
  {
    name: "GLX - Nguyễn Du",
    address: "116 Nguyễn Du, Q1, TP.HCM",
    showtimes: ["18:00", "20:15", "22:30"],
  },
  {
    name: "GLX - Tân Bình",
    address: "246 Nguyễn Hồng Đào, Tân Bình",
    showtimes: ["19:00", "20:45"],
  },
];

export default function MovieDetailsComponent(props) {
  const [selectedCinema, setSelectedCinema] = useState(cinemas[0]);
  const [movie, setMovie] = useState(movieInfo);

  const { id } = props;

  useEffect(() => {
    getMovieById(id).then((res) => {
      setMovie(res);
    });
  }, [id]);

  const getEmbedUrl = (originalUrl) => {
    if (!originalUrl || typeof originalUrl !== "string") {
      return "";
    }
    // Giả sử URL có dạng https://www.youtube.com/watch?v=VIDEO_ID
    if (originalUrl.includes("watch?v=")) {
      const videoId = originalUrl.split("v=")[1];
      // Tách các tham số khác nếu có (ví dụ: &list=...)
      const ampersandPosition = videoId.indexOf("&");
      if (ampersandPosition !== -1) {
        return `https://www.youtube.com/embed/${videoId.substring(
          0,
          ampersandPosition
        )}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return originalUrl; // Trả về URL gốc nếu không khớp
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="imgMovie">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="w-full h-auto rounded-lg shadow-lg"
          />
          <div className="btn-img flex justify-around mt-4">
            <button className="px-4 py-2  bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Đặt vé ngay
            </button>
          </div>
        </div>
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold text-white">{movie.tenPhim}</h1>
          <iframe
            className="w-full h-96 rounded-lg"
            src={getEmbedUrl(movie.trailer)}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Rạp */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Cụm Rạp</h2>
          <ul className="space-y-3">
            {cinemas.map((cinema, index) => (
              <li
                key={index}
                className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-100 ${
                  selectedCinema.name === cinema.name
                    ? "bg-blue-100 border-blue-400"
                    : ""
                }`}
                onClick={() => setSelectedCinema(cinema)}
              >
                <p className="font-medium">{cinema.name}</p>
                <p className="text-sm text-gray-600">{cinema.address}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Lịch Chiếu */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Lịch Chiếu</h2>
          <div className="flex flex-wrap gap-3">
            {selectedCinema.showtimes.map((time, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-green-200 rounded-lg font-medium"
              >
                {time}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
