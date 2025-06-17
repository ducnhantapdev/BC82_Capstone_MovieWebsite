import fetcher from "./fetcher";
export const loginAuthAPI = async (data) => {
  // data = {taikhoan:..., matkhau:....} => backend quy dinh
  try {
    const response = await fetcher.post("QuanLyNguoiDung/DangNhap", data);
    return response.data.content;
  } catch (error) {
    throw Error(error);
  }
};
