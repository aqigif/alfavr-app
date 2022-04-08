// import "aframe";
// import "aframe-button-controls";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Alfa from "./pages/alfa";
import Mili from "./pages/mili";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Alfa />} />
      <Route path="mili" element={<Mili />} />
    </Routes>)
}

export default App;
