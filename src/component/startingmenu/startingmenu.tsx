import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

const Startingmenu = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate(ROUTES.chooseCharacter);
  };
  return (
    <div className="flex items-center justify-center h-screen bg-cover">
      <button
        className="text-2xl text-white py-2 px-4 bg-pink-500 bg-opacity-75 rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105"
        onClick={handleSubmit}
      >
        Start Game
      </button>
    </div>
  );
};

export default Startingmenu;
