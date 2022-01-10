import React, { useState, useEffect } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import CardList from "./cards/CardList";

function Study() {
  //create a variable for the initial state of the deck to be an object
  const [deck, setDeck] = useState({});
  // get the deck's id
  const { deckId } = useParams();
  // create a history variable
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

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={`/`}>Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-label="page">
            Study
          </li>
        </ol>
      </nav>
      <h2>
          {deck.name}: Study
      </h2>
      <CardList />
    </>
  );
}

export default Study;
