import { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import "./Board.css";

function Board() {
  const [deckId, setDeckId] = useState("");
  const [cards, setCards] = useState([]);
  const deckEmpty = false;

  const newCard = async () => {
    // to prevent rage clicking, hide/disable button, like this: <button onClick={newCard} disabled>GIMME A CARD!</button>
    if (cards.length === 52) {
      // doesn't work if API is slow or if I click to get next cards really fast
      alert("Error: no cards remaining!");
    } else {
      const card = await axios.get(
        `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      setCards([
        ...cards,
        {
          value: card.data.cards[0].value,
          suit: card.data.cards[0].suit,
          img: card.data.cards[0].image,
          position: Math.random(),
          code: card.data.cards[0].code,
        },
      ]);
      console.log("cards.length: ", cards.length);
    }
    // enable button after function is done
  };
  const shuffle = async () => {
    const deck = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    setDeckId(deck.data.deck_id);
    // setDeckId((previousValue) => {
    //   console.log({previousValue});
    //   // if (ljlkjl )
    //   return deck.data.deck_id
    // })
    setCards([]);
  };


  useEffect(function () {
    async function fetchDeck() {
      const deck = await axios.get(
        "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
      );
      setDeckId(deck.data.deck_id);
    //   console.log(`deck id: ${deckId} -- ${deck.data.deck_id}`);
    }

    fetchDeck();
  }, []);

  return (
    <>
      <button onClick={newCard}>GIMME A CARD!</button>
      <button onClick={shuffle}>Shuffle deck</button>
      {cards.map((card) => (
        <Card
          value={card.value}
          suit={card.value}
          img={card.img}
          key={card.code}
          position={card.position}
        />
      ))}
    </>
  );
}

export default Board;
