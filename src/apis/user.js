import fetcher from "./fetcher";

export const listMovieAPI = async (data) => {
  //data: {soTrang:1, soPhanTuTrenTrang: 10, maNhom=GP01}
  try {
    const response = await fetcher.get(
      "QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP01",
      { params: data }
    );
    return response.data.content;
  } catch (error) {
    console.error("Error fetching user list:", error);
    throw error;
  }
};

// Lấy thông tin tài khoản
export const getUserInfo = (taiKhoan) =>
  fetcher.post("/QuanLyNguoiDung/ThongTinTaiKhoan", { taiKhoan });

// Cập nhật thông tin tài khoản
export const updateUserInfo = (data) =>
  fetcher.put("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", data);
