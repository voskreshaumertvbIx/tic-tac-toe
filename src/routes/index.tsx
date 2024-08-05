import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import Board from "../component/board/board";
import ChooseCharacter from "../component/chooseCharacter/chooseCharacter";
import Startingmenu from "../component/startingmenu/startingmenu";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.mainpage} element={<Startingmenu />} />
      <Route path={ROUTES.chooseCharacter} element={<ChooseCharacter />} />
      <Route path={ROUTES.game} element={<Board />} />
    </Routes>
  );
};

export default AppRoutes;
