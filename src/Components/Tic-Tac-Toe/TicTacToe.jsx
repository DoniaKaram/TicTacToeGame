import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import cross from '../Assets/cross.png';
import circle from '../Assets/circle.png';

const TicTacToe = () => {
  let [data, setData] = useState(["", "", "", "", "", "", "", "", ""]);
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [winner, setWinner] = useState(null);
  let titleRef = useRef(null);
  const toggle = (e, num) => {
    if (lock || data[num]) {
      return;
    }
    let newData = [...data];
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross}'>`;
      newData[num] = "x";
    } else {
      e.target.innerHTML = `<img src='${circle}'>`;
      newData[num] = "o";
    }
    setData(newData);
    setCount(count + 1);
    checkWin(newData);
  }
  const checkWin = (data) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (data[a] && data[a] === data[b] && data[a] === data[c]) {
          won(data[a]);
          return;
        }
      }
      if (count === 8) {
        // All boxes filled, it's a draw
        setWinner("Draw");
        setLock(true);
      }
    };
    const won = (winner) => {
        setWinner(winner);
        setLock(true);
        if(winner==='x'){
          titleRef.current.innerHTML=`Congratulations<img src='${cross}'>wins`;

        }

        else{

          titleRef.current.innerHTML=`Congratulations<img src='${circle}'>wins`;
        }

      };
      const resetGame = () => {
        setData(["", "", "", "", "", "", "", "", ""]);
        setCount(0);
        setLock(false);
        setWinner(null);
        titleRef.current.innerHTML='TicTacToe Game in <span>React</span>';
        document.querySelectorAll('.box').forEach(box => box.innerHTML = '');
      };
      return (
        <div>
          <div className='container'>
            <h1 className='title' ref={titleRef}>TicTacToe Game in <span>React</span></h1>
            <div className='board'>
              <div className='row1'>
                <div className='box' onClick={(e) => toggle(e, 0)}></div>
                <div className='box' onClick={(e) => toggle(e, 1)}></div>
                <div className='box' onClick={(e) => toggle(e, 2)}></div>
              </div>
              <div className='row2'>
                <div className='box' onClick={(e) => toggle(e, 3)}></div>
                <div className='box' onClick={(e) => toggle(e, 4)}></div>
                <div className='box' onClick={(e) => toggle(e, 5)}></div>
              </div>
              <div className='row3'>
                <div className='box' onClick={(e) => toggle(e, 6)}></div>
                <div className='box' onClick={(e) => toggle(e, 7)}></div>
                <div className='box' onClick={(e) => toggle(e, 8)}></div>
              </div>
            </div>
            <button className='reset' onClick={resetGame}>Reset</button>
          </div>
        </div>
      );
    };
export default TicTacToe;
  