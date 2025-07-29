const fetchDataByStyle = async (url, style) => {
  const res = await fetch(url);
  const all = await res.json();
  return all.find((item) => item.style === style);
};
const getDefaultNotes = async (style) => {
  const url =
    "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/sofasomm/defaultNotes.json";
  try {
    const data = await fetchDataByStyle(url, style);
    if (!data) throw new Error(`No data for style: ${style}`);
    return Object.values(data).filter((v, i) => i > 0);
  } catch (err) {
    console.error(err);
    return [];
  }
};

export default getDefaultNotes;