import { useState, useEffect } from "react";
import Card from "./Card";
import axios from 'axios';

function Board() {
    const [ deckId, setDeckId ] = useState('');
    const [ cards, setCards ] = useState([]);
    const deckEmpty = false;

    const newCard = async () => {
        if(cards.length === 52) { // doesn't work if API is slow or if I click fast
            alert('Error: no cards remaining!') 
        } else {
            const card = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
            setCards([...cards, {
                value: card.data.cards[0].value,
                suit: card.data.cards[0].suit,
                img: card.data.cards[0].image,
                code: card.data.cards[0].code
            }]);
        }
    };
    const shuffle = async () => {
        const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
        setDeckId(deck.data.deck_id);
        setCards([]);
    };

    useEffect(function fetchDeckWhenMounted() { 
        async function fetchDeck() {
            const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            setDeckId(deck.data.deck_id);     
            console.log(`deck id: ${deckId}`); // this function runs twice when app loads for some reason
        }
        fetchDeck();
    }, []);

    return (
        <>
            <button onClick={newCard}>GIMME A CARD!</button>
            <button onClick={shuffle}>Shuffle deck</button>
            {cards.map(card => (<Card value={card.value} suit={card.value} img={card.img} key={card.code}/>))}    
        </>
    )
}

export default Board;