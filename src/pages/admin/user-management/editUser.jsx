import React, { useState, useEffect } from "react";

const EditUserForm = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    fullName: "",
    email: "",
    phone: "",
    userType: "KhachHang",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        password: "",
        fullName: user.fullName || "",
        email: user.email || "",
        phone: user.phone || "",
        userType: user.userType || "KhachHang",
      });
    } else {
      setFormData({
        username: "",
        password: "",
        fullName: "",
        email: "",
        phone: "",
        userType: "KhachHang",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-6">
        {user ? "Chỉnh sửa người dùng" : "Thêm người dùng"}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Tài khoản</label>
          <input
            type="text"
            name="username"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Số điện thoại</label>
          <input
            type="text"
            name="phone"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Họ tên</label>
          <input
            type="text"
            name="fullName"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Loại người dùng</label>
          <select
            name="userType"
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            value={formData.userType}
            onChange={handleChange}
          >
            <option value="KhachHang">Khách Hàng</option>
            <option value="QuanTri">Quản Trị</option>
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleSubmit}
        >
          {user ? "Lưu" : "Thêm"}
        </button>
        <button
          className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          onClick={onClose}
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default EditUserForm;
