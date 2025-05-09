import { fetchDataByOid } from "./fetchDataByOid";

const getWineOIDfunc = async (oid, oidType) => {
  const url =
    "https://raw.githubusercontent.com/paulember/paulember.github.io/main/src/data/datedWineOIDs";

  try {
    const data = await fetchDataByOid(url, oid);
    if (!data) throw new Error(`No data for oid: ${oid}`);

    if (oidType === "split") return data.split_oid;
    if (oidType === "red") return data.red_oid;
    return data.white_oid;
  } catch (err) {
    console.error("getWineOIDfunc error:", err.message);
    throw err;
  }
};

export default getWineOIDfunc;
