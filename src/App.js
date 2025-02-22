import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
//pages

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="Pages">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
