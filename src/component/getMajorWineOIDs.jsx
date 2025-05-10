async function getMajorWineOIDs(majorWineURL, elements) {
  try {
    const response = await fetch(majorWineURL);
    if (!response.ok) {
      throw new Error("Failed getmajorWineOIDS fetch data: " + majorWineURL);
    }
    const data = await response.json();
    const filteredItems = Array.from(
      { length: elements },
      (_, i) => data[i]?.pick_1 ?? null
    ).filter((item) => item !== null);

    console.log("getMajorWineOids worked: " + filteredItems);
    return filteredItems;
  } catch (error) {
    console.log("Error getmajorWineOIDS fetch data: " + majorWineURL);
    console.error("Error getMajorWineOIDs url JSON:", error);
  }
}

export default getMajorWineOIDs;
