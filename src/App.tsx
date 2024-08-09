
import AppRoutes from "./routes";
import Background from "./component/background/background";
import "./index.css";

function App() {
  return (
    <Background>
      <AppRoutes />
    </Background>
  );
}

export default App;
