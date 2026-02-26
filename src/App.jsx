import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageTala from "./assets/components/HomePageTala";
import Classifica from "./assets/components/Sections/Classifica";
import NewsPage from "./assets/components/Sections/NewsPage.jsx";
import Contatti from "./assets/components/Sections/Contatti.jsx";
import Admin from './assets/components/Sections/Admin.jsx';
import ArticoloPage from "./assets/components/Sections/ArticoloPage.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
 <Route path="/" element={<HomePageTala />} />
<Route path="/admin" element={<Admin />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/classifica" element={<Classifica/>}/>
        <Route path="/contatti" element={<Contatti/>}/>
        <Route path="/articolo/:id" element={<ArticoloPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;