import getWineOIDfunc from "./getWineOIDfunc";
import getMajorWineOIDs from "./getMajorWineOIDs";
import { getOid72_From72Key, getOid53_From53Key } from "./getGroupPicks";
import getDefaultNotes from "./getDefaultNotes";

async function loadDefaultNotes(dataLibrary) {
  const [defaultWhiteNotes, defaultRedNotes] = await Promise.all([
    getDefaultNotes("white", dataLibrary),
    getDefaultNotes("red", dataLibrary),
  ]);
  return { defaultWhiteNotes, defaultRedNotes };
}

function getJulianDate(date) {
  const override = localStorage.getItem("dateOverride");
  if (override && override != "0") {
    return override; // use override value (already stored in YYDDD or similar format)
  }

  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date - startOfYear;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
  return dayOfYear;
}

function getMajorURLIndexFromJulian(julianDay, numberOfFiles) {
  const lastTwoDigits = julianDay % 100;
  const groupNumber = Math.floor((lastTwoDigits - 1) / 2);
  return ((groupNumber % numberOfFiles) + numberOfFiles) % numberOfFiles;
}

async function getTargetNotes6(
  wineData,
  redOrWhite,
  dataLibrary,
  todayWineMessageData
) {
  const { defaultWhiteNotes, defaultRedNotes } = await loadDefaultNotes(
    dataLibrary
  );
  const keyDate = getJulianDate(new Date());
  const oid72Julian = keyDate + (new Date().getFullYear() % 10) * 10;

  const defaultNoteIndex = keyDate % 10;
  const redMajorURLIndex = getMajorURLIndexFromJulian(keyDate, 10);
  const whiteMajorURLIndex = getMajorURLIndexFromJulian(keyDate, 11);

  console.log(
    "keyDate: " +
      keyDate +
      " redMajorURLIndex: " +
      redMajorURLIndex +
      " whiteMajorURLIndex: " +
      whiteMajorURLIndex
  );

  console.log(
    "defaultWhiteNotes: " +
      defaultWhiteNotes +
      " defaultRedNotes: " +
      defaultRedNotes
  );

  const redWineMajorURL =
    "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/" +
    dataLibrary +
    "/redWineMajor" +
    redMajorURLIndex +
    ".json";
  const whiteWineMajorURL =
    "https://raw.githubusercontent.com/paulember/paulember.github.io/refs/heads/main/src/data/" +
    dataLibrary +
    "/whiteWineMajor" +
    whiteMajorURLIndex +
    ".json";

  let wineMajorURLA = whiteWineMajorURL;
  let wineMajorURLB = whiteWineMajorURL;
  let defaultNotes = defaultWhiteNotes;
  let overrideDailyOID = todayWineMessageData?.oRideWHITE ?? null;

  switch (redOrWhite) {
    case "RED":
      wineMajorURLA = redWineMajorURL;
      wineMajorURLB = redWineMajorURL;
      defaultNotes = defaultRedNotes;
      overrideDailyOID = todayWineMessageData?.oRideRED ?? null;
      break;
    case "SPLIT":
      wineMajorURLA = whiteWineMajorURL;
      wineMajorURLB = redWineMajorURL;
      defaultNotes = defaultRedNotes;
      overrideDailyOID = todayWineMessageData?.oRideSPLIT ?? null;
      break;
    default:
      wineMajorURLA = whiteWineMajorURL;
      wineMajorURLB = whiteWineMajorURL;
      defaultNotes = defaultWhiteNotes;
  }

  let oid72in =
    overrideDailyOID ??
    (await getWineOIDfunc(oid72Julian, redOrWhite, dataLibrary));

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
  let uniqueCombinedNotes = [...new Set(tempCombinedNotes)];

  for (
    let i = defaultNoteIndex;
    i < defaultNotes.length && uniqueCombinedNotes.length < 6;
    i++
  ) {
    const note = defaultNotes[i];
    if (!uniqueCombinedNotes.includes(note)) {
      uniqueCombinedNotes.push(note);
    }
  }

  const combinedNotes = uniqueCombinedNotes.sort((a, b) => a.localeCompare(b));

  return [
    combinedNotes[0],
    combinedNotes[1],
    combinedNotes[2],
    combinedNotes[3],
    combinedNotes[4],
    combinedNotes[5],
  ];
}

export { getTargetNotes6, getJulianDate };
