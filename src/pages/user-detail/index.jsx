import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserInfo, updateUserInfo } from "@/apis/user";
import { useNavigate } from "react-router-dom";

export default function UserDetail() {
  // Lấy user từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);
  const [edit, setEdit] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Luôn gọi hook, chỉ enable khi có user
  const { data, isLoading } = useQuery({
    queryKey: ["profile", user?.taiKhoan],
    queryFn: () => getUserInfo(user.taiKhoan),
    enabled: !!user,
  });

  const mutation = useMutation({
    mutationFn: updateUserInfo,
    onSuccess: () => {
      if (user) queryClient.invalidateQueries(["profile", user.taiKhoan]);
      setEdit(false);
    },
  });

  // Nếu chưa đăng nhập, chuyển về trang đăng nhập
  if (!user) {
    navigate("/login");
    return null;
  }

  if (isLoading) return <div>Đang tải...</div>;
  if (!data) return <div>Không có dữ liệu</div>;

  // Tạo avatar từ ký tự đầu tên tài khoản
  const avatar = user.hoTen
    ? user.hoTen.charAt(0).toUpperCase()
    : user.taiKhoan
    ? user.taiKhoan.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-10">
      {/* Section: Avatar & Tên tài khoản */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-3xl text-white font-bold shadow">
          {avatar}
        </div>
        <div>
          <div className="text-2xl font-bold">{user.hoTen}</div>
          <div className="text-gray-500">@{user.taiKhoan}</div>
        </div>
      </div>

      {/* Section: Thông tin tài khoản */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-3 border-b pb-1">
          Thông tin tài khoản
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="font-medium">Tài khoản:</span> {user.taiKhoan}
          </div>
          <div>
            <span className="font-medium">Họ tên:</span> {user.hoTen}
          </div>
          <div>
            <span className="font-medium">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-medium">Số điện thoại:</span> {user.soDt}
          </div>
          <div>
            <span className="font-medium">Loại tài khoản:</span>{" "}
            {user.maLoaiNguoiDung}
          </div>
          <div>
            <span className="font-medium">Nhóm:</span> {user.maNhom || "GP01"}
          </div>
          <div>
            <span className="font-medium">Mật khẩu:</span>{" "}
            <span className="tracking-widest">********</span>
          </div>
          {/* Nếu có ngày tạo hoặc trạng thái, hiển thị thêm */}
          {user.ngayTao && (
            <div>
              <span className="font-medium">Ngày tạo:</span>{" "}
              {new Date(user.ngayTao).toLocaleDateString()}
            </div>
          )}
          {user.trangThai && (
            <div>
              <span className="font-medium">Trạng thái:</span> {user.trangThai}
            </div>
          )}
        </div>
        <button
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setEdit(true)}
        >
          Chỉnh sửa thông tin
        </button>
      </div>

      {/* Section: Form chỉnh sửa */}
      {edit && (
        <form
          className="mb-8 bg-gray-50 p-4 rounded shadow"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            mutation.mutate({
              taiKhoan: user.taiKhoan,
              matKhau: formData.get("matKhau"),
              email: formData.get("email"),
              soDt: formData.get("soDt"),
              hoTen: formData.get("hoTen"),
              maLoaiNguoiDung: user.maLoaiNguoiDung,
              maNhom: user.maNhom || "GP01",
            });
          }}
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Họ tên</label>
              <input
                name="hoTen"
                defaultValue={user.hoTen}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                name="email"
                defaultValue={user.email}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Số điện thoại
              </label>
              <input
                name="soDt"
                defaultValue={user.soDt}
                className="border p-2 w-full rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
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
              className="bg-green-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Lưu
            </button>
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded"
              onClick={() => setEdit(false)}
              type="button"
            >
              Hủy
            </button>
          </div>
        </form>
      )}

      {/* Section: Lịch sử đặt vé */}
      <div>
        <h2 className="text-lg font-semibold mb-3 border-b pb-1">
          Lịch sử đặt vé
        </h2>
        {user.thongTinDatVe && user.thongTinDatVe.length > 0 ? (
          <div className="space-y-4">
            {user.thongTinDatVe.map((ve, idx) => (
              <div key={idx} className="border rounded p-3 bg-gray-50">
                <div className="font-medium text-blue-600">{ve.tenPhim}</div>
                <div>
                  <span className="font-medium">Ngày đặt:</span>{" "}
                  {new Date(ve.ngayDat).toLocaleString()}
                </div>
                <div>
                  <span className="font-medium">Rạp:</span> {ve.tenHeThongRap} -{" "}
                  {ve.tenRap}
                </div>
                <div>
                  <span className="font-medium">Ghế:</span>{" "}
                  {ve.danhSachGhe.map((g) => g.tenGhe).join(", ")}
                </div>
                <div>
                  <span className="font-medium">Thời lượng:</span>{" "}
                  {ve.thoiLuongPhim} phút
                </div>
                <div>
                  <span className="font-medium">Giá vé:</span>{" "}
                  {ve.giaVe?.toLocaleString()}đ
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>Chưa có lịch sử đặt vé</div>
        )}
      </div>
    </div>
  );
}
