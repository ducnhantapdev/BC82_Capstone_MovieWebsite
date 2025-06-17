import React from "react";

export default function Banner() {
  return (
    <div>
      {/* Banner */}
      <section
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-start pl-12 mb-12"
        style={{
          backgroundImage:
            "url('https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg')",
        }}
      >
        <div className="max-w-xl">
          <h2 className="text-5xl font-extrabold mb-4">Avengers: Endgame</h2>
          <p className="text-lg mb-6 text-gray-300">
            After the devastating events of Avengers: Infinity War, the universe
            is in ruins. With the help of remaining allies, the Avengers
            assemble once more.
          </p>
          <button className="bg-red-600 px-6 py-3 rounded text-xl hover:bg-red-700 transition">
            Watch Now
          </button>
        </div>
      </section>
    </div>
  );
}
