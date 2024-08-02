import React, { useState } from "react";
import styles from "./styles.module.css";



const Board = () => {
  const [data, setData]=useState<string[]>(["", "", "", "", "", "", "", "", ""])
  const [count, setCount] = useState(0);
  const [win, setWin] = useState(false);

  const toggle = (index: number) => {
    if (win || data[index] !=  '') {
      return;
    }
    const newData = [...data]
    if (count % 2 == 0) {
      newData[index]= 'x'
    } else {
     newData[index]= '0'
    }
    setData(newData);
    setCount(count + 1);
    console.log('asdasdasdassd')
  };
  return (
    <div className={styles.container}>
      <h1>Tic Tac Toe</h1>
      <div className={styles.board}>
      <div className={styles.row}>
        {data.map((cell,index)=>(
          <div key={index} className={styles.box} onClick={()=>toggle(index)}>
            {cell && (
              <img className="w-[140px] h-[140px]" src={`./img/${cell === 'x' ? '1':'2'}.png`} alt="cell" />
            )}
          </div>
        ))}

      </div>
      </div>
    </div>
  );
};

export default Board;
