import "./App.css";
import "./styles.css";
import SearchableDropdown from "./searchableDropdown";
import { getTargetNotes6, getJulianDate } from "./component/getTargetNotes6";

import Modal from "./Modal";

import { vennCriteria } from "./data/vennCategory";
import { vennGames } from "./data/vennCategory";
import { useState, useEffect } from "react";
import getSommCredentials from "./component/getSommCredentials";
const gameTotal = 3;

import useFetchWine from "./component/useFetchWine";

export default function App() {
  const julianDate = new Date().getFullYear() + "_" + getJulianDate(new Date());
  const { wineData, loading, error } = useFetchWine();

  const [targetNotes, setTargetNotes] = useState(() =>
    Array.from({ length: 3 }, () => new Array(6).fill("nullTargetNote"))
  );

  const [venntdClass, setVenntdClass] = useState([Array(6).fill(null)]);

  const [startButtonLabel, setStartButtonLabel] = useState("Start");
  const [startMsg, setStartMsg] = useState(" <-- click 'Tasting' to start");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [dropStyle, setDropStyle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [game, setGame] = useState(null);
  const [LSLastGame, setLSLastGame] = useState(0);
  const [wineScore, setWineScore] = useState(99);
  const [wineScoreLabel, setWineScoreLabel] = useState(null);
  const [dusanBottle, setDusanBottle] = useState(null);
  const [dusanNotes, setDusanNotes] = useState(null);
  const [dusanLink, setDusanLink] = useState(null);

  const [LSTotalNotes, setLSTotalNotes] = useState(0);
  const [LSTotalScore, setLSTotalScore] = useState(0);
  const [LSBalthazarCount, setLSBalthazarCount] = useState(0);
  const [LSTastingCount, setLSTastingCount] = useState(0);

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

  const [tastingButton, setTastingButton] = useState("sofaSommStart");

  const [gameBottle, setGameBottle] = useState(0);
  const [gameSpills, setGameSpills] = useState(0);
  const [gameNotesAcquired, setGameNotesAcquired] = useState(0);

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
      console.error("An error occurred:", error);
      return "No Wine Selected"; // Return an empty string in case of an error
    }
  }

  function BuildSelectionRow(val) {
    if (game != null) {
      setSelectWineDisabled(false);
    }
    setSelectedStyle(null);
    setDropStyle(val);
  }

  function getVennGame() {
    //let newRet = vennGames.find((vennSet) => vennSet.id === game) || null;
    //console.log ("newRet: " + newRet.venn_A)
    return vennGames.find((vennSet) => vennSet.id == game) || null;
  }

  function handleClickNext() {
    setLSLastGame(localStorage.getItem("LastGame"));
    setGame(localStorage.getItem("LastGame"));
    setGame((prevGame) => (prevGame % gameTotal) + 1);

    setLSTastingCount(localStorage.getItem("TastingCount"));
    setLSBalthazarCount(localStorage.getItem("BalthazarCount"));
    setLSTotalScore(localStorage.getItem("TotalScore"));
    setLSTotalNotes(localStorage.getItem("TotalNotes"));
  }

  function handleClearClick() {
    if (
      confirm(
        "Press OK to Clear Your SofaSomm Cache.\n \n THIS WILL REMOVE ALL RECORDS OF YOUR PREVIOUS TASTINGS. \n \n Press Cancel to return to the Splash Screen. "
      )
    ) {
      localStorage.removeItem("BalthazarCount", 0);
      localStorage.removeItem("TastingCount", 0);
      localStorage.removeItem("LastGame", 0);
      localStorage.removeItem("TotalScore", 0);
      localStorage.removeItem("TotalNotes", 0);
    } else {
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

  function handleClickTastingNote(i) {
    const matchingWines = wineData.filter(
      (wine) =>
        wine.tastingNote1 === vennLabel[i] ||
        wine.tastingNote2 === vennLabel[i] ||
        wine.tastingNote3 === vennLabel[i] ||
        wine.tastingNote4 === vennLabel[i] ||
        wine.tastingNote5 === vennLabel[i]
    );

    const matchingWinesLength = matchingWines.length;
    let wineMatchList =
      "\nWine Styles Known for " + vennLabel[i] + " Tasting Notes: \n \n";

    for (let j = 0; j < matchingWinesLength; j++) {
      wineMatchList = wineMatchList + matchingWines[j].style;
      wineMatchList = wineMatchList + "\n";
    }
    alert(wineMatchList);
  }

  useEffect(() => {
    if (!Array.isArray(wineData) || wineData.length === 0) return;

    const fetchData = async () => {
      const target0 = await getTargetNotes6(wineData, "WHITE");
      const target1 = await getTargetNotes6(wineData, "RED");
      const target2 = await getTargetNotes6(wineData, "SPLIT");
      const resultArray = [target0, target1, target2];
      setTargetNotes(resultArray);
    };

    fetchData();
  }, [wineData]);

  useEffect(() => {
    if (game !== null) {
      if (game > 0) {
        setStartMsg("");
        switch (game) {
          case 3:
            setStartButtonLabel("tasting3: COMBO");
            break;
          case 2:
            setStartButtonLabel("tasting2: RED wine");
            break;
          default:
            setStartButtonLabel("tasting1: WHITE wine");
        }
      }
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
      setWineScore(99);
      setGameBottle(0);
      setGameSpills(0);

      setLSTotalNotes(localStorage.getItem("TotalNotes"));
      setLSTotalScore(localStorage.getItem("TotalScore"));
      setLSBalthazarCount(localStorage.getItem("BalthazarCount"));
      setLSTastingCount(localStorage.getItem("TastingCount"));

      if (LSTotalNotes == null) {
        localStorage.setItem("TotalNotes", 0);
        setLSTotalNotes(localStorage.getItem("TotalNotes"));
      }
      if (LSTotalScore == null) {
        localStorage.setItem("TotalScore", 0);
        setLSTotalScore(localStorage.getItem("TotalScore"));
      }
      if (LSBalthazarCount == null) {
        localStorage.setItem("BalthazarCount", 0);
        setLSBalthazarCount(localStorage.getItem("BalthazarCount"));
      }
      if (LSTastingCount == null) {
        localStorage.setItem("TastingCount", 0);
        setLSTastingCount(0);
      }

      if (game == 1) {
        localStorage.setItem("baseTastingCount", LSTastingCount);
        localStorage.setItem("baseTotalNotes", LSTotalNotes);
        localStorage.setItem("baseTotalScore", LSTotalScore);
        localStorage.setItem("baseBalthazar", LSBalthazarCount);
      }

      setDusanBottle(null);
      setBottleHistory([]);
      setShowHideBottleDiv("Show ");
      setDivBlockNone("divDisplayNone");
      setTastingButton("sofaSommTitle");
    }
  }, [game]);

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
      // Initialize vennCriteria as an empty array

      const criteria = [];
      const labels = [];
      const los = [];
      const his = [];

      const wineDataLength = wineData.length;
      const dusanArray = new Array(wineDataLength).fill(0);

      for (let i = 0; i <= 5; i++) {
        criteria[i] =
          vennCriteria.find((vennSet) => vennSet.key == vennKey[i]) || null;

        if ((criteria[i].label == null) | (criteria[i].label == undefined)) {
          labels[i] = criteria[i].key;
          los[i] = criteria[i].key;
          his[i] = criteria[i].key;
        } else {
          labels[i] = criteria[i].label;
          los[i] = criteria[i].lo;
          his[i] = criteria[i].hi;
        }

        for (let j = 0; j < wineDataLength; j++) {
          if (wineData[j].tastingNote1 == labels[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote2 == labels[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote3 == labels[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote4 == labels[i]) {
            dusanArray[j]++;
          }
          if (wineData[j].tastingNote5 == labels[i]) {
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
        setDusanLink(
          "https://winefolly.com/grapes/" + wineData[largestIndex].style
        );

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

      setVennLabel([
        labels[0],
        labels[1],
        labels[2],
        labels[3],
        labels[4],
        labels[5],
      ]);
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
    switch (true) {
      case wineScore > 94:
        setWineScoreLabel("Exceptional");
        break;
      case wineScore > 89:
        setWineScoreLabel("Superior");
        break;
      case wineScore > 84:
        setWineScoreLabel("Very Good");
        break;
      case wineScore > 79:
        setWineScoreLabel("Good");
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
  }, [wineScore]);

  useEffect(() => {
    ``;
  }, [wineScoreLabel]);

  useEffect(() => {
    if ((gameNotesAcquired > 5) | (gameBottle > 5)) {
      localStorage.setItem(
        "TotalNotes",
        parseInt(LSTotalNotes) + parseInt(gameNotesAcquired)
      );
    }
  }, [gameNotesAcquired]);

  const openModal = () => {
    localStorage.setItem("LastGame", game);
    if (LSTastingCount == null) {
      localStorage.setItem("TastingCount", 1);
      setLSTastingCount(1);
    } else {
      setLSTastingCount((prevCount) => parseInt(prevCount) + parseInt(1));
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (gameNotesAcquired > 5) {
      if (isNaN(LSBalthazarCount)) {
        localStorage.setItem("BalthazarCount", 1);
      } else {
        localStorage.setItem(
          "BalthazarCount",
          parseInt(LSBalthazarCount) + parseInt(1)
        );
      }
    }

    localStorage.setItem(
      "TotalScore",
      parseInt(LSTotalScore) + parseInt(wineScore)
    );
    localStorage.setItem("TastingCount", LSTastingCount);

    setIsModalOpen(false);
    handleClickNext();
  };

  useEffect(() => {
    if (gameBottle > 5) {
      let baseScore = 63;
      switch (gameNotesAcquired) {
        case 5:
          baseScore = 85;
          break;
        case 4:
          baseScore = 81;
          break;
        case 3:
          baseScore = 76;
          break;
        case 2:
          baseScore = 71;
          break;
        case 1:
          baseScore = 66;
          break;
        default:
          baseScore = 61;
      }

      setWineScore(baseScore - gameSpills * 2);

      openModal();
    }
  }, [gameBottle]);

  useEffect(() => {
    let matchCount = 0;
    for (let i = 0; i < 6; i++) {
      if (venntdClass[i] == "td-vennMatch") {
        matchCount++;
      }
    }
    setGameNotesAcquired(matchCount);
    if (matchCount > 5) {
      let baseScore = 90;
      switch (gameBottle) {
        case 1:
          baseScore = 100;
          break;
        case 2:
          baseScore = 99;
          break;
        case 3:
          baseScore = 96;
          break;
        case 4:
          baseScore = 93;
          break;
        case 5:
          baseScore = 89;
          break;
        default:
          baseScore = 85;
      }

      setWineScore(baseScore - gameSpills * 3);

      if (gameBottle < 6) {
        openModal();
      }
    }
  }, [venntdClass]);

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

    // setWineScore(wineScore - (6 - matchLength));

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
      <button disabled={selectWineDisabled} onClick={onSelectWineClick}>
        {value}
      </button>
    );
  }

  function SplashDiv() {
    if (game == null) {
      return (
        <div>
          <h3> Welcome Sofa Sommelier! </h3>
          <p> Sofa Somm is a tool to help build your wine tasting skills. </p>
          <p> Begin your tasting by clicking the Yellow START button above. </p>
          <table>
            <td class="splashQuote">
              "Sofa Somm is Better Than A Chiefs Game" - Taylor S.
            </td>
          </table>
          <p>
            {" "}
            Each TASTING consists of 6 notes displayed at the top of the screen.{" "}
          </p>
          <p>
            Find these tasting notes by SELECTING and OPENING a BOTTLE from the
            Wine(Varietal) list dropdown.{" "}
          </p>
          <p> Notes that MATCH the opened bottle will switch to GREEN. </p>
          <p>
            {" "}
            Your goal is to find all 6 Notes in as few bottles as possible.{" "}
          </p>
          <p>You can open up to 6 bottles for each tasting. </p>
          <h2> Happy Tasting!!! </h2>
          <div>
            Data Source: &nbsp;
            <a
              href="https://winefolly.com/grapes"
              target="_blank"
              rel="noreferrer"
            >
              Wine Folly{" "}
            </a>{" "}
            {""}
          </div>
          <div>
            Additional Graphics: &nbsp;
            <a href="https://tenor.com/" target="_blank" rel="noreferrer">
              tenor.com{" "}
            </a>{" "}
          </div>
          <h2 class="sofaSommTitle ">
            {" "}
            <b>
              {" "}
              <i> Sofa Somm </i>
            </b>
          </h2>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <div>
            <table className="notesTable">
              <tr>
                <td>{targetNotes[0][0]}</td>
                <td>{targetNotes[0][1]}</td>
                <td>{targetNotes[0][2]}</td>
              </tr>
              <tr>
                <td>{targetNotes[0][3]}</td>
                <td>{targetNotes[0][4]}</td>
                <td>{targetNotes[0][5]}</td>
              </tr>
            </table>

            <table className="notesTable">
              <tr>
                <td>{targetNotes[1][0]}</td>
                <td>{targetNotes[1][1]}</td>
                <td>{targetNotes[1][2]}</td>
              </tr>
              <tr>
                <td>{targetNotes[1][3]}</td>
                <td>{targetNotes[1][4]}</td>
                <td>{targetNotes[1][5]}</td>
              </tr>
            </table>
            <table class="notesTable">
              <tr>
                <td>{targetNotes[2][0]}</td>
                <td>{targetNotes[2][1]}</td>
                <td>{targetNotes[2][2]}</td>
              </tr>
              <tr>
                <td>{targetNotes[2][3]}</td>
                <td>{targetNotes[2][4]}</td>
                <td>{targetNotes[2][5]}</td>
              </tr>
            </table>
          </div>
          <button class="resetButton" onClick={handleClearClick}>
            {" "}
            CC
          </button>
        </div>
      );
    }
  }

  function handleWineSelection({ dropStyle }) {
    setSelectedStyle(dropStyle);
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
              {startButtonLabel}
            </button>
            &emsp;
            <button class="sofaSommHelp" onClick={handleClickHelp}>
              about
            </button>
          </h2>
        </p>
      </div>
      <div>
        <SplashDiv />
      </div>

      <div>
        <b> Find Wines that Match these Tasting Notes </b>
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

        <div>
          <SelectButton
            value={"Open Bottle?"}
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
        _ _ new logic starts here _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _{" "}
      </div>

      <div>
        <table>
          <tr>
            <td class="td-bottleHistory">
              {" "}
              Sommelier Credentials {todayTotalScore}{" "}
            </td>
          </tr>
        </table>

        <div>
          {getSommCredentials({
            LSTastingCount,
            todayTotalScore,
            todayTastingCount,
            todayBalthazarCount,
            todayTotalNotes,
            LSTotalScore,
            LSBalthazarCount,
            LSTotalNotes,
          })}
        </div>

        <table>
          <tr>
            <td> {vennLabel[0]} </td>
            <td> {vennLabel[1]} </td>
            <td> {vennLabel[2]} </td>
          </tr>
          <tr>
            <td class={venntdClass[3]}> {vennLabel[3]} </td>
            <td class={venntdClass[4]}> {vennLabel[4]} </td>{" "}
            <td class={venntdClass[5]}> {vennLabel[5]} </td>
          </tr>
        </table>
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
        <h1 class="h1-background-bubbles">CHEERS!!! </h1>
        <table class="modalTable">
          <tr>
            <td class="td-modalWineScore">
              {" "}
              <b> Wine Score </b> &nbsp;
              <b>{wineScore} </b> &emsp; {wineScoreLabel}
            </td>
          </tr>
        </table>
        <table>
          <tr>
            <td class="td-modalStats">Bottles Opened: {gameBottle}</td>

            <td class="td-modalStats">Glasses Spilled: {gameSpills} </td>
          </tr>
        </table>
        <p></p>
        <div>
          <table>
            <div>
              Tasting #{game} - Notes Found: {gameNotesAcquired}
              <div class="button_container">
                <button
                  class={venntdClass[0]}
                  onClick={() => handleClickTastingNote(0)}
                >
                  {" "}
                  {vennLabel[0]}
                </button>
                <button
                  class={venntdClass[1]}
                  onClick={() => handleClickTastingNote(1)}
                >
                  {" "}
                  {vennLabel[1]}
                </button>
                <button
                  class={venntdClass[2]}
                  onClick={() => handleClickTastingNote(2)}
                >
                  {" "}
                  {vennLabel[2]}
                </button>
              </div>
              <div class="button_container">
                <button
                  class={venntdClass[3]}
                  onClick={() => handleClickTastingNote(3)}
                >
                  {" "}
                  {vennLabel[3]}
                </button>
                <button
                  class={venntdClass[4]}
                  onClick={() => handleClickTastingNote(4)}
                >
                  {" "}
                  {vennLabel[4]}
                </button>
                <button
                  class={venntdClass[5]}
                  onClick={() => handleClickTastingNote(5)}
                >
                  {" "}
                  {vennLabel[5]}
                </button>
              </div>
              Click Tasting Notes for Bottle Info
            </div>
            <div>
              {getSommCredentials({
                LSTastingCount,
                todayTotalScore,
                todayTastingCount,
                todayBalthazarCount,
                todayTotalNotes,
                LSTotalScore,
                LSBalthazarCount,
                LSTotalNotes,
              })}
            </div>
          </table>
        </div>
        <div>
          <button onClick={() => toggleBottleDiv()}>
            {showHideBottleDiv} Bottle Details
          </button>
        </div>
        <div class={divBlockNone}>
          <table>
            <tr>
              <td class="td-bottleHistory">
                {" "}
                Magnum Bottle:{" "}
                <a href={dusanLink} target="_blank" rel="noreferrer">
                  {dusanBottle}{" "}
                </a>{" "}
                {dusanNotes}{" "}
              </td>
            </tr>
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
        <p></p>
        <p></p>
        <p></p>
        <p></p>.<p></p>.<p></p>.
      </Modal>

      <div>
        _ _ _ _ new logic ends here _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _{" "}
      </div>
      <p>
        GitHub Codespaces <span className="heart">♥️</span> React
      </p>
      <p className="small">
        Edit <code>src/App.jsx</code> and save to reload.
      </p>
      <p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </p>
    </div>
  );
}
