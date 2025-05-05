import './App.css';
import "./styles.css";
import SearchableDropdown from "./searchableDropdown";
import Modal from "./Modal";
import { wineData } from "./data/wineData";
import { vennCriteria } from "./data/vennCategory";
import { vennGames } from "./data/vennCategory";
import { useState, useEffect } from "react";
const gameTotal = 21;

import useFetchWine from "./component/useFetchWine";

export default function App() {
  const { wineData, loading, error } = useFetchWine();
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
      tempArray[5]
    ]);
  }, []);

  return (
    <div className="App">
      <div>
        <div>
          <table class="notesTable">
            <tr>
            <td class={venntdClass[0]}> lab1 </td>
            <td class={venntdClass[1]}> lab2 </td>
            <td class={venntdClass[2]}> lab3 </td>
            </tr>
            <tr>
            <td class={venntdClass[3]}> lab4 </td>
            <td class={venntdClass[4]}> lab5 </td>
            <td class={venntdClass[5]}>  lab6 </td>
            </tr>
          </table>
        </div>
      </div>
      <div>_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ </div>
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