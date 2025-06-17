import { listMovieAPI } from "@/apis/movie";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function MovieManagement() {
  const { data, isLoading, error } = useQuery({
    queryFn: () =>
      listMovieAPI({ soTrang: 1, soPhanTuTrenTrang: 10, maNhom: "GP01" }),
    queryKey: [
      "movie-list",
      { soTrang: 1, soPhanTuTrenTrang: 10, maNhom: "GP01" },
    ],
  });
  console.log("data", data);
  return <div>MovieManagement</div>;
}
