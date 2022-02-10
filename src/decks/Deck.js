import React, { useState, useEffect } from "react";
import { useHistory, useParams, useRouteMatch, Link } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard, readCard } from "../utils/api/index";

function Deck({ updateDecks }) {
  // creating deck variable for the initial state of the deck being an empty array
  const [deck, setDeck] = useState({ cards: [] });
  // history variable for the navigation bar
  const history = useHistory();
  // getting the deck's id use the parameters
  const { deckId } = useParams();
  // using Route Match to direct where a user should be taken after a submission or deletion is completed
  const { url } = useRouteMatch();
  // adding structure of a deck's data
  const { id, name, description, cards } = deck;
  console.log(deckId, cards);

  // API call to retrieve the deck and it's various details based on it's Deck id
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
*/

  // create function to delete the deck handler
  async function deleteDeckHandler(deckId) {
    const confirm = window.confirm(
      "Delete this deck?\nYou will not be able to recover it."
    );
    if (confirm) {
      await deleteDeck(deckId);
      updateDecks(-1);
      history.push("/");
    } else {
      history.go(0);
    }
  }

  /*
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

*/
  if (deck || cards) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-light d-flex">
  
            <li className="breadcrumb-item">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {name}
            </li>
          </ol>
        </nav>
        <div className="media-body">
          <h3>{name}</h3>
          <p className="mb-2">{description}</p>
        </div>
        <div className="btn-group d-flex">
          <Link to={`/decks/${id}/edit`} className="btn btn-secondary ml-2">
            Edit
          </Link>
          <Link to={`/decks/${id}/study`} className="btn btn-primary ml-2">
            Study
          </Link>
          <Link to={`/decks/${id}/cards/new`} className="btn btn-primary ml-2">
            + Add Cards
          </Link>

          <button
            className="btn btn-danger ml-2"
            onClick={deleteDeckHandler}
            value={id}
            name="delete"
          >
            Delete
          </button>
        </div>
        <h3 className="mt-4">Cards</h3>
        {cards.map((card, index) => (
          <div className="d-flex row justify-content-left m-2" key={index}>
            <div className="card">
              <div className="card-body row">
                <p className="card-text col">{card.front}</p>
                <p className="card-text col">{card.back}</p>
                <div className="pt-3">
                  <Link
                    to={`${url}/cards/${card.id}/edit`}
                    className="btn btn-secondary mr-2 col"
                  >
                    Edit
                  </Link>
                  <Link
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Delete this card?\nYou will not be able to recover it."
                        )
                      ) {
                        await deleteCard(card.id);
                        updateDecks(-1);
                        history.go(0);
                      } else {
                        history.go(0);
                      }
                    }}
                    name="delete-card-front"
                    className="btn btn-danger btn-sm mt-3"
                  >
                    Delete
                  </Link>
                </div>
                {/*
                <div className="card-body">
                  <p className="card-text col">{card.back}</p>
                </div>
                <div className="d-flex pl-3">
                  <Link
                    to={`${url}/cards/${card.id}/edit`}
                    className="btn btn-secondary mr-2"
                  >
                    Edit
                  </Link>
                  <Link
                    onClick={async () => {
                      if (
                        window.confirm(
                          "Delete this card?\nYou will not be able to recover it."
                        )
                      ) {
                        await deleteCard(card.id);
                        updateDecks(-1);
                        history.go(0);
                      } else {
                        history.go(0);
                      }
                    }}
                    name="delete-card-back"
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </Link>
                </div>
                  */}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Deck;
