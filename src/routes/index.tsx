import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import Board from "../component/offlineVersion/board/board";
import ChooseCharacter from "../component/offlineVersion/chooseCharacter/chooseCharacter";
import OnlineBoard from "../component/onlineVersion/board/board";
import ChooseOnlineCharacter from "../component/onlineVersion/chooseCharacter/chooseCharacter";
import Startingmenu from "../component/startingmenu/startingmenu";
import AichooseCharacter from "../component/AIversion/chooseCharacter/chooseCharacter";
import AiBoard from "../component/AIversion/board/board";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.mainpage} element={<Startingmenu />} />
      <Route path={ROUTES.chooseCharacter} element={<ChooseCharacter />} />
      <Route path={ROUTES.game} element={<Board />} />
      <Route
        path={`${ROUTES.onlineChoose}/:gameId`}
        element={<ChooseOnlineCharacter />}
      />
      <Route path={`${ROUTES.onlineBoard}/:gameId`} element={<OnlineBoard />} />
      <Route path={ROUTES.aichoose} element={<AichooseCharacter/>}/>
      <Route path={ROUTES.aigame} element={<AiBoard/>} />


    </Routes>
  );
};

export default AppRoutes;