"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const useGetRequest = (url: string) => {
  console.log("useGetRequest");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    axios
      .get(url)
      .then((res) => {
        setResponse(res.data.result);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { response, error, loading };
};

export default useGetRequest;
