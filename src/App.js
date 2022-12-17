import React, { Component } from "react";
import "./App.css";
import { useState } from "react";
import ReactCardFlip from "./Flipcard";
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

  return (
    <div className="App">
      <div className="input">
        <textarea
          type="text"
          name="long"
          value={card.text}
          onChange={(e) => {
            e.preventDefault();
            setCard({ text: e.target.value });
          }}
        ></textarea>
        <button onClick={dowhenclicked}>Submit</button>
      </div>

      <div className="output">
        {allCards.map(function display(card) {
          return <div className="display-card">{card.summary}</div>;
        })}
      </div>
    </div>
  );
}

export default App;
