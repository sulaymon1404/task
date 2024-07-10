import { useState, useEffect } from "react";
import axios from "axios";

export const useRecords = () => {
  const [records, setRecords] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchRecords = async () => {
    try {
        console.log(page)
      setLoading(true);
      if (page == 1) {
        setRecords([]);


        console.log("drn")
      }
      const response = await axios.get(
        `http://localhost:3001/records?_page=${page}&_per_page=10`
      );
      setRecords((prev) => [...prev, ...response.data.data]);
      if (response.data.pages === page) setHasMore(false);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching records", error);
      setLoading(false);
    }
  };

//   useEffect(() => {
//     fetchRecords();
//   }, [page]);
  return {
    records,
    setRecords,
    hasMore,
    setHasMore,
    loading,
    setPage,
    fetchRecords,
    page,
    setPage,
  };
};
