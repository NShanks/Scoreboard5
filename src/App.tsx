import Navbar from "components/navbar";
import About from "pages/About";
import Home from "pages/Home";
import Score from "pages/Score";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <div className="appContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/score" element={<Score />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
