import { fetchDataByOid } from "./fetchDataByOid";

const getWineOIDfunc = async (oid, oidType, dataLibrary) => {
  const url =
    "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/" +
    "sofasomm" +
    "/datedWineOIDs";
  try {
    const data = await fetchDataByOid(url, oid);
    if (!data) throw new Error(`No data for getWineOIDfunc.jsx oid: ${oid}`);
    if (oidType === "SPLIT") return data.split_oid;
    if (oidType === "RED") return data.red_oid;
    return data.white_oid;
  } catch (err) {
    console.error("getWineOIDfunc.jsx error:", err.message);
    throw err;
  }
};

export default getWineOIDfunc;
