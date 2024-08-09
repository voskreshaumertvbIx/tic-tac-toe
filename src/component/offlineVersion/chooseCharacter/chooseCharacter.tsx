import { useEffect, useState, useMemo } from "react";
import { anime_character } from "./character";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routes";
import styles from './../board/styles.module.css'
export interface AnimeCharacter {
  title: string;
  path: string;
}

const ChooseCharacter = () => {
  const navigate = useNavigate();
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(true);
  const [player1, setPlayer1] = useState<AnimeCharacter | null>(null);
  const [player2, setPlayer2] = useState<AnimeCharacter | null>(null);
  const cards = useMemo(() => {
    return anime_character.filter(
      (anime) =>
        anime.title !== player1?.title && anime.title !== player2?.title
    );
  }, [player1, player2]);

  const handleCharacterSelection = (character: AnimeCharacter) => {
    if (player1 && player2) {
      return;
    }
    if (isPlayerOneTurn) {
      !player1 && setPlayer1(character);
    } else {
      !player2 && setPlayer2(character);
    }
    setIsPlayerOneTurn(!isPlayerOneTurn);
  };

  useEffect(() => {
    console.log(`Current player: ${isPlayerOneTurn ? "Player 1" : "Player 2"}`);
    console.log(player1, "playyyyyer1111");
    console.log(player2, "playyyyyer222222");

    if (player1 && player2) {
      navigate(ROUTES.game, { state: { player1, player2 } });
    }
  }, [isPlayerOneTurn, player1, player2, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover" style={{ backgroundImage: `url('/path/to/your/background-image.png')` }}>
      <h1 className={styles.default_text}>Choose your character</h1>
      <div className={styles.default_text}>
        {player1 && player2
          ? "Both selected"
          : `Player ${isPlayerOneTurn ? "1" : "2"} choose your character`}
      </div>
      <div className="grid grid-cols-5 gap-4 px-4">
        {cards.map(({ title, path }) => (
          <div
            onClick={() => handleCharacterSelection({ title, path })}
            key={title}
            className="flex flex-col items-center bg-[#ffe4e13f] border-[3px] border-[#FF69B4] rounded-[15px] shadow-pink-glow p-[15px] cursor-pointer transform transition-transform hover:scale-105"
          >
            <img
              src={path}
              alt={title}
              className="w-[256px] h-[256px] object-cover rounded-md"
            />
            <p className={styles.winner_text}>
              {title}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChooseCharacter;
