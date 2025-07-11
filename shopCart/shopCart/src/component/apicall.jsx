import { useEffect, useState } from "react";

export const useApiCall = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const apiC = async () => {
      const cached = localStorage.getItem("mydata");
      
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          setData(parsed); 
          console.log("Loaded from cache");
        } catch (err) {
          console.error("Failed to parse cached data:", err);
        }
      } else {
        try {
          const promises = [];
          for (let i = 0; i < 8; i++) {
            promises.push(
              fetch(`https://fakestoreapi.com/products/${1 + i}`).then((res) =>
                res.json()
              )
            );
          }
          const response = await Promise.all(promises);
          setData(response); 
          localStorage.setItem("mydata", JSON.stringify(response)); // ✅ store as string
        } catch (err) {
          console.error("Something went wrong:", err);
        }
      }
    };

    apiC();
  }, []);

  return data;
};
