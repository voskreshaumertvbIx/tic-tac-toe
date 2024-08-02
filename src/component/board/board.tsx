import { useState } from "react";
import styles from "./styles.module.css";
import { winningCombinations } from "./winningcombination";

const Board = () => {
  const [data, setData] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [count, setCount] = useState(0);
  const [win, setWin] = useState(false);
  const [ draw, setDraw]= useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const checkDraw = (data:string[]) =>{
    return data.every(cell => cell !== '');
  }

  const checkWin = (data: string[]) => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        setWin(true);
        setWinner(data[a]);
        return true;
      }
    }
    return false;
  };

  const toggle = (index: number) => {
    if (win || data[index] != "") {
      return;
    }
    const newData = [...data];
    if (count % 2 == 0) {
      newData[index] = "x";
    } else {
      newData[index] = "0";
    }
    setData(newData);
    setCount(count + 1);
    console.log("asdasdasdassd");

    if(checkWin(newData)){
      console.log(`Player ${count % 2 === 0 ? 1 : 2} wins!`);
    } else if(checkDraw(newData)){
      setDraw(true);
      console.log('draw!')
    }
    
  };

  return (
    <div className={styles.container}>
      <h1>Tic Tac Toe</h1>
      <div className={styles.board}>
        <div className={styles.row}>
          {data.map((cell, index) => (
            <div
              key={index}
              className={styles.box}
              onClick={() => toggle(index)}
            >
              {cell && (
                <img
                  className="p-[5px] w-[140px] h-[140px]"
                  src={`./img/${cell === "x" ? "1" : "2"}.png`}
                  alt="cell"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {win && <p>Player {winner === 'x' ? 1 : 2} wins!</p>}
      {draw && <p>its draw!</p>}
    </div>
  );
};

export default Board;
