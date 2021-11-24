import { useEffect } from "react";
import { fetcher } from "src/fetcher";
import useSWR from "swr";

export const usePing = () => {
  const { data } = useSWR("/api/ping", fetcher);
  useEffect(() => {
    if (data?.message) {
      console.log(data?.message);
    }
  }, [data]);
};
