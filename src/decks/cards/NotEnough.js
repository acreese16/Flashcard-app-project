import React from "react";
import { useParams, Link } from "react-router-dom";

function NotEnough({deck}) {
    const {deckId} = useParams();

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
          You need at least 3 cards to study. There are {deck.cards.length} cards in this deck.
        </p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
          + Add Card
        </Link>
      </div>
    )
};

export default NotEnough;