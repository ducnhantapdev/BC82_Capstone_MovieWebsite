import React, { useEffect, useState } from "react";
import { addUser, listUserAPI, updateUserInfo } from "@/apis/user";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import EditUserForm from "./editUser";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "",
    maLoaiNguoiDung: "",
    hoTen: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await listUserAPI();
      setUsers(data);
    } catch {
      toast.error("Không thể lấy danh sách user!");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser({ ...form });
      toast.success("Tạo tài khoản thành công!");
      setShowAdd(false);
      setForm({
        taiKhoan: "",
        matKhau: "",
        email: "",
        soDt: "",
        hoTen: "",
        maNhom: "",
        maLoaiNguoiDung: "",
      });
      fetchUsers();
    } catch {
      toast.error("Tạo tài khoản thất bại!");
    }
  };

  const handleEditUser = async (formData) => {
    try {
      await updateUserInfo(formData);
      console.log(formData);
      toast.success("Cập nhật tài khoản thành công!");
      setShowEdit(false);
      setSelectedUser(null);
      fetchUsers();
    } catch {
      toast.error("Cập nhật tài khoản thất bại!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
        <Button
          onClick={() => setShowAdd(true)}
          className="bg-blue-600 text-white"
        >
          Tạo tài khoản
        </Button>
      </div>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Tài khoản</th>
            <th className="p-2 border">Mật khẩu</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Số ĐT</th>
            <th className="p-2 border">Mã ND</th>
            <th className="p-2 border">Họ tên</th>
            <th className="p-2 border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.taiKhoan} className="border-t">
              <td className="p-2 border">{user.taiKhoan}</td>
              <td className="p-2 border">{user.matKhau}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.soDT}</td>
              <td className="p-2 border">{user.maLoaiNguoiDung}</td>
              <td className="p-2 border">{user.hoTen}</td>
              <td className="p-2 border">
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowEdit(true);
                  }}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Modal tạo tài khoản */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 relative"
            onSubmit={handleAddUser}
          >
            <button
              type="button"
              className="absolute top-2 right-2 text-xl"
              onClick={() => setShowAdd(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">Tạo tài khoản mới</h2>
            <Input
              placeholder="Tài khoản"
              name="taiKhoan"
              value={form.taiKhoan}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              placeholder="Mật khẩu"
              name="matKhau"
              value={form.matKhau}
              onChange={handleChange}
              required
            />

            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <Input
              type="tel"
              placeholder="Số điện thoại"
              name="soDt"
              value={form.soDt}
              onChange={handleChange}
              required
            />

            <Input
              placeholder="Mã nhóm"
              name="maNhom"
              value={form.maNhom}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Mã người dung"
              name="maLoaiNguoiDung"
              value={form.maLoaiNguoiDung}
              onChange={handleChange}
              required
            />
            <Input
              placeholder="Họ và tên"
              name="hoTen"
              value={form.hoTen}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full bg-blue-600 text-white">
              Tạo tài khoản
            </Button>
          </form>
        </div>
      )}
      {/* Modal chỉnh sửa tài khoản */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <EditUserForm
            user={selectedUser}
            onClose={() => {
              setShowEdit(false);
              setSelectedUser(null);
            }}
            onSave={handleEditUser}
          />
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
