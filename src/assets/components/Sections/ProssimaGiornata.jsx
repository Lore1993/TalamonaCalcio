import React from "react";
import "../../../CSS/ProssimaGiornata.css";

const ProssimaGiornata = () => {
  return (
    <section className="prossima-partita-section">
            <h2 className="prossima-giornata-title">Prossimo Incontro</h2>
      <div className="prossima-partita-card">
        <iframe
          src="https://www.tuttocampo.it/WidgetV2/ProssimaPartita/3e7ccc1d-d64b-406f-8b08-b9b7c2f5a379"
          loading="lazy"
          title="Prossima Partita"
        ></iframe>
      </div>
    </section>
  );
};

export default ProssimaGiornata;