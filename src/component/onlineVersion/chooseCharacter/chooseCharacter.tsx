import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ref, update, onValue } from "firebase/database";
import { database } from "./../../../services/index";
import { anime_character } from "./character";
import { ROUTES } from "../../../routes/routes";
import styles from "./../board/styles.module.css";

export interface AnimeCharacter {
  title: string;
  path: string;
}

const ChooseOnlineCharacter = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [player1, setPlayer1] = useState<AnimeCharacter | null>(null);
  const [player2, setPlayer2] = useState<AnimeCharacter | null>(null);
  const [hasSelected, setHasSelected] = useState(false);

  const cards = useMemo(() => {
    return anime_character.filter(
      (anime) =>
        anime.title !== player1?.title && anime.title !== player2?.title
    );
  }, [player1, player2]);

  const handleCharacterSelection = async (character: AnimeCharacter) => {
    if (hasSelected || (isPlayerOneTurn && player1) || (!isPlayerOneTurn && player2)) return;

    if (!gameId) {
      console.error("Game ID is not available");
      return;
    }

    const gameRef = ref(database, `games/${gameId}`);

    if (isPlayerOneTurn) {
      setPlayer1(character);
      await update(gameRef, { player1: character }).catch((error) =>
        console.error("Error updating player 1:", error)
      );
    } else {
      setPlayer2(character);
      await update(gameRef, { player2: character }).catch((error) =>
        console.error("Error updating player 2:", error)
      );
    }

    setHasSelected(true);
    setIsPlayerOneTurn(!isPlayerOneTurn);
  };

  useEffect(() => {
    if (!gameId) {
      console.error("Game ID is not available");
      return;
    }

    const gameRef = ref(database, `games/${gameId}`);
    const unsubscribe = onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val() as {
          player1: AnimeCharacter | null;
          player2: AnimeCharacter | null;
        };

        setPlayer1(data.player1);
        setPlayer2(data.player2);

        if (data.player1 === null || data.player2 === null) {
          setHasSelected(false);
        }

        setIsPlayerOneTurn(!data.player1 || data.player2 === null);
      } else {
        console.log("No data available");
      }
    });

    return () => unsubscribe();
  }, [gameId]);

  useEffect(() => {
    if (player1 && player2 && gameId && player1.path !== "" && player2.path !== "") {
      const updatedRoute = `${ROUTES.onlineBoard}/${gameId}`;
      navigate(updatedRoute);
      console.log(`Navigating to ${updatedRoute}`);
    }
  }, [player1, player2, navigate, gameId]);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover"
      style={{ backgroundImage: `url('./img/background.jpg')` }}
    >
      <h1 className={styles.default_text}>Choose your character</h1>
      <div className={styles.default_text}>
        {player1 && player2
          ? "Both selected"
          : hasSelected
          ? "Waiting for the other player..."
          : `Player ${isPlayerOneTurn ? "1" : "2"} choose your character`}
      </div>
      <div className="grid grid-cols-5 gap-4 px-4">
        {cards.map(({ title, path }) => (
          <div
            onClick={() => handleCharacterSelection({ title, path })}
            key={title}
            className={`flex flex-col items-center bg-[#ffe4e13f] border-[3px] border-[#FF69B4] rounded-[15px] shadow-pink-glow p-[15px] cursor-pointer transform transition-transform hover:scale-105 ${
              hasSelected ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <img
              src={path}
              alt={title}
              className="w-[256px] h-[256px] object-cover rounded-md"
            />
            <p className={styles.winner_text}>{title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseOnlineCharacter;
