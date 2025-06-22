import React from "react";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { datGhe } from "../../redux/slice/movieSeats.slice";

export default function Ticket() {
  const [name, setName] = useState("");
  const [seatCount, setSeatCount] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const [bookingList, setBookingList] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const dataRedux = useSelector((state) => {
    return state.movieSeats.danhSachGhe;
  });
  const dispatch = useDispatch();

  const handleStartSelecting = () => {
    if (!name || !seatCount) {
      alert("Vui lòng nhập đầy đủ họ tên và số lượng ghế!");
      return;
    } else {
      alert("Thành công ! bắt đầu chọn ghế");
      setIsSelecting(true);
      setSelectedSeats([]); // Reset danh sách ghế đã chọn
    }
  };

  const handleSeatClick = (seat) => {
    if (seat.daDat || bookedSeats.includes(seat.soGhe)) return;
    if (!isSelecting) {
      alert("Vui lòng nhấn Start Selecting trước khi chọn ghế!");
      return;
    }

    if (selectedSeats.find((item) => item.soGhe === seat.soGhe)) {
      setSelectedSeats(
        selectedSeats.filter((item) => item.soGhe !== seat.soGhe)
      );
    } else {
      if (selectedSeats.length >= parseInt(seatCount)) {
        alert(`Bạn chỉ được chọn tối đa ${seatCount} ghế!`);
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleConfirm = () => {
    if (selectedSeats.length !== parseInt(seatCount)) {
      alert(`Vui lòng chọn đủ ${seatCount} ghế!`);
      return;
    }

    // Tính tiền ghế
    const totalAmount = selectedSeats.reduce(
      (total, seat) => total + seat.gia,
      0
    );

    // Thêm thông tin vào bảng
    setBookingList([
      ...bookingList,
      {
        name,
        seatCount,
        seats: selectedSeats.map((seat) => seat.soGhe).join(", "),
        totalAmount: totalAmount.toLocaleString("vi-VN") + " VNĐ",
      },
    ]);

    // Thêm các ghế đã chọn vào danh sách ghế đã đặt
    setBookedSeats([
      ...bookedSeats,
      ...selectedSeats.map((seat) => seat.soGhe),
    ]);

    // Cập nhật trạng thái daDat của các ghế đã chọn
    selectedSeats.forEach((seat) => {
      dispatch(
        datGhe({
          soGhe: seat.soGhe,
          daDat: true,
        })
      );
    });

    // Reset form
    setName("");
    setSeatCount("");
    setSelectedSeats([]);
    setIsSelecting(false);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-6"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?cinema')",
      }}
    >
      <div className="bg-black bg-opacity-80 p-8 rounded-md w-full max-w-4xl text-white">
        <h2 className="text-orange-500 text-lg mb-4">
          Fill The Required Details Below And Select Your Seats
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label>Name *</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 bg-transparent border border-gray-400 text-white"
            />
          </div>
          <div>
            <label>Number of Seats *</label>
            <input
              value={seatCount}
              onChange={(e) => setSeatCount(e.target.value)}
              type="number"
              className="w-full p-2 bg-transparent border border-gray-400 text-white"
            />
          </div>
        </div>
        <button
          className="bg-white text-black px-4 py-2 rounded mb-6"
          onClick={handleStartSelecting}
        >
          Start Selecting
        </button>

        <div className="flex gap-4 mb-4 justify-center">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500"></div> Selected Seat
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500"></div> Reserved Seat
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-300"></div> Empty Seat
          </div>
        </div>

        <div className="overflow-x-auto flex justify-center">
          <div className="inline-block">
            <div className="grid grid-cols-13 gap-2 text-center text-white"></div>
            {dataRedux.map((row, index) => (
              <div key={index} className="flex items-center">
                <span className="w-8 text-right pr-2 ">{row.hang}</span>
                {row.danhSachGhe.map((seat, seatIndex) => (
                  <button
                    key={seatIndex}
                    className={`w-10 h-10 m-1 rounded ${
                      index === 0
                        ? ""
                        : seat.daDat || bookedSeats.includes(seat.soGhe)
                        ? "bg-red-500 cursor-not-allowed"
                        : selectedSeats.find(
                            (item) => item.soGhe === seat.soGhe
                          )
                        ? "bg-green-500"
                        : "bg-yellow-300 hover:bg-green-500"
                    }`}
                    disabled={seat.daDat || bookedSeats.includes(seat.soGhe)}
                    onClick={() => handleSeatClick(seat)}
                  >
                    {seat.soGhe}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 w-full text-center bg-orange-500 text-black py-2 font-bold tracking-widest">
          SCREEN THIS WAY
        </div>

        <div className="mt-6 text-center">
          <button
            className="bg-white text-black px-6 py-2 rounded"
            onClick={handleConfirm}
          >
            Confirm Selection
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full bg-white text-black border border-black">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Number of Seats</th>
                <th className="border px-4 py-2">Seats</th>
                <th className="border px-4 py-2">Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.length === 0 ? (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan={4}>
                    No data
                  </td>
                </tr>
              ) : (
                bookingList.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.seatCount}</td>
                    <td className="border px-4 py-2">{item.seats}</td>
                    <td className="border px-4 py-2">{item.totalAmount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
