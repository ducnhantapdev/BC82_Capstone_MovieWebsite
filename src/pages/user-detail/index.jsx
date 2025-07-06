import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, updateUserInfo } from "@/apis/user";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function UserDetail() {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Lấy tài khoản từ localStorage (nếu là profile cá nhân)
    const userLocal = JSON.parse(localStorage.getItem("user"));
    const taiKhoan = userLocal?.taiKhoan;
    if (taiKhoan) {
      getUserInfo(taiKhoan).then((res) => {
        setUser(res.data.content); // hoặc setUser(res.content) tùy theo API trả về
      });
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["profile", user?.taiKhoan],
    queryFn: () => getUserInfo(user.taiKhoan),
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: async () => {
      if (user) {
        const freshUser = await getUserInfo(user.taiKhoan);
        localStorage.setItem(
          "user",
          JSON.stringify(freshUser.data.content || freshUser)
        );
        queryClient.invalidateQueries(["profile", user.taiKhoan]);
      }
      setEdit(false);
      setUpdateMessage("Cập nhật thành công!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
    },
    onError: () => {
      setUpdateMessage("Cập nhật thất bại!");
    },
  });

  if (!user) return null;
  if (isLoading) return <div>Đang tải...</div>;
  if (!data) return <div>Không có dữ liệu</div>;

  // Lấy thông tin user mới nhất từ API
  const info = data.thongTinNguoiDung || data;

  // Tạo avatar từ ký tự đầu tên tài khoản
  const avatar = user.hoTen ? user.hoTen : user.taiKhoan;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl mt-10">
      {/* Avatar & Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
        <div className="text-xl w-28 h-28 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center  text-white font-bold shadow-lg border-4 border-white">
          {avatar}
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="text-3xl font-extrabold text-blue-700">
              {user.hoTen}
            </div>
            <button
              type="button"
              className="text-blue-500 hover:text-blue-700"
              title="Chỉnh sửa thông tin"
              onClick={() => setEdit(true)}
            >
              <FaEdit size={22} />
            </button>
          </div>
          <div className="text-gray-500 text-lg">@{user.taiKhoan}</div>
          <div className="mt-2 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              {user.maLoaiNguoiDung}
            </span>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
              Nhóm: {user.maNhom || "GP01"}
            </span>
          </div>
        </div>
      </div>

      {/* Thông tin tài khoản */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-blue-600 border-b pb-2">
          Thông tin tài khoản
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-semibold">Tài khoản:</span> {user.taiKhoan}
          </div>
          <div>
            <span className="font-semibold">Họ tên:</span> {user.hoTen}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-semibold">Số điện thoại:</span> {user.soDT}
          </div>

          {user.ngayTao && (
            <div>
              <span className="font-semibold">Ngày tạo:</span>{" "}
              {new Date(user.ngayTao).toLocaleDateString()}
            </div>
          )}
          {info.trangThai && (
            <div>
              <span className="font-semibold">Trạng thái:</span>{" "}
              {user.trangThai}
            </div>
          )}
        </div>
        <button
          className="mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition"
          onClick={() => setEdit(true)}
        >
          Chỉnh sửa thông tin
        </button>
      </div>

      {/* Form chỉnh sửa */}
      {edit && (
        <form
          className="mb-8 bg-white text-black p-6 rounded-xl shadow-lg border"
          onSubmit={(e) => {
            e.preventDefault();
            setUpdateMessage("");
            const formData = new FormData(e.target);
            mutation.mutate({
              taiKhoan: user.taiKhoan,
              matKhau: formData.get("matKhau"),
              email: formData.get("email"),
              soDt: formData.get("soDT"),
              hoTen: formData.get("hoTen"),
              maLoaiNguoiDung: user.maLoaiNguoiDung,
              maNhom: user.maNhom || "GP01",
            });
          }}
        >
          {/* Thông báo thành công/thất bại */}
          {updateMessage && (
            <div
              className={`mb-4 font-semibold ${
                updateMessage.includes("thất bại")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {updateMessage}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Họ tên</label>
              <input
                name="hoTen"
                defaultValue={user.hoTen}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                name="email"
                defaultValue={user.email}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Số điện thoại
              </label>
              <input
                name="soDt"
                defaultValue={user.soDT}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Mật khẩu mới
              </label>
              <input
                name="matKhau"
                type="password"
                placeholder="Nhập mật khẩu mới"
                className="border p-2 w-full rounded"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded font-bold"
              type="submit"
            >
              Lưu
            </button>
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded font-bold"
              onClick={() => setEdit(false)}
              type="button"
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      {/* Lịch sử đặt vé */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4 text-blue-600 border-b pb-2">
          Lịch sử đặt vé
        </h2>
        {user.thongTinDatVe && user.thongTinDatVe.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.thongTinDatVe.map((ve, idx) => (
              <div
                key={idx}
                className="border rounded-lg p-4 bg-blue-50 text-black shadow flex flex-col gap-2"
              >
                <div className="font-bold text-blue-700 text-lg">
                  {ve.tenPhim}
                </div>
                <div>
                  <span className="font-semibold">Ngày đặt:</span>{" "}
                  {new Date(ve.ngayDat).toLocaleString()}
                </div>
                <div>
                  <span className="font-semibold">Rạp:</span> {ve.tenHeThongRap}{" "}
                  - {ve.tenRap}
                </div>
                <div>
                  <span className="font-semibold">Ghế:</span>{" "}
                  {ve.danhSachGhe.map((g) => g.tenGhe).join(", ")}
                </div>
                <div>
                  <span className="font-semibold">Thời lượng:</span>{" "}
                  {ve.thoiLuongPhim} phút
                </div>
                <div>
                  <span className="font-semibold">Giá vé:</span>{" "}
                  {ve.giaVe?.toLocaleString()}đ
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500">Chưa có lịch sử đặt vé</div>
        )}
      </div>
    </div>
  );
}
