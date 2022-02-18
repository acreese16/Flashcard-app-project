import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link } from "react-router-dom";

function Home() {
  //create decks initial state
  const [decks, setDecks] = useState([]);

  //create a useEffect to load the available decks
  useEffect(generateDecks, []);

  // create function to generate all the decks available
  function generateDecks() {
    listDecks().then(setDecks);
  }

  //creating a delete handler that takes in the deck id to identify the correct deck to delete
  function deleteHandler(deckId) {
    const confirm = window.confirm(
      "Delete this deck?\nYou will not be able to recover it."
    );

    // if the confirmed button is clicked then delete the deck
    if (confirm) {
      deleteDeck(deckId).then(generateDecks);
    }
  }

  const deckList = decks.map((deck) => (
    <li key={deck.id} className="list-group-item flex-column align-items-start">
      <div className="d-flex justify-content-between">
        <h4 className="mb-1">{deck.name}</h4>
        <small>{deck.cards.length} cards</small>
      </div>
      <p className="mb-1">{deck.description}</p>
      <Link
        to={`/decks/${deck.id}`}
        className="btn btn-secondary mr-2"
        title="Edit Deck"
      >
        View
      </Link>
      <Link
        to={`/decks/${deck.id}/study`}
        className="btn btn-primary mr-2"
        title="Study Deck"
      >
        Study
      </Link>
      <button
        className="btn btn-danger justify-content-end"
        onClick={() => deleteHandler(deck.id)}
        title="Delete Deck"
      >
        Delete
      </button>
    </li>
  ));
  return (
    <>
      <Link to={`/decks/new`} className="btn btn-secondary btn-lg mb-4">
        + Create Deck
      </Link>
      <ul className="list-group deck-list">{deckList}</ul>
    </>
  );
}

export default Home;
