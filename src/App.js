import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

import Home from './pages/Home';
import Character from "./pages/Character";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ... your routes */}
        <Route path="/" element={<Home />}></Route>
        <Route path="/character/:id" element={<Character />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// console.log("get_all_data exicuted")
// const recieved_data = await axios.get('https://rickandmortyapi.com/api/character/?page=1')
// const abstracted_data = recieved_data.data.results
// setDataToDisplay(abstracted_data)
// console.log("recieved_data==", abstracted_data)