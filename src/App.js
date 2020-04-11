import React from 'react';
import './App.css';

const TILES = "AAAAAAAAABBCCDDDDEEEEEEEEEEEEFFGGGHHIIIIIIIIIJKLLLLMMNNNNNNOOOOOOOOPPQRRRRRRSSSSTTTTTTUUUUVVWWXYYZ  ";

function App() {
  const [ rand1, setRand1 ] = React.useState("0.2460931405");
  const [ rand2, setRand2 ] = React.useState("0.7451811228");

  const [ useRand1, setUseRand1 ]= React.useState(true);
  const [ useRand2, setUseRand2 ]= React.useState(true);
  const [ useRowSwap, setUseRowSwap ]= React.useState(true);
  const [ useColSwap, setUseColSwap ]= React.useState(true);

  let tiles = TILES;

  if (useRand1) {
    tiles = shunt(tiles, getDigits(+rand1));
  }

  if (useRand2) {
    tiles = shuffle(tiles, getDigits(+rand2));
  }

  if (useRowSwap) {
    tiles = rowSwap(tiles, 2);
  }

  if (useColSwap) {
    tiles = colSwap(tiles, 2);
  }

  return (
    <div className="App">
      <label>
        <input type="checkbox" checked={useRand1} onChange={() => setUseRand1(!useRand1)} />
        <span>Random 1 (Column)</span>
        <input type="text" value={rand1} onChange={e => setRand1(e.target.value)} />
        <button onClick={() => setRand1(Math.random().toString())}>Random</button>
      </label>
      <label>
        <input type="checkbox" checked={useRand2} onChange={() => setUseRand2(!useRand2)} />
        <span>Random 2 (Row)</span>
        <input type="text" value={rand2} onChange={e => setRand2(e.target.value)} />
        <button onClick={() => setRand2(Math.random().toString())}>Random</button>
      </label>
      <label>
        <input type="checkbox" checked={useRowSwap} onChange={() => setUseRowSwap(!useRowSwap)} />
        Perform Two Swap (Row)
      </label>
      <label>
        <input type="checkbox" checked={useColSwap} onChange={() => setUseColSwap(!useColSwap)} />
        Perform Two Swap (Column)
      </label>
      <table>
        <tbody>
        {
          range(10).map(i => (
            <tr key={i}>
              {
                range(10).map(j => (
                  <td key={j}>{tiles[i*10+j]}</td>
                ))
              }
            </tr>
          ))
        }
        </tbody>
      </table>
    </div>
  );
}

export default App;

function range (n) {
  return [ ...Array(n) ].map((_,i) => i);
}

/**
 * 
 * @param {number} n 
 * @returns {string}
 */
function getDigits (n) {
  const rem = n - Math.floor(n);
  return rem.toFixed(10).substr(2);
}

/**
 * 
 * @param {string} tiles 
 * @param {string} digits 
 * @returns {string}
 */
function shunt (tiles, digits) {
  const tmp = tiles.split("");
  for (let i = 0; i < 10; i++) {
    let col = range(10).map(j => tiles[j * 10 + i]).join("");
    col = shiftTiles(col, +digits[i]);
    for (let j = 0; j < 10; j++) {
      tmp[j * 10 + i] = col[j];
    }
  } 
  return tmp.join("");
}

/**
 * 
 * @param {string} tiles 
 * @param {string} digits 
 * @returns {string}
 */
function shuffle (tiles, digits) {
  const out = [];

  for (let i = 0; i < 10; i++) {
    out.push(shiftTiles(tiles.substr(i * 10, 10), +digits[i]));
  }

  return out.join("");
}

/**
 * 
 * @param {string} tiles 10 tiles
 * @param {number} n 
 * @returns {string}
 */
function shiftTiles (tiles, n) {
  return tiles.repeat(2).substr(10 - n, 10);
}

function rowSwap (tiles, n) {
  if (n !== 2) {
    throw Error("Swap of anything other than 2 has not been implemented.");
  }
  const rows = range(10).map(i => tiles.substr(i * 10, 10));
  const out = [];
  for (let i = 0; i < 5; i++) {
    out.push(rows[i*n+1]);
    out.push(rows[i*n]);
  }
  return out.join("");
}

function colSwap (tiles, n) {
  if (n !== 2) {
    throw Error("Swap of anything other than 2 has not been implemented.");
  }
  const tmp = tiles.split("");
  for (let i = 0; i < 50; i++) {
    const c = tmp[i*n+1];
    tmp[i*n+1] = tmp[i*n];
    tmp[i*n] = c;
  }
  return tmp.join("");
}