import "./App.css";
import "./styles.css";
import SearchableDropdown from "./searchableDropdown";
import { getTargetNotes6, getJulianDate } from "./component/getTargetNotes6";
import {
  getTimeUntilDailyReset,
  getMMMDD,
} from "./component/getTimeUntilDailyReset";

import Modal from "./Modal";

import { useState, useEffect } from "react";
import getSommCredentials from "./component/getSommCredentials";
import divCountdownClock from "./component/divCountdownClock";
import SplashDiv from "./component/splashDiv";
import { DivDailyFeedback } from "./component/divDailyFeedback";

const gameTotal = 3;

import useFetchWine from "./component/useFetchWine";
import fetchDailyWineMessages from "./component/fetchDailyWineMessages";

export default function App() {
  let currentTime;

  const override = localStorage.getItem("dateOverride");

  const dataLibrary = "sofasomm";

  if (override && override !== "0") {
    // If override is in DDD format (e.g., "225" for August 13 in a non-leap year)
    const currentYear = new Date().getFullYear();
    const dayOfYear = parseInt(override, 10);
    currentTime = new Date(currentYear, 0, dayOfYear);
  } else {
    currentTime = new Date();
  }

  const julianDate =
    currentTime.getFullYear() + "_" + getJulianDate(new Date());
  const lastJulianPlayed =
    localStorage.getItem("lastJulianPlayed") ?? "0000_000";

  const todayMMMDD = getMMMDD(currentTime);

  const [timeLeftSS, setTimeLeftSS] = useState(0);
  const [timeLeftMM, setTimeLeftMM] = useState(0);
  const [timeLeftHH, setTimeLeftHH] = useState(0);

  function pad(value) {
    return value.toString().padStart(2, "0");
  }

  let time = getTimeUntilDailyReset();
  const countdown = setInterval(() => {
    time = getTimeUntilDailyReset();
    setTimeLeftSS(pad(time.seconds));
    setTimeLeftMM(pad(time.minutes));
    setTimeLeftHH(pad(time.hours));
  }, 5000);

  const hh = pad(currentTime.getHours());
  const mm = pad(currentTime.getMinutes());
  const ss = pad(currentTime.getSeconds());

  const { wineData, loading, error } = useFetchWine(dataLibrary);

  const {
    data: dailyWineMessageData,
    isLoading: isLoadingDailyWineMsg,
    error: errorDailyWineMsg,
  } = fetchDailyWineMessages(dataLibrary);

  const todayWineMessageData = dailyWineMessageData?.find(
    (msg) => msg.date == todayMMMDD
  );

  const openingMessage = todayWineMessageData?.openingMessage || "";

  const postgameMessage = [
    todayWineMessageData?.whitePostgameMsg || "",
    todayWineMessageData?.redPostgameMsg || "",
    todayWineMessageData?.comboPostgameMsg || "",
  ];

  const [targetNotes, setTargetNotes] = useState(() =>
    Array.from({ length: 3 }, () => new Array(6).fill("nullTargetNote"))
  );

  const [venntdClass, setVenntdClass] = useState([Array(6).fill(null)]);
  const [runVenntdClass, setRunVenntdClass] = useState(false);

  const gameNotesAcquired = venntdClass.filter(
    (cls) => cls === "td-vennMatch"
  ).length;

  const [bottle1Notes, setBottle1Notes] = useState(0);
  const bottle1Bonus = bottle1Notes <= 3 ? bottle1Notes : 4;

  const [selectedStyle, setSelectedStyle] = useState("");
  const [dropStyle, setDropStyle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [game, setGame] = useState(null);
  const [LSLastGame, setLSLastGame] = useState(0);
  const [wineScore, setWineScore] = useState(5);
  const [wineScoreLabel, setWineScoreLabel] = useState(null);
  const [dusanBottle, setDusanBottle] = useState(null);
  const [dusanNotes, setDusanNotes] = useState(null);

  const tastingLabel =
    game === 1
      ? "White Wine"
      : game === 2
      ? "Red Wine"
      : game === 3
      ? "Wild Card"
      : ">> START <<";

  const [LSTotalNotes, setLSTotalNotes] = useState(0);
  const [LSTotalScore, setLSTotalScore] = useState(0);
  const [LSBalthazarCount, setLSBalthazarCount] = useState(0);
  const [dailyBalthazar, setDailyBalthazar] = useState(Array(3).fill(0));

  const [LSTastingCount, setLSTastingCount] = useState(0);
  const [resetStats, setResetStats] = useState(0);

  const [LSTotalScoreUpdate, setLSTotalScoreUpdate] = useState(false);

  const LSBaseTastingCount =
    parseInt(localStorage.getItem("baseTastingCount") ?? "0", 10) || 0;
  const LSBaseTotalNotes =
    parseInt(localStorage.getItem("baseTotalNotes") ?? "0", 10) || 0;
  const LSBaseTotalScore =
    parseInt(localStorage.getItem("baseTotalScore") ?? "0", 10) || 0;
  const LSBaseBalthazarCount =
    parseInt(localStorage.getItem("baseBalthazar") ?? "0", 10) || 0;

  const todayTastingCount = LSTastingCount - LSBaseTastingCount;
  const todayTotalNotes = LSTotalNotes - LSBaseTotalNotes;
  const todayTotalScore = LSTotalScore - LSBaseTotalScore;
  const todayBalthazarCount = LSBalthazarCount - LSBaseBalthazarCount;
  const todayAVGScore = (todayTotalScore / todayTastingCount).toFixed(1);

  const [tastingButton, setTastingButton] = useState("sofaSommStart");

  const [gameBottle, setGameBottle] = useState(0);
  const [gameSpills, setGameSpills] = useState(0);

  const [vennKey, setVennKey] = useState([Array(6).fill(null)]);

  const [vennLabel, setVennLabel] = useState([Array(6).fill(null)]);
  const [vennBackIcon, setVennBackIcon] = useState([Array(6).fill(null)]);
  const [wineNotes, setWineNotes] = useState([Array(5).fill(null)]);

  const [winetdClass, setWinetdClass] = useState([Array(6).fill(null)]);

  const [showHideBottleDiv, setShowHideBottleDiv] = useState("Show ");
  const [divBlockNone, setDivBlockNone] = useState("divDisplayNone");

  const [bottleHistory, setBottleHistory] = useState([]);

  const appendBottleHistory = (selectedStyle) => {
    setBottleHistory((bottleHistory) => [...bottleHistory, selectedStyle]);
  };

  const [selectWineDisabled, setSelectWineDisabled] = useState(true);

  function TextBoxDailyMessage() {
    if (selectWineDisabled && game <= 3) {
      return <div class="dailyMessage">{openingMessage}</div>;
    }
  }

  function WineSelection({ winePropValue }) {
    try {
      const selectedWine =
        wineData.find((wine) => wine.style == winePropValue) || null;

      if (
        !selectedWine ||
        !selectedWine.tastingNote1 ||
        !selectedWine.tastingNote2
      ) {
        throw new Error("Invalid wine data");
      }

      return (
        <>
          <table>
            <tr>
              <td></td>
              <td class="td-wineStyle" id="tdWineStyle">
                <b> {selectedWine.style} </b>
              </td>
              <td></td>
            </tr>
          </table>
          <table>
            <tr>
              <td class={winetdClass[0]}> {selectedWine.tastingNote1} </td>
              <td class={winetdClass[1]}> {selectedWine.tastingNote2} </td>
              <td class={winetdClass[2]}> {selectedWine.tastingNote3} </td>
            </tr>
            <tr>
              <td class={winetdClass[3]}> {selectedWine.tastingNote4} </td>
              <td class="td-wineMiss"> </td>
              <td class={winetdClass[4]}> {selectedWine.tastingNote5} </td>
            </tr>
          </table>
        </>
      );
    } catch (error) {
      console.error("No Wine Selected:", error);

      return <TextBoxDailyMessage />;
    }
  }

  function BuildSelectionRow(val) {
    if (game != null) {
      setSelectWineDisabled(false);
    }
    setSelectedStyle(null);
    setDropStyle(val);
  }

  function handleClickNext() {
    if (julianDate == lastJulianPlayed) {
      if (isModalOpen) {
        alertCountDown();
      } else {
        openModal();
      }
    } else {
      setLSLastGame(parseInt(localStorage.getItem("LastGame") ?? "0", 10) || 0);
      setGame(parseInt(localStorage.getItem("LastGame") ?? "0", 10) || 0);
      setGame((prevGame) => (prevGame % gameTotal) + 1);

      setLSTastingCount(localStorage.getItem("TastingCount"));
      setLSBalthazarCount(localStorage.getItem("BalthazarCount"));
      setLSTotalScore(localStorage.getItem("TotalScore"));
      setLSTotalNotes(localStorage.getItem("TotalNotes"));
      setIsModalOpen(false);
    }
  }

  function handleClickHelp() {
    let helpText = "Welcome to Sofa Sommelier! \n \n";
    helpText +=
      "Sofa Somm is a tool to help build your wine tasting skills. \n \n";

    helpText += "-Begin your tasting by clicking the START button. \n";
    helpText +=
      "-Each TASTING consists of SIX notes displayed at the top of the screen. \n \n";
    helpText +=
      "-Find these tasting notes by SELECTING and OPENING a BOTTLE from the wine list dropdown. ";
    helpText +=
      "Notes that MATCH the opened bottle will switch to GREEN. \n \n";
    helpText +=
      "-Your goal is to find all 6 Notes in as few bottles as possible. \n";
    helpText += "-You can open up to 6 bottles for each tasting.\n \n";
    helpText += "Happy Tasting!!!\n \n";
    helpText += "Sources: \n";
    helpText += "WineFolly.com\n";
    helpText += "tenor.com\n \n";

    alert(helpText);
  }

  function alertCountDown() {
    let countDownText = "Today's Tasting is completed\n \n";
    countDownText += "Next Tasting \n \n";
    countDownText += `${timeLeftHH} : ${timeLeftMM} : ${timeLeftSS}`;
    countDownText += " \n \n";
    countDownText += "Today's Stats \n \n";
    countDownText += "Average Score: " + todayAVGScore;
    countDownText += " \n \n";
    countDownText += "Total Notes: " + todayTotalNotes;
    countDownText += " \n \n";
    countDownText += "Bathazar: " + todayBalthazarCount;
    alert(countDownText);
  }

  useEffect(() => {
    if (!Array.isArray(wineData) || wineData.length === 0) return;

    const fetchData = async () => {
      const target0 = await getTargetNotes6(wineData, "WHITE", dataLibrary);
      const target1 = await getTargetNotes6(wineData, "RED", dataLibrary);
      const target2 = await getTargetNotes6(wineData, "SPLIT", dataLibrary);
      const resultArray = [target0, target1, target2];
      setTargetNotes(resultArray);
    };

    fetchData();
  }, [wineData]);

  useEffect(() => {
    if (game !== null) {
      let newVennKey = [
        [targetNotes[game - 1][0]],
        [targetNotes[game - 1][1]],
        [targetNotes[game - 1][2]],
        [targetNotes[game - 1][3]],
        [targetNotes[game - 1][4]],
        [targetNotes[game - 1][5]],
      ];
      setVennKey(newVennKey);

      const tempArray = [];
      for (let i = 0; i < 6; i++) {
        tempArray[i] = "td-vennMiss";
      }

      setVenntdClass([
        tempArray[0],
        tempArray[1],
        tempArray[2],
        tempArray[3],
        tempArray[4],
        tempArray[5],
      ]);

      setSelectWineDisabled(true);
      setSelectedStyle("Select a Wine Style...");
      setDropStyle("Select a Bottle of Wine...");
      setWineScore(5);
      setGameBottle(0);
      setGameSpills(0);
      setBottle1Notes(0);

      setLSTotalNotes(localStorage.getItem("TotalNotes") || 0);
      setLSTotalScore(localStorage.getItem("TotalScore") || 0);
      setLSBalthazarCount(localStorage.getItem("BalthazarCount") || 0);
      setLSTastingCount(localStorage.getItem("TastingCount") || 0);

      if (game == 1) {
        localStorage.setItem("baseTastingCount", LSTastingCount);
        localStorage.setItem("baseTotalNotes", LSTotalNotes);
        localStorage.setItem("baseTotalScore", LSTotalScore);
        localStorage.setItem("baseBalthazar", LSBalthazarCount);
      }

      setWineScoreLabel(null);
      setDusanBottle(null);
      setBottleHistory([]);
      setShowHideBottleDiv("Show ");
      setDivBlockNone("divDisplayNone");
      setTastingButton("sofaSommTitle");
    }
  }, [game]);

  useEffect(() => {
    parseInt(localStorage.getItem("baseTastingCount") ?? "0", 10) || 0;
    setLSTastingCount(
      parseInt(localStorage.getItem("TastingCount") ?? "0", 10) || 0
    );
    setLSBalthazarCount(
      parseInt(localStorage.getItem("BalthazarCount") ?? "0", 10) || 0
    );
    setLSTotalScore(
      parseInt(localStorage.getItem("TotalScore") ?? "0", 10) || 0
    );
    setLSTotalNotes(
      parseInt(localStorage.getItem("TotalNotes") ?? "0", 10) || 0
    );
  }, []);

  useEffect(() => {
    if (vennKey[0] === undefined) {
      vennKey[0] = null;
    }
    if (vennKey[1] === undefined) {
      vennKey[1] = null;
    }
    if (vennKey[2] === undefined) {
      vennKey[2] = null;
    }
    if (vennKey[0] !== null && vennKey[1] !== null && vennKey[2] !== null) {
      const wineDataLength = wineData.length;
      const dusanArray = new Array(wineDataLength).fill(0);

      for (let i = 0; i <= 5; i++) {
        for (let j = 0; j < wineDataLength; j++) {
          if (wineData[j].tastingNote1 == vennKey[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote2 == vennKey[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote3 == vennKey[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote4 == vennKey[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote5 == vennKey[i]) {
            dusanArray[j]++;
          }
        }

        let largestNumber = dusanArray[0];
        let largestIndex = 0;
        for (let k = 1; k < dusanArray.length; k++) {
          if (dusanArray[k] > largestNumber) {
            largestNumber = dusanArray[k];
            largestIndex = k;
          }
        }

        setDusanBottle(wineData[largestIndex].style);

        setDusanNotes(
          "(" +
            largestNumber +
            ") - " +
            wineData[largestIndex].tastingNote1 +
            ", " +
            wineData[largestIndex].tastingNote2 +
            ", " +
            wineData[largestIndex].tastingNote3 +
            ", " +
            wineData[largestIndex].tastingNote4 +
            ", " +
            wineData[largestIndex].tastingNote5
        );
      }

      setVennLabel(vennKey.flat());
    }
  }, [vennKey]);

  useEffect(() => {
    if (selectedStyle !== null) {
      const selectedWine =
        wineData.find((wine) => wine.style == selectedStyle) || null;

      if (selectedWine !== null) {
        const tastingNotes = [];

        appendBottleHistory(selectedStyle);
        tastingNotes[0] = selectedWine.tastingNote1;
        tastingNotes[1] = selectedWine.tastingNote2;
        tastingNotes[2] = selectedWine.tastingNote3;
        tastingNotes[3] = selectedWine.tastingNote4;
        tastingNotes[4] = selectedWine.tastingNote5;

        setWineNotes([
          tastingNotes[0],
          tastingNotes[1],
          tastingNotes[2],
          tastingNotes[3],
          tastingNotes[4],
        ]);
        setGameBottle(gameBottle + 1);
      }
    }
  }, [selectedStyle]);

  useEffect(() => {
    if (wineScore > 10) {
      switch (true) {
        case wineScore > 94:
          setWineScoreLabel("🍷🍷🍷Exceptional🍷🍷🍷");
          break;
        case wineScore > 89:
          setWineScoreLabel("🍷🍷Superior🍷🍷");
          break;
        case wineScore > 84:
          setWineScoreLabel("🍷Very Good🍷");
          break;
        case wineScore > 79:
          setWineScoreLabel("🍷Good🍷");
          break;
        case wineScore > 71:
          setWineScoreLabel("Above Average");
          break;
        case wineScore > 66:
          setWineScoreLabel("Meh");
          break;
        case wineScore > 61:
          setWineScoreLabel("flawed");
          break;
        case wineScore > 50:
          setWineScoreLabel("...drinkable");
          break;
        default:
          setWineScoreLabel("Are you a Bot?");
      }
      const calcTotalScore = parseInt(LSTotalScore) + parseInt(wineScore);
      setLSTotalScore(calcTotalScore);
      if (calcTotalScore > 0) {
        setLSTotalScoreUpdate(true);
      }
    }
  }, [wineScore]);

  useEffect(() => {
    if (LSTotalScoreUpdate) {
      if (LSTotalScore > 10) {
        localStorage.setItem("TotalScore", LSTotalScore);
      }
      setLSTotalScoreUpdate(false);
    }
  }, [LSTotalScoreUpdate]);

  useEffect(() => {
    if (isModalOpen) {
      localStorage.setItem("TotalNotes", LSTotalNotes);
      localStorage.setItem("BalthazarCount", LSBalthazarCount);
      localStorage.setItem("TastingCount", LSTastingCount);
    }
  }, [isModalOpen]);

  const openModal = () => {
    if (!isModalOpen) {
      setResetStats((prevCount) => parseInt(prevCount) + parseInt(1));
      setLSTotalNotes(parseInt(LSTotalNotes) + parseInt(gameNotesAcquired));
      if (game > 0) {
        setLSTastingCount(parseInt(LSTastingCount) + parseInt(1));
      }
      localStorage.setItem("LastGame", game);
      if (game >= 3) {
        localStorage.setItem("lastJulianPlayed", julianDate);
      }
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    localStorage.setItem("TastingCount", LSTastingCount);

    handleClickNext();
  };

  useEffect(() => {
    if (gameBottle > 5) {
      setRunVenntdClass((prev) => !prev);
    }
  }, [gameBottle]);

  useEffect(() => {
    if (gameNotesAcquired > 5) {
      let baseScore = 90;
      switch (gameBottle) {
        case 1:
          baseScore = 100;
          break;
        case 2:
          baseScore = 96;
          break;
        case 3:
          baseScore = 93;
          break;
        case 4:
          baseScore = 90;
          break;
        case 5:
          baseScore = 86;
          break;
        default:
          baseScore = 82;
      }

      setWineScore(baseScore + bottle1Bonus - gameSpills * 3);

      setLSBalthazarCount(parseInt(LSBalthazarCount) + parseInt(1));

      const updatedArray = [...dailyBalthazar];
      updatedArray[game - 1] = 1;
      setDailyBalthazar(updatedArray);

      if (!isModalOpen) {
        openModal();
      }
    } else {
      if (gameBottle > 5) {
        let baseScore = 60;
        switch (gameNotesAcquired) {
          case 5:
            baseScore = 82;
            break;
          case 4:
            baseScore = 78;
            break;
          case 3:
            baseScore = 73;
            break;
          case 2:
            baseScore = 68;
            break;
          case 1:
            baseScore = 63;
            break;
          default:
            baseScore = 58;
        }

        setWineScore(baseScore + bottle1Bonus - gameSpills * 2);

        if (!isModalOpen) {
          openModal();
        }
      }
    }
  }, [venntdClass, runVenntdClass]);

  useEffect(() => {
    const temptdWineArray = [];
    for (let i = 0; i < 5; i++) {
      temptdWineArray[i] = "td-wineMiss";
    }
    setWinetdClass([
      temptdWineArray[0],
      temptdWineArray[1],
      temptdWineArray[2],
      temptdWineArray[3],
      temptdWineArray[4],
      temptdWineArray[5],
    ]);
    const matchingElements = vennLabel.filter((value) =>
      wineNotes.includes(value)
    );

    let matchLength = matchingElements.length;
    const tempArray = Array.from(venntdClass);

    if (matchLength < 1) {
      setGameSpills(gameSpills + 1);
    }

    if (gameBottle == 1) {
      setBottle1Notes(matchLength);
    }

    for (let i = 0; i < matchLength; i++) {
      for (let j = 0; j < 6; j++) {
        if (vennLabel[j] == matchingElements[i]) {
          tempArray[j] = "td-vennMatch";
        }
      }
      for (let k = 0; k < 5; k++) {
        if (wineNotes[k] == matchingElements[i]) {
          temptdWineArray[k] = "td-wineMatch";
        }
      }
    }

    setVenntdClass([
      tempArray[0],
      tempArray[1],
      tempArray[2],
      tempArray[3],
      tempArray[4],
      tempArray[5],
    ]);

    setWinetdClass([
      temptdWineArray[0],
      temptdWineArray[1],
      temptdWineArray[2],
      temptdWineArray[3],
      temptdWineArray[4],
    ]);
  }, [wineNotes]);

  function SelectButton({ value, onSelectWineClick }) {
    return (
      <button
        class="openBottleButton"
        disabled={selectWineDisabled}
        onClick={onSelectWineClick}
      >
        {value}
      </button>
    );
  }

  function handleWineSelection({ dropStyle }) {
    setSelectedStyle(dropStyle);
    setSelectWineDisabled(true);
  }

  function toggleBottleDiv() {
    if (divBlockNone != "divDisplayNone") {
      setShowHideBottleDiv("Show ");
      setDivBlockNone("divDisplayNone");
    } else {
      setShowHideBottleDiv("Hide ");
      setDivBlockNone("divDisplayBlock");
    }
  }

  return (
    <div className="App">
      <div>
        <p>
          <h2 class="sofaSommTitle ">
            {" "}
            <b>
              {" "}
              <i> Sofa Somm </i>
              &emsp;&emsp;
            </b>
            <button class={tastingButton} onClick={handleClickNext}>
              {" "}
              {tastingLabel}
            </button>
            &emsp;
            <button class="sofaSommHelp" onClick={handleClickHelp}>
              about
            </button>
            {override && override !== "0" && <div>ddd = {override}</div>}
          </h2>
        </p>
      </div>
      <div>
        <SplashDiv game={game} julianDate={julianDate} />
      </div>

      <div>
        {game != null ? (
          <div>
            <div>
              <b>{tastingLabel}: </b>
              Find Wines that Match these Tasting Notes
            </div>

            <div>
              <div>
                <table class="notesTable">
                  <tr>
                    <td class={venntdClass[0]}> {vennLabel[0]} </td>
                    <td class={venntdClass[1]}> {vennLabel[1]} </td>
                    <td class={venntdClass[2]}> {vennLabel[2]} </td>
                  </tr>
                  <tr>
                    <td class={venntdClass[3]}> {vennLabel[3]} </td>
                    <td class={venntdClass[4]}> {vennLabel[4]} </td>{" "}
                    <td class={venntdClass[5]}> {vennLabel[5]} </td>
                  </tr>
                </table>
              </div>
            </div>

            <div id="dropdownIn">
              <SearchableDropdown
                width="100"
                options={wineData}
                label="style"
                id="id"
                selectedVal={dropStyle}
                handleChange={(val) => BuildSelectionRow(val)}
              />
              <p></p>
              <div>
                <SelectButton
                  value={selectWineDisabled ? "" : "Open Bottle"}
                  onSelectWineClick={() => handleWineSelection({ dropStyle })}
                />
              </div>
            </div>

            <WineSelection winePropValue={selectedStyle} />

            <div>________________________________________</div>
            <div>
              <table>
                <tr>
                  {" "}
                  <td class="td-bottleHistory"> Bottles Opened </td>{" "}
                </tr>

                <tr class="td-bottleHistory"> Bottle 1: {bottleHistory[0]} </tr>
                <tr class="td-bottleHistory"> Bottle 2: {bottleHistory[1]} </tr>
                <tr class="td-bottleHistory"> Bottle 3: {bottleHistory[2]} </tr>
                <tr class="td-bottleHistory"> Bottle 4: {bottleHistory[3]} </tr>
                <tr class="td-bottleHistory"> Bottle 5: {bottleHistory[4]} </tr>
                <tr class="td-bottleHistory"> Bottle 6: {bottleHistory[5]} </tr>
              </table>
            </div>

            <div>
              <div>
                {getSommCredentials({
                  LSTastingCount,
                  todayAVGScore,
                  todayTastingCount,
                  todayBalthazarCount,
                  todayTotalNotes,
                  LSTotalScore,
                  LSBalthazarCount,
                  LSTotalNotes,
                  todayMMMDD,
                  isModalOpen,
                  game,
                  dailyBalthazar,
                  openingMessage,
                })}
              </div>
            </div>
          </div>
        ) : (
          <div>No game yet.</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2 class="sofaSommTitle">
          <b>
            <i> Sofa Somm </i>{" "}
          </b>{" "}
          &emsp;&emsp;
          <button class="sofaSommTitle" onClick={closeModal}>
            Next Game
          </button>
        </h2>
        <div>
          {divCountdownClock({
            timeLeftHH,
            timeLeftMM,
            timeLeftSS,
            julianDate,
            lastJulianPlayed,
          })}
        </div>
        {game > 0 && (
          <DivDailyFeedback
            wineScore={wineScore}
            wineScoreLabel={wineScoreLabel}
            gameBottle={gameBottle}
            gameSpills={gameSpills}
            game={game}
            gameNotesAcquired={gameNotesAcquired}
            venntdClass={venntdClass}
            vennLabel={vennLabel}
            wineData={wineData}
            dusanBottle={dusanBottle}
            dusanNotes={dusanNotes}
            postgameMessage={postgameMessage}
          />
        )}
        <div>
          <div>
            {getSommCredentials({
              LSTastingCount,
              todayAVGScore,
              todayTastingCount,
              todayBalthazarCount,
              todayTotalNotes,
              LSTotalScore,
              LSBalthazarCount,
              LSTotalNotes,
              todayMMMDD,
              isModalOpen,
              game,
              dailyBalthazar,
              openingMessage,
            })}
          </div>
        </div>
        {game > 0 && (
          <div>
            <button onClick={() => toggleBottleDiv()}>
              {showHideBottleDiv} Bottle Details
            </button>
          </div>
        )}
        <div class={divBlockNone}>
          <table>
            <tr>
              {" "}
              <td class="td-bottleHistory"> Bottles Opened </td>{" "}
            </tr>
            <tr class="td-bottleHistory"> Bottle 1: {bottleHistory[0]} </tr>
            <tr class="td-bottleHistory"> Bottle 2: {bottleHistory[1]} </tr>
            <tr class="td-bottleHistory"> Bottle 3: {bottleHistory[2]} </tr>
            <tr class="td-bottleHistory"> Bottle 4: {bottleHistory[3]} </tr>
            <tr class="td-bottleHistory"> Bottle 5: {bottleHistory[4]} </tr>
            <tr class="td-bottleHistory"> Bottle 6: {bottleHistory[5]} </tr>
          </table>
        </div>
        <p></p>.
      </Modal>
    </div>
  );
}
