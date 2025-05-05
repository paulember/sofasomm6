import './App.css';
import './style.css';

import { useState, useEffect, useSyncExternalStore } from "react";

import useFetchWine from "./component/useFetchWine";

export default function App() {
  const { wineData, loading, error } = useFetchWine();
  const [venntdClass, setVenntdClass] = useState([Array(6).fill(null)]);

  
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