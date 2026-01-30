import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageTala from "./assets/components/HomePageTala";
import Classifica from "./assets/components/Sections/Classifica";
import NewsPage from "./assets/components/Sections/NewsPage.jsx";
import Contatti from "./assets/components/Sections/Contatti.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
 <Route path="/" element={<HomePageTala />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/classifica" element={<Classifica/>}/>
        <Route path="/contatti" element={<Contatti/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;