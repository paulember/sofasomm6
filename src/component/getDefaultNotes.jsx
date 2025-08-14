const fetchDataByStyle = async (url, style) => {
  const res = await fetch(url);
  const all = await res.json();
  return all.find((item) => item.style === style);
};
const getDefaultNotes = async (style, dataLibrary) => {
  const url =
    "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/" +
    dataLibrary +
    "/defaultNotes.json";
  try {
    const data = await fetchDataByStyle(url, style);
    if (!data) throw new Error(`No data for getDefault Notes: ${style}`);
    return Object.values(data).filter((v, i) => i > 0);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default getDefaultNotes;
