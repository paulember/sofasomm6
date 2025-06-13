import getWineOIDfunc from "./getWineOIDfunc";
import getMajorWineOIDs from "./getMajorWineOIDs";
import { getOid72_From72Key, getOid53_From53Key } from "./getGroupPicks";

function getJulianDate(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date - startOfYear;
  const dayOfYear = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
  return dayOfYear;
}

function getMajorURLIndexFromJulian(julianDay) {
  const lastTwoDigits = julianDay % 100;
  const groupNumber = Math.floor((lastTwoDigits - 1) /2);
  return groupNumber % 10;
}

async function getTargetNotes6(wineData, redOrWhite) {
  const keyDate = getJulianDate(new Date());
  const majorURLIndex = getMajorURLIndexFromJulian(keyDate);
  console.log("majorURLIndex" + majorURLIndex);
  const redWineMajorURL =
    "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/redWineMajor" +
    majorURLIndex +
    ".json";

  const whiteWineMajorURL =
    "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/whiteWineMajor" +
    majorURLIndex +
    ".json";

  const oid72in = await getWineOIDfunc(keyDate, redOrWhite);

  let wineMajorURLA = whiteWineMajorURL;
  let wineMajorURLB = whiteWineMajorURL;

  switch (redOrWhite) {
    case "RED":
      wineMajorURLA = redWineMajorURL;
      wineMajorURLB = redWineMajorURL;
      break;
    case "SPLIT":
      wineMajorURLA = whiteWineMajorURL;
      wineMajorURLB = redWineMajorURL;
      break;
    default:
      wineMajorURLA = whiteWineMajorURL;
      wineMajorURLB = whiteWineMajorURL;
  }

  const wineA7 = await getMajorWineOIDs(wineMajorURLA, 12);
  const wineB7 = await getMajorWineOIDs(wineMajorURLB, 12);
  const index7A = getOid72_From72Key("1", oid72in.slice(0, 2));
  const index7B = getOid72_From72Key("2", oid72in.slice(0, 2));
  const targetABCindex = getOid53_From53Key(oid72in.charAt(2));
  const targetDEFindex = getOid53_From53Key(oid72in.charAt(3));
  const ATarget_Notes = [
    wineData[wineA7[index7A]].tastingNote1,
    wineData[wineA7[index7A]].tastingNote2,
    wineData[wineA7[index7A]].tastingNote3,
    wineData[wineA7[index7A]].tastingNote4,
    wineData[wineA7[index7A]].tastingNote5,
  ];
  const BTarget_Notes = [
    wineData[wineB7[index7B]].tastingNote1,
    wineData[wineB7[index7B]].tastingNote2,
    wineData[wineB7[index7B]].tastingNote3,
    wineData[wineB7[index7B]].tastingNote4,
    wineData[wineB7[index7B]].tastingNote5,
  ];

  const targetAIndices = targetABCindex.split("").slice(0, 3);
  const targetBIndices = targetDEFindex.split("").slice(0, 3);
  const targetANotes = targetAIndices.map((i) => ATarget_Notes[Number(i)]);
  const targetBNotes = targetBIndices.map((i) => BTarget_Notes[Number(i)]);

  const tempCombinedNotes = [...targetANotes, ...targetBNotes].filter(Boolean);
  const combinedNotes = tempCombinedNotes.sort((a, b) => a.localeCompare(b));
  console.log("keyDate_getTargetNotes6:", keyDate);

  return [
    combinedNotes[0],
    combinedNotes[1],
    combinedNotes[2],
    combinedNotes[3],
    combinedNotes[4],
    combinedNotes[5]
  ];
}

export { getTargetNotes6, getJulianDate };
