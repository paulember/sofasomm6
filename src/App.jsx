import './App.css';
import './style.css';
import { useState, useEffect, useSyncExternalStore } from "react";

export default function App() {
  return (
    <div className="App">
      <div>
        <div>
          <table class="notesTable">
            <tr>
            <td class="td-wineMiss"> lab1 </td>
            <td class="td-wineMiss"> lab2 </td>
            <td class="td-wineMiss"> lab3 </td>
            </tr>
            <tr>
            <td class="td-wineMiss"> lab4 </td>
            <td class="td-wineMiss"> lab5 </td>
            <td class="td-wineMiss"> lab6 </td>
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


