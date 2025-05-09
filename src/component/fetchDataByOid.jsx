export const fetchDataByOid = async (url, oid) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(
        "FETCHdataBYoid_url: " + url + " data: " + JSON.stringify(data, null, 2)
      );
      const item = data.find((entry) => entry.oid === oid.toString());

      if (item) {
        return item;
      } else {
        console.error(
          "fetchDataByOid No data found for the given oid: " &
            oid &
            " URL: " &
            url
        );
        return null;
      }
    } else {
      console.error(
        "fetchDataByOid Failed to fetch data" & oid & " URL: " & url
      );
      return null;
    }
  } catch (error) {
    console.error("fetchDataByOid Error:", error);
    return null;
  }
};
