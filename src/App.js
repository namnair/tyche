import React, { Component } from "react";
import "./App.css";
import { useState } from "react";

import ReactCardFlip from "react-card-flip";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [card, setCard] = useState({ text: "", summary: "" });
  const [allCards, setAllCards] = useState([]);

  console.log(allCards);

  function dowhenclicked(e) {
    query({
      inputs: card.text,
    }).then((response) => {
      console.log(response[0]["summary_text"]);

      setCard({ ...card, summary: response[0]["summary_text"] });

      setAllCards([...allCards, card]);
    });
  }

  ///

  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }
  const flashcards = document.querySelectorAll(".flashcard");

  flashcards.forEach((flashcard) => {
    flashcard.addEventListener("click", () => {
      flashcard.classList.toggle("flipped");
    });
  });
  return (
    <div className="App">
      <div className="input">
        <textarea
          className="txtarea"
          type="text"
          name="long"
          value={card.text}
          onChange={(e) => {
            e.preventDefault();
            setCard({ text: e.target.value });
          }}
        ></textarea>

        <button
          type="button"
          className="btn btn-danger"
          onClick={dowhenclicked}
        >
          Submit
        </button>
      </div>
      <div className="flashcard-container">
        <div className="flashcard">
          <div className="flashcard-front">learn smarter</div>
          <div className="flashcard-back">
            {" "}
            <div className="output">
              {allCards.map(function display(card) {
                return <div className="display-card">{card.summary}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
