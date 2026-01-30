import React from "react";
import "../../../CSS/Contatti.css";
import NavBarTala from "../NavBarTala.jsx";
import Footer from "./Footer";

const Contatti = () => {
  return (
    <div className="page-wrapper"> {/* <-- wrapper flex */}
      <NavBarTala />
      <section className="contatti-section">
        <div className="contatti-card">
          <h2>Contatti U.S. Talamonese A.S.D. <img src="/Images/Icons8/icons8-calcio-100-2.png" alt="Pallone da calcio" /> <img src="/Images/Icons8/icons8-calcio-100-2.png" alt="Pallone da calcio" /> <img src="/Images/Icons8/icons8-calcio-100-2.png" alt="Pallone da calcio" /></h2>
          <p><strong>Mail generale:</strong> <a href="mailto:calciotalamona@gmail.com">calciotalamona@gmail.com</a></p>
          <p><strong>Nome referente:</strong> Cesare Mazzanti</p>
          <p><strong>Ruolo referente:</strong> Responsabile settore giovanile</p>
          <p><strong>Email referente:</strong> 
            <a href="mailto:ustalamonese@libero.it">ustalamonese@libero.it</a>, 
            <a href="mailto:cesare.mazzanti@tiscali.it">cesare.mazzanti@tiscali.it</a>
          </p>
          <p><strong>Social:</strong></p>
          <ul className="social-links">
            <li><a href="https://www.facebook.com/USTalamonese" target="_blank" rel="noreferrer">Facebook: U.S. Talamonese</a></li>
            <li><a href="https://www.instagram.com/u.s.talamonese" target="_blank" rel="noreferrer">Instagram: u.s.talamonese</a></li>
          </ul>
         <div className="contatti-card-footer-img">

 
  
 
 
  
</div>
        </div>    
      </section>
      <Footer />
    </div>
  );
};

export default Contatti;
