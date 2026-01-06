import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageTala from "./assets/components/HomePageTala";
import NewsSecTala from "./assets/components/Sections/NewsSecTala";

function App() {
  return (
    <BrowserRouter>
      <Routes>
 <Route path="/" element={<HomePageTala />} />
        <Route path="/news" element={<NewsSecTala />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;