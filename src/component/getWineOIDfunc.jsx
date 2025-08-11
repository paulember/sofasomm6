import { fetchDataByOid } from "./fetchDataByOid";

const getWineOIDfunc = async (oid, oidType) => {
  const url =
    "https://raw.githubusercontent.com/paulember/paulember.github.io/main/src/data/sofasomm/datedWineOIDs";

  try {
    const data = await fetchDataByOid(url, oid);
    if (!data) throw new Error(`No data for useFetchWine.jsx oid: ${oid}`);
    if (oidType === "SPLIT") return data.split_oid;
    if (oidType === "RED") return data.red_oid;
    return data.white_oid;
  } catch (err) {
    console.error("useFetchWine.jsx getWineOIDfunc error:", err.message);
    throw err;
  }
};

export default getWineOIDfunc;
