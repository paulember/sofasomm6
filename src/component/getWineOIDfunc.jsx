import React, { useEffect, useState } from "react";
import { fetchDataByOid } from "./util";

function getWineOIDfunc(oid, oidType) {
  const [wineOIDs, setWineOIDs] = useState(null);
  const [error, setError] = useState(null);

  console.log("getWineOIDfunc start oid:" + oid + ":::oidType:" + oidType);

  useEffect(() => {
    const getWineOID = async () => {
      const url =
        "https://raw.githubusercontent.com/paulember/paulember.github.io/main/src/data/datedWineOIDs";

      try {
        const data = await fetchDataByOid(url, oid);
        if (data) {
          setWineOIDs(data);
          console.log("getWineOIDfunc good data:" + data);
        } else {
          setError(
            "Failed to fetch data in getWineOidfunc, oid: " +
              oid +
              " oidType: " +
              oidType
          );
        }
      } catch (error) {
        setError(error.message);
      }
    };

    getWineOID();
  }, [oid]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!wineOIDs) {
    return <div>Loading...</div>;
  }
  if (oidType == "split") return wineOIDs.split_oid;
  else if (oidType == "red") return wineOIDs.red_oid;
  else return wineOIDs.white_oid;
}

export default getWineOIDfunc;
