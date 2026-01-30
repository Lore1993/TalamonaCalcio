import React from "react";
import "../../../CSS/Marcatori.css"; // CSS dedicato

const Marcatori = () => {
  return (
    <section className="marcatori-section">
      <h2 className="marcatori-title">Marcatori</h2>
      <div className="marcatori-card">
        <iframe
          src="https://www.tuttocampo.it/WidgetV2/Marcatori/3e7ccc1d-d64b-406f-8b08-b9b7c2f5a379"
          title="Marcatori"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default Marcatori;
