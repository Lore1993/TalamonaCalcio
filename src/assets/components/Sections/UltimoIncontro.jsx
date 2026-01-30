import React from "react";
import "../../../CSS/UltimoIncontro.css";

const UltimoIncontro = () => {
  return (
    <section className="ultimo-incontro-section">
      <h2 className="ultimo-incontro-title">Ultimo Incontro</h2>

      <div className="ultimo-incontro-card">
        <iframe
          src="https://www.tuttocampo.it/WidgetV2/Partita/3e7ccc1d-d64b-406f-8b08-b9b7c2f5a379"
          width="500"
          height="350"
          loading="lazy"
          title="Ultimo incontro"
        ></iframe>
      </div>
    </section>
  );
};

export default UltimoIncontro;