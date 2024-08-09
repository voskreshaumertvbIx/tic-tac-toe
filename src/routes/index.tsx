import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import Board from "../component/offlineVersion/board/board";
import ChooseCharacter from "../component/offlineVersion/chooseCharacter/chooseCharacter";
import OnlineBoard from "../component/onlineVersion/board/board";
import ChooseOnlineCharacter from "../component/onlineVersion/chooseCharacter/chooseCharacter";
import Startingmenu from "../component/startingmenu/startingmenu";

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
      <Route path="/test" element={<div>Test Page</div>} />

    </Routes>
  );
};

export default AppRoutes;