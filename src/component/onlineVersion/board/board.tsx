import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ref, onValue, update } from "firebase/database";
import { database } from "./../../../services/index";
import styles from "./styles.module.css";
import { winningCombinations } from "./winningcombination";
import { ROUTES } from "../../../routes/routes";

interface GameData {
  board: string[];
  count: number;
  win: boolean;
  draw: boolean;
  winner: string | null;
  player1: { path: string | null };
  player2: { path: string | null };
  currentPlayer: "x" | "o";
  navigateToSelection?: boolean;
}

const OnlineBoard = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
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
  const [count, setCount] = useState<number>(0);
  const [win, setWin] = useState<boolean>(false);
  const [draw, setDraw] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [gameData, setGameData] = useState<GameData | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<"x" | "o">("x");
  const [hasSelected, setHasSelected] = useState(false);

  useEffect(() => {
    const gameRef = ref(database, `games/${gameId}`);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as GameData;

        if (data.board && data.board.length > 0) {
          setData(data.board);
        }
        setCount(data.count === undefined ? 0 : data.count);
        setWin(data.win);
        setDraw(data.draw);
        setWinner(data.winner);
        setCurrentPlayer(data.currentPlayer || "x");
        setGameData(data);

        if (data.navigateToSelection) {
          navigate(`${ROUTES.onlineChoose}/${gameId}`);
          updateGame({ navigateToSelection: false });
        }

        setHasSelected(false);

        console.log("Game data loaded:", data);
      } else {
        console.log("No game data found for gameId:", gameId);
      }
    });

    return () => unsubscribe();
  }, [gameId, navigate]);

  const updateGame = async (newData: Partial<GameData>) => {
    const gameRef = ref(database, `games/${gameId}`);
    try {
      await update(gameRef, newData);
      console.log("Game data updated:", newData);
    } catch (error) {
      console.error("Error updating game data:", error);
    }
  };

  const resetGame = async () => {
    const newData: Partial<GameData> = {
      board: ["", "", "", "", "", "", "", "", ""],
      count: 0,
      win: false,
      draw: false,
      winner: null,
      currentPlayer: "x",
    };
    await updateGame(newData);
    console.log("Game reset");
  };

  const totalResetGame = async () => {
    const newData: Partial<GameData> = {
      board: ["", "", "", "", "", "", "", "", ""],
      count: 0,
      win: false,
      draw: false,
      winner: null,
      currentPlayer: "x",
      player1: { path: null },
      player2: { path: null },
      navigateToSelection: true,
    };

    await updateGame(newData);
    console.log("Game reset and navigate to selection");
  };

  const checkDraw = (data: string[]): boolean =>
    data.every((cell) => cell !== "");

  const checkWin = (data: string[]): boolean => {
    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        setWin(true);
        setWinner(data[a]);
        updateGame({ win: true, winner: data[a] });
        return true;
      }
    }
    return false;
  };

  const toggle = async (index: number) => {
    if (!gameData) return;

    if (hasSelected || win || data[index] !== "") return;

    if (!gameId) {
      console.error("Game ID is not available");
      return;
    }

    const newData = [...data];
    newData[index] = currentPlayer;

    const newCount = count + 1;

    setData(newData);
    setCount(newCount);
    const nextPlayer = currentPlayer === "x" ? "o" : "x";
    setCurrentPlayer(nextPlayer);

    await updateGame({
      board: newData,
      count: newCount,
      currentPlayer: nextPlayer,
    }).catch((error) => console.error("Error updating game state:", error));

    setHasSelected(true);
    console.log("Cell updated:", index, "New data:", newData);

    if (checkWin(newData)) {
      console.log(`Player ${currentPlayer === "x" ? 1 : 2} wins!`);
    } else if (checkDraw(newData)) {
      setDraw(true);
      updateGame({ draw: true });
      console.log("It's a draw!");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Tic Tac Toe</h1>
      {win || draw ? "" : <p className={styles.title}>Current Player: {currentPlayer}</p>}

      {win && (
        <p className={styles.winner_text}>
          Player {winner === "x" ? 1 : 2} wins!
        </p>
      )}
      {draw && <p className={styles.title}>It's a draw!</p>}
      {hasSelected && !win && !draw && (
        <p className={styles.title}>Waiting for the next player...</p>
      )}

      <div className={styles.board}>
        {data.map((cell, index) => (
          <div key={index} className={styles.box} onClick={() => toggle(index)}>
            {cell && gameData && (
              <img
                className="p-[10px] w-[140px] h-[140px] rounded-[15px]"
                src={
                  cell === "x" ? gameData.player1?.path||undefined : gameData.player2?.path || undefined
                }
                alt="cell"
              />
            )}
          </div>
        ))}
      </div>

      {(win || draw) && (
        <div className="flex flex-col">
          <button
            className="text-2xl text-white py-2 px-4 bg-pink-500 bg-opacity-75 rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105 mt-4 mb-2"
            onClick={resetGame}
          >
            New game
          </button>
          <button
            className="text-2xl text-white py-2 px-4 bg-pink-500 bg-opacity-75 rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105 mb-2"
            onClick={totalResetGame}
          >
            Back to selection
          </button>

          <button
            className="text-2xl text-white py-2 px-4 bg-pink-500 bg-opacity-75 rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105 mb-2"
            onClick={() => navigate(ROUTES.mainpage)}
          >
            Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default OnlineBoard;
