import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { readDeck, readCard } from "../utils/api/index";

function Study() {
  //create a variable for the initial state of the deck to be an object
  const [deck, setDeck] = useState({});
  // get the deck's id
  const { deckId, cardId } = useParams();
  // start the first card in a deck as a starting point
  const [activeCard, setActiveCard] = useState(0);
  // to set the card to be facing the front side of the card first
  const [front, setFront] = useState(true);
  const [cards, setCards] = useState([]);
  const history = useHistory();

  // useEffect to get the proper deck

  useEffect(() => {
    const abortControl = new AbortController();

    const getDeck = async () => {
      const activeDeck = await readDeck(deckId);
      setDeck(() => activeDeck);
    };
    getDeck();
    return () => abortControl.abort();
  }, [deckId]);

  useEffect(() => {
    const abortControl = new AbortController();

    const cardAPIInfo = async () => {
      const response = await readCard(cardId, abortControl.signal);
      setCards(() => response);
    };
    cardAPIInfo();

    return () => {
      abortControl.abort();
    };
  }, [cardId]);

  const nextCardHandler = () => {
    // if the current card is the last card in the deck
    if (activeCard === cards.length - 1) {
      // then ask if user wishes to restart or continue to home screen, if OK then restart cards, if cancel go home
      window.confirm(
        "Restart cards?\nClick 'Cancel' to return to the home page."
      )
        ? setActiveCard(() => 0)
        : history.push("/");
    } else {
      // otherwise continue studying the next card in the deck and the ability to flip the card to the back
      setActiveCard((card) => card + 1);
      setFront(() => !front);
    }
  };

  const flippingCardHandler = () => {
    setFront(() => !front);
  };

  // if the deck exists and the amount of cards is greater than 2 then render
  if (cards.length > 2) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-label="page">
              Study
            </li>
          </ol>
        </nav>
        <h2 className="d-flex">{deck.name}: Study</h2>
        <div className="card-body">
          <h5 className="card-title">
            Card {activeCard + 1} of {cards.length}
          </h5>
          <p className="card-text">
            {front ? cards[activeCard].front : cards[activeCard].back}
          </p>
          <button
            className="btn btn-secondary mr-3"
            onClick={flippingCardHandler}
          >
            Flip
          </button>
          {front ? null : (
            <button className="btn btn-primary" onClick={nextCardHandler}>
              Next
            </button>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-label="page">
              Study
            </li>
          </ol>
        </nav>
        <h2 className="d-flex">{deck.name}: Study</h2>
        <h3>Not enough cards.</h3>
        <p>
          You need at least 3 cards to study. There are {cards.length} cards in
          this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          + Add Card
        </Link>
      </div>
    );
  }
}

export default Study;
