import "./App.css";
import MainScreen from "./screens/MainScreen/MainScreen";
import { Routes, Route, Link } from "react-router-dom";
import EditScreen from "./screens/EditScreen/EditScreen";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<MainScreen />} />
        <Route path="/edit" element={<EditScreen />} />
      </Routes>
    </div>
  );
}

export default App;
