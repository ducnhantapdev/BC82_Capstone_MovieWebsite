import fetcher from "./fetcher";

export const getShowtimesByMovie = async (movieId) => {
  try {
    const response = await fetcher.get(
      `QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${movieId}`
    );
    return response.data.content;
  } catch (error) {
    console.error(`Error fetching showtimes for movie ${movieId}:`, error);
    throw error;
  }
};
