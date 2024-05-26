import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./paid.css";

export default function Paid() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Varsayılan animasyon süresi: 1000ms
  }, []);

  return (
    <div>
      <section className="card__wrapper">
        <div className="container">
          <div className="cards">
            <div data-aos="zoom-out" className="card"></div>
            <div  data-aos="flip-down" className="card__info">
              <h2>Братство (фильм, 2019)</h2>
              <h2 className="info__text">
                «Бра́тство» — российский военный фильм режиссёра Павла Лунгина,
                посвящённый выводу советских войск из Афганистана на завершающем
                этапе Афганской войны. Датой выхода в прокат в России
                первоначально было объявлено 6 декабря 2018 года, затем премьеру
                перенесли на полгода.
              </h2>
              <div className="btns">
                <button className="custom-button">Play</button>
                <button className="custom-button">dinahuy</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
