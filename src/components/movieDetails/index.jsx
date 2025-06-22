import { getMovieById } from "@/apis/getMovieById";
import { getShowtimesByMovie } from "@/apis/showtime";
import React, { useState } from "react";
import { useEffect } from "react";

export default function MovieDetailsComponent(props) {
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState(null);
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);

  const { id } = props;

  useEffect(() => {
    getMovieById(id).then((res) => {
      setMovie(res);
    });

    getShowtimesByMovie(id).then((data) => {
      setShowtimes(data);
      if (data?.heThongRapChieu?.length > 0) {
        setSelectedSystem(data.heThongRapChieu[0]);
      }
    });
  }, [id]);

  const handleSelectSystem = (system) => {
    setSelectedSystem(system);
    setSelectedTheater(null);
  };

  const formatDateAndTime = (dateString) => {
    if (!dateString) return { date: "", time: "" };

    try {
      const date = new Date(dateString);
      const formattedDate = date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const formattedTime = date.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      return { date: formattedDate, time: formattedTime };
    } catch (error) {
      console.error("Error formatting date:", error);
      return { date: dateString, time: "" };
    }
  };

  const getGroupedShowtimes = () => {
    if (!selectedTheater) return {};
    return selectedTheater.lichChieuPhim.reduce((acc, show) => {
      const { date, time } = formatDateAndTime(show.ngayChieuGioChieu);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({ ...show, time });
      acc[date].sort((a, b) => a.time.localeCompare(b.time));
      return acc;
    }, {});
  };

  const groupedShowtimes = getGroupedShowtimes();

  const getEmbedUrl = (originalUrl) => {
    if (!originalUrl || typeof originalUrl !== "string") return "";
    if (originalUrl.includes("watch?v=")) {
      const videoId = originalUrl.split("v=")[1];
      const ampersandPosition = videoId.indexOf("&");
      if (ampersandPosition !== -1) {
        return `https://www.youtube.com/embed/${videoId.substring(
          0,
          ampersandPosition
        )}`;
      }
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return originalUrl;
  };

  if (!movie || !showtimes) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-20">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="imgMovie">
          <img
            src={movie.hinhAnh}
            alt={movie.tenPhim}
            className="w-full h-auto rounded-lg shadow-lg object-cover"
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold text-white">{movie.tenPhim}</h1>
          <iframe
            className="w-full h-96 rounded-lg"
            src={getEmbedUrl(movie.trailer)}
            title="Movie Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
          <p className="text-gray-300">{movie.moTa}</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cụm Rạp */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-700">
            Cụm Rạp
          </h2>
          <ul className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {showtimes.heThongRapChieu.map((system) => (
              <li
                key={system.maHeThongRap}
                onClick={() => handleSelectSystem(system)}
                className={`p-3 rounded-lg cursor-pointer flex items-center gap-4 transition-all ${
                  selectedSystem?.maHeThongRap === system.maHeThongRap
                    ? "bg-red-600/80 shadow-lg"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <img
                  src={system.logo}
                  alt={system.tenHeThongRap}
                  className="w-12 h-12 rounded-full bg-white p-1"
                />
                <span className="font-medium">{system.tenHeThongRap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Rạp chiếu */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-700">
            Rạp Chiếu
          </h2>
          <ul className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
            {selectedSystem?.cumRapChieu.map((theater) => (
              <li
                key={theater.maCumRap}
                onClick={() => setSelectedTheater(theater)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedTheater?.maCumRap === theater.maCumRap
                    ? "bg-blue-600/80 shadow-lg"
                    : "bg-gray-800 hover:bg-gray-700"
                }`}
              >
                <p className="font-semibold">{theater.tenCumRap}</p>
                <p className="text-sm text-gray-400">{theater.diaChi}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Lịch Chiếu */}
        <div>
          <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-700">
            Lịch Chiếu
          </h2>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {Object.keys(groupedShowtimes).length > 0 ? (
              Object.entries(groupedShowtimes).map(([date, shows]) => (
                <div key={date} className="bg-gray-800 p-3 rounded-lg">
                  <h3 className="text-lg font-bold text-green-400 mb-2">
                    {date}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {shows.map((show) => (
                      <button
                        key={show.maLichChieu}
                        className="px-3 py-1 bg-gray-700 hover:bg-red-600 rounded-md text-sm font-medium transition-colors"
                      >
                        {show.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-400 italic">
                Vui lòng chọn rạp để xem lịch chiếu.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
