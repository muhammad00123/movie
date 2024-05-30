import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Modal, Button } from "@mui/material";
import "./paid.css";

export default function Paid() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Default animation duration: 1000ms
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchMovieData();
  }, []);

  const fetchMovieData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const data = {
        title: "Братство (фильм, 2019)",
        description:
          "«Бра́тство» — российский военный фильм режиссёра Павла Лунгина, посвящённый выводу советских войск из Афганистана на завершающем этапе Афганской войны. Датой выхода в прокат в России первоначально было объявлено 6 декабря 2018 года, затем премьеру перенесли на полгода.",
        price: "13$",
        trailerLink: "https://youtu.be/Lp8XVPRrtTQ?t=1",
      };
      setMovieData(data);
      setIsLoading(false);
    }, 1000);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : movieData ? (
        <section className="card__wrapper">
          <div className="container">
            <div className="cards">
              <div data-aos="zoom-out" className="card"></div>
              <div data-aos="flip-down" className="card__info">
                <h2>{movieData.title}</h2>
                <h2 className="info__text">{movieData.description}</h2>
                <h2>Price: {movieData.price}</h2>

                <div className="btns">
                  <div className="b">
                    <button className="custom-button" onClick={openModal}>
                      Pay
                    </button>
                  </div>
                  <a href={movieData.trailerLink}>
                    <button className="custom-button">Trailer</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div>No movie data available.</div>
      )}
      <PaymentModal open={isModalOpen} onClose={closeModal} />
    </div>
  );
}

function PaymentModal({ open, onClose }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="payment-modal-title"
      aria-describedby="payment-modal-description"
      className="modal"
    >
      <div className="modals">
        <div className="modal-overlay">
          <div className="modal">
            <section className="add-card page">
              <form className="form">
                <label htmlFor="name" className="label">
                  <span className="title">Card holder full name</span>
                  <input
                    className="input-field"
                    type="text"
                    name="input-name"
                    title="Input title"
                    placeholder="Enter your full name"
                  />
                </label>
                <label htmlFor="serialCardNumber" className="label">
                  <span className="title">Card Number</span>
                  <input
                    id="serialCardNumber"
                    className="input-field"
                    type="number"
                    name="input-name"
                    title="Input title"
                    placeholder="0000 0000 0000 0000"
                  />
                </label>
                <div className="split">
                  <label htmlFor="ExDate" className="label">
                    <span className="title">Expiry Date</span>
                    <input
                      id="ExDate"
                      className="input-field"
                      type="text"
                      name="input-name"
                      title="Expiry Date"
                      placeholder="01/23"
                    />
                  </label>
                  <label htmlFor="cvv" className="label">
                    <span className="title"> CVV</span>
                    <input
                      id="cvv"
                      className="input-field"
                      type="number"
                      name="cvv"
                      title="CVV"
                      placeholder="CVV"
                    />
                  </label>
                </div>
                <input
                  className="checkout-btn"
                  type="button"
                  value="Checkout"
                />
              </form>
            </section>
          </div>
        </div>
      </div>
    </Modal>
  );
}
