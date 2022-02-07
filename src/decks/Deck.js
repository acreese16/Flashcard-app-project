import React, { useState, useEffect } from "react";
import { useHistory, useParams, useRouteMatch, Link } from "react-router-dom";
import {
  readDeck,
  deleteDeck,
  deleteCard,
  readCard,
  listCards,
} from "../utils/api/index";
import CardList from "./cards/CardList";

function Deck({ updateDecks }) {
  // creating deck variable for the initial state of the deck being an empty array
  const [deck, setDeck] = useState([]);
  // create a template of what consists in a card
  const [cards, setCards] = useState([]);

  // history variable for the navigation bar
  const history = useHistory();
  const { deckId, cardId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    const abortControl = new AbortController();

    const deckDetails = async () => {
      const response = await readDeck(deckId, abortControl.signal);
      setDeck(() => response);
    };
    deckDetails();
    return () => {
      abortControl.abort();
    };
  }, [deckId]);

  /*
  useEffect(generateCards, []);

  function generateCards(deckId) {
      listCards(deckId).then(setCards);
  }
*/
  useEffect(() => {
    setCards([]);
    const abortControl = new AbortController();

    const cardDetails = async () => {
      const response = await readCard(cardId);
      const cardAPI = await response.json();
      setCards(cardAPI);
    };
    cardDetails();
    return () => {
      abortControl.abort();
    };
  }, [cardId]);

  // create function to delete the deck handler
  function deleteDeckHandler(deckId) {
    const confirm = window.confirm(
      "Delete this deck?\nYou will not be able to recover it."
    );
    if (confirm) {
      deleteDeck(deckId).then(() => history.push("/"));
    }
  }

  //function to delete a deck's card handler
  function deleteCardHandler(cardId) {
    const confirm = window.confirm(
      "Delete this card?\nYou will not be able to recover it."
    );
    if (confirm) {
      deleteCard(cardId).then(() => history.push("/"));
    }
  }

  const cardList = cards.map((card, index) => (
    <li key={index} className="list-group-item flex-column align-items-start">
      <div className="d-flex justify-content-between">
        <p className="col">{card.front}</p>
        <p className="col">{card.back}</p>
      </div>
      <Link
        to={`/decks/${deckId}/cards/${cardId}/edit`}
        className="btn btn-secondary"
      >
        Edit
      </Link>
      <button className="btn btn-danger" onClick={deleteCardHandler}>
        Delete
      </button>
    </li>
  ));

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/`}>Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="media-body">
        <h3>{deck.name}</h3>
        <p className="mb-2">{deck.description}</p>
      </div>
      <div className="btn-group">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary ml-2">
          Edit
        </Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary ml-2">
          Study
        </Link>
        <Link
          to={`/decks/${deckId}/cards/new`}
          className="btn btn-primary ml-2"
        >
          + Add Cards
        </Link>

        <button
          className="btn btn-danger ml-2"
          onClick={deleteDeckHandler}
          title="Delete deck"
        >
          Delete
        </button>
      </div>
      <h3 className="mt-4">Cards</h3>
      <div className="list-group">{cardList}</div>
    </div>
  );
}

export default Deck;
