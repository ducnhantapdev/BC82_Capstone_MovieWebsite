import fetcher from "./fetcher";

export const listMovieAPI = async (data) => {
  //data: {soTrang:1, soPhanTuTrenTrang: 10, maNhom=GP01}
  try {
    const response = await fetcher.get(
      "QuanLyPhim/LayDanhSachPhimPhanTrang?maNhom=GP01",
      { params: data }
    );
    return response.data.content;
  } catch (error) {
    console.error("Error fetching movie list:", error);
    throw error;
  }
};
