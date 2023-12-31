import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Home from './pages/Home';
import Character from "./pages/Character";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/character/:id" element={<Character />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;