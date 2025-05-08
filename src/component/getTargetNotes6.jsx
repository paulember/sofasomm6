import { useEffect, useState } from "react";

function getJulianDate(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date - startOfYear;
  const dayOfYear = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  return dayOfYear;
}

function getTargetNotes6() {
  const keyDate = getJulianDate(new Date());

  /*
  useEffect(() => {
    const fetchWineData = async () => {
      try {
        // const response = await fetch('https://raw.githubusercontent.com/paulember/paulember.github.io/main/src/data/wineData.json');
        const response = await fetch(
          "https://raw.githubusercontent.com/paulember/paulember.github.io/main/src/data/wineData30.json"
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const dataWines = await response.json();
        setWineData(dataWines); // Store the entire wine object
        console.log("Fetch of Wine Data completed at:", new Date());
      } catch (error) {
        console.error("Error fetching wine data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWineData();
  }, []);
  */
  console.log("keyDate:" + keyDate);
  return [keyDate, keyDate,keyDate,keyDate,keyDate,keyDate];
}

export default getTargetNotes6;
