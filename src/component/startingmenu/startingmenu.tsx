

import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { v4 as uuidv4 } from 'uuid';

const Startingmenu = () => {
  
  const navigate = useNavigate();

  const handleOfflineSubmit = () => {
    navigate(ROUTES.chooseCharacter);
  };

  const handleOnlineSubmit = () => {
    const uniqueGameId = uuidv4();
    navigate(`${ROUTES.onlineChoose}/${uniqueGameId}`);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-cover">
      <button
        className="text-2xl text-white py-2 px-4 bg-pink-500 bg-opacity-75 rounded-lg hover:bg-pink-600 transition-transform transform hover:scale-105 m-4"
        onClick={handleOfflineSubmit}
      >
        Start Offline Game
      </button>
      <button
        className="text-2xl text-white py-2 px-4 bg-blue-500 bg-opacity-75 rounded-lg hover:bg-blue-600 transition-transform transform hover:scale-105 m-4"
        onClick={handleOnlineSubmit}
      >
        Start Online Game
      </button>
    </div>
  );
};

export default Startingmenu;
