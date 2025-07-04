import React from "react";
import "./Style/AdminPannel.scss";
const Maps = () => {
  return (
    <div>
      <div className="parent-map">
        <div className="container-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8503056.848182853!2d37.68948679995415!3d28.94871469212754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14fd844104b258a9%3A0xfddcb14b194be8e7!2z2YLYt9in2Lkg2LrYstmR2Kk!5e0!3m2!1sar!2seg!4v1709569529556!5m2!1sar!2seg"></iframe>
          <div className="map">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;
