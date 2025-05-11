import getWineOIDfunc from "./getWineOIDfunc";
import getMajorWineOIDs from "./getMajorWineOIDs";

function getJulianDate(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date - startOfYear;
  const dayOfYear = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  return dayOfYear;
}

async function getTargetNotes6() {
  const keyDate = getJulianDate(new Date());
  const oid72red = await getWineOIDfunc(keyDate, "red");
  const oid72white = await getWineOIDfunc(keyDate, "white");
  const oid72split = await getWineOIDfunc(keyDate, "split");
  const redWineMajorURL =
    "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/redWineMajor.json";
  const whiteWineMajorURL =
    "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/whiteWineMajor.json";

  const redWineData = await getMajorWineOIDs(redWineMajorURL, 7);

  const whiteWineData = await getMajorWineOIDs(whiteWineMajorURL, 7);

  console.log("keyDate:", keyDate);
  // console.log("p72:", pick72);
  return [
    keyDate,
    oid72red,
    oid72white,
    oid72split,
    redWineData[0],
    whiteWineData[6],
  ];
  /*  
  const pick72oid = await getWineOIDfunc(keyDate, "red");
  const pick72 = pick72oid.toString().slice(0, 2);
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
}

export default getTargetNotes6;
