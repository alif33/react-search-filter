import { BrowserRouter, Routes, Route } from "react-router-dom";
import Traffik from "./pages/TrafficPage";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Traffik />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
