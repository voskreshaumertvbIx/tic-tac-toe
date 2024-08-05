import { useState } from "react";
import styles from "./styles.module.css";
import { winningCombinations } from "./winningcombination";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimeCharacter } from "../chooseCharacter/chooseCharacter";
import { ROUTES } from "../../routes/routes";

const Board = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { player1, player2 } = location.state as {
    player1: AnimeCharacter;
    player2: AnimeCharacter;
  };
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
  const [draw, setDraw] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const resetGame = () => {
    setData(["", "", "", "", "", "", "", "", ""]);
    setWin(false);
    setDraw(false);
    setWinner(null);
    setCount(0);
  };

  const checkDraw = (data: string[]) => {
    return data.every((cell) => cell !== "");
  };

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
    if (win || data[index] !== "") {
      return;
    }
    const newData = [...data];
    if (count % 2 === 0) {
      newData[index] = "x";
    } else {
      newData[index] = "0";
    }
    setData(newData);
    setCount(count + 1);

    if (checkWin(newData)) {
      console.log(`Player ${count % 2 === 0 ? 1 : 2} wins!`);
    } else if (checkDraw(newData)) {
      setDraw(true);
      console.log("draw!");
    }
  };

  return (
    <div className={styles.container} >
      <h1 className={styles.title}>Tic Tac Toe</h1>

      {win && (
        <p className={`${styles.winner_text} mb-3`}>
          Player {winner === "x" ? 1 : 2} wins!
        </p>
      )}
      {draw && <p className={`${styles.winner_text} mb-3`}>It's a draw!</p>}

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
                  className="p-[10px] w-[140px] h-[140px] rounded-[15px]"
                  src={`${cell === "x" ? player1.path : player2.path}`}
                  alt="cell"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {(win || draw) && (
  <div className="flex flex-col">
    {[
      { label: "New game", onClick: resetGame, margin: "mt-4 mb-2" },
      { label: "Back to selection", onClick: () => navigate(ROUTES.chooseCharacter) },
      { label: "Menu", onClick: () => navigate(ROUTES.mainpage), margin: "mt-2" }
    ].map((button, index) => (
      <button
        key={index}
        className={`text-2xl text-white py-2 px-4 bg-pink-500 bg-opacity-75 rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105 ${button.margin}`}
        onClick={button.onClick}
      >
        {button.label}
      </button>
    ))}
  </div>
)}

      
    </div>
  );
};

export default Board;
