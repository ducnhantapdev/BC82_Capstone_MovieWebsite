import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById } from "@/apis/getMovieById";

export default function EditMovie() {
  const { id } = useParams();
  const [form, setForm] = useState({
    tenPhim: "",
    trailer: "",
    moTa: "",
    ngayKhoiChieu: "",
    dangChieu: false,
    sapChieu: false,
    hot: false,
    danhGia: 0,
    hinhAnh: null,
    maNhom: "GP01",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getMovieById(id)
      .then((data) => {
        setForm({
          tenPhim: data.tenPhim || "",
          trailer: data.trailer || "",
          moTa: data.moTa || "",
          ngayKhoiChieu: data.ngayKhoiChieu?.slice(0, 10) || "",
          dangChieu: data.dangChieu || false,
          sapChieu: data.sapChieu || false,
          hot: data.hot || false,
          danhGia: data.danhGia || 0,
          hinhAnh: null,
          maNhom: data.maNhom || "GP01",
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gọi API cập nhật phim
    alert("Đã cập nhật thông tin phim!");
    setForm({
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: null,
      maNhom: "GP01",
    });
  };

  if (loading) return <div>Đang tải thông tin phim...</div>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-4 bg-white rounded shadow"
    >
      <h2 className="text-xl font-bold mb-4">Chỉnh sửa phim</h2>
      <input
        name="tenPhim"
        value={form.tenPhim}
        onChange={handleChange}
        placeholder="Tên phim"
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="trailer"
        value={form.trailer}
        onChange={handleChange}
        placeholder="Trailer"
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        name="moTa"
        value={form.moTa}
        onChange={handleChange}
        placeholder="Mô tả"
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="ngayKhoiChieu"
        type="date"
        value={form.ngayKhoiChieu}
        onChange={handleChange}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        name="danhGia"
        type="number"
        value={form.danhGia}
        onChange={handleChange}
        placeholder="Đánh giá"
        className="w-full mb-2 p-2 border rounded"
      />
      {form.hinhAnh && typeof form.hinhAnh === "string" ? (
        <img
          src={form.hinhAnh}
          alt="Hình ảnh phim"
          className="w-32 h-44 object-cover mb-2 mx-auto"
        />
      ) : null}
      <input
        name="hinhAnh"
        type="file"
        onChange={handleChange}
        className="w-full mb-2"
      />
      <div className="flex gap-4 mb-2">
        <label>
          <input
            type="checkbox"
            name="dangChieu"
            checked={form.dangChieu}
            onChange={handleChange}
          />{" "}
          Đang chiếu
        </label>
        <label>
          <input
            type="checkbox"
            name="sapChieu"
            checked={form.sapChieu}
            onChange={handleChange}
          />{" "}
          Sắp chiếu
        </label>
        <label>
          <input
            type="checkbox"
            name="hot"
            checked={form.hot}
            onChange={handleChange}
          />{" "}
          Hot
        </label>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Cập nhật phim
      </button>
    </form>
  );
}
