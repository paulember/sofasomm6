import { useEffect, useState } from "react";

function useFetchWine(dataLibrary) {
  const [wineData, setWineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWineData = async () => {
      try {
        const responseURL =
          "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/" +
          dataLibrary +
          "/wineData30.json";
        const response = await fetch(responseURL);
        if (!response.ok) {
          throw new Error(
            "Network response was not ok for useFetchWine wineDate30.json"
          );
        }

        const dataWines = await response.json();
        setWineData(dataWines);
        console.log("useFetchWine of Wine Data completed at:", new Date());
      } catch (error) {
        console.error("Error useFetchWine.jsx wine data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWineData();
  }, []);

  return { wineData, loading, error };
}

export default useFetchWine;
